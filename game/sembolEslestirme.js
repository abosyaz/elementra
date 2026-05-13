// ============================================================
//  ELEMENTRA v2 — game/sembolEslestirme.js
//  Modül 2: Sembol Eşleştirme (Memory Oyunu)
//
//  FAZ 3 adımları:
//  - F3.1: İskelet (bu adım) — modül başlatma + window.modulleriBaslat kaydı
//  - F3.2: Kart dağıtımı (zorluk → element seçimi)
//  - F3.3: Kart döndürme animasyonu (3D flip)
//  - F3.4: Eşleşme + doğru/yanlış geri bildirim
//  - F3.5: Bağlam kartı modal (eşleşince)
//  - F3.6: Skor + combo + hamle takibi
//  - F3.7: Oyun sonu ekranı
//  - F3.8: Başarım tetikleyici (5 rozet)
// ============================================================

'use strict';

const SembolEslestirme = {
    // ─── Çalışma durumu ──────────────────
    _config: null,
    _zorluk: null,
    _kartlar: [],       // [{ id, elementSembol, tip, icerik, eslesti, acik }]
    _aktifAcik: [],     // Şu an açık olan kart id'leri
    _eslesenler: new Set(),  // Eşleşmiş element sembolleri
    _hamleSayisi: 0,
    _baslangicZamani: 0,
    _skor: 0,
    _combo: 1,
    _sonEslesmeZamani: 0,  // Hızlı eşleşme bonusu için

    // ─── Zorluk konfigürasyonu (F2.2'deki params ile tutarlı) ───
    KONFIG: {
        kolay: { ciftSayisi: 6,  elementSecimi: 'sik' },
        orta:  { ciftSayisi: 8,  elementSecimi: 'ilk20' },
        zor:   { ciftSayisi: 10, elementSecimi: 'latince' },
        uzman: { ciftSayisi: 12, elementSecimi: 'sik-karistir', sureLimitiSn: 90 }
    },

    // ─── Element Seçim Stratejileri (F3.2) ───
    ELEMENT_SECIMI: {
        // En sık karşılaşılan 6 element
        sik() {
            return ['H', 'O', 'Na', 'Cl', 'Fe', 'Au']
                .map(s => bulElementBySembol(s));
        },
        // İlk 20 elementten rastgele N
        ilk20() {
            return rastgeleN(ilk20(), 8);
        },
        // Latince kökenli + birkaç ek (toplam 10)
        latince() {
            const latinceler = latinceKokenliler(); // 9 element
            return [...latinceler, bulElementBySembol('Ca')]; // 10 element
        },
        // Sık karıştırılan çiftler dahil 12 element
        'sik-karistir'() {
            const semboller = ['Mg', 'Mn', 'C', 'Ca', 'K', 'Si', 'S', 'Hg', 'Co', 'Cu', 'Au', 'Ag'];
            return semboller.map(s => bulElementBySembol(s));
        }
    },

    /**
     * Modülü belirtilen zorlukta başlat.
     */
    baslat(zorluk) {
        this._config = this.KONFIG[zorluk] || this.KONFIG.kolay;
        this._zorluk = zorluk;
        this._aktifAcik = [];
        this._eslesenler = new Set();
        this._hamleSayisi = 0;
        this._baslangicZamani = Date.now();
        this._skor = 0;
        this._combo = 1;
        this._sonEslesmeZamani = this._baslangicZamani;

        this._kartlariOlustur();
        this._cizTahta();
    },

    /**
     * Doğru eşleşme için puan hesapla.
     */
    _puanHesapla() {
        const ZORLUK_CARPANI = { kolay: 1.0, orta: 1.25, zor: 1.5, uzman: 2.0 };
        const carpan = ZORLUK_CARPANI[this._zorluk] || 1.0;

        const basePuan = 100;
        const comboBonus = this._combo > 1 ? this._combo * 25 : 0;

        // Hızlı eşleşme bonusu: son eşleşmeden bu yana geçen sn
        const gecenSn = (Date.now() - this._sonEslesmeZamani) / 1000;
        const sureBonus = Math.max(0, Math.round((30 - gecenSn) * 2));

        return Math.round((basePuan + comboBonus + sureBonus) * carpan);
    },

    /**
     * Combo'yu artır (max 5) + HUD'a yansıt.
     */
    _comboTetikle() {
        this._combo = Math.min(5, this._combo + 1);
        if (typeof HUD !== 'undefined') HUD.setCombo(this._combo);
    },

    /**
     * Combo'yu sıfırla (yanlış eşleşme).
     */
    _comboSifirla() {
        this._combo = 1;
        if (typeof HUD !== 'undefined') HUD.setCombo(1);
    },

    /**
     * Zorluğa göre elementleri seç + her elementten 2 kart oluştur (ad + sembol).
     */
    _kartlariOlustur() {
        const stratejiAdi = this._config.elementSecimi;
        const strateji = this.ELEMENT_SECIMI[stratejiAdi];
        if (!strateji) {
            console.error('Bilinmeyen element seçim stratejisi:', stratejiAdi);
            return;
        }

        const elementler = strateji();

        // Her elementten 2 kart: ad kartı + sembol kartı
        const kartlar = [];
        elementler.forEach((el, i) => {
            kartlar.push({
                id: `${el.sembol}-ad-${i}`,
                elementSembol: el.sembol,
                element: el,
                tip: 'ad',
                icerik: el.ad,
                eslesti: false,
                acik: false
            });
            kartlar.push({
                id: `${el.sembol}-sembol-${i}`,
                elementSembol: el.sembol,
                element: el,
                tip: 'sembol',
                icerik: el.sembol,
                eslesti: false,
                acik: false
            });
        });

        // Fisher-Yates karıştırma (game/ortak.js'teki helper)
        this._kartlar = karistir(kartlar);
    },

    /**
     * Oyun tahtasını çiz + tıklama olaylarını bağla.
     */
    _cizTahta() {
        const icerik = document.getElementById('oyun-icerik');
        if (!icerik) return;

        const toplamKart = this._kartlar.length;
        const colSayisi = toplamKart >= 20 ? 6
                        : toplamKart >= 12 ? 4
                        : 4;

        icerik.innerHTML = `
            <div class="memory-bilgi">
                <span class="memory-bilgi-ozet">
                    <strong>${this._config.ciftSayisi} çift</strong>
                    <span class="text-muted">·</span>
                    <span>Eşleşen: <strong id="memory-eslesen-sayi">0</strong> / ${this._config.ciftSayisi}</span>
                    <span class="text-muted">·</span>
                    <span>Hamle: <strong id="memory-hamle-sayi">0</strong></span>
                </span>
            </div>
            <div class="memory-tahta" id="memory-tahta" style="--col-sayisi: ${colSayisi};">
                ${this._kartlar.map(k => this._kartHtml(k)).join('')}
            </div>
        `;

        this._olaylariBagla();
    },

    /**
     * Kartlara tıklama event'lerini bağla (F3.3).
     */
    _olaylariBagla() {
        document.querySelectorAll('.memory-kart').forEach(btn => {
            btn.addEventListener('click', () => this._kartTikla(btn));
        });
    },

    /**
     * Bir karta tıklandığında: aç + 2 kart kuralı + ses (F3.3).
     * İki kart açıldıysa F3.4 eşleşme kontrolü tetiklenir.
     */
    _kartTikla(btn) {
        const kartId = btn.dataset.kartId;
        const kart = this._kartlar.find(k => k.id === kartId);
        if (!kart || kart.eslesti || kart.acik) return;

        // 2 kart kuralı: maksimum 2 kart açık olabilir
        if (this._aktifAcik.length >= 2) return;

        // Kartı aç
        kart.acik = true;
        btn.classList.add('acik');
        this._aktifAcik.push(kart);
        AudioManager.sesCal('kartDondur');

        // İki kart açıldıysa eşleşme kontrolü (F3.4)
        if (this._aktifAcik.length === 2) {
            this._hamleSayisi++;
            this._guncelleBilgi();
            setTimeout(() => this._eslesmeKontrol(), 600);
        }
    },

    /**
     * İki açık kart eşleşiyor mu? Doğru → yeşil, yanlış → kırmızı (F3.4).
     */
    _eslesmeKontrol() {
        const [k1, k2] = this._aktifAcik;
        if (!k1 || !k2) return;

        if (k1.elementSembol === k2.elementSembol) {
            // EŞLEŞTİ ─────────────────────
            this._comboTetikle();
            const kazanilanPuan = this._puanHesapla();
            this._skor += kazanilanPuan;
            this._sonEslesmeZamani = Date.now();

            // Combo'ya göre ses
            if (this._combo >= 3) AudioManager.sesCal('combo3plus');
            else if (this._combo === 2) AudioManager.sesCal('combo2');
            else AudioManager.sesCal('dogru');

            k1.eslesti = k2.eslesti = true;
            this._eslesenler.add(k1.elementSembol);
            KesifManager.elementKesfet(k1.elementSembol);

            // HUD güncelle
            if (typeof HUD !== 'undefined') HUD.setSkor(this._skor);

            [k1, k2].forEach(k => {
                const btn = document.querySelector(`[data-kart-id="${k.id}"]`);
                btn?.classList.add('eslesti');
                if (btn) AnimationHelper.pulse(btn);
            });

            // Yüzen "+N" puan efekti — iki kartın ortasında
            const btn1 = document.querySelector(`[data-kart-id="${k1.id}"]`);
            const btn2 = document.querySelector(`[data-kart-id="${k2.id}"]`);
            if (btn1 && btn2) {
                const r1 = btn1.getBoundingClientRect();
                const r2 = btn2.getBoundingClientRect();
                const ortaPos = {
                    left: (r1.left + r2.left) / 2 + r1.width / 2,
                    top:  Math.min(r1.top, r2.top),
                    width: 0
                };
                AnimationHelper.floatNumber(ortaPos, `+${kazanilanPuan}`, { renk: 'var(--color-success)' });
            }

            this._aktifAcik = [];
            this._guncelleBilgi();

            // Bağlam kartı modalını 800ms sonra aç (F3.5)
            setTimeout(() => this._baglamKartiAc(k1.element), 800);
        } else {
            // EŞLEŞMEDİ ───────────────────
            AudioManager.sesCal('yanlis');
            this._comboSifirla();
            [k1, k2].forEach(k => {
                const btn = document.querySelector(`[data-kart-id="${k.id}"]`);
                if (btn) AnimationHelper.flashError(btn);
            });
            setTimeout(() => this._kartlariKapat(), 800);
        }
    },

    /**
     * Aktif (açık) iki kartı kapat — eşleşme yoksa.
     */
    _kartlariKapat() {
        this._aktifAcik.forEach(kart => {
            kart.acik = false;
            const btn = document.querySelector(`[data-kart-id="${kart.id}"]`);
            btn?.classList.remove('acik');
        });
        this._aktifAcik = [];
    },

    /**
     * Üst bilgi barını güncelle (eşleşen + hamle).
     */
    _guncelleBilgi() {
        const eslesenEl = document.getElementById('memory-eslesen-sayi');
        const hamleEl   = document.getElementById('memory-hamle-sayi');
        if (eslesenEl) eslesenEl.textContent = this._eslesenler.size;
        if (hamleEl)   hamleEl.textContent   = this._hamleSayisi;
    },

    /**
     * Bağlam kartı modalını aç (eşleşme sonrası — F3.5).
     * Tamamlanma sonrası kapanırsa oyun sonu kontrolü yapılır.
     */
    _baglamKartiAc(element) {
        BaglamKarti.ac(element, {
            onKapat: () => {
                if (this._eslesenler.size === this._config.ciftSayisi) {
                    setTimeout(() => this._oyunBitti(), 400);
                }
            }
        });
    },

    /**
     * Tüm çiftler eşleştiğinde sonuç ekranını göster (F3.7).
     */
    _oyunBitti() {
        // HUD süresayacını durdur
        if (typeof HUD !== 'undefined') HUD.sureDurdur();

        const gecenSure = Math.floor((Date.now() - this._baslangicZamani) / 1000);
        const ogrenilenSemboller = Array.from(this._eslesenler);
        const ogrenilenElementler = ogrenilenSemboller.map(s => bulElementBySembol(s));

        // Skor kaydet + rekor tespit
        const yeniRekor = ScoreManager.saveScore(
            MODUL_IDS.SEMBOL_ESLESTIRME,
            this._zorluk,
            this._skor,
            gecenSure
        );

        // İstatistik kayıt (StatManager)
        const dogruSayi = this._eslesenler.size;
        const yanlisSayi = this._hamleSayisi - this._eslesenler.size;
        StatManager.recordGame(
            MODUL_IDS.SEMBOL_ESLESTIRME,
            gecenSure,
            dogruSayi,
            Math.max(0, yanlisSayi)
        );

        // Ses
        AudioManager.sesCal(yeniRekor ? 'rekor' : 'seviyeAtlama');
        if (yeniRekor) {
            setTimeout(() => AnimationHelper.confetti(40), 200);
        }

        // Sonuç ekran HTML'i
        this._sonucEkrani({
            skor: this._skor,
            sure: gecenSure,
            hamle: this._hamleSayisi,
            ciftToplam: this._config.ciftSayisi,
            ogrenilen: ogrenilenElementler,
            yeniRekor,
            zorluk: this._zorluk
        });

        SahneManager.go('sonuc-ekran');

        // F3.8 Rozet tetikleyici — sonuç ekranı açıldıktan 1 sn sonra
        setTimeout(() => this._rozetleriKontrol(gecenSure), 1200);
    },

    /**
     * Memory modülünün 5 rozetini kontrol et ve kazanılanları RozetBildirim'e gönder.
     */
    _rozetleriKontrol(gecenSure) {
        const yeniRozetler = [];

        // 1) İlk Eşleşme — her durumda dene
        if (AchievementManager.unlock('m2-ilk-eslesme')) {
            yeniRozetler.push('m2-ilk-eslesme');
        }

        // 2) Hatasız Hafıza — hamle sayısı çift sayısına eşit ise (hiç yanlış yok)
        if (this._hamleSayisi === this._config.ciftSayisi) {
            if (AchievementManager.unlock('m2-hatasiz')) {
                yeniRozetler.push('m2-hatasiz');
            }
        }

        // 3) Latince Bilen — 5+ farklı Latince kökenli element keşfedildi mi?
        const tumKesfedilenler = KesifManager.get().elementler;
        const latinceSayisi = tumKesfedilenler
            .map(s => bulElementBySembol(s))
            .filter(e => e && e.latince)
            .length;
        if (latinceSayisi >= 5) {
            if (AchievementManager.unlock('m2-latince-bilgin')) {
                yeniRozetler.push('m2-latince-bilgin');
            }
        }

        // 4) Hızlı El — zor seviye + 60sn ve altı
        if (this._zorluk === 'zor' && gecenSure <= 60) {
            if (AchievementManager.unlock('m2-hizli-el')) {
                yeniRozetler.push('m2-hizli-el');
            }
        }

        // 5) Memory Şampiyonu — FAZ 6'da yıldız sistemi ile kontrol (şimdilik bypass)

        if (yeniRozetler.length > 0) {
            RozetBildirim.goster(yeniRozetler);
        }
    },

    /**
     * Sonuç ekranını render et.
     */
    _sonucEkrani(data) {
        const ekran = document.getElementById('sonuc-ekran');
        if (!ekran) return;

        const ilerleme = KesifManager.getIlerleme();
        const yeniSayi = data.ogrenilen.length;  // Bu oyunda kaç element keşfettiğini varsayım

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
                        ${MODUL_ADLAR_TR[MODUL_IDS.SEMBOL_ESLESTIRME]}
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
                        <span class="sonuc-stat-etiket">Hamle</span>
                        <span class="sonuc-stat-deger tabular">${data.hamle}</span>
                    </div>
                    <div class="sonuc-stat">
                        <span class="sonuc-stat-etiket">Çift</span>
                        <span class="sonuc-stat-deger tabular">${data.ciftToplam}/${data.ciftToplam}</span>
                    </div>
                </div>

                <section class="sonuc-bolum">
                    <h2 class="sonuc-bolum-baslik">
                        <svg class="ikon ikon-sm ikon-marka"><use href="#i-element-hucre"/></svg>
                        Bu oyunda öğrendiklerin
                    </h2>
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
                </section>

                <section class="sonuc-bolum">
                    <h2 class="sonuc-bolum-baslik">
                        <svg class="ikon ikon-sm ikon-marka"><use href="#i-rozet"/></svg>
                        Genel İlerleme
                    </h2>
                    <div class="progress-label">
                        <span>${ilerleme.elementler.kesfedilen} / ${ilerleme.elementler.toplam} element</span>
                        <span class="tabular">+${yeniSayi} yeni · %${ilerleme.elementler.yuzde}</span>
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
            btn.addEventListener('click', (e) => {
                AudioManager.sesCal('butonTik');
                const aksiyon = btn.dataset.sonucAksiyon;
                if (aksiyon === 'tekrar') {
                    SahneManager.modulBaslat(MODUL_IDS.SEMBOL_ESLESTIRME, data.zorluk);
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
     * Tek bir kart HTML'i.
     */
    _kartHtml(kart) {
        const kategoriRenk = `var(--cat-${kart.element.kategori})`;
        return `
            <button class="memory-kart"
                    data-kart-id="${kart.id}"
                    type="button"
                    aria-label="Kart"
                    style="--kat-renk: ${kategoriRenk};">
                <div class="memory-kart-ic">
                    <!-- ÖN YÜZ (kapalı) — atom logosu -->
                    <div class="memory-kart-on">
                        <svg class="ikon ikon-lg" aria-hidden="true">
                            <use href="#i-atom"/>
                        </svg>
                    </div>
                    <!-- ARKA YÜZ (açık) — ad veya sembol -->
                    <div class="memory-kart-arka">
                        ${kart.tip === 'sembol'
                            ? `<span class="memory-kart-sembol">${kart.icerik}</span>
                               <span class="memory-kart-atomno">${kart.element.atomNo}</span>`
                            : `<span class="memory-kart-ad">${kart.icerik}</span>`}
                    </div>
                </div>
            </button>
        `;
    }
};

// SahneManager kayıt
window.modulleriBaslat = window.modulleriBaslat || {};
window.modulleriBaslat.sembolEslestirme = (zorluk) => SembolEslestirme.baslat(zorluk);

console.log('✅ Modül 2 (Sembol Eşleştirme) iskeleti yüklendi');
