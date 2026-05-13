// ============================================================
//  ELEMENTRA v2 — game/ortak.js
//  Tüm modüllerin paylaştığı yardımcı sınıflar ve sabitler
//
//  Bölüm 1: StorageManager       (F1.6 — localStorage CRUD)
//  Bölüm 2: ScoreManager         (F1.6 — Yüksek skor)
//  Bölüm 3: KesifManager         (F1.6 — Keşfedilen öğeler)
//  Bölüm 4: StatManager          (F1.6 — Genel istatistik)
//  Bölüm 5: AchievementManager   (F1.6 — Başarımlar)
//  Bölüm 6: AudioManager         (F1.7 — Ses + müzik)
//  Bölüm 7: AnimationHelper      (F1.8 — Animasyon yard.)
//  Bölüm 8: EventDispatcher      (F1.9 — Klavye + touch)
//  Bölüm 9: SahneManager         (F2.3 — Ekran geçişleri)
// ============================================================

'use strict';

// ============================================================
//  SABİT ANAHTARLAR
// ============================================================
const STORAGE_PREFIX = 'elementra_v2_';

const STORAGE_KEYS = {
    SCORES:       'scores',
    STATS:        'stats',
    KESFEDILEN:   'kesfedilen',
    ACHIEVEMENTS: 'achievements',
    AUDIO:        'audio',
    SETTINGS:     'settings',
    ADMIN_PWD:    'admin_pwd',
    ZORLUK_SON:   'zorluk_son',
    DIL:          'dil'           // İleride genişleme için (şu an TR sabit)
};

const MODUL_IDS = {
    ELEMENT_AVI:        'elementAvi',
    SEMBOL_ESLESTIRME:  'sembolEslestirme',
    FORMUL_YAPBOZ:      'formulYapboz'
};

const ZORLUK_IDS = {
    KOLAY:  'kolay',
    ORTA:   'orta',
    ZOR:    'zor',
    UZMAN:  'uzman'
};

const ZORLUK_ADLAR_TR = {
    kolay: 'Kolay',
    orta:  'Orta',
    zor:   'Zor',
    uzman: 'Uzman'
};

const MODUL_ADLAR_TR = {
    elementAvi:        'Element Avı',
    sembolEslestirme:  'Sembol Eşleştirme',
    formulYapboz:      'Formül Yapboz'
};

// ============================================================
//  BÖLÜM 1: STORAGE MANAGER
//  localStorage'a güvenli erişim, JSON serialize/parse
// ============================================================
const StorageManager = {
    /**
     * Veri okuma — varsayılan değer ile güvenli.
     * @param {string} key - STORAGE_KEYS'ten biri
     * @param {*} defaultValue - Veri yoksa dönecek
     * @returns {*} JSON parse edilmiş veri veya defaultValue
     */
    read(key, defaultValue = null) {
        try {
            const raw = localStorage.getItem(STORAGE_PREFIX + key);
            if (raw === null) return defaultValue;
            return JSON.parse(raw);
        } catch (e) {
            console.error('StorageManager.read hatası:', key, e);
            return defaultValue;
        }
    },

    /**
     * Veri yazma.
     * @param {string} key - STORAGE_KEYS'ten biri
     * @param {*} value - JSON-serializable veri
     * @returns {boolean} Başarı durumu
     */
    write(key, value) {
        try {
            localStorage.setItem(
                STORAGE_PREFIX + key,
                JSON.stringify(value)
            );
            return true;
        } catch (e) {
            console.error('StorageManager.write hatası:', key, e);
            return false;
        }
    },

    /**
     * Belirli bir anahtarı sil.
     */
    clear(key) {
        try {
            localStorage.removeItem(STORAGE_PREFIX + key);
            return true;
        } catch (e) {
            console.error('StorageManager.clear hatası:', key, e);
            return false;
        }
    },

    /**
     * Tüm ELEMENTRA verilerini sil (yönetici "tümünü sıfırla").
     */
    clearAll() {
        try {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith(STORAGE_PREFIX)) keys.push(k);
            }
            keys.forEach(k => localStorage.removeItem(k));
            return true;
        } catch (e) {
            console.error('StorageManager.clearAll hatası:', e);
            return false;
        }
    },

    /**
     * Yönetici panelinden kategorik sıfırlama.
     * @param {string} category - 'scores' | 'stats' | 'achievements' | 'all'
     */
    clearCategory(category) {
        switch (category) {
            case 'all':
                return this.clearAll();
            case 'scores':
                return this.clear(STORAGE_KEYS.SCORES);
            case 'stats':
                this.clear(STORAGE_KEYS.STATS);
                this.clear(STORAGE_KEYS.KESFEDILEN);
                return true;
            case 'achievements':
                return this.clear(STORAGE_KEYS.ACHIEVEMENTS);
            default:
                console.warn('Bilinmeyen kategori:', category);
                return false;
        }
    },

    /**
     * Tüm veriyi tek JSON nesnesinde döndür (yönetici dışa aktarma).
     */
    exportAll() {
        const data = {};
        Object.keys(STORAGE_KEYS).forEach(k => {
            const val = this.read(STORAGE_KEYS[k]);
            if (val !== null) data[STORAGE_KEYS[k]] = val;
        });
        return data;
    },

    /**
     * localStorage erişilebilir mi? (incognito mod kontrolü)
     */
    available() {
        try {
            const test = '__elementra_test__';
            localStorage.setItem(test, 'x');
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * ELEMENTRA verilerinin toplam boyutu (byte cinsinden).
     */
    getSize() {
        let total = 0;
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith(STORAGE_PREFIX)) {
                    total += (localStorage.getItem(k)?.length || 0) + k.length;
                }
            }
        } catch (e) {
            console.error('StorageManager.getSize hatası:', e);
        }
        return total;
    }
};


// ============================================================
//  BÖLÜM 2: SCORE MANAGER
//  Yüksek skorlar (modül × zorluk için top 5)
// ============================================================
const ScoreManager = {
    /**
     * Yeni skor kaydet, top 5 listede tut.
     * @returns {boolean} Yeni rekor mu?
     */
    saveScore(modul, zorluk, skor, sure) {
        const scores = StorageManager.read(STORAGE_KEYS.SCORES, {});
        if (!scores[modul]) scores[modul] = {};
        if (!scores[modul][zorluk]) scores[modul][zorluk] = [];

        const oncekiEnYuksek = scores[modul][zorluk][0]?.skor || 0;

        scores[modul][zorluk].push({
            skor: skor,
            sure: sure,
            tarih: new Date().toISOString()
        });

        // Skor azalan sırada, top 5
        scores[modul][zorluk].sort((a, b) => b.skor - a.skor);
        scores[modul][zorluk] = scores[modul][zorluk].slice(0, 5);

        StorageManager.write(STORAGE_KEYS.SCORES, scores);

        // Bu skor yeni rekor mu?
        return skor > oncekiEnYuksek;
    },

    /**
     * Belirli modül × zorluk için top 5 skor listesi.
     */
    getTop5(modul, zorluk) {
        const scores = StorageManager.read(STORAGE_KEYS.SCORES, {});
        return scores[modul]?.[zorluk] || [];
    },

    /**
     * Belirli modül × zorluk için en yüksek skor.
     */
    getBest(modul, zorluk) {
        const list = this.getTop5(modul, zorluk);
        return list[0] || null;
    },

    /**
     * Tüm yüksek skorlar matrisi (profil sayfası için).
     * @returns {Object} { modulId: { zorlukId: skor|null } }
     */
    getMatrix() {
        const scores = StorageManager.read(STORAGE_KEYS.SCORES, {});
        const matrix = {};
        Object.values(MODUL_IDS).forEach(modul => {
            matrix[modul] = {};
            Object.values(ZORLUK_IDS).forEach(zorluk => {
                matrix[modul][zorluk] = scores[modul]?.[zorluk]?.[0]?.skor || null;
            });
        });
        return matrix;
    }
};


