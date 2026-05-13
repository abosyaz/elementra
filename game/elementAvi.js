// ============================================================
//  ELEMENTRA v2 — game/elementAvi.js
//  Modül 1: Element Avı (Periyodik Tablo)
//
//  FAZ 4 adımları:
//  - F4.1: Periyodik tablo grid CSS (tamamlandı — style.css'te)
//  - F4.2: Element hücresi komponenti + iskelet (BU ADIM)
//  - F4.3: 36 element yerleşim (bu adımda da yapılıyor)
//  - F4.4: Soru bankası + sorulu cevap
//  - F4.5: Tıklama mantığı (doğru/yanlış)
//  - F4.6: Bağlam kartı entegrasyon
//  - F4.7: Skor + combo + süre
//  - F4.8: Bitiş ekranı (sonuc-ekran reuse)
//  - F4.9: 4 zorluk seviyesi
//  - F4.10: 5 rozet tetikleyici
//  - F4.11: Manuel test
// ============================================================

'use strict';

const ElementAvi = {
    // ─── Çalışma durumu ──────────────────
    _config: null,
    _zorluk: null,
    _aktifElementler: [],   // Bu seviyede oynanan elementler havuzu
    _aktifSoru: null,       // { tip, hedef: Element, metin, dogru: sembol }
    _soruSirasi: 0,
    _dogruSayisi: 0,
    _yanlisSayisi: 0,
    _skor: 0,
    _combo: 1,
    _baslangicZamani: 0,
    _sonDogruZamani: 0,     // Hızlı cevap bonusu için
    _karistirmalar: [],     // F3 ile uyumlu — sık karıştırma kayıtları
    _dogruBilinenler: null, // Set — bu oyunda doğru bilinen semboller
    _sureTimer: null,       // Uzman modda geri sayım sayacı
    _kalanSure: 0,          // Saniye

    // ─── Zorluk konfigürasyonu ───
    KONFIG: {
        kolay: {
            elementSecimi: 'ilk20',
            soruSayisi: 10,
            soruTipleri: ['ad']
        },
        orta: {
            elementSecimi: '36',
            soruSayisi: 12,
            soruTipleri: ['ad', 'atomNo']
        },
        zor: {
            elementSecimi: '36',
            soruSayisi: 15,
            soruTipleri: ['ad', 'atomNo', 'grup', 'yayginAd']
        },
        uzman: {
            elementSecimi: '36',
            soruSayisi: 20,
            soruTipleri: ['ad', 'atomNo', 'grup', 'yayginAd'],
            sureLimitiSn: 60
        }
    },

    /**
     * Modülü başlat.
     */
    baslat(zorluk) {
        this._config = this.KONFIG[zorluk] || this.KONFIG.kolay;
        this._zorluk = zorluk;
        this._soruSirasi = 0;
        this._dogruSayisi = 0;
        this._yanlisSayisi = 0;
        this._skor = 0;
        this._combo = 1;
        this._karistirmalar = [];
        this._dogruBilinenler = new Set();
        this._baslangicZamani = Date.now();
        this._sonDogruZamani  = Date.now();

        // Element havuzu
        this._aktifElementler = (this._config.elementSecimi === 'ilk20')
            ? ilk20()
            : ELEMENTS;

        // Uzman modda HUD ileri sayımı durdur + kendi geri sayım sayacımız
        if (this._config.sureLimitiSn) {
            this._geriSayimBaslat();
        }

        this._cizTahta();
        this._sonrakiSoru();
    },

    /**
     * Uzman modda geri sayım sayacı (F4.9).
     */
    _geriSayimBaslat() {
        // HUD'un ileri sayan sayacını durdur
        if (typeof HUD !== 'undefined') HUD.sureDurdur();

        this._kalanSure = this._config.sureLimitiSn;
        if (typeof HUD !== 'undefined') HUD.setSure(this._kalanSure);

        this._sureTimer = setInterval(() => {
            this._kalanSure--;
            if (typeof HUD !== 'undefined') HUD.setSure(this._kalanSure);

            // Son 10 saniyede pulse (görsel uyarı)
            if (this._kalanSure <= 10 && this._kalanSure > 0) {
                const kap = document.getElementById('hud-skor-kapsayici');
                // Süre kapsayıcısını bulmak gerek — şimdilik HUD pulse
            }

            if (this._kalanSure <= 0) {
                clearInterval(this._sureTimer);
                this._sureTimer = null;
                this._oyunBitti();
            }
        }, 1000);
    },

    /**
     * Oyun tahtasını çiz (üst bar + periyodik tablo).
     */
    _cizTahta() {
        const icerik = document.getElementById('oyun-icerik');
        if (!icerik) return;

        icerik.innerHTML = `
            <div class="element-avi-tahta">
                <div class="element-avi-soru-kart">
                    <div class="element-avi-soru-etiket">
                        SORU <span id="ea-soru-no">${this._soruSirasi + 1}</span>/${this._config.soruSayisi}
                    </div>
                    <div class="element-avi-soru-metin" id="ea-soru-metin">Yükleniyor...</div>
                    <div class="element-avi-ilerleme">
                        <span>Doğru: <strong id="ea-dogru">0</strong></span>
                        <span class="text-muted">·</span>
                        <span>Yanlış: <strong id="ea-yanlis">0</strong></span>
                    </div>
                </div>
                <div class="periyodik-tablo" id="ea-tablo">
                    ${this._tabloHTMLOlustur()}
                </div>
            </div>
        `;

        // Hücre tıklama event'leri
        document.querySelectorAll('.periyodik-hucre[data-sembol]').forEach(h => {
            h.addEventListener('click', () => this._hucreTikla(h.dataset.sembol, h));
        });
    },

    /**
     * 18×7 grid HTML üret. Aktif elementler dolu, diğerleri boş hücre.
     */
    _tabloHTMLOlustur() {
        const cells = [];
        for (let row = 1; row <= 7; row++) {
            for (let col = 1; col <= 18; col++) {
                const el = this._aktifElementler.find(
                    e => e.tablodaKonum.row === row && e.tablodaKonum.col === col
                );
                if (el) {
                    cells.push(`
                        <button class="periyodik-hucre kat-${el.kategori}"
                                data-sembol="${el.sembol}"
                                type="button"
                                style="grid-row: ${row}; grid-column: ${col};"
                                title="${el.ad}"
                                aria-label="${el.ad}, atom numarası ${el.atomNo}">
                            <span class="hucre-atomno">${el.atomNo}</span>
                            <span class="hucre-sembol">${el.sembol}</span>
                            <span class="hucre-ad">${el.ad}</span>
                        </button>
                    `);
                } else {
                    cells.push(`
                        <div class="periyodik-hucre bos"
                             style="grid-row: ${row}; grid-column: ${col};"
                             aria-hidden="true"></div>
                    `);
                }
            }
        }
        return cells.join('');
    },

    /**
     * Hücre tıklandı — doğru/yanlış kontrolü (F4.5).
     */
    _hucreTikla(sembol, btn) {
        if (!this._aktifSoru) return;
        // Bu turda hücre zaten cevaplandıysa engelle
        if (document.querySelector('.periyodik-hucre.cevaplandi[data-sembol]')) return;

        const dogru = this._aktifSoru.dogruSemboller.includes(sembol);

        // Tüm hücreleri devre dışı bırak (bu turda)
        document.querySelectorAll('.periyodik-hucre[data-sembol]')
            .forEach(h => h.classList.add('cevaplandi'));

        if (dogru) {
            // DOĞRU ─────────────────
            btn.classList.add('dogru');
            this._comboTetikle();
            const ekPuan = this._puanHesapla();
            this._skor += ekPuan;
            this._sonDogruZamani = Date.now();
            this._dogruSayisi++;
            this._dogruBilinenler.add(sembol);
            KesifManager.elementKesfet(sembol);

            // Combo sesi
            if (this._combo >= 3) AudioManager.sesCal('combo3plus');
            else if (this._combo === 2) AudioManager.sesCal('combo2');
            else AudioManager.sesCal('dogru');

            // HUD
            if (typeof HUD !== 'undefined') HUD.setSkor(this._skor);

            // Yüzen +N puan
            if (typeof AnimationHelper !== 'undefined') {
                AnimationHelper.floatNumber(btn, `+${ekPuan}`, { renk: 'var(--color-success)' });
            }

            this._guncelleSayilar();
            // F4.6'da bağlam kartı modal eklenecek
            setTimeout(() => this._sonrakiSoruyaGec(this._aktifSoru.hedef), 900);
        } else {
            // YANLIŞ ────────────────
            btn.classList.add('yanlis');
            AudioManager.sesCal('yanlis');
            this._yanlisSayisi++;
            this._comboSifirla();

            // Karıştırma kaydı (StatManager için)
            const dogruEl = bulElementBySembol(this._aktifSoru.dogruSemboller[0]);
            if (dogruEl) {
                this._karistirmalar.push({ yanlis: sembol, dogru: dogruEl.sembol });
            }

            // Doğru hücreleri vurgula
            this._aktifSoru.dogruSemboller.forEach(s => {
                const h = document.querySelector(`.periyodik-hucre[data-sembol="${s}"]`);
                if (h && !h.classList.contains('yanlis')) h.classList.add('dogru-vurgu');
            });

            this._guncelleSayilar();
            // F4.6'da bağlam kartı: doğru cevabın elementini göster
            setTimeout(() => this._sonrakiSoruyaGec(dogruEl), 1500);
        }
    },

    /**
     * Sonraki soruya geç — önce bağlam kartı modali açılır, kapatılınca sonraki soru (F4.6).
     */
    _sonrakiSoruyaGec(eslesenElement) {
        if (!eslesenElement) {
            this._sonrakiSoru();
            return;
        }
        BaglamKarti.ac(eslesenElement, {
            onKapat: () => this._sonrakiSoru()
        });
    },

    /**
     * Sayaçları (Doğru/Yanlış) güncelle.
     */
    _guncelleSayilar() {
        const dEl = document.getElementById('ea-dogru');
        const yEl = document.getElementById('ea-yanlis');
        if (dEl) dEl.textContent = this._dogruSayisi;
        if (yEl) yEl.textContent = this._yanlisSayisi;
    },

    /**
     * Puan hesabı: base + combo bonusu + hızlı cevap bonusu × zorluk çarpanı (F4.7).
     */
    _puanHesapla() {
        const ZORLUK_CARPANI = { kolay: 1.0, orta: 1.25, zor: 1.5, uzman: 2.0 };
        const carpan = ZORLUK_CARPANI[this._zorluk] || 1.0;

        const basePuan = 100;
        const comboBonus = this._combo > 1 ? this._combo * 25 : 0;

        // Hızlı cevap bonusu: 15sn altında doğru cevap = ek puan
        const gecenSn = (Date.now() - this._sonDogruZamani) / 1000;
        const sureBonus = Math.max(0, Math.round((15 - gecenSn) * 3));

        return Math.round((basePuan + comboBonus + sureBonus) * carpan);
    },

    /**
     * Combo artır (max 5).
     */
    _comboTetikle() {
        this._combo = Math.min(5, this._combo + 1);
        if (typeof HUD !== 'undefined') HUD.setCombo(this._combo);
    },

    /**
     * Combo sıfırla.
     */
    _comboSifirla() {
        this._combo = 1;
        if (typeof HUD !== 'undefined') HUD.setCombo(1);
    },

    // Grup adları (Türkçe — UI için)
    KATEGORI_ADLAR_UI: {
        'alkali':          'alkali metal',
        'toprak-alkali':   'toprak alkali metal',
        'gecis':           'geçiş metali',
        'gecis-sonrasi':   'geçiş sonrası metal',
        'yari-metal':      'yarı metal',
        'ametal':          'ametal',
        'halojen':         'halojen',
        'soy-gaz':         'soy gaz'
    },

    /**
     * Zorluk + soru tiplerine göre yeni bir soru üret (F4.4).
     */
    _soruUret() {
        const tipler = this._config.soruTipleri;
        const tip = rastgeleSec(tipler);
        const hedef = rastgeleSec(this._aktifElementler);

        switch (tip) {
            case 'ad':
                return {
                    tip, hedef,
                    metin: `"${hedef.ad}" elementini bul`,
                    dogruSemboller: [hedef.sembol]
                };

            case 'atomNo':
                return {
                    tip, hedef,
                    metin: `Atom numarası <strong>${hedef.atomNo}</strong> olan elementi bul`,
                    dogruSemboller: [hedef.sembol]
                };

            case 'yayginAd':
                return {
                    tip, hedef,
                    metin: `"<em>${hedef.yayginAd}</em>" — bu elementi bul`,
                    dogruSemboller: [hedef.sembol]
                };

            case 'grup': {
                // Bu zorluk havuzunda en az 2 elementi olan kategorileri kullan
                const kullanilabilirKategoriler = Object.keys(this.KATEGORI_ADLAR_UI).filter(kat => {
                    const sayi = this._aktifElementler.filter(e => e.kategori === kat).length;
                    return sayi >= 2;
                });
                const kat = rastgeleSec(kullanilabilirKategoriler);
                const grupElementler = this._aktifElementler.filter(e => e.kategori === kat);
                return {
                    tip, hedef: grupElementler[0],
                    metin: `Bir <strong>${this.KATEGORI_ADLAR_UI[kat]}</strong> bul`,
                    dogruSemboller: grupElementler.map(e => e.sembol)
                };
            }

            default:
                // Fallback: ad
                return {
                    tip: 'ad', hedef,
                    metin: `"${hedef.ad}" elementini bul`,
                    dogruSemboller: [hedef.sembol]
                };
        }
    },

    /**
     * Sonraki soruyu yükle.
     */
    _sonrakiSoru() {
        // Tüm sorular bittiyse oyun bitti
        if (this._soruSirasi >= this._config.soruSayisi) {
            this._oyunBitti();
            return;
        }

        // Önceki cevaplandı vurgularını temizle
        document.querySelectorAll('.periyodik-hucre.dogru, .periyodik-hucre.yanlis, .periyodik-hucre.dogru-vurgu, .periyodik-hucre.cevaplandi')
            .forEach(h => h.classList.remove('dogru', 'yanlis', 'dogru-vurgu', 'cevaplandi'));

        // Yeni soru üret
        this._aktifSoru = this._soruUret();
        this._soruSirasi++;

        // UI güncelle
        const noEl     = document.getElementById('ea-soru-no');
        const metinEl  = document.getElementById('ea-soru-metin');
        if (noEl)    noEl.textContent = this._soruSirasi;
        if (metinEl) metinEl.innerHTML = this._aktifSoru.metin;
    },

    /**
     * Tüm sorular cevaplandığında sonuç ekranı (F4.8).
     */
    _oyunBitti() {
        if (typeof HUD !== 'undefined') HUD.sureDurdur();
        // Geri sayım timer'ını temizle (uzman mod)
        if (this._sureTimer) {
            clearInterval(this._sureTimer);
            this._sureTimer = null;
        }

        const gecenSure = Math.floor((Date.now() - this._baslangicZamani) / 1000);
        const dogruElementler = Array.from(this._dogruBilinenler)
            .map(s => bulElementBySembol(s))
            .filter(Boolean);

        // Skor + İstatistik kayıt
        const yeniRekor = ScoreManager.saveScore(
            MODUL_IDS.ELEMENT_AVI,
            this._zorluk,
            this._skor,
            gecenSure
        );
        StatManager.recordGame(
            MODUL_IDS.ELEMENT_AVI,
            gecenSure,
            this._dogruSayisi,
            this._yanlisSayisi,
            {},  // kategori istatistikleri — FAZ 6'da
            this._karistirmalar
        );

        AudioManager.sesCal(yeniRekor ? 'rekor' : 'seviyeAtlama');
        if (yeniRekor && typeof AnimationHelper !== 'undefined') {
            setTimeout(() => AnimationHelper.confetti(40), 200);
        }

        this._sonucEkrani({
            skor: this._skor,
            sure: gecenSure,
            dogruSayi: this._dogruSayisi,
            yanlisSayi: this._yanlisSayisi,
            toplamSoru: this._config.soruSayisi,
            ogrenilen: dogruElementler,
            yeniRekor,
            zorluk: this._zorluk
        });

        SahneManager.go('sonuc-ekran');
        // F4.10 rozet tetikleyici 1.2sn sonra
        setTimeout(() => this._rozetleriKontrol(gecenSure), 1200);
    },

    /**
     * Element Avı sonuç ekranı render.
     */
    _sonucEkrani(data) {
        const ekran = document.getElementById('sonuc-ekran');
        if (!ekran) return;

        const ilerleme = KesifManager.getIlerleme();
        const basariYuzdesi = data.toplamSoru > 0
            ? Math.round((data.dogruSayi / data.toplamSoru) * 100)
            : 0;

        ekran.innerHTML = `
            <div class="sonuc-konteyner">
                ${data.yeniRekor ? `
                    <div class="sonuc-rekor-rozet">
                        <svg class="ikon"><use href="#i-kupa"/></svg>
                        YENİ REKOR!
                    </div>
                ` : ''}

                <div class="sonuc-baslik-grup">
                    <h1 class="sonuc-baslik">🎉 OYUN TAMAMLANDI</h1>
                    <p class="sonuc-altbaslik">
                        ${MODUL_ADLAR_TR[MODUL_IDS.ELEMENT_AVI]}
                        <span class="text-muted">·</span>
                        <span class="badge badge-pill badge-${this._zorlukRengi(data.zorluk)}">${ZORLUK_ADLAR_TR[data.zorluk]}</span>
                    </p>
                </div>

                <div class="sonuc-stat-grid">
                    <div class="sonuc-stat">
                        <span class="sonuc-stat-etiket">Skor</span>
                        <span class="sonuc-stat-deger tabular">${skorFormatla(data.skor)}</span>
                    </div>
                    <div class="sonuc-stat">
                        <span class="sonuc-stat-etiket">Süre</span>
                        <span class="sonuc-stat-deger tabular">${sureFormatla(data.sure)}</span>
                    </div>
                    <div class="sonuc-stat">
                        <span class="sonuc-stat-etiket">Doğru</span>
                        <span class="sonuc-stat-deger tabular">${data.dogruSayi}/${data.toplamSoru}</span>
                    </div>
                    <div class="sonuc-stat">
                        <span class="sonuc-stat-etiket">Başarı</span>
                        <span class="sonuc-stat-deger tabular">%${basariYuzdesi}</span>
                    </div>
                </div>

                <section class="sonuc-bolum">
                    <h2 class="sonuc-bolum-baslik">
                        <svg class="ikon ikon-sm ikon-marka"><use href="#i-element-hucre"/></svg>
                        Doğru bildiğin elementler (${data.ogrenilen.length})
                    </h2>
                    ${data.ogrenilen.length === 0 ? `
                        <p class="text-secondary" style="text-align:center; padding:var(--space-4);">
                            Bu oyunda hiç doğru cevap veremedin — tekrar dene!
                        </p>
                    ` : `
                        <div class="sonuc-ogrenilen-grid">
                            ${data.ogrenilen.map(el => `
                                <div class="sonuc-ogrenilen-kart" style="--kat-renk: var(--cat-${el.kategori});">
                                    <div class="sonuc-ogrenilen-sembol">${el.sembol}</div>
                                    <div class="sonuc-ogrenilen-ad">
                                        ${el.ad}
                                        ${el.latince ? `<span class="text-muted" style="font-size:var(--fs-caption);">(${el.latince})</span>` : ''}
                                    </div>
                                    <p class="sonuc-ogrenilen-baglam">${el.baglam}</p>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </section>

                <section class="sonuc-bolum">
                    <h2 class="sonuc-bolum-baslik">
                        <svg class="ikon ikon-sm ikon-marka"><use href="#i-rozet"/></svg>
                        Genel İlerleme
                    </h2>
                    <div class="progress-label">
                        <span>${ilerleme.elementler.kesfedilen} / ${ilerleme.elementler.toplam} element keşfettin</span>
                        <span class="tabular">%${ilerleme.elementler.yuzde}</span>
                    </div>
                    <div class="progress">
                        <div class="progress-fill" style="width: ${ilerleme.elementler.yuzde}%"></div>
                    </div>
                </section>

                <div class="sonuc-aksiyon">
                    <button class="btn btn-primary btn-lg" type="button" data-sonuc-aksiyon="tekrar">
                        <svg class="ikon"><use href="#i-yenile"/></svg>
                        Tekrar Oyna
                    </button>
                    <button class="btn btn-outline btn-lg" type="button" data-sonuc-aksiyon="anaMenu">
                        <svg class="ikon"><use href="#i-anasayfa"/></svg>
                        Ana Menü
                    </button>
                </div>
            </div>
        `;

        // Buton event'leri
        ekran.querySelectorAll('[data-sonuc-aksiyon]').forEach(btn => {
            btn.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                const aksiyon = btn.dataset.sonucAksiyon;
                if (aksiyon === 'tekrar') {
                    SahneManager.modulBaslat(MODUL_IDS.ELEMENT_AVI, data.zorluk);
                } else if (aksiyon === 'anaMenu') {
                    SahneManager.anaMenuyeDon();
                }
            });
        });
    },

    _zorlukRengi(zorluk) {
        const renkler = { kolay: 'success', orta: 'warning', zor: 'error', uzman: 'brand' };
        return renkler[zorluk] || 'brand';
    },

    /**
     * Element Avı rozetlerini kontrol et (F4.10).
     */
    _rozetleriKontrol(gecenSure) {
        const yeniRozetler = [];

        // 1) İlk Adım — her durumda dene
        if (AchievementManager.unlock('m1-ilk-adim')) {
            yeniRozetler.push('m1-ilk-adim');
        }

        // 2) Hızlı Kimyacı — uzman seviye + ≤30 sn
        if (this._zorluk === 'uzman' && gecenSure <= 30) {
            if (AchievementManager.unlock('m1-hizli-kimyaci')) {
                yeniRozetler.push('m1-hizli-kimyaci');
            }
        }

        // 3) Periyot Ustası — bu oyunda doğru bilinen elementlerin farklı periyot sayısı
        const dogruElementler = Array.from(this._dogruBilinenler)
            .map(s => bulElementBySembol(s))
            .filter(Boolean);
        const periyotlar = new Set(dogruElementler.map(e => e.periyot));
        // Kolay = ilk 20 element → 4 periyot, diğerleri = 6 periyot
        const beklenenPeriyotSayisi = (this._zorluk === 'kolay') ? 4 : 6;
        if (periyotlar.size >= beklenenPeriyotSayisi) {
            if (AchievementManager.unlock('m1-periyot-ustasi')) {
                yeniRozetler.push('m1-periyot-ustasi');
            }
        }

        // 4) Mükemmellik — hiç yanlış yok + tüm sorular doğru
        if (this._yanlisSayisi === 0 && this._dogruSayisi === this._config.soruSayisi) {
            if (AchievementManager.unlock('m1-mukemmellik')) {
                yeniRozetler.push('m1-mukemmellik');
            }
        }

        // 5) Tablo Hakimi — FAZ 6 yıldız sistemi ile

        if (yeniRozetler.length > 0) {
            RozetBildirim.goster(yeniRozetler);
        }
    }
};

// SahneManager kayıt
window.modulleriBaslat = window.modulleriBaslat || {};
window.modulleriBaslat.elementAvi = (zorluk) => ElementAvi.baslat(zorluk);

console.log('✅ Modül 1 (Element Avı) iskeleti yüklendi');
