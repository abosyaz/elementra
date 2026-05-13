// data/elements.js
// ELEMENTRA v2 — 36 Element Veritabanı
// MEB 9. Sınıf Kimya Müfredatı 9.2.3.3 + 9.2.3.4 kazanımlarına uyumlu
// İlk 20 element (zorunlu) + 16 yaygın element (günlük hayat)
// Kaynak: kimya_arastirma.md

// ============================================================
//  KATEGORİ SABİTLERİ
// ============================================================
const ELEMENT_KATEGORI = {
    ALKALI:           'alkali',           // 1A grubu metalleri
    TOPRAK_ALKALI:    'toprak-alkali',    // 2A grubu metalleri
    GECIS:            'gecis',            // B grubu metalleri
    GECIS_SONRASI:    'gecis-sonrasi',    // 3A-6A grubunun metalleri (Al, Sn, Pb)
    YARI_METAL:       'yari-metal',       // B, Si
    AMETAL:           'ametal',           // H, C, N, O, P, S
    HALOJEN:          'halojen',          // 7A grubu
    SOY_GAZ:          'soy-gaz'           // 8A grubu
};

// ============================================================
//  36 ELEMENT VERİTABANI
// ============================================================
const ELEMENTS = [
    // ─────────────── PERİYOT 1 ───────────────
    {
        atomNo: 1,
        sembol: 'H',
        ad: 'Hidrojen',
        latince: null,
        atomKutle: 1.008,
        kategori: ELEMENT_KATEGORI.AMETAL,
        periyot: 1,
        grup: 1,
        tablodaKonum: { row: 1, col: 1 },
        baglam: 'Evrenin %75\'i hidrojendir. Yıldızların yakıtı.',
        yayginAd: 'Yıldız yakıtı'
    },
    {
        atomNo: 2,
        sembol: 'He',
        ad: 'Helyum',
        latince: null,
        atomKutle: 4.003,
        kategori: ELEMENT_KATEGORI.SOY_GAZ,
        periyot: 1,
        grup: 18,
        tablodaKonum: { row: 1, col: 18 },
        baglam: 'Hava balonlarını kaldıran soy gaz. Sesi inceltir!',
        yayginAd: 'Hava balonu gazı'
    },

    // ─────────────── PERİYOT 2 ───────────────
    {
        atomNo: 3,
        sembol: 'Li',
        ad: 'Lityum',
        latince: null,
        atomKutle: 6.94,
        kategori: ELEMENT_KATEGORI.ALKALI,
        periyot: 2,
        grup: 1,
        tablodaKonum: { row: 2, col: 1 },
        baglam: 'Telefon ve laptop pillerinin kalbi.',
        yayginAd: 'Telefon pilinin metali'
    },
    {
        atomNo: 4,
        sembol: 'Be',
        ad: 'Berilyum',
        latince: null,
        atomKutle: 9.012,
        kategori: ELEMENT_KATEGORI.TOPRAK_ALKALI,
        periyot: 2,
        grup: 2,
        tablodaKonum: { row: 2, col: 2 },
        baglam: 'Uzay teleskoplarının aynalarında kullanılır.',
        yayginAd: 'Uzay teleskopu metali'
    },
    {
        atomNo: 5,
        sembol: 'B',
        ad: 'Bor',
        latince: null,
        atomKutle: 10.81,
        kategori: ELEMENT_KATEGORI.YARI_METAL,
        periyot: 2,
        grup: 13,
        tablodaKonum: { row: 2, col: 13 },
        baglam: 'Türkiye dünya bor rezervinin %73\'üne sahip!',
        yayginAd: 'Türkiye\'nin maden zenginliği'
    },
    {
        atomNo: 6,
        sembol: 'C',
        ad: 'Karbon',
        latince: null,
        atomKutle: 12.01,
        kategori: ELEMENT_KATEGORI.AMETAL,
        periyot: 2,
        grup: 14,
        tablodaKonum: { row: 2, col: 14 },
        baglam: 'Tüm canlıların temeli. Elmas ve grafit aynı element.',
        yayginAd: 'Canlıların temel elementi'
    },
    {
        atomNo: 7,
        sembol: 'N',
        ad: 'Azot',
        latince: null,
        atomKutle: 14.01,
        kategori: ELEMENT_KATEGORI.AMETAL,
        periyot: 2,
        grup: 15,
        tablodaKonum: { row: 2, col: 15 },
        baglam: 'Soluduğun havanın %78\'i azot gazıdır.',
        yayginAd: 'Havanın çoğunluğu'
    },
    {
        atomNo: 8,
        sembol: 'O',
        ad: 'Oksijen',
        latince: null,
        atomKutle: 16.00,
        kategori: ELEMENT_KATEGORI.AMETAL,
        periyot: 2,
        grup: 16,
        tablodaKonum: { row: 2, col: 16 },
        baglam: 'Atmosferin %21\'i. Hayatın temel taşı.',
        yayginAd: 'Soluduğumuz gaz'
    },
    {
        atomNo: 9,
        sembol: 'F',
        ad: 'Flor',
        latince: null,
        atomKutle: 19.00,
        kategori: ELEMENT_KATEGORI.HALOJEN,
        periyot: 2,
        grup: 17,
        tablodaKonum: { row: 2, col: 17 },
        baglam: 'Diş macunun ana bileşeni. Çürüklere karşı kalkan.',
        yayginAd: 'Diş macunundaki element'
    },
    {
        atomNo: 10,
        sembol: 'Ne',
        ad: 'Neon',
        latince: null,
        atomKutle: 20.18,
        kategori: ELEMENT_KATEGORI.SOY_GAZ,
        periyot: 2,
        grup: 18,
        tablodaKonum: { row: 2, col: 18 },
        baglam: 'Reklam tabelalarındaki kırmızı parlaklığı sağlar.',
        yayginAd: 'Neon ışıklarda'
    },

    // ─────────────── PERİYOT 3 ───────────────
    {
        atomNo: 11,
        sembol: 'Na',
        ad: 'Sodyum',
        latince: 'Natrium',
        atomKutle: 22.99,
        kategori: ELEMENT_KATEGORI.ALKALI,
        periyot: 3,
        grup: 1,
        tablodaKonum: { row: 3, col: 1 },
        baglam: 'Sofra tuzunun (NaCl) yarısı. Sinir sinyalleri için kritik.',
        yayginAd: 'Sofra tuzunda'
    },
    {
        atomNo: 12,
        sembol: 'Mg',
        ad: 'Magnezyum',
        latince: null,
        atomKutle: 24.31,
        kategori: ELEMENT_KATEGORI.TOPRAK_ALKALI,
        periyot: 3,
        grup: 2,
        tablodaKonum: { row: 3, col: 2 },
        baglam: 'Yeşil yaprakların klorofilinde merkezi atom.',
        yayginAd: 'Klorofilde'
    },
    {
        atomNo: 13,
        sembol: 'Al',
        ad: 'Alüminyum',
        latince: null,
        atomKutle: 26.98,
        kategori: ELEMENT_KATEGORI.GECIS_SONRASI,
        periyot: 3,
        grup: 13,
        tablodaKonum: { row: 3, col: 13 },
        baglam: 'Folyo, içecek kutuları, uçak gövdesi.',
        yayginAd: 'Folyo metali'
    },
    {
        atomNo: 14,
        sembol: 'Si',
        ad: 'Silisyum',
        latince: null,
        atomKutle: 28.09,
        kategori: ELEMENT_KATEGORI.YARI_METAL,
        periyot: 3,
        grup: 14,
        tablodaKonum: { row: 3, col: 14 },
        baglam: 'Bilgisayar çiplerinin ana maddesi. Kumun bileşeni.',
        yayginAd: 'Bilgisayar çiplerinde'
    },
    {
        atomNo: 15,
        sembol: 'P',
        ad: 'Fosfor',
        latince: null,
        atomKutle: 30.97,
        kategori: ELEMENT_KATEGORI.AMETAL,
        periyot: 3,
        grup: 15,
        tablodaKonum: { row: 3, col: 15 },
        baglam: 'DNA\'nın iskeletinde, kemiklerinde, kibritlerde.',
        yayginAd: 'Kibrit ucundaki element'
    },
    {
        atomNo: 16,
        sembol: 'S',
        ad: 'Kükürt',
        latince: null,
        atomKutle: 32.07,
        kategori: ELEMENT_KATEGORI.AMETAL,
        periyot: 3,
        grup: 16,
        tablodaKonum: { row: 3, col: 16 },
        baglam: 'Çürük yumurta kokusu kükürt bileşiklerinden.',
        yayginAd: 'Çürük yumurta kokusu'
    },
    {
        atomNo: 17,
        sembol: 'Cl',
        ad: 'Klor',
        latince: null,
        atomKutle: 35.45,
        kategori: ELEMENT_KATEGORI.HALOJEN,
        periyot: 3,
        grup: 17,
        tablodaKonum: { row: 3, col: 17 },
        baglam: 'Havuz suyunu dezenfekte eder. Tuzun diğer yarısı.',
        yayginAd: 'Havuz suyu dezenfektanı'
    },
    {
        atomNo: 18,
        sembol: 'Ar',
        ad: 'Argon',
        latince: null,
        atomKutle: 39.95,
        kategori: ELEMENT_KATEGORI.SOY_GAZ,
        periyot: 3,
        grup: 18,
        tablodaKonum: { row: 3, col: 18 },
        baglam: 'Akkor lambaların içindeki gaz. Tepkimeye girmez.',
        yayginAd: 'Akkor lamba gazı'
    },

    // ─────────────── PERİYOT 4 ───────────────
    {
        atomNo: 19,
        sembol: 'K',
        ad: 'Potasyum',
        latince: 'Kalium',
        atomKutle: 39.10,
        kategori: ELEMENT_KATEGORI.ALKALI,
        periyot: 4,
        grup: 1,
        tablodaKonum: { row: 4, col: 1 },
        baglam: 'Muz ve patatesin zenginliği. Sinirler için kritik.',
        yayginAd: 'Muzda bol bulunan'
    },
    {
        atomNo: 20,
        sembol: 'Ca',
        ad: 'Kalsiyum',
        latince: null,
        atomKutle: 40.08,
        kategori: ELEMENT_KATEGORI.TOPRAK_ALKALI,
        periyot: 4,
        grup: 2,
        tablodaKonum: { row: 4, col: 2 },
        baglam: 'Kemik ve dişlerin yapı taşı. Süt zengini.',
        yayginAd: 'Kemik ve diş elementi'
    },
    {
        atomNo: 24,
        sembol: 'Cr',
        ad: 'Krom',
        latince: null,
        atomKutle: 52.00,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 4,
        grup: 6,
        tablodaKonum: { row: 4, col: 6 },
        baglam: 'Paslanmaz çelikte parlaklığı sağlar.',
        yayginAd: 'Paslanmaz çelikte'
    },
    {
        atomNo: 25,
        sembol: 'Mn',
        ad: 'Manganez',
        latince: null,
        atomKutle: 54.94,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 4,
        grup: 7,
        tablodaKonum: { row: 4, col: 7 },
        baglam: 'Çelik üretiminde sertleştirici.',
        yayginAd: 'Çelik sertleştirici'
    },
    {
        atomNo: 26,
        sembol: 'Fe',
        ad: 'Demir',
        latince: 'Ferrum',
        atomKutle: 55.85,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 4,
        grup: 8,
        tablodaKonum: { row: 4, col: 8 },
        baglam: 'Kanındaki hemoglobinin merkezi. Pas oluşumu.',
        yayginAd: 'Kandaki metal'
    },
    {
        atomNo: 27,
        sembol: 'Co',
        ad: 'Kobalt',
        latince: null,
        atomKutle: 58.93,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 4,
        grup: 9,
        tablodaKonum: { row: 4, col: 9 },
        baglam: 'Mavi pigment, mıknatıs, pil.',
        yayginAd: 'Mavi pigment'
    },
    {
        atomNo: 28,
        sembol: 'Ni',
        ad: 'Nikel',
        latince: null,
        atomKutle: 58.69,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 4,
        grup: 10,
        tablodaKonum: { row: 4, col: 10 },
        baglam: 'Madeni para, paslanmaz çelik.',
        yayginAd: 'Madeni parada'
    },
    {
        atomNo: 29,
        sembol: 'Cu',
        ad: 'Bakır',
        latince: 'Cuprum',
        atomKutle: 63.55,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 4,
        grup: 11,
        tablodaKonum: { row: 4, col: 11 },
        baglam: 'Elektrik kablolarında. Özgürlük Heykeli\'nin yeşili.',
        yayginAd: 'Elektrik kablosu metali'
    },
    {
        atomNo: 30,
        sembol: 'Zn',
        ad: 'Çinko',
        latince: null,
        atomKutle: 65.38,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 4,
        grup: 12,
        tablodaKonum: { row: 4, col: 12 },
        baglam: 'Güneş kreminde. Bağışıklık sistemini destekler.',
        yayginAd: 'Güneş kreminde'
    },
    {
        atomNo: 35,
        sembol: 'Br',
        ad: 'Brom',
        latince: null,
        atomKutle: 79.90,
        kategori: ELEMENT_KATEGORI.HALOJEN,
        periyot: 4,
        grup: 17,
        tablodaKonum: { row: 4, col: 17 },
        baglam: 'Kırmızı-kahverengi sıvı element (oda sıcaklığında!).',
        yayginAd: 'Kırmızı sıvı element'
    },

    // ─────────────── PERİYOT 5 ───────────────
    {
        atomNo: 47,
        sembol: 'Ag',
        ad: 'Gümüş',
        latince: 'Argentum',
        atomKutle: 107.87,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 5,
        grup: 11,
        tablodaKonum: { row: 5, col: 11 },
        baglam: 'Aynalar, takı, antibakteriyel kaplamalar.',
        yayginAd: 'Aynalardaki metal'
    },
    {
        atomNo: 50,
        sembol: 'Sn',
        ad: 'Kalay',
        latince: 'Stannum',
        atomKutle: 118.71,
        kategori: ELEMENT_KATEGORI.GECIS_SONRASI,
        periyot: 5,
        grup: 14,
        tablodaKonum: { row: 5, col: 14 },
        baglam: 'Eski kutuların kaplamasında. Bronz alaşımı.',
        yayginAd: 'Eski konserve kaplaması'
    },
    {
        atomNo: 53,
        sembol: 'I',
        ad: 'İyot',
        latince: null,
        atomKutle: 126.90,
        kategori: ELEMENT_KATEGORI.HALOJEN,
        periyot: 5,
        grup: 17,
        tablodaKonum: { row: 5, col: 17 },
        baglam: 'Antiseptik (yara dezenfektan). İyotlu tuzda.',
        yayginAd: 'Yara antiseptiği'
    },

    // ─────────────── PERİYOT 6 ───────────────
    {
        atomNo: 56,
        sembol: 'Ba',
        ad: 'Baryum',
        latince: null,
        atomKutle: 137.33,
        kategori: ELEMENT_KATEGORI.TOPRAK_ALKALI,
        periyot: 6,
        grup: 2,
        tablodaKonum: { row: 6, col: 2 },
        baglam: 'Mide röntgeninde içilen "baryum yutkun".',
        yayginAd: 'Mide röntgeninde'
    },
    {
        atomNo: 78,
        sembol: 'Pt',
        ad: 'Platin',
        latince: null,
        atomKutle: 195.08,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 6,
        grup: 10,
        tablodaKonum: { row: 6, col: 10 },
        baglam: 'Otomobil egzoz katalizörü. En değerli takı.',
        yayginAd: 'En değerli takı metali'
    },
    {
        atomNo: 79,
        sembol: 'Au',
        ad: 'Altın',
        latince: 'Aurum',
        atomKutle: 196.97,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 6,
        grup: 11,
        tablodaKonum: { row: 6, col: 11 },
        baglam: 'Tepkimeye girmediği için takıda. Elektronikte.',
        yayginAd: 'Altın takı'
    },
    {
        atomNo: 80,
        sembol: 'Hg',
        ad: 'Cıva',
        latince: 'Hydrargyrum',
        atomKutle: 200.59,
        kategori: ELEMENT_KATEGORI.GECIS,
        periyot: 6,
        grup: 12,
        tablodaKonum: { row: 6, col: 12 },
        baglam: 'Oda sıcaklığında sıvı metal. Eski termometreler.',
        yayginAd: 'Eski termometrede'
    },
    {
        atomNo: 82,
        sembol: 'Pb',
        ad: 'Kurşun',
        latince: 'Plumbum',
        atomKutle: 207.2,
        kategori: ELEMENT_KATEGORI.GECIS_SONRASI,
        periyot: 6,
        grup: 14,
        tablodaKonum: { row: 6, col: 14 },
        baglam: 'Otomobil aküleri. Eskiden boya, şimdi yasak.',
        yayginAd: 'Akü elementi'
    }
];