// ============================================================
//  BÖLÜM 3: KESIF MANAGER
//  Keşfedilen element ve bileşikler (mini ansiklopedi)
// ============================================================
const KesifManager = {
    getDefaults() {
        return { elementler: [], bilesikler: [] };
    },

    get() {
        return StorageManager.read(STORAGE_KEYS.KESFEDILEN, this.getDefaults());
    },

    /**
     * Element keşfet (en az 1 kez doğru cevap verildiyse).
     * @returns {boolean} Yeni keşif mi?
     */
    elementKesfet(sembol) {
        const data = this.get();
        if (!data.elementler.includes(sembol)) {
            data.elementler.push(sembol);
            StorageManager.write(STORAGE_KEYS.KESFEDILEN, data);
            return true;
        }
        return false;
    },

    bilesikKesfet(id) {
        const data = this.get();
        if (!data.bilesikler.includes(id)) {
            data.bilesikler.push(id);
            StorageManager.write(STORAGE_KEYS.KESFEDILEN, data);
            return true;
        }
        return false;
    },

    isElementKesfedilmis(sembol) {
        return this.get().elementler.includes(sembol);
    },

    isBilesikKesfedilmis(id) {
        return this.get().bilesikler.includes(id);
    },

    /**
     * İlerleme istatistikleri (modül kartları + profil için).
     */
    getIlerleme() {
        const data = this.get();
        return {
            elementler: {
                kesfedilen: data.elementler.length,
                toplam: 36,
                yuzde: Math.round((data.elementler.length / 36) * 100)
            },
            bilesikler: {
                kesfedilen: data.bilesikler.length,
                toplam: 24,
                yuzde: Math.round((data.bilesikler.length / 24) * 100)
            }
        };
    }
};


// ============================================================
//  BÖLÜM 4: STAT MANAGER
//  Genel istatistikler (yansıtma anı + profil + kategori başarısı)
// ============================================================
const StatManager = {
    getDefaults() {
        return {
            toplamOyun: 0,
            toplamSure: 0,           // saniye
            toplamDogru: 0,
            toplamYanlis: 0,
            modulIstatistik: {
                elementAvi:       { oyun: 0, dogru: 0, yanlis: 0 },
                sembolEslestirme: { oyun: 0, dogru: 0, yanlis: 0 },
                formulYapboz:     { oyun: 0, dogru: 0, yanlis: 0 }
            },
            kategoriIstatistik: {},  // Dinamik: alkali, halojen, geçiş vb.
            karistirmalar: []        // [{ yanlis, dogru, sayi }]
        };
    },

    get() {
        return StorageManager.read(STORAGE_KEYS.STATS, this.getDefaults());
    },

    save(stats) {
        return StorageManager.write(STORAGE_KEYS.STATS, stats);
    },

    /**
     * Oyun tamamlandığında istatistikleri kayıt et.
     * @param {string} modul - MODUL_IDS değerlerinden biri
     * @param {number} sure - Saniye
     * @param {number} dogru - Doğru cevap sayısı
     * @param {number} yanlis - Yanlış cevap sayısı
     * @param {Object} kategoriler - { katAdi: {dogru: N, yanlis: M} }
     * @param {Array} karistirmalar - [{yanlis: 'Mg', dogru: 'Mn'}]
     */
    recordGame(modul, sure, dogru, yanlis, kategoriler = {}, karistirmalar = []) {
        const stats = this.get();

        stats.toplamOyun++;
        stats.toplamSure += sure;
        stats.toplamDogru += dogru;
        stats.toplamYanlis += yanlis;

        if (stats.modulIstatistik[modul]) {
            stats.modulIstatistik[modul].oyun++;
            stats.modulIstatistik[modul].dogru += dogru;
            stats.modulIstatistik[modul].yanlis += yanlis;
        }

        // Kategori istatistikleri
        Object.keys(kategoriler).forEach(kat => {
            if (!stats.kategoriIstatistik[kat]) {
                stats.kategoriIstatistik[kat] = { dogru: 0, yanlis: 0 };
            }
            stats.kategoriIstatistik[kat].dogru  += kategoriler[kat].dogru  || 0;
            stats.kategoriIstatistik[kat].yanlis += kategoriler[kat].yanlis || 0;
        });

        // Karıştırılan çift kayıtları (Mg/Mn, C/Ca vb.)
        karistirmalar.forEach(({ yanlis, dogru }) => {
            const mevcut = stats.karistirmalar.find(
                k => k.yanlis === yanlis && k.dogru === dogru
            );
            if (mevcut) {
                mevcut.sayi++;
            } else {
                stats.karistirmalar.push({ yanlis, dogru, sayi: 1 });
            }
        });

        return this.save(stats);
    },

    /**
     * Yansıtma anı için en zayıf 3 kategori.
     */
    enZayifKategoriler(n = 3) {
        const stats = this.get();
        const sirala = Object.entries(stats.kategoriIstatistik)
            .map(([kat, v]) => {
                const toplam = v.dogru + v.yanlis;
                return {
                    kategori: kat,
                    yuzde: toplam > 0 ? Math.round((v.dogru / toplam) * 100) : 0,
                    toplam
                };
            })
            .filter(k => k.toplam >= 3)  // En az 3 deneme şartı
            .sort((a, b) => a.yuzde - b.yuzde)
            .slice(0, n);
        return sirala;
    },

    /**
     * En çok karıştırılan 5 çift (yansıtma anı için).
     */
    enCokKaristirilan(n = 5) {
        const stats = this.get();
        return [...stats.karistirmalar]
            .sort((a, b) => b.sayi - a.sayi)
            .slice(0, n);
    },

    /**
     * Genel başarı yüzdesi.
     */
    genelBasari() {
        const stats = this.get();
        const toplam = stats.toplamDogru + stats.toplamYanlis;
        return toplam > 0 ? Math.round((stats.toplamDogru / toplam) * 100) : 0;
    }
};


