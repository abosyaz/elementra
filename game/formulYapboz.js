// ============================================================
//  ELEMENTRA v2 — game/formulYapboz.js
//  Modül 3: Formül Yapboz (Atom paleti → bileşik kurulum)
//
//  FAZ 5 adımları:
//  - F5.1: Mekanik kararı — tap-tap atom paleti ✅
//  - F5.2: Üst panel — bileşik adı/yaygın ad sunumu ✅
//  - F5.3: Orta panel — kurulan formül gösterimi (atom hücreleri) ✅
//  - F5.4: Atom paleti — gereken + yanıltıcı atomlar ✅
//  - F5.5: Atom ekleme/silme/sıfırlama mantığı ✅ (bu dosyanın özü)
//  - F5.6: İpucu sistemi (stub — F5.6'da detaylanacak)
//  - F5.7: Cevap kontrol algoritması (stub)
//  - F5.8: Doğru cevap bağlam kartı (stub)
//  - F5.9: Yanlış cevap pedagojik mesaj (stub)
//  - F5.10: Skor + ipucu cezası + süre
//  - F5.11: Sonuç ekranı (stub)
//  - F5.12: 4 zorluk seviyesi (KONFIG)
//  - F5.13: Manuel test
// ============================================================

'use strict';

const FormulYapboz = {
    // ─── Çalışma durumu ──────────────────
    _config: null,
    _zorluk: null,
    _bilesikler: [],          // Bu oyunda sırayla kurulacak bileşikler
    _bilesikIdx: 0,           // Mevcut bileşik index (1-based gösterim)
    _aktifBilesik: null,      // Şu an gösterilen bileşik
    _kurulanAtomlar: [],      // Sıralı dizi: ['H', 'H', 'O']
    _paletAtomlari: [],       // Mevcut bileşik için palet element listesi
    _skor: 0,
    _combo: 1,
    _dogruSayisi: 0,
    _yanlisSayisi: 0,
    _ipucuKalan: 0,
    _ipucuKullanildi: 0,      // Bu bileşikte
    _ipucuToplamKullanildi: 0,// Tüm oyunda
    _bilesikBaslangic: 0,
    _baslangicZamani: 0,
    _sonucKayit: [],          // [{ bilesikId, dogru, ipucuKullanildi, sureSn }]
    _karistirmalar: [],
    _sureTimer: null,
    _kalanSure: 0,
    _dogruBilinenler: null,   // Set — bu oyunda doğru kurulan bileşik id'leri

    // ─── Zorluk konfigürasyonu (index.html ile uyumlu) ───
    KONFIG: {
        kolay: { bilesikSayisi: 5,  yaniltici: 0, ipucuHakki: 99, sureLimitiSn: null },
        orta:  { bilesikSayisi: 8,  yaniltici: 2, ipucuHakki: 3,  sureLimitiSn: null },
        zor:   { bilesikSayisi: 10, yaniltici: 4, ipucuHakki: 1,  sureLimitiSn: null },
        uzman: { bilesikSayisi: 12, yaniltici: 4, ipucuHakki: 0,  sureLimitiSn: 90 }
    },

    /**
     * Modülü başlat (F2.3 SahneManager üzerinden çağrılır).
     */
    baslat(zorluk) {
        this._config = this.KONFIG[zorluk] || this.KONFIG.kolay;
        this._zorluk = zorluk;
        this._bilesikIdx = 0;
        this._skor = 0;
        this._combo = 1;
        this._dogruSayisi = 0;
        this._yanlisSayisi = 0;
        this._ipucuKalan = this._config.ipucuHakki;
        this._ipucuToplamKullanildi = 0;
        this._sonucKayit = [];
        this._karistirmalar = [];
        this._dogruBilinenler = new Set();
        this._baslangicZamani = Date.now();

        // Bileşik havuzu — zorluk-bazlı kademeli geçiş
        this._bilesikler = this._bilesikleriSec(zorluk, this._config.bilesikSayisi);

        // Uzman modda HUD süresini durdur, kendi geri sayım sayacımız
        if (this._config.sureLimitiSn) {
            this._geriSayimBaslat();
        }

        this._cizTahta();
        this._sonrakiBilesik();
    },

    /**
     * Zorluk bazlı bileşik seçimi (F5.12'de kademeli zorluk akışı için).
     * Kolay → sadece kolay havuzdan, Uzman → tüm 24'ten.
     */
    _bilesikleriSec(zorluk, sayi) {
        let havuz;
        if (zorluk === 'kolay') {
            havuz = bilesikleriZorluga('kolay');
        } else if (zorluk === 'orta') {
            // Kolaydan biraz + ağırlıklı orta
            havuz = [...bilesikleriZorluga('kolay'), ...bilesikleriZorluga('orta')];
        } else if (zorluk === 'zor') {
            havuz = [...bilesikleriZorluga('orta'), ...bilesikleriZorluga('zor')];
        } else {
            // Uzman: tüm bileşikler
            havuz = [...BILESIKLER];
        }
        return karistir(havuz).slice(0, sayi);
    },

    /**
     * Oyun tahtasını çiz: üst panel + orta panel + atom paleti.
     */
    _cizTahta() {
        const icerik = document.getElementById('oyun-icerik');
        if (!icerik) return;

        icerik.innerHTML = `
            <div class="fy-tahta">
                <!-- ÜST PANEL: bileşik sunumu (F5.2) -->
                <div class="fy-ust-panel">
                    <div class="fy-ust-satir">
                        <span class="fy-sayac tabular" id="fy-sayac">— / —</span>
                        <button class="btn btn-ghost btn-sm fy-ipucu-btn" id="fy-ipucu-btn" type="button" title="İpucu al">
                            <svg class="ikon ikon-sm"><use href="#i-ampul"/></svg>
                            <span>İpucu</span>
                            <span class="fy-ipucu-sayi tabular" id="fy-ipucu-sayi">—</span>
                        </button>
                    </div>
                    <div class="fy-bilesik-ad" id="fy-bilesik-ad">Yükleniyor...</div>
                    <div class="fy-yonlendirme">Bu maddenin formülünü kur</div>
                </div>

                <!-- ORTA PANEL: kurulan formül (F5.3) -->
                <div class="fy-orta-panel">
                    <div class="fy-orta-baslik">Senin Formülün</div>
                    <div class="fy-orta-icerik" id="fy-kurulan">
                        <div class="fy-bos-durum">Aşağıdaki paletten atom seç</div>
                    </div>
                    <div class="fy-aksiyon-bar">
                        <button class="btn btn-ghost btn-sm" id="fy-sil-btn" type="button" disabled title="Son atomu sil">
                            <svg class="ikon ikon-sm"><use href="#i-geri"/></svg>
                            <span>Sil son</span>
                        </button>
                        <button class="btn btn-ghost btn-sm" id="fy-sifirla-btn" type="button" disabled title="Tüm atomları temizle">
                            <svg class="ikon ikon-sm"><use href="#i-yenile"/></svg>
                            <span>Sıfırla</span>
                        </button>
                        <button class="btn btn-primary btn-sm fy-kontrol-btn" id="fy-kontrol-btn" type="button" disabled>
                            <svg class="ikon ikon-sm"><use href="#i-tik"/></svg>
                            <span>Cevabı Kontrol Et</span>
                        </button>
                    </div>
                </div>

                <!-- ATOM PALETİ (F5.4) -->
                <div class="fy-palet-panel">
                    <div class="fy-palet-baslik">Atom Paleti</div>
                    <div class="fy-palet" id="fy-palet"></div>
                </div>
            </div>
        `;

        // Buton event'leri
        document.getElementById('fy-sil-btn')?.addEventListener('click', () => this._atomSil());
        document.getElementById('fy-sifirla-btn')?.addEventListener('click', () => this._sifirla());
        document.getElementById('fy-kontrol-btn')?.addEventListener('click', () => this._kontrolEt());
        document.getElementById('fy-ipucu-btn')?.addEventListener('click', () => this._ipucuKullan());
    },

    /**
     * Bir sonraki bileşiği yükle.
     */
    _sonrakiBilesik() {
        if (this._bilesikIdx >= this._bilesikler.length) {
            this._oyunBitti();
            return;
        }

        this._aktifBilesik = this._bilesikler[this._bilesikIdx];
        this._kurulanAtomlar = [];
        this._ipucuKullanildi = 0;
        this._bilesikBaslangic = Date.now();
        this._bilesikIdx++;

        this._ustPanelGuncelle(this._aktifBilesik);
        this._paletKur(this._aktifBilesik);
        this._ortaPanelRender();
        this._butonStateGuncelle();
    },

    /**
     * Üst paneli güncelle: sayaç + yaygın ad + ipucu sayısı (F5.2).
     */
    _ustPanelGuncelle(bilesik) {
        const sayacEl     = document.getElementById('fy-sayac');
        const adEl        = document.getElementById('fy-bilesik-ad');
        const ipucuSayiEl = document.getElementById('fy-ipucu-sayi');

        if (sayacEl) sayacEl.textContent = `${this._bilesikIdx} / ${this._bilesikler.length}`;
        if (adEl) {
            adEl.textContent = bilesik.yayginAd;
            // Yeni bileşik için slide-up animasyonu
            adEl.classList.remove('animate-slide-up');
            void adEl.offsetWidth; // reflow trigger
            adEl.classList.add('animate-slide-up');
        }
        if (ipucuSayiEl) {
            ipucuSayiEl.textContent = (this._config.ipucuHakki === 99) ? '∞' : this._ipucuKalan;
        }
    },

    /**
     * Atom paletini kur: gereken + yanıltıcı atomlar (F5.4).
     */
    _paletKur(bilesik) {
        const gerekenSemboller = Object.keys(bilesik.atomlar);
        const yaniltici = this._yaniltici_sec(gerekenSemboller, this._config.yaniltici);
        const tumSemboller = karistir([...gerekenSemboller, ...yaniltici]);

        this._paletAtomlari = tumSemboller
            .map(s => bulElementBySembol(s))
            .filter(Boolean);

        const paletEl = document.getElementById('fy-palet');
        if (!paletEl) return;

        paletEl.innerHTML = this._paletAtomlari.map(el => `
            <button class="fy-atom-hucre fy-palet-hucre kat-${el.kategori}"
                    data-sembol="${el.sembol}"
                    type="button"
                    title="${el.ad}">
                <span class="fy-atom-no">${el.atomNo}</span>
                <span class="fy-atom-sembol">${el.sembol}</span>
            </button>
        `).join('');

        // Palet tıklama event'leri
        paletEl.querySelectorAll('.fy-palet-hucre').forEach(btn => {
            btn.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                if (typeof AnimationHelper !== 'undefined') AnimationHelper.pulse(btn);
                this._atomEkle(btn.dataset.sembol);
            });
        });
    },

    /**
     * Yanıltıcı atom seç (F5.4 — random).
     */
    _yaniltici_sec(gerekenAtomlar, sayi) {
        if (sayi <= 0) return [];
        const havuz = ELEMENTS
            .map(e => e.sembol)
            .filter(s => !gerekenAtomlar.includes(s));
        return karistir(havuz).slice(0, sayi);
    },

    // ─── Atom işlemleri (F5.5) ──────────────────────────────

    _atomEkle(sembol) {
        this._kurulanAtomlar.push(sembol);
        this._ortaPanelRender();
        this._butonStateGuncelle();
    },

    _atomSil() {
        if (this._kurulanAtomlar.length === 0) return;
        this._kurulanAtomlar.pop();
        this._ortaPanelRender();
        this._butonStateGuncelle();
        AudioManager.sesCal('butonTik');
    },

    _sifirla() {
        if (this._kurulanAtomlar.length === 0) return;
        this._kurulanAtomlar = [];
        this._ortaPanelRender();
        this._butonStateGuncelle();
        AudioManager.sesCal('butonTik');
    },

    /**
     * Orta paneli kurulan atomlardan yeniden render et.
     */
    _ortaPanelRender() {
        const kapsama = document.getElementById('fy-kurulan');
        if (!kapsama) return;

        if (this._kurulanAtomlar.length === 0) {
            kapsama.innerHTML = `<div class="fy-bos-durum">Aşağıdaki paletten atom seç</div>`;
            return;
        }

        kapsama.innerHTML = this._kurulanAtomlar.map((sembol, idx) => {
            const el = bulElementBySembol(sembol);
            if (!el) return '';
            return `
                <div class="fy-atom-hucre fy-orta-hucre kat-${el.kategori}" data-idx="${idx}">
                    <span class="fy-atom-no">${el.atomNo}</span>
                    <span class="fy-atom-sembol">${el.sembol}</span>
                </div>
            `;
        }).join('');
    },

    /**
     * Buton state'leri (Sil/Sıfırla/Kontrol Et + İpucu) güncelle.
     */
    _butonStateGuncelle() {
        const bos = this._kurulanAtomlar.length === 0;
        const sil      = document.getElementById('fy-sil-btn');
        const sifirla  = document.getElementById('fy-sifirla-btn');
        const kontrol  = document.getElementById('fy-kontrol-btn');
        if (sil)     sil.disabled     = bos;
        if (sifirla) sifirla.disabled = bos;
        if (kontrol) kontrol.disabled = bos;

        const ipucuBtn = document.getElementById('fy-ipucu-btn');
        if (ipucuBtn) {
            ipucuBtn.disabled = (this._config.ipucuHakki !== 99 && this._ipucuKalan <= 0);
        }
    },

    /**
     * Array → Object dönüşümü (cevap kontrolü için — F5.7).
     * ['H', 'H', 'O'] → { H: 2, O: 1 }
     */
    _atomlariObjeyeCevir(atomDizisi) {
        const obj = {};
        for (const s of atomDizisi) {
            obj[s] = (obj[s] || 0) + 1;
        }
        return obj;
    },

    // ─── STUB'lar (sonraki adımlarda detaylanacak) ───────────

    /**
     * Cevap kontrol akışı (F5.7) — doğru/yanlış branch dağıtıcı.
     */
    _kontrolEt() {
        if (!this._aktifBilesik || this._kurulanAtomlar.length === 0) return;

        const kurulan = this._atomlariObjeyeCevir(this._kurulanAtomlar);
        const dogru = formulDogruMu(this._aktifBilesik.id, kurulan);

        if (dogru) this._dogruCevap();
        else       this._yanlisCevap(kurulan);
    },

    /**
     * Doğru cevap akışı (F5.7).
     * - Combo tetikle, puan ekle, keşif, ses
     * - Orta panel flash + +N float
     * - 800ms sonra sonraki bileşiğe geç (F5.8'de BaglamKarti ile genişler)
     */
    _dogruCevap() {
        this._comboTetikle();
        const ekPuan = this._puanHesapla();
        this._skor += ekPuan;
        this._dogruSayisi++;
        this._dogruBilinenler.add(this._aktifBilesik.id);
        KesifManager.bilesikKesfet(this._aktifBilesik.id);

        // Ses (combo-bazlı)
        if (this._combo >= 3)        AudioManager.sesCal('combo3plus');
        else if (this._combo === 2)  AudioManager.sesCal('combo2');
        else                         AudioManager.sesCal('dogru');

        // HUD skor
        if (typeof HUD !== 'undefined') HUD.setSkor(this._skor);

        // Orta panel hücrelerine flash success + +N float
        const ortaIcerik = document.querySelector('.fy-orta-icerik');
        document.querySelectorAll('.fy-orta-hucre').forEach(h => {
            if (typeof AnimationHelper !== 'undefined') AnimationHelper.flashSuccess(h);
        });
        if (ortaIcerik && typeof AnimationHelper !== 'undefined') {
            AnimationHelper.floatNumber(ortaIcerik, `+${ekPuan}`, { renk: 'var(--color-success)' });
        }

        // Sonuç kaydı (F5.11 için)
        const sureSn = Math.max(0, Math.floor((Date.now() - this._bilesikBaslangic) / 1000));
        this._sonucKayit.push({
            bilesikId: this._aktifBilesik.id,
            bilesikFormul: this._aktifBilesik.formul,
            bilesikYayginAd: this._aktifBilesik.yayginAd,
            dogru: true,
            ipucuKullanildi: this._ipucuKullanildi,
            sureSn,
            puan: ekPuan
        });

        // 800ms sonra BaglamKarti aç; kapatılınca sonraki bileşiğe geç (F5.8)
        setTimeout(() => {
            if (typeof BaglamKarti !== 'undefined' && typeof BaglamKarti.acBilesik === 'function') {
                BaglamKarti.acBilesik(this._aktifBilesik, {
                    onKapat: () => this._sonrakiBilesik()
                });
            } else {
                this._sonrakiBilesik();
            }
        }, 800);
    },

    /**
     * Yanlış cevap akışı (F5.7).
     * - Combo sıfırla, _yanlisSayisi++
     * - formulHataAnaliz ile karistirma kaydı
     * - Shake animasyonu + ses + kısa toast
     * - STATE SİLİNMEZ — öğrenci düzelter
     */
    _yanlisCevap(kurulanObj) {
        this._comboSifirla();

        const analiz = formulHataAnaliz(this._aktifBilesik.id, kurulanObj);
        this._karistirmalar.push({
            bilesikId: this._aktifBilesik.id,
            bilesikFormul: this._aktifBilesik.formul,
            hataTipi: analiz.hata,
            detay: analiz.detay
        });
        this._yanlisSayisi++;

        AudioManager.sesCal('yanlis');
        const ortaIcerik = document.querySelector('.fy-orta-icerik');
        if (ortaIcerik && typeof AnimationHelper !== 'undefined') {
            AnimationHelper.shake(ortaIcerik);
        }

        // F5.9: hata tipine göre pedagojik mesaj (formulHataAnaliz.detay)
        this._hataToast(analiz.detay || 'Yanlış formül — düzelt ve tekrar dene');
    },

    /**
     * Combo artır (max 5). Element Avı ile aynı formül.
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

    /**
     * Puan hesabı: base + combo + süre bonusu × zorluk çarpanı - ipucu cezası.
     * Element Avı puan formülü ile uyumlu.
     */
    _puanHesapla() {
        const ZORLUK_CARPANI = { kolay: 1.0, orta: 1.25, zor: 1.5, uzman: 2.0 };
        const carpan = ZORLUK_CARPANI[this._zorluk] || 1.0;

        const basePuan = 100;
        const comboBonus = this._combo > 1 ? this._combo * 25 : 0;

        // Hızlı çözüm bonusu: 30sn altında çözüm = ek puan
        const sureSn = Math.max(0, Math.floor((Date.now() - this._bilesikBaslangic) / 1000));
        const sureBonus = Math.max(0, Math.round((30 - sureSn) * 2));

        // İpucu cezası
        const ipucuCezasi = this._ipucuKullanildi * 15;

        return Math.max(0, Math.round((basePuan + comboBonus + sureBonus) * carpan - ipucuCezasi));
    },

    /**
     * Eksik (henüz eklenmemiş) doğru atom sembollerini bul.
     * Örn: H₂O için kurulan [H] ise dönen ['H', 'O'] (1 H + O eksik).
     */
    _eksikAtomlariBul() {
        if (!this._aktifBilesik) return [];
        const gereken = this._aktifBilesik.atomlar;
        const kurulan = this._atomlariObjeyeCevir(this._kurulanAtomlar);
        const eksik = [];
        for (const [sembol, sayi] of Object.entries(gereken)) {
            const koyulan = kurulan[sembol] || 0;
            if (koyulan < sayi) eksik.push(sembol);
        }
        return eksik;
    },

    /**
     * Mor toast göster (üst-orta, 2 saniye). İpucu mesajları için (F5.6).
     */
    _ipucuToast(mesaj) {
        // Mevcut toast'u kaldır
        document.querySelectorAll('.fy-toast').forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = 'fy-toast';
        toast.innerHTML = `
            <svg class="ikon ikon-sm"><use href="#i-ampul"/></svg>
            <span>${mesaj}</span>
        `;
        document.body.appendChild(toast);

        // 1.8sn sonra exit animasyonu, 2.2sn'de DOM'dan kaldır
        setTimeout(() => toast.classList.add('fy-toast-exit'), 1800);
        setTimeout(() => toast.remove(), 2200);
    },

    /**
     * Kırmızı hata toast'ı göster (üst-orta, 3.5 saniye). Pedagojik mesaj için (F5.9).
     */
    _hataToast(mesaj) {
        document.querySelectorAll('.fy-toast').forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = 'fy-toast fy-toast-hata';
        toast.innerHTML = `
            <svg class="ikon ikon-sm"><use href="#i-uyari"/></svg>
            <span>${mesaj}</span>
        `;
        document.body.appendChild(toast);

        // 3.3sn sonra exit, 3.7sn'de DOM'dan kaldır
        setTimeout(() => toast.classList.add('fy-toast-exit'), 3300);
        setTimeout(() => toast.remove(), 3700);
    },

    /**
     * İpucu kullan (F5.6) — Seçenek A: görsel vurgu + toast + skor cezası.
     * - Eksik atomlardan birini palette'de mor pulse ile vurgular
     * - Toast: "💡 'X' atomunu kullan"
     * - İpucu sayacı -1 (kolayda ∞ → değişmez ama _ipucuKullanildi sayılır)
     */
    _ipucuKullan() {
        if (!this._aktifBilesik) return;
        // Hak bitti mi?
        if (this._config.ipucuHakki !== 99 && this._ipucuKalan <= 0) return;

        const eksik = this._eksikAtomlariBul();

        if (eksik.length === 0) {
            // Tüm doğru atomlar var ama yanlışlar olabilir
            this._ipucuToast('Tüm gerekli atomlar var — fazla atomu sil');
            AudioManager.sesCal('butonTik');
            return;
        }

        // Rastgele bir eksik atomu seç
        const isaretliSembol = rastgeleSec(eksik);

        // İpucu hakkını düş (kolayda 99 = sınırsız, dokunma)
        if (this._config.ipucuHakki !== 99) {
            this._ipucuKalan--;
        }
        this._ipucuKullanildi++;
        this._ipucuToplamKullanildi++;

        // Skor cezası (F5.10'da detaylanacak — şimdilik kayıt)
        this._skor = Math.max(0, this._skor - 15);
        if (typeof HUD !== 'undefined') HUD.setSkor(this._skor);

        // Palette'deki hücreye pulse vurgusu
        const paletHucre = document.querySelector(
            `.fy-palet-hucre[data-sembol="${isaretliSembol}"]`
        );
        if (paletHucre) {
            paletHucre.classList.remove('fy-ipucu-vurgu');
            void paletHucre.offsetWidth; // reflow trigger
            paletHucre.classList.add('fy-ipucu-vurgu');
            setTimeout(() => paletHucre.classList.remove('fy-ipucu-vurgu'), 2000);
        }

        // Toast mesaj
        this._ipucuToast(`"${isaretliSembol}" atomunu kullan`);
        AudioManager.sesCal('butonTik');

        // UI sayacını ve buton state'i güncelle
        const ipucuSayiEl = document.getElementById('fy-ipucu-sayi');
        if (ipucuSayiEl) {
            ipucuSayiEl.textContent = (this._config.ipucuHakki === 99) ? '∞' : this._ipucuKalan;
        }
        this._butonStateGuncelle();
    },

    /**
     * Oyun bittiğinde sonuç ekranını render et + skor/istatistik kayıt + rozet (F5.11).
     */
    _oyunBitti() {
        if (typeof HUD !== 'undefined') HUD.sureDurdur();
        if (this._sureTimer) {
            clearInterval(this._sureTimer);
            this._sureTimer = null;
        }

        const gecenSure = Math.max(1, Math.floor((Date.now() - this._baslangicZamani) / 1000));

        // Doğru kurulanlar
        const dogruBilesikler = Array.from(this._dogruBilinenler)
            .map(id => bulBilesikById(id))
            .filter(Boolean);

        // Zorlandıklar: doğru bilinmemiş bileşikler için son yanlış kaydı
        const zorlananMap = new Map();
        for (const k of this._karistirmalar) {
            zorlananMap.set(k.bilesikId, k);
        }
        const zorlananlar = Array.from(zorlananMap.values())
            .filter(k => !this._dogruBilinenler.has(k.bilesikId));

        // Skor + İstatistik kayıt
        const yeniRekor = ScoreManager.saveScore(
            MODUL_IDS.FORMUL_YAPBOZ,
            this._zorluk,
            this._skor,
            gecenSure
        );
        StatManager.recordGame(
            MODUL_IDS.FORMUL_YAPBOZ,
            gecenSure,
            this._dogruSayisi,
            this._yanlisSayisi,
            {},  // kategori istatistikleri — FAZ 6'da
            []   // karistirmalar formatı StatManager ile uyumsuz — bileşik bazlı kayıt _sonucKayit'ta tutuluyor
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
            toplamBilesik: this._bilesikler.length,
            ogrenilen: dogruBilesikler,
            zorlananlar,
            yeniRekor,
            zorluk: this._zorluk
        });

        SahneManager.go('sonuc-ekran');
        // Rozet tetikleyici 1.2sn sonra (animasyonlar bitsin)
        setTimeout(() => this._rozetleriKontrol(gecenSure), 1200);
    },

    /**
     * Formül Yapboz sonuç ekranı render.
     */
    _sonucEkrani(data) {
        const ekran = document.getElementById('sonuc-ekran');
        if (!ekran) return;

        const ilerleme = KesifManager.getIlerleme();
        const basariYuzdesi = data.toplamBilesik > 0
            ? Math.round((data.dogruSayi / data.toplamBilesik) * 100)
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
                        ${MODUL_ADLAR_TR[MODUL_IDS.FORMUL_YAPBOZ]}
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
                        <span class="sonuc-stat-deger tabular">${data.dogruSayi}/${data.toplamBilesik}</span>
                    </div>
                    <div class="sonuc-stat">
                        <span class="sonuc-stat-etiket">Başarı</span>
                        <span class="sonuc-stat-deger tabular">%${basariYuzdesi}</span>
                    </div>
                </div>

                <section class="sonuc-bolum">
                    <h2 class="sonuc-bolum-baslik">
                        <svg class="ikon ikon-sm ikon-marka"><use href="#i-molekul"/></svg>
                        Doğru kurduğun bileşikler (${data.ogrenilen.length})
                    </h2>
                    ${data.ogrenilen.length === 0 ? `
                        <p class="text-secondary" style="text-align:center; padding:var(--space-4);">
                            Bu oyunda hiç doğru bileşik kuramadın — tekrar dene!
                        </p>
                    ` : `
                        <div class="sonuc-ogrenilen-grid">
                            ${data.ogrenilen.map(b => `
                                <div class="sonuc-ogrenilen-kart sonuc-bilesik-kart kat-bilesik-${b.kategori}">
                                    <div class="sonuc-bilesik-formul">${b.formul}</div>
                                    <div class="sonuc-bilesik-ad">${b.ad}</div>
                                    ${b.yayginAd && b.yayginAd !== b.ad ? `<div class="sonuc-bilesik-yaygin">"${b.yayginAd}"</div>` : ''}
                                    <p class="sonuc-bilesik-baglam">${b.baglam}</p>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </section>

                ${data.zorlananlar.length > 0 ? `
                    <section class="sonuc-bolum">
                        <h2 class="sonuc-bolum-baslik">
                            <svg class="ikon ikon-sm ikon-marka"><use href="#i-uyari"/></svg>
                            Zorlandığın bileşikler (${data.zorlananlar.length})
                        </h2>
                        <div class="sonuc-zorlanan-liste">
                            ${data.zorlananlar.map(k => `
                                <div class="sonuc-zorlanan-kart">
                                    <span class="sonuc-zorlanan-formul">${k.bilesikFormul}</span>
                                    <span class="sonuc-zorlanan-detay">${k.detay}</span>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <section class="sonuc-bolum">
                    <h2 class="sonuc-bolum-baslik">
                        <svg class="ikon ikon-sm ikon-marka"><use href="#i-rozet"/></svg>
                        Genel İlerleme
                    </h2>
                    <div class="progress-label">
                        <span>${ilerleme.bilesikler.kesfedilen} / ${ilerleme.bilesikler.toplam} bileşik keşfettin</span>
                        <span class="tabular">%${ilerleme.bilesikler.yuzde}</span>
                    </div>
                    <div class="progress">
                        <div class="progress-fill" style="width: ${ilerleme.bilesikler.yuzde}%"></div>
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

        ekran.querySelectorAll('[data-sonuc-aksiyon]').forEach(btn => {
            btn.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                const aksiyon = btn.dataset.sonucAksiyon;
                if (aksiyon === 'tekrar') {
                    SahneManager.modulBaslat(MODUL_IDS.FORMUL_YAPBOZ, data.zorluk);
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
     * Formül Yapboz rozetlerini kontrol et (F5.11).
     */
    _rozetleriKontrol(gecenSure) {
        const yeniRozetler = [];

        // 1) İlk Bileşik
        if (AchievementManager.unlock('m3-ilk-bilesik')) {
            yeniRozetler.push('m3-ilk-bilesik');
        }

        // 2) İpucusuz — hiç ipucu kullanılmadıysa + tüm bileşikler doğru
        if (this._ipucuToplamKullanildi === 0 && this._dogruSayisi === this._bilesikler.length) {
            if (AchievementManager.unlock('m3-ipucusuz')) {
                yeniRozetler.push('m3-ipucusuz');
            }
        }

        // 3) Asit-Baz Bilgini — oyunda asit veya baz varsa hepsi doğru
        const asitBazBilesikleri = this._bilesikler.filter(b =>
            b.kategori === 'asit' || b.kategori === 'baz'
        );
        const tumAsitBazDogru = asitBazBilesikleri.length > 0 &&
            asitBazBilesikleri.every(b => this._dogruBilinenler.has(b.id));
        if (tumAsitBazDogru) {
            if (AchievementManager.unlock('m3-asit-baz')) {
                yeniRozetler.push('m3-asit-baz');
            }
        }

        // 4) Doğa Dostu — H₂O, CO₂, O₂, NH₃ (bu oyunda var olanlar) hepsi doğru
        const dogaBilesikleri = ['h2o', 'co2', 'o2', 'nh3'];
        const buOyundakiDoga = dogaBilesikleri.filter(id =>
            this._bilesikler.some(b => b.id === id)
        );
        const tumDogaDogru = buOyundakiDoga.length > 0 &&
            buOyundakiDoga.every(id => this._dogruBilinenler.has(id));
        if (tumDogaDogru) {
            if (AchievementManager.unlock('m3-doga-dostu')) {
                yeniRozetler.push('m3-doga-dostu');
            }
        }

        // 5) Yapboz Şampiyonu — FAZ 6 yıldız sistemi ile

        if (yeniRozetler.length > 0) {
            RozetBildirim.goster(yeniRozetler);
        }
    },

    /**
     * Uzman modda geri sayım sayacı.
     */
    _geriSayimBaslat() {
        if (typeof HUD !== 'undefined') HUD.sureDurdur();
        this._kalanSure = this._config.sureLimitiSn;
        if (typeof HUD !== 'undefined') HUD.setSure(this._kalanSure);

        this._sureTimer = setInterval(() => {
            this._kalanSure--;
            if (typeof HUD !== 'undefined') HUD.setSure(this._kalanSure);

            // Son 10sn'de görsel uyarı (F5.10)
            if (this._kalanSure <= 10 && this._kalanSure > 0) {
                const sureKap = document.querySelector('.hud-sure');
                if (sureKap && typeof AnimationHelper !== 'undefined') {
                    AnimationHelper.pulse(sureKap);
                }
            }

            if (this._kalanSure <= 0) {
                clearInterval(this._sureTimer);
                this._sureTimer = null;
                this._oyunBitti();
            }
        }, 1000);
    }
};

// SahneManager kayıt (F2.3 dispatcher)
window.modulleriBaslat = window.modulleriBaslat || {};
window.modulleriBaslat.formulYapboz = (zorluk) => FormulYapboz.baslat(zorluk);

console.log('✅ Modül 3 (Formül Yapboz) iskeleti yüklendi');