// ============================================================
//  YARDIMCI FONKSİYONLAR
// ============================================================

/**
 * Sembol ile element bulur.
 * @param {string} sembol - Element sembolü (örn: "Na")
 * @returns {Object|null} Element nesnesi veya null
 */
function bulElementBySembol(sembol) {
    return ELEMENTS.find(e => e.sembol === sembol) || null;
}

/**
 * Atom numarası ile element bulur.
 * @param {number} atomNo - Atom numarası
 * @returns {Object|null} Element nesnesi veya null
 */
function bulElementByAtomNo(atomNo) {
    return ELEMENTS.find(e => e.atomNo === atomNo) || null;
}

/**
 * Belirli bir kategorideki tüm elementleri döner.
 * @param {string} kategori - ELEMENT_KATEGORI değerlerinden biri
 * @returns {Array} Filtrelenmiş element listesi
 */
function elementleriKategoriye(kategori) {
    return ELEMENTS.filter(e => e.kategori === kategori);
}

/**
 * İlk 20 elementi döner (MEB zorunlu liste).
 * @returns {Array} İlk 20 element
 */
function ilk20() {
    return ELEMENTS.filter(e => e.atomNo <= 20);
}

/**
 * 20'den sonraki 16 yaygın elementi döner.
 * @returns {Array} Ek 16 element
 */
function ek16() {
    return ELEMENTS.filter(e => e.atomNo > 20);
}

/**
 * Latince köken adı olan elementleri döner (Modül 2 bonus eğitim).
 * @returns {Array} Latince kökenli elementler
 */
function latinceKokenliler() {
    return ELEMENTS.filter(e => e.latince !== null);
}

// ============================================================
//  VERİ DOĞRULAMA (Yükleme sırasında çalışır)
// ============================================================
(function dogrula() {
    if (ELEMENTS.length !== 36) {
        console.error(
            `⚠️ ELEMENTS doğrulama hatası: Beklenen 36, mevcut ${ELEMENTS.length}`
        );
        return;
    }

    const ilk20Count = ELEMENTS.filter(e => e.atomNo <= 20).length;
    if (ilk20Count !== 20) {
        console.error(
            `⚠️ İlk 20 doğrulama hatası: Beklenen 20, mevcut ${ilk20Count}`
        );
    }

    const semboller = new Set(ELEMENTS.map(e => e.sembol));
    if (semboller.size !== 36) {
        console.error('⚠️ Tekrar eden sembol var!');
    }

    console.log('✅ ELEMENTS veritabanı yüklendi:', ELEMENTS.length, 'element');
})();