// ============================================================
//  BÖLÜM 5: ACHIEVEMENT MANAGER
//  20 başarım (E.2'de onaylı) — kazanılma izleme
// ============================================================
const AchievementManager = {
    get() {
        return StorageManager.read(STORAGE_KEYS.ACHIEVEMENTS, {});
    },

    isUnlocked(achievementId) {
        const data = this.get();
        return Boolean(data[achievementId]);
    },

    /**
     * Başarım aç. Sadece henüz açılmamışsa kaydeder.
     * @returns {boolean} Yeni açıldı mı?
     */
    unlock(achievementId) {
        if (this.isUnlocked(achievementId)) return false;
        const data = this.get();
        data[achievementId] = new Date().toISOString();
        StorageManager.write(STORAGE_KEYS.ACHIEVEMENTS, data);
        return true;
    },

    /**
     * Toplam kazanılan başarım sayısı.
     */
    getCount() {
        return Object.keys(this.get()).length;
    },

    /**
     * Kazanılma tarihiyle başarım listesi (en yeni önce).
     */
    getList() {
        const data = this.get();
        return Object.entries(data)
            .map(([id, tarih]) => ({ id, tarih }))
            .sort((a, b) => b.tarih.localeCompare(a.tarih));
    }
};


// ============================================================
//  BÖLÜM 6: AUDIO MANAGER
//  Ses efektleri + müzik + mute kontrolü (D.2 + D.3 + D.4)
// ============================================================

const SES_DOSYALARI = {
    dogru:        'assets/sesler/dogru.mp3',
    yanlis:       'assets/sesler/yanlis.mp3',
    combo2:       'assets/sesler/combo2.mp3',
    combo3plus:   'assets/sesler/combo3plus.mp3',
    seviyeAtlama: 'assets/sesler/seviye-atlama.mp3',
    rekor:        'assets/sesler/rekor.mp3',
    butonTik:     'assets/sesler/buton-tik.mp3',
    kartDondur:   'assets/sesler/kart-dondur.mp3'
};

const MUZIK_DOSYALARI = {
    menu:  'assets/muzikler/menu.mp3',     // Ana menü
    oyun:  'assets/muzikler/oyun.mp3',     // 3 modülde oyun esnasında
    zafer: 'assets/muzikler/zafer.mp3'     // Oyun sonu kazanma
};

const AudioManager = {
    // ─── Durum ────────────────────────────────
    _sesPool: {},         // sesAdi → Audio şablon nesne (preload)
    _dosyaMevcut: {},     // sesAdi → boolean (asset başarıyla yüklendi mi?)
    _mevcutMuzik: null,   // çalan Audio nesnesi
    _muzikAdi: null,      // çalan müziğin adı
    _ayarlar: null,       // { muted, master, music, sfx }
    _baslatildi: false,   // Browser autoplay engelini geçtik mi?
    _initialized: false,
    _webAudioCtx: null,   // Web Audio API fallback (F7.5)

    /**
     * Modülü ilk yüklemede çağrılır.
     * Sesleri preload eder, ayarları yükler.
     */
    init() {
        if (this._initialized) return;

        this._ayarlar = StorageManager.read(STORAGE_KEYS.AUDIO, {
            muted: false,
            master: 70,
            music: 30,
            sfx: 80
        });

        // Sesleri preload (kullanıcı etkileşiminden önce sadece şablon hazırlar)
        Object.keys(SES_DOSYALARI).forEach(ad => {
            const a = new Audio(SES_DOSYALARI[ad]);
            a.preload = 'auto';
            this._dosyaMevcut[ad] = false;
            a.addEventListener('canplaythrough', () => {
                this._dosyaMevcut[ad] = true;
            }, { once: true });
            // Dosya bulunamazsa sessizce gözardı et (Web Audio fallback devreye girer)
            a.addEventListener('error', () => {
                console.debug(`Ses dosyası yok, Web Audio fallback aktif: ${ad}`);
            }, { once: true });
            this._sesPool[ad] = a;
        });

        this._initialized = true;
    },

    /**
     * Web Audio API context'i lazy oluştur (F7.5).
     * Kullanıcı etkileşiminden sonra çağrılır (autoplay engeli geçer).
     */
    _getWebAudioCtx() {
        if (this._webAudioCtx) return this._webAudioCtx;
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return null;
            this._webAudioCtx = new Ctx();
        } catch (e) {
            console.debug('Web Audio API başlatılamadı:', e.message);
            return null;
        }
        return this._webAudioCtx;
    },

    /**
     * Programatik fallback ses üretir (F7.5).
     * Her ses tipinde farklı karakteristik (frekans + dalga + envelope).
     */
    _webAudioCal(sesAdi) {
        const ctx = this._getWebAudioCtx();
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const volume = (this._ayarlar.master / 100) * (this._ayarlar.sfx / 100) * 0.3;
        const now = ctx.currentTime;

        const tone = (freq, dur, type = 'sine', vol = 1, offset = 0) => {
            const t0 = now + offset;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, t0);
            gain.gain.setValueAtTime(0, t0);
            gain.gain.linearRampToValueAtTime(volume * vol, t0 + 0.008);
            gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t0);
            osc.stop(t0 + dur + 0.02);
        };

        const sweep = (f1, f2, dur, type = 'sine', vol = 1, offset = 0) => {
            const t0 = now + offset;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(f1, t0);
            osc.frequency.linearRampToValueAtTime(f2, t0 + dur);
            gain.gain.setValueAtTime(0, t0);
            gain.gain.linearRampToValueAtTime(volume * vol, t0 + 0.008);
            gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t0);
            osc.stop(t0 + dur + 0.02);
        };

        switch (sesAdi) {
            case 'butonTik':
                tone(1400, 0.04, 'square', 0.45);
                break;
            case 'dogru':
                tone(880, 0.16, 'sine', 1);
                tone(1320, 0.16, 'sine', 0.4, 0.04);
                break;
            case 'yanlis':
                tone(180, 0.22, 'sawtooth', 0.6);
                tone(140, 0.22, 'sawtooth', 0.4, 0.05);
                break;
            case 'combo2':
                sweep(660, 880, 0.18, 'sine', 1);
                break;
            case 'combo3plus':
                tone(659, 0.10, 'sine', 0.8, 0.00);
                tone(784, 0.10, 'sine', 0.9, 0.10);
                tone(988, 0.22, 'sine', 1.0, 0.20);
                break;
            case 'kartDondur':
                tone(820, 0.04, 'square', 0.4, 0.00);
                tone(1100, 0.04, 'square', 0.4, 0.06);
                break;
            case 'seviyeAtlama':
                tone(523, 0.10, 'sine', 0.7, 0.00);
                tone(659, 0.10, 'sine', 0.8, 0.10);
                tone(784, 0.10, 'sine', 0.9, 0.20);
                tone(1047, 0.30, 'sine', 1.0, 0.30);
                break;
            case 'rekor':
                // Fanfare: C-E-G-C-G major triad arpeggio
                tone(523, 0.14, 'triangle', 0.7, 0.00);
                tone(659, 0.14, 'triangle', 0.8, 0.10);
                tone(784, 0.14, 'triangle', 0.9, 0.20);
                tone(1047, 0.36, 'triangle', 1.0, 0.30);
                tone(1568, 0.36, 'triangle', 0.55, 0.50);
                break;
            default:
                tone(660, 0.1, 'sine', 0.6);
        }
    },

    /**
     * Browser autoplay engelini geçer.
     * İlk kullanıcı tıklamasında çağrılmalı.
     */
    kullaniciEtkilesimi() {
        this._baslatildi = true;
    },

    /**
     * Bir ses efektini çalar.
     * Dosya yüklendiyse onu, yoksa Web Audio API fallback'i kullanır (F7.5).
     * @param {string} sesAdi - SES_DOSYALARI anahtarlarından biri
     */
    sesCal(sesAdi) {
        if (!this._initialized) this.init();
        if (this._ayarlar.muted) return;
        if (!this._baslatildi) return;

        // Dosya başarıyla yüklendiyse onu çal
        if (this._dosyaMevcut[sesAdi]) {
            const sablon = this._sesPool[sesAdi];
            const a = sablon.cloneNode();
            a.volume = (this._ayarlar.master / 100) * (this._ayarlar.sfx / 100);
            a.play().catch(() => {
                // Asenkron hata — fallback
                this._webAudioCal(sesAdi);
            });
            return;
        }

        // Dosya yok ya da henüz yüklenmedi → Web Audio fallback
        this._webAudioCal(sesAdi);
    },

    /**
     * Müzik çalar (loop). Aynı müzik tekrar çalmaz.
     * @param {string} muzikAdi - MUZIK_DOSYALARI anahtarlarından biri
     */
    muzikCal(muzikAdi) {
        if (!this._initialized) this.init();
        if (this._ayarlar.muted) return;
        if (!this._baslatildi) return;
        if (this._muzikAdi === muzikAdi) return; // Zaten çalıyor

        this.muzikDurdur();

        const yol = MUZIK_DOSYALARI[muzikAdi];
        if (!yol) {
            console.warn('Müzik bulunamadı:', muzikAdi);
            return;
        }

        const a = new Audio(yol);
        a.loop = true;
        a.volume = (this._ayarlar.master / 100) * (this._ayarlar.music / 100);
        a.play().catch(e => {
            console.debug('muzikCal ignored:', e.message);
        });

        this._mevcutMuzik = a;
        this._muzikAdi = muzikAdi;
    },

    /**
     * Çalan müziği fade-out ile durdur.
     */
    muzikDurdur() {
        if (!this._mevcutMuzik) return;

        const a = this._mevcutMuzik;
        this._mevcutMuzik = null;
        this._muzikAdi = null;

        if (a.volume === 0) {
            a.pause();
            return;
        }

        // 200ms fade-out (10 adım × 20ms)
        const startVol = a.volume;
        const steps = 10;
        let i = 0;
        const fadeInterval = setInterval(() => {
            i++;
            a.volume = Math.max(0, startVol * (1 - i / steps));
            if (i >= steps) {
                clearInterval(fadeInterval);
                a.pause();
                a.currentTime = 0;
            }
        }, 20);
    },

    /**
     * Mute toggle.
     * @returns {boolean} Yeni mute durumu
     */
    muteToggle() {
        this._ayarlar.muted = !this._ayarlar.muted;
        if (this._ayarlar.muted) {
            this.muzikDurdur();
        }
        this._kaydet();
        return this._ayarlar.muted;
    },

    /**
     * Ses kapalı mı?
     */
    isMuted() {
        return this._ayarlar?.muted ?? false;
    },

    /**
     * Ses seviyesi ayarı (0-100).
     * @param {string} tip - 'master' | 'music' | 'sfx'
     * @param {number} deger - 0-100 arası
     */
    seviyeAyarla(tip, deger) {
        if (!['master', 'music', 'sfx'].includes(tip)) {
            console.warn('Geçersiz ses tipi:', tip);
            return;
        }
        deger = Math.max(0, Math.min(100, parseInt(deger, 10) || 0));
        this._ayarlar[tip] = deger;

        // Çalan müziğin sesi anlık güncelle
        if (this._mevcutMuzik && (tip === 'master' || tip === 'music')) {
            this._mevcutMuzik.volume =
                (this._ayarlar.master / 100) * (this._ayarlar.music / 100);
        }

        this._kaydet();
    },

    /**
     * Mevcut ses seviyesi (tipe göre).
     */
    getSeviye(tip) {
        return this._ayarlar?.[tip] ?? 0;
    },

    /**
     * Tüm ses ayarlarını döndür (UI binding için).
     */
    getAyarlar() {
        return { ...this._ayarlar };
    },

    _kaydet() {
        StorageManager.write(STORAGE_KEYS.AUDIO, this._ayarlar);
    }
};

// ============================================================
//  BÖLÜM 7: ANIMATION HELPER
//  CSS animation/transition'ları JS'ten kolayca tetikle (B.3)
// ============================================================

const AnimationHelper = {
    /**
     * Bir elemente animasyon class'ı ekler, bittikten sonra kaldırır.
     * Aynı animasyonun tekrar tetiklenmesini sağlar (reflow trick).
     */
    play(element, animClass, duration = 400) {
        if (!element) return;
        element.classList.remove(animClass);
        // Reflow tetikle (animasyonun yeniden çalışması için)
        void element.offsetWidth;
        element.classList.add(animClass);

        setTimeout(() => {
            element.classList.remove(animClass);
        }, duration);
    },

    /** Yatay titreme (yanlış cevap) */
    shake(element) {
        this.play(element, 'animate-shake', 400);
    },

    /** Pulse (vurgu — combo, yeni rozet) */
    pulse(element) {
        this.play(element, 'animate-pulse', 600);
    },

    /** Slide-up (modal, kart açılışı) */
    slideUp(element) {
        this.play(element, 'animate-slide-up', 400);
    },

    /** Scale-in (modal merkezi açılışı) */
    scaleIn(element) {
        this.play(element, 'animate-scale-in', 250);
    },

    /** Fade-in */
    fadeIn(element) {
        this.play(element, 'animate-fade-in', 250);
    },

    /** Yeşil flash (doğru cevap — periyodik tablo hücresi vb.) */
    flashSuccess(element) {
        this.play(element, 'animate-flash-success', 600);
    },

    /** Kırmızı flash + shake (yanlış cevap) */
    flashError(element) {
        this.play(element, 'animate-flash-error', 600);
        this.shake(element);
    },

    /**
     * Konfeti efekti — body'ye N parçacık ekler (yeni rekor için).
     * @param {number} adet - Konfeti parçacık sayısı (varsayılan 30)
     */
    confetti(adet = 30) {
        const renkler = [
            '#7C3AED',  // brand mor
            '#EC4899',  // pembe
            '#F59E0B',  // turuncu (sarı)
            '#10B981',  // yeşil
            '#06B6D4'   // turkuaz
        ];

        for (let i = 0; i < adet; i++) {
            const p = document.createElement('div');
            p.className = 'confetti-particle';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.background = renkler[Math.floor(Math.random() * renkler.length)];
            p.style.animationDelay = (Math.random() * 0.5) + 's';
            p.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
            document.body.appendChild(p);

            setTimeout(() => p.remove(), 3000);
        }
    },

    /**
     * Yüzen sayı/metin (+100 puanı vs.).
     * @param {Element|Object} elementOrPos - DOM elemanı veya {left, top, width}
     * @param {string} text - Gösterilecek metin (örn: "+100")
     * @param {Object} opts - { renk: string }
     */
    floatNumber(elementOrPos, text, opts = {}) {
        const renk = opts.renk || 'var(--color-success)';
        const pos = elementOrPos.getBoundingClientRect
            ? elementOrPos.getBoundingClientRect()
            : elementOrPos;

        const span = document.createElement('div');
        span.className = 'float-number';
        span.style.color = renk;
        span.style.left = (pos.left + (pos.width || 0) / 2) + 'px';
        span.style.top = pos.top + 'px';
        span.textContent = text;
        document.body.appendChild(span);

        setTimeout(() => span.remove(), 1000);
    },

    /**
     * Eleman görünür alana girince callback çalıştırır (lazy animation).
     */
    onVisible(element, callback) {
        if (!element || typeof IntersectionObserver === 'undefined') return;

        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        obs.observe(element);
    },

    /**
     * Süreli yumuşak güncelleme (skor sayısı 0 → 240 gibi animasyonlu).
     */
    animateNumber(element, from, to, duration = 600) {
        if (!element) return;
        const start = performance.now();
        const range = to - from;

        function frame(now) {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            // ease-out
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(from + range * eased);
            element.textContent = value;
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }
};


// ============================================================
//  BÖLÜM 8: EVENT DISPATCHER
//  Klavye + Touch event yönetimi (D.5 + D.7)
// ============================================================

const EventDispatcher = {
    // ─── Durum ────────────────────────────────
    _aktifKlavye: null,            // Modül-spesifik klavye handler
    _globalKlavye: null,           // Global kısayol handler'ları
    _firstInteractionDone: false,  // İlk kullanıcı etkileşimi (autoplay engeli)
    _initialized: false,

    /**
     * Global başlatma — sayfa yüklenince bir kez çağrılır.
     */
    init() {
        if (this._initialized) return;

        // Klavye event dispatcher
        document.addEventListener('keydown', (e) => this._klavyeHandler(e));

        // İlk kullanıcı etkileşimi — browser autoplay engelini geçer
        const firstInteraction = () => {
            if (this._firstInteractionDone) return;
            this._firstInteractionDone = true;
            AudioManager.kullaniciEtkilesimi();
            document.removeEventListener('click', firstInteraction);
            document.removeEventListener('keydown', firstInteraction);
            document.removeEventListener('touchstart', firstInteraction);
        };
        document.addEventListener('click', firstInteraction);
        document.addEventListener('keydown', firstInteraction);
        document.addEventListener('touchstart', firstInteraction, { passive: true });

        this._initialized = true;
    },

    /**
     * Global kısayolları kayıt et (handler objesi).
     * @param {Object} handlers - { muteToggle, adminPanel, help, escape }
     */
    registerGlobalShortcuts(handlers) {
        this._globalKlavye = { ...this._globalKlavye, ...handlers };
    },

    /**
     * Aktif modülün klavye handler'ını ayarla.
     * Modül değişince eskisi otomatik kaybolur.
     */
    setModuleKeyHandler(handler) {
        this._aktifKlavye = handler;
    },

    /**
     * Modülden çıkarken handler'ı temizle.
     */
    clearModuleKeyHandler() {
        this._aktifKlavye = null;
    },

    /**
     * Dahili klavye dağıtıcı.
     */
    _klavyeHandler(e) {
        // Form input'ları içinde global kısayolları çalıştırma
        const tag = e.target.tagName?.toLowerCase();
        const formIcinde = ['input', 'textarea', 'select'].includes(tag);

        // Ctrl/Cmd + Shift + A — Yönetici paneli (E.5)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            this._globalKlavye?.adminPanel?.();
            return;
        }

        // Esc — Modal kapat / geri (form içinde de çalışır)
        if (e.key === 'Escape') {
            if (this._globalKlavye?.escape) {
                this._globalKlavye.escape();
                return;
            }
        }

        // Form içinde diğer kısayolları skip et
        if (formIcinde) return;

        // M — Mute toggle (D.2)
        if (e.key === 'm' || e.key === 'M') {
            e.preventDefault();
            this._globalKlavye?.muteToggle?.();
            return;
        }

        // ? veya F1 — Yardım modalı (D.5)
        if (e.key === '?' || (e.shiftKey && e.key === '/') || e.key === 'F1') {
            e.preventDefault();
            this._globalKlavye?.help?.();
            return;
        }

        // Modüle özel handler
        if (this._aktifKlavye) {
            this._aktifKlavye(e);
        }
    },

    /**
     * Touch swipe algılama (opsiyonel yardımcı).
     * @param {Element} element - İzlenecek eleman
     * @param {Function} callback - 'sag' | 'sol' | 'yukari' | 'asagi' alır
     * @returns {Function} unbind fonksiyonu
     */
    onSwipe(element, callback) {
        if (!element) return () => {};

        let startX = 0, startY = 0;

        const start = (e) => {
            const t = e.changedTouches[0];
            startX = t.clientX;
            startY = t.clientY;
        };

        const end = (e) => {
            const t = e.changedTouches[0];
            const dx = t.clientX - startX;
            const dy = t.clientY - startY;
            const absX = Math.abs(dx);
            const absY = Math.abs(dy);

            if (Math.max(absX, absY) < 30) return; // Çok küçük hareket

            if (absX > absY) {
                callback(dx > 0 ? 'sag' : 'sol');
            } else {
                callback(dy > 0 ? 'asagi' : 'yukari');
            }
        };

        element.addEventListener('touchstart', start, { passive: true });
        element.addEventListener('touchend', end, { passive: true });

        return () => {
            element.removeEventListener('touchstart', start);
            element.removeEventListener('touchend', end);
        };
    }
};


// ============================================================
//  BAĞLAM KARTI — Element bilgisi modali (F3.5 + F4.6)
//  Modüller arası ortak: ac(element, { onKapat })
// ============================================================

const BaglamKarti = {
    _onKapat: null,

    /**
     * Bağlam kartını aç. Element bilgilerini gösterir.
     * @param {Object} element - ELEMENTS'ten bir kayıt
     * @param {Object} opts - { onKapat: Function, baslik: string }
     */
    ac(element, opts = {}) {
        const modal  = document.getElementById('baglam-modal');
        const icerik = document.getElementById('baglam-modal-icerik');
        if (!modal || !icerik || !element) {
            opts.onKapat?.();
            return;
        }

        this._onKapat = opts.onKapat || null;

        const katRenk = `var(--cat-${element.kategori})`;
        const ustEtiket = opts.baslik || 'Eşleştirildi!';
        const ustEtiketSinif = opts.basliksinif || 'baglam-eslesme-rozet';

        const latinceHtml = element.latince
            ? `<div class="baglam-latince">
                 <svg class="ikon ikon-sm"><use href="#i-test-tup"/></svg>
                 <span><strong>Latince kökeni:</strong> ${element.latince}</span>
               </div>`
            : '';

        icerik.innerHTML = `
            <div class="${ustEtiketSinif}">
                <svg class="ikon"><use href="#${opts.ikon || 'i-tik'}"/></svg>
                ${ustEtiket}
            </div>
            <div class="baglam-element-kart" style="--kat-renk: ${katRenk};">
                <div class="baglam-element-no">${element.atomNo}</div>
                <div class="baglam-element-sembol">${element.sembol}</div>
                <div class="baglam-element-ad">${element.ad}</div>
            </div>
            ${latinceHtml}
            <p class="baglam-aciklama">${element.baglam}</p>
        `;

        modal.classList.remove('hidden');
    },

    /**
     * Bağlam kartını bileşik için aç (F5.8).
     * Modül 3 (Formül Yapboz) doğru cevap sonrası kullanır.
     * @param {Object} bilesik - BILESIKLER'den bir kayıt
     * @param {Object} opts - { onKapat, baslik, basliksinif, ikon }
     */
    acBilesik(bilesik, opts = {}) {
        const modal  = document.getElementById('baglam-modal');
        const icerik = document.getElementById('baglam-modal-icerik');
        if (!modal || !icerik || !bilesik) {
            opts.onKapat?.();
            return;
        }

        this._onKapat = opts.onKapat || null;

        const ustEtiket      = opts.baslik       || 'DOĞRU!';
        const ustEtiketSinif = opts.basliksinif  || 'baglam-bilesik-rozet';
        const ustIkon        = opts.ikon         || 'i-tik';

        // Atom hücreleri dizisi (her atom 'sayi' kez tekrarlanır)
        const atomHucreler = [];
        for (const [sembol, sayi] of Object.entries(bilesik.atomlar)) {
            const el = (typeof bulElementBySembol === 'function') ? bulElementBySembol(sembol) : null;
            const kategori = el?.kategori || 'ametal';
            const atomNo   = el?.atomNo   || '';
            for (let i = 0; i < sayi; i++) {
                atomHucreler.push(
                    `<div class="baglam-atom-hucre fy-atom-hucre kat-${kategori}">
                        <span class="fy-atom-no">${atomNo}</span>
                        <span class="fy-atom-sembol">${sembol}</span>
                    </div>`
                );
            }
        }
        const atomDizi = atomHucreler.join('<span class="baglam-arti" aria-hidden="true">+</span>');

        // yaygınAd, ad ile ayrıyssa italik göster
        const yayginAdHTML = (bilesik.yayginAd && bilesik.yayginAd !== bilesik.ad)
            ? `<div class="baglam-bilesik-yaygin">"${bilesik.yayginAd}"</div>`
            : '';

        icerik.innerHTML = `
            <div class="${ustEtiketSinif}">
                <svg class="ikon"><use href="#${ustIkon}"/></svg>
                ${ustEtiket}
            </div>
            <div class="baglam-bilesik-kart">
                <div class="baglam-atom-dizisi">${atomDizi}</div>
                <div class="baglam-bilesik-esit" aria-hidden="true">=</div>
                <div class="baglam-bilesik-formul">
                    <span class="baglam-formul-yazi">${bilesik.formul}</span>
                    <span class="baglam-formul-ayrac" aria-hidden="true">·</span>
                    <span class="baglam-formul-ad">${bilesik.ad}</span>
                </div>
                ${yayginAdHTML}
            </div>
            <p class="baglam-aciklama">${bilesik.baglam}</p>
        `;

        modal.classList.remove('hidden');
    },

    /**
     * Bağlam kartını kapat — callback'i tetikler.
     */
    kapat() {
        const modal = document.getElementById('baglam-modal');
        modal?.classList.add('hidden');
        const cb = this._onKapat;
        this._onKapat = null;
        cb?.();
    }
};


// ============================================================
//  BÖLÜM 8.5: ROZET KATALOĞU (20 rozet — E.2'de onaylı)
//  Modüller bu sözlükten okur, AchievementManager kayıt tutar.
// ============================================================

const ROZETLER = {
    // ── Modül 2: Sembol Eşleştirme (5 rozet — F3.8) ──
    'm2-ilk-eslesme': {
        ad: 'İlk Eşleşme',
        aciklama: 'İlk Memory oyununu tamamladın!',
        ikon: 'i-element-hucre',
        renk: 'badge-brand'
    },
    'm2-hatasiz': {
        ad: 'Hatasız Hafıza',
        aciklama: 'Bir oyunu hiç yanlış eşleşme yapmadan bitirdin.',
        ikon: 'i-ampul',
        renk: 'badge-success'
    },
    'm2-latince-bilgin': {
        ad: 'Latince Bilen',
        aciklama: '5 farklı Latince kökenli element keşfettin.',
        ikon: 'i-test-tup',
        renk: 'badge-secondary'
    },
    'm2-hizli-el': {
        ad: 'Hızlı El',
        aciklama: 'Zor seviyeyi 60 saniyede bitirdin!',
        ikon: 'i-alev',
        renk: 'badge-warning'
    },
    'm2-sampiyon': {
        ad: 'Memory Şampiyonu',
        aciklama: 'Tüm zorluklarda 5 yıldız aldın!',
        ikon: 'i-kupa',
        renk: 'badge-warning'
    },

    // ── Modül 1: Element Avı (5 rozet — F4.x'te tetiklenecek) ──
    'm1-ilk-adim':     { ad: 'İlk Adım', aciklama: 'İlk Element Avı oyununu tamamladın.', ikon: 'i-rozet', renk: 'badge-brand' },
    'm1-hizli-kimyaci':{ ad: 'Hızlı Kimyacı', aciklama: 'Uzman seviyeyi 30 sn\'de bitirdin.', ikon: 'i-alev', renk: 'badge-warning' },
    'm1-periyot-ustasi':{ ad: 'Periyot Ustası', aciklama: 'Tüm periyotlardan en az 1 element doğru buldun.', ikon: 'i-periyodik', renk: 'badge-info' },
    'm1-mukemmellik':  { ad: 'Mükemmellik', aciklama: 'Bir oyunda %100 doğru!', ikon: 'i-yildiz-dolu', renk: 'badge-warning' },
    'm1-tablo-hakimi': { ad: 'Tablo Hakimi', aciklama: 'Tüm zorluklarda 5 yıldız aldın.', ikon: 'i-kupa', renk: 'badge-warning' },

    // ── Modül 3: Formül Yapboz (5 rozet — F5.x'te tetiklenecek) ──
    'm3-ilk-bilesik':  { ad: 'İlk Bileşik', aciklama: 'İlk Formül Yapboz oyununu tamamladın.', ikon: 'i-beher', renk: 'badge-brand' },
    'm3-ipucusuz':     { ad: 'İpucusuz', aciklama: 'Bir oyunu hiç ipucu kullanmadan bitirdin.', ikon: 'i-tik', renk: 'badge-success' },
    'm3-asit-baz':     { ad: 'Asit-Baz Bilgini', aciklama: 'Tüm asitleri doğru kurdun!', ikon: 'i-test-tup', renk: 'badge-error' },
    'm3-doga-dostu':   { ad: 'Doğa Dostu', aciklama: 'H₂O, CO₂, O₂, NH₃ — doğa bileşiklerini hep doğru kurdun.', ikon: 'i-molekul', renk: 'badge-success' },
    'm3-yapboz-sampiyon':{ ad: 'Yapboz Şampiyonu', aciklama: 'Tüm zorluklarda 5 yıldız.', ikon: 'i-kupa', renk: 'badge-warning' },

    // ── Genel / Cross-Modül (5 rozet — FAZ 6'da) ──
    'g-kesifci':       { ad: 'Keşifçi', aciklama: 'Toplam 10 oyun oynadın.', ikon: 'i-arama', renk: 'badge-brand' },
    'g-sebatkar':      { ad: 'Sebatkâr', aciklama: 'Toplam 50 oyun oynadın!', ikon: 'i-yildiz-dolu', renk: 'badge-warning' },
    'g-element-koleksiyoncusu':{ ad: 'Element Koleksiyoncusu', aciklama: 'Tüm 36 elementi keşfettin!', ikon: 'i-periyodik', renk: 'badge-info' },
    'g-bilesik-muhendisi':{ ad: 'Bileşik Mühendisi', aciklama: 'Tüm 24 bileşiği kurdun!', ikon: 'i-beher', renk: 'badge-secondary' },
    'g-elementra-ustadi':{ ad: 'ELEMENTRA Üstadı', aciklama: 'Tüm 19 rozeti kazandın!', ikon: 'i-kupa', renk: 'badge-warning' }
};


// ============================================================
//  ROZET BİLDİRİM SİSTEMİ (F3.8)
//  Modal kuyruğu — birden fazla rozet sıralı gösterilir
// ============================================================

const RozetBildirim = {
    _kuyruk: [],
    _aktifKart: null,

    /**
     * Bir veya birden fazla rozeti sırayla göster.
     * @param {Array<string>} rozetIdler
     */
    goster(rozetIdler) {
        this._kuyruk.push(...rozetIdler);
        if (!this._aktifKart) this._sonrakiGoster();
    },

    _sonrakiGoster() {
        if (this._kuyruk.length === 0) {
            this._kapat();
            return;
        }
        const id = this._kuyruk.shift();
        const meta = ROZETLER[id];
        if (!meta) {
            this._sonrakiGoster();
            return;
        }
        this._aktifKart = id;

        const modal  = document.getElementById('rozet-modal');
        const icerik = document.getElementById('rozet-modal-icerik');
        if (!modal || !icerik) return;

        icerik.innerHTML = `
            <div class="rozet-modal-ust">
                <span class="rozet-modal-yeni-rozet">🎉 YENİ BAŞARIM!</span>
            </div>
            <div class="rozet-modal-ikon-kap">
                <svg class="ikon ikon-3xl ikon-marka">
                    <use href="#${meta.ikon}"/>
                </svg>
            </div>
            <h2 class="rozet-modal-ad">${meta.ad}</h2>
            <p class="rozet-modal-aciklama">${meta.aciklama}</p>
        `;

        modal.classList.remove('hidden');

        // Ses + konfeti
        AudioManager.sesCal('rekor');
        if (typeof AnimationHelper !== 'undefined') {
            AnimationHelper.confetti(20);
        }
    },

    /**
     * "Devam" tıklanınca: sonraki rozet veya kapat.
     */
    devam() {
        AudioManager.sesCal('butonTik');
        if (this._kuyruk.length > 0) {
            this._sonrakiGoster();
        } else {
            this._kapat();
        }
    },

    _kapat() {
        const modal = document.getElementById('rozet-modal');
        modal?.classList.add('hidden');
        this._aktifKart = null;
    }
};


// ============================================================
//  BÖLÜM 9: SAHNE MANAGER
//  Ekran geçişleri — ana menü ↔ oyun ↔ sonuç (F2.3)
// ============================================================

const SahneManager = {
    _aktifEkran:  'anaekran',
    _aktifModul:  null,
    _aktifZorluk: null,

    /**
     * Belirtilen ID'li ekrana geçiş yapar.
     */
    go(ekranId) {
        // Tüm ekranları gizle
        document.querySelectorAll('.ekran').forEach(el => {
            el.classList.add('hidden');
        });

        // Hedef ekranı göster
        const yeni = document.getElementById(ekranId);
        if (!yeni) {
            console.warn('Ekran bulunamadı:', ekranId);
            return;
        }

        yeni.classList.remove('hidden');
        // Fade-in
        if (typeof AnimationHelper !== 'undefined') {
            AnimationHelper.fadeIn(yeni);
        }
        this._aktifEkran = ekranId;

        // Sayfanın başına kaydır
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    /**
     * Modülü başlat.
     * Modül-spesifik başlatıcı varsa onu çağırır, yoksa placeholder gösterir.
     */
    modulBaslat(modulId, zorluk) {
        this._aktifModul  = modulId;
        this._aktifZorluk = zorluk;

        // Body'ye aktif modül attribute'u — CSS koşullu stiller için (yan çevirme uyarısı vb.)
        document.body.dataset.aktifModul = modulId;

        // HUD'u sıfırla + modül adını set et
        if (typeof HUD !== 'undefined') {
            HUD.reset();
            HUD.setBaslik(modulId, zorluk);
            HUD.sureBaslat();
        }

        this.go('oyun-ekran');

        // Modül-spesifik başlatıcı var mı?
        if (window.modulleriBaslat?.[modulId]) {
            window.modulleriBaslat[modulId](zorluk);
        } else {
            this._gosterPlaceholder(modulId, zorluk);
        }
    },

    /**
     * Sonuç ekranına geç.
     * sonuc: { modulId, zorluk, skor, sure, dogru, yanlis, ogrenilen, ... }
     */
    sonucEkrani(sonuc) {
        // FAZ 3-5'te detay dolacak
        const ekran = document.getElementById('sonuc-ekran');
        if (ekran) {
            ekran.dataset.sonSonuc = JSON.stringify(sonuc);
        }
        this.go('sonuc-ekran');
    },

    /**
     * Ana menüye dön + modül kartlarını yenile (yeni keşifler için).
     */
    anaMenuyeDon() {
        // HUD süresayacını durdur
        if (typeof HUD !== 'undefined') {
            HUD.sureDurdur();
        }

        this._aktifModul  = null;
        this._aktifZorluk = null;
        delete document.body.dataset.aktifModul;
        this.go('anaekran');

        // Modül kartlarını güncelle (varsa modulKartGuncelle global fonksiyonu)
        document.querySelectorAll('[data-modul]').forEach(kart => {
            if (typeof window.modulKartGuncelle === 'function') {
                window.modulKartGuncelle(kart);
            }
        });
    },

    /**
     * Aktif modül bilgisi (HUD için).
     */
    getAktif() {
        return {
            ekran:  this._aktifEkran,
            modul:  this._aktifModul,
            zorluk: this._aktifZorluk
        };
    },

    /**
     * Modül-spesifik kod yokken kullanılır.
     */
    _gosterPlaceholder(modulId, zorluk) {
        const icerik = document.getElementById('oyun-icerik');
        if (!icerik) return;

        icerik.innerHTML = `
            <div class="placeholder-ekran">
                <svg class="ikon ikon-3xl ikon-marka" aria-hidden="true">
                    <use href="#i-ampul"/>
                </svg>
                <h1 class="placeholder-baslik">${MODUL_ADLAR_TR[modulId] || modulId}</h1>
                <p class="placeholder-aciklama">
                    Bu modülün oyun içeriği henüz hazır değil.<br>
                    FAZ 3-5'te tam çalışır halde eklenecek.
                </p>
                <div style="display:flex; gap:var(--space-3); flex-wrap:wrap; justify-content:center;">
                    <button class="btn btn-outline" type="button" onclick="HUD.setSkor(HUD._skor + 100)">+100 Skor (test)</button>
                    <button class="btn btn-outline" type="button" onclick="HUD.setCombo(HUD._combo >= 5 ? 1 : HUD._combo + 1)">Combo +1 (test)</button>
                </div>
            </div>
        `;
    }
};


// ============================================================
//  BÖLÜM 10: HUD (Üst bar — Skor + Süre + Combo + Mute + Geri)  (F2.4)
// ============================================================

const HUD = {
    _skor: 0,
    _sure: 0,
    _combo: 1,
    _sureTimer: null,

    /**
     * Oyun başında modül adı + zorluk rozeti.
     */
    setBaslik(modulId, zorluk) {
        const adEl = document.getElementById('hud-modul-adi');
        const zEl  = document.getElementById('hud-zorluk');
        if (adEl) adEl.textContent = MODUL_ADLAR_TR[modulId] || modulId;
        if (zEl) {
            zEl.textContent = ZORLUK_ADLAR_TR[zorluk] || zorluk;
            const renkler = {
                kolay: 'badge-success',
                orta:  'badge-warning',
                zor:   'badge-error',
                uzman: 'badge-brand'
            };
            zEl.className = 'badge badge-pill ' + (renkler[zorluk] || 'badge-brand');
        }
    },

    /**
     * Skor güncelle (animasyonlu doluş + parlama efekti).
     */
    setSkor(yeni) {
        const el = document.getElementById('hud-skor-deger');
        if (!el) return;
        if (typeof AnimationHelper !== 'undefined') {
            AnimationHelper.animateNumber(el, this._skor, yeni, 600);
            // Skor artıyorsa parlat
            if (yeni > this._skor) {
                const kap = document.getElementById('hud-skor-kapsayici');
                AnimationHelper.pulse(kap);
            }
        } else {
            el.textContent = yeni;
        }
        this._skor = yeni;
    },

    /**
     * Süre değerini set et (saniye → "01:24" formatı).
     */
    setSure(saniye) {
        this._sure = saniye;
        const el = document.getElementById('hud-sure-deger');
        if (el) el.textContent = sureFormatla(saniye);
    },

    /**
     * Süre sayacını başlat (saniyede bir artar).
     */
    sureBaslat() {
        if (this._sureTimer) clearInterval(this._sureTimer);
        this._sureTimer = setInterval(() => {
            this.setSure(this._sure + 1);
        }, 1000);
    },

    /**
     * Süre sayacını durdur.
     */
    sureDurdur() {
        if (this._sureTimer) {
            clearInterval(this._sureTimer);
            this._sureTimer = null;
        }
    },

    /**
     * Combo çarpanını set et.
     * 1 = gizli, 2+ = görünür + pulse.
     */
    setCombo(carpan) {
        this._combo = carpan;
        const kap = document.getElementById('hud-combo-kapsayici');
        const deg = document.getElementById('hud-combo-deger');
        if (!kap || !deg) return;

        if (carpan > 1) {
            kap.classList.remove('hidden');
            deg.textContent = 'x' + carpan;
            kap.classList.add('aktif');
            setTimeout(() => kap.classList.remove('aktif'), 600);
        } else {
            kap.classList.add('hidden');
        }
    },

    /**
     * Oyun başlangıcında tüm değerleri sıfırla.
     */
    reset() {
        this.sureDurdur();
        this._skor = 0;
        this._sure = 0;
        this._combo = 1;

        const skor  = document.getElementById('hud-skor-deger');
        const sure  = document.getElementById('hud-sure-deger');
        const combo = document.getElementById('hud-combo-kapsayici');
        if (skor)  skor.textContent = '0';
        if (sure)  sure.textContent = '00:00';
        if (combo) combo.classList.add('hidden');
    },

    /**
     * Mevcut HUD durumu (oyun sonu için).
     */
    snapshot() {
        return {
            skor:  this._skor,
            sure:  this._sure,
            combo: this._combo
        };
    }
};


// ============================================================
//  YARDIMCI FONKSİYONLAR (Genel)
// ============================================================

/**
 * Süreyi insanca format (saniye → "01:23" veya "1sa 5dk").
 */
function sureFormatla(saniye) {
    if (saniye < 60) return `${saniye}sn`;
    if (saniye < 3600) {
        const dk = Math.floor(saniye / 60);
        const sn = saniye % 60;
        return `${dk}:${String(sn).padStart(2, '0')}`;
    }
    const sa = Math.floor(saniye / 3600);
    const dk = Math.floor((saniye % 3600) / 60);
    return `${sa}sa ${dk}dk`;
}

/**
 * Skor formatla (1280 → "1.280").
 */
function skorFormatla(skor) {
    return String(skor).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Diziyi karıştır (Fisher-Yates).
 */
function karistir(dizi) {
    const a = [...dizi];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Rastgele eleman seç.
 */
function rastgeleSec(dizi) {
    return dizi[Math.floor(Math.random() * dizi.length)];
}

/**
 * Rastgele N eleman seç (tekrarsız).
 */
function rastgeleN(dizi, n) {
    return karistir(dizi).slice(0, n);
}


// ============================================================
//  BAŞLATMA — Bu dosya yüklendiğinde çalışır
// ============================================================
(function init() {
    if (!StorageManager.available()) {
        console.warn(
            '⚠️ localStorage erişilebilir değil (incognito mod?). ' +
            'Veriler kalıcı olmayacak.'
        );
    } else {
        // Yönetici şifresi yoksa default ata
        if (StorageManager.read(STORAGE_KEYS.ADMIN_PWD) === null) {
            StorageManager.write(STORAGE_KEYS.ADMIN_PWD, '4006');
        }
    }

    // AudioManager + EventDispatcher otomatik başlat
    AudioManager.init();
    EventDispatcher.init();

    console.log(
        `✅ ELEMENTRA v2 ortak altyapı hazır ` +
        `(${StorageManager.getSize()} byte yüklü)`
    );
})();
