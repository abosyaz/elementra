// data/bilesikler.js
// ELEMENTRA v2 — 24 Bileşik Veritabanı
// MEB 9. Sınıf Kimya Müfredatı 9.3.2.1 + 9.3.2.2 kazanımlarına uyumlu
// + 10. Sınıf Asit-Baz-Tuz ünitesi referansları
// 8 kolay + 8 orta + 8 zor = 24 toplam
// Kaynak: kimya_arastirma.md

// ============================================================
//  ZORLUK SABİTLERİ
// ============================================================
const BILESIK_ZORLUK = {
    KOLAY: 'kolay',
    ORTA:  'orta',
    ZOR:   'zor'
};

// ============================================================
//  KATEGORİ SABİTLERİ
// ============================================================
const BILESIK_KATEGORI = {
    TUZ:         'tuz',           // İyonik bileşikler (Metal + Ametal)
    ASIT:        'asit',          // H ile başlayan asitler
    BAZ:         'baz',           // OH veya NH3 içeren bazlar
    OKSIT:       'oksit',         // Metal oksitleri
    HIDROKARBON: 'hidrokarbon',   // C-H bileşikleri
    BASIT_GAZ:   'basit-gaz',     // O2, H2, CO2 gibi basit moleküller
    KARBONAT:    'karbonat',      // CO3 grubu içerenler
    DIGER:       'diger'          // H2O ve özel bileşikler
};

// ============================================================
//  24 BİLEŞİK VERİTABANI
// ============================================================
const BILESIKLER = [
    // ═══════════════════════════════════════════════════════
    //  🟢 KOLAY SEVİYE (8 bileşik) — Modül 3 başlangıç
    // ═══════════════════════════════════════════════════════
    {
        id: 'h2o',
        formul: 'H₂O',
        formulDuz: 'H2O',
        ad: 'Su',
        yayginAd: 'Su',
        zorluk: BILESIK_ZORLUK.KOLAY,
        kategori: BILESIK_KATEGORI.DIGER,
        atomlar: { 'H': 2, 'O': 1 },
        bagTuru: 'kovalent',
        baglam: 'Vücudunun %60\'ı sudan oluşur. Hayatın çözücüsü.'
    },
    {
        id: 'co2',
        formul: 'CO₂',
        formulDuz: 'CO2',
        ad: 'Karbondioksit',
        yayginAd: 'Soluduğumuz gaz',
        zorluk: BILESIK_ZORLUK.KOLAY,
        kategori: BILESIK_KATEGORI.BASIT_GAZ,
        atomlar: { 'C': 1, 'O': 2 },
        bagTuru: 'kovalent',
        baglam: 'Soluduğun karbondioksit. Asitli içeceklerdeki kabarcıklar.'
    },
    {
        id: 'nacl',
        formul: 'NaCl',
        formulDuz: 'NaCl',
        ad: 'Sodyum klorür',
        yayginAd: 'Sofra tuzu',
        zorluk: BILESIK_ZORLUK.KOLAY,
        kategori: BILESIK_KATEGORI.TUZ,
        atomlar: { 'Na': 1, 'Cl': 1 },
        bagTuru: 'iyonik',
        baglam: 'Sofra tuzu. Okyanusların tuzluluğu.'
    },
    {
        id: 'o2',
        formul: 'O₂',
        formulDuz: 'O2',
        ad: 'Oksijen',
        yayginAd: 'Soluduğumuz oksijen',
        zorluk: BILESIK_ZORLUK.KOLAY,
        kategori: BILESIK_KATEGORI.BASIT_GAZ,
        atomlar: { 'O': 2 },
        bagTuru: 'kovalent',
        baglam: 'Soluduğun oksijen gazı. Yanmayı destekler.'
    },
    {
        id: 'ch4',
        formul: 'CH₄',
        formulDuz: 'CH4',
        ad: 'Metan',
        yayginAd: 'Doğalgaz',
        zorluk: BILESIK_ZORLUK.KOLAY,
        kategori: BILESIK_KATEGORI.HIDROKARBON,
        atomlar: { 'C': 1, 'H': 4 },
        bagTuru: 'kovalent',
        baglam: 'Doğalgazın ana bileşeni. Kombi yakıtı.'
    },
    {
        id: 'hcl',
        formul: 'HCl',
        formulDuz: 'HCl',
        ad: 'Hidroklorik asit',
        yayginAd: 'Tuz ruhu',
        zorluk: BILESIK_ZORLUK.KOLAY,
        kategori: BILESIK_KATEGORI.ASIT,
        atomlar: { 'H': 1, 'Cl': 1 },
        bagTuru: 'kovalent',
        baglam: 'Tuz ruhu. Midende sindirim için var (mide asidi).'
    },
    {
        id: 'nh3',
        formul: 'NH₃',
        formulDuz: 'NH3',
        ad: 'Amonyak',
        yayginAd: 'Temizlik amonyağı',
        zorluk: BILESIK_ZORLUK.KOLAY,
        kategori: BILESIK_KATEGORI.BAZ,
        atomlar: { 'N': 1, 'H': 3 },
        bagTuru: 'kovalent',
        baglam: 'Amonyak. Temizlik maddelerinde, gübrelerde.'
    },
    {
        id: 'h2',
        formul: 'H₂',
        formulDuz: 'H2',
        ad: 'Hidrojen',
        yayginAd: 'Hidrojen gazı',
        zorluk: BILESIK_ZORLUK.KOLAY,
        kategori: BILESIK_KATEGORI.BASIT_GAZ,
        atomlar: { 'H': 2 },
        bagTuru: 'kovalent',
        baglam: 'Hidrojen gazı. Geleceğin temiz yakıtı.'
    },

    // ═══════════════════════════════════════════════════════
    //  🟡 ORTA SEVİYE (8 bileşik)
    // ═══════════════════════════════════════════════════════
    {
        id: 'naoh',
        formul: 'NaOH',
        formulDuz: 'NaOH',
        ad: 'Sodyum hidroksit',
        yayginAd: 'Sud kostik',
        zorluk: BILESIK_ZORLUK.ORTA,
        kategori: BILESIK_KATEGORI.BAZ,
        atomlar: { 'Na': 1, 'O': 1, 'H': 1 },
        bagTuru: 'iyonik',
        baglam: 'Sud kostik. Sabun yapımında.'
    },
    {
        id: 'h2so4',
        formul: 'H₂SO₄',
        formulDuz: 'H2SO4',
        ad: 'Sülfürik asit',
        yayginAd: 'Zaç yağı (akü asidi)',
        zorluk: BILESIK_ZORLUK.ORTA,
        kategori: BILESIK_KATEGORI.ASIT,
        atomlar: { 'H': 2, 'S': 1, 'O': 4 },
        bagTuru: 'kovalent',
        baglam: 'Zaç yağı. Araba aküsündeki asit.'
    },
    {
        id: 'caco3',
        formul: 'CaCO₃',
        formulDuz: 'CaCO3',
        ad: 'Kalsiyum karbonat',
        yayginAd: 'Kireç taşı',
        zorluk: BILESIK_ZORLUK.ORTA,
        kategori: BILESIK_KATEGORI.KARBONAT,
        atomlar: { 'Ca': 1, 'C': 1, 'O': 3 },
        bagTuru: 'iyonik',
        baglam: 'Kireç taşı. Mermerin ham maddesi. Yumurta kabuğu.'
    },
    {
        id: 'fe2o3',
        formul: 'Fe₂O₃',
        formulDuz: 'Fe2O3',
        ad: 'Demir(III) oksit',
        yayginAd: 'Demir pası',
        zorluk: BILESIK_ZORLUK.ORTA,
        kategori: BILESIK_KATEGORI.OKSIT,
        atomlar: { 'Fe': 2, 'O': 3 },
        bagTuru: 'iyonik',
        baglam: 'Demir pası. Mars\'ın kırmızı toprağının rengi.'
    },
    {
        id: 'nahco3',
        formul: 'NaHCO₃',
        formulDuz: 'NaHCO3',
        ad: 'Sodyum bikarbonat',
        yayginAd: 'Karbonat (mutfak)',
        zorluk: BILESIK_ZORLUK.ORTA,
        kategori: BILESIK_KATEGORI.KARBONAT,
        atomlar: { 'Na': 1, 'H': 1, 'C': 1, 'O': 3 },
        bagTuru: 'iyonik',
        baglam: 'Karbonat. Hamur kabartıcı. Mide ilacı.'
    },
    {
        id: 'ki',
        formul: 'KI',
        formulDuz: 'KI',
        ad: 'Potasyum iyodür',
        yayginAd: 'İyotlu tuz iyodu',
        zorluk: BILESIK_ZORLUK.ORTA,
        kategori: BILESIK_KATEGORI.TUZ,
        atomlar: { 'K': 1, 'I': 1 },
        bagTuru: 'iyonik',
        baglam: 'İyotlu tuzdaki iyot kaynağı. Tiroit için.'
    },
    {
        id: 'mgo',
        formul: 'MgO',
        formulDuz: 'MgO',
        ad: 'Magnezyum oksit',
        yayginAd: 'Magnezya',
        zorluk: BILESIK_ZORLUK.ORTA,
        kategori: BILESIK_KATEGORI.OKSIT,
        atomlar: { 'Mg': 1, 'O': 1 },
        bagTuru: 'iyonik',
        baglam: 'Magnezya. Mide yanması ilacı (antiasit).'
    },
    {
        id: 'agcl',
        formul: 'AgCl',
        formulDuz: 'AgCl',
        ad: 'Gümüş klorür',
        yayginAd: 'Fotoğraf filmi tuzu',
        zorluk: BILESIK_ZORLUK.ORTA,
        kategori: BILESIK_KATEGORI.TUZ,
        atomlar: { 'Ag': 1, 'Cl': 1 },
        bagTuru: 'iyonik',
        baglam: 'Gümüş klorür. Fotoğraf filminin temeli (eski).'
    },

    // ═══════════════════════════════════════════════════════
    //  🔴 ZOR SEVİYE (8 bileşik)
    // ═══════════════════════════════════════════════════════
    {
        id: 'h3po4',
        formul: 'H₃PO₄',
        formulDuz: 'H3PO4',
        ad: 'Fosforik asit',
        yayginAd: 'Kolada bulunan asit',
        zorluk: BILESIK_ZORLUK.ZOR,
        kategori: BILESIK_KATEGORI.ASIT,
        atomlar: { 'H': 3, 'P': 1, 'O': 4 },
        bagTuru: 'kovalent',
        baglam: 'Fosforik asit. Kola gibi içeceklerin keskin tadı.'
    },
    {
        id: 'caoh2',
        formul: 'Ca(OH)₂',
        formulDuz: 'Ca(OH)2',
        ad: 'Kalsiyum hidroksit',
        yayginAd: 'Sönmüş kireç',
        zorluk: BILESIK_ZORLUK.ZOR,
        kategori: BILESIK_KATEGORI.BAZ,
        atomlar: { 'Ca': 1, 'O': 2, 'H': 2 },
        bagTuru: 'iyonik',
        baglam: 'Sönmüş kireç. İnşaat harcında.'
    },
    {
        id: 'kmno4',
        formul: 'KMnO₄',
        formulDuz: 'KMnO4',
        ad: 'Potasyum permanganat',
        yayginAd: 'Mor antiseptik',
        zorluk: BILESIK_ZORLUK.ZOR,
        kategori: BILESIK_KATEGORI.DIGER,
        atomlar: { 'K': 1, 'Mn': 1, 'O': 4 },
        bagTuru: 'iyonik',
        baglam: 'Permanganat. Mor kristal antiseptik.'
    },
    {
        id: 'cuso4',
        formul: 'CuSO₄',
        formulDuz: 'CuSO4',
        ad: 'Bakır(II) sülfat',
        yayginAd: 'Mavi vitriol',
        zorluk: BILESIK_ZORLUK.ZOR,
        kategori: BILESIK_KATEGORI.DIGER,
        atomlar: { 'Cu': 1, 'S': 1, 'O': 4 },
        bagTuru: 'iyonik',
        baglam: 'Mavi vitriol. Bağ-bahçede mantar ilacı.'
    },
    {
        id: 'al2o3',
        formul: 'Al₂O₃',
        formulDuz: 'Al2O3',
        ad: 'Alüminyum oksit',
        yayginAd: 'Alümina (yakut/safir)',
        zorluk: BILESIK_ZORLUK.ZOR,
        kategori: BILESIK_KATEGORI.OKSIT,
        atomlar: { 'Al': 2, 'O': 3 },
        bagTuru: 'iyonik',
        baglam: 'Alümina. Korundum (yakut, safir mineralleri).'
    },
    {
        id: 'nh4cl',
        formul: 'NH₄Cl',
        formulDuz: 'NH4Cl',
        ad: 'Amonyum klorür',
        yayginAd: 'Nişadır',
        zorluk: BILESIK_ZORLUK.ZOR,
        kategori: BILESIK_KATEGORI.TUZ,
        atomlar: { 'N': 1, 'H': 4, 'Cl': 1 },
        bagTuru: 'iyonik',
        baglam: 'Nişadır. Eski reçetelerde, kuru pil elektrolitinde.'
    },
    {
        id: 'na2so4',
        formul: 'Na₂SO₄',
        formulDuz: 'Na2SO4',
        ad: 'Sodyum sülfat',
        yayginAd: 'Glauber tuzu',
        zorluk: BILESIK_ZORLUK.ZOR,
        kategori: BILESIK_KATEGORI.TUZ,
        atomlar: { 'Na': 2, 'S': 1, 'O': 4 },
        bagTuru: 'iyonik',
        baglam: 'Glauber tuzu. Cam ve kağıt sanayinde.'
    },
    {
        id: 'h2co3',
        formul: 'H₂CO₃',
        formulDuz: 'H2CO3',
        ad: 'Karbonik asit',
        yayginAd: 'Asitli içecek asidi',
        zorluk: BILESIK_ZORLUK.ZOR,
        kategori: BILESIK_KATEGORI.ASIT,
        atomlar: { 'H': 2, 'C': 1, 'O': 3 },
        bagTuru: 'kovalent',
        baglam: 'Karbonik asit. Yağmur suyu hafif asidik bu yüzden.'
    }
];

// ============================================================
//  YARDIMCI FONKSİYONLAR
// ============================================================

/**
 * ID ile bileşik bulur.
 * @param {string} id - Bileşik ID'si (örn: "h2o")
 * @returns {Object|null} Bileşik nesnesi veya null
 */
function bulBilesikById(id) {
    return BILESIKLER.find(b => b.id === id) || null;
}

/**
 * Belirli bir zorluktaki tüm bileşikleri döner.
 * @param {string} zorluk - BILESIK_ZORLUK değerlerinden biri
 * @returns {Array} Filtrelenmiş bileşik listesi
 */
function bilesikleriZorluga(zorluk) {
    return BILESIKLER.filter(b => b.zorluk === zorluk);
}

/**
 * Belirli bir kategorideki tüm bileşikleri döner.
 * @param {string} kategori - BILESIK_KATEGORI değerlerinden biri
 * @returns {Array} Filtrelenmiş bileşik listesi
 */
function bilesikleriKategoriye(kategori) {
    return BILESIKLER.filter(b => b.kategori === kategori);
}

/**
 * Belirli bir atomu içeren tüm bileşikleri döner.
 * @param {string} atomSembol - Atom sembolü (örn: "Na")
 * @returns {Array} Filtrelenmiş bileşik listesi
 */
function bilesikleriAtomIle(atomSembol) {
    return BILESIKLER.filter(b => b.atomlar[atomSembol] !== undefined);
}

/**
 * Kullanıcının kurduğu atom listesi doğru mu kontrol eder.
 * @param {string} bilesikId - Hedef bileşik ID'si
 * @param {Object} kurulanAtomlar - Kullanıcının yerleştirdiği {atom: adet}
 * @returns {boolean} Doğruysa true
 */
function formulDogruMu(bilesikId, kurulanAtomlar) {
    const b = bulBilesikById(bilesikId);
    if (!b) return false;

    const beklenenKeys = Object.keys(b.atomlar);
    const kurulanKeys = Object.keys(kurulanAtomlar);

    if (kurulanKeys.length !== beklenenKeys.length) return false;

    return beklenenKeys.every(k =>
        kurulanAtomlar[k] === b.atomlar[k]
    );
}

/**
 * Kullanıcının kurduğu formül hangi yanlışı içeriyor? Pedagojik mesaj için.
 * @param {string} bilesikId - Hedef bileşik
 * @param {Object} kurulanAtomlar - Kullanıcının yerleştirdiği
 * @returns {Object} { hata: string, detay: string }
 */
function formulHataAnaliz(bilesikId, kurulanAtomlar) {
    const b = bulBilesikById(bilesikId);
    if (!b) return { hata: 'gecersiz_bilesik', detay: 'Bileşik bulunamadı.' };

    const beklenen = b.atomlar;

    // Tüm atomlar var mı?
    for (const atom of Object.keys(beklenen)) {
        if (!(atom in kurulanAtomlar)) {
            return {
                hata: 'eksik_atom',
                detay: `${atom} atomu eksik. ${b.ad} formülü ${b.formul} olmalı.`
            };
        }
    }

    // Fazla atom var mı?
    for (const atom of Object.keys(kurulanAtomlar)) {
        if (!(atom in beklenen)) {
            return {
                hata: 'fazla_atom',
                detay: `${atom} atomu fazla. ${b.ad} formülünde ${atom} yok.`
            };
        }
    }

    // Atom sayısı yanlış mı?
    for (const atom of Object.keys(beklenen)) {
        if (kurulanAtomlar[atom] !== beklenen[atom]) {
            return {
                hata: 'yanlis_sayi',
                detay: `${atom} sayısı yanlış. Doğru: ${beklenen[atom]}, sen koydun: ${kurulanAtomlar[atom]}.`
            };
        }
    }

    return { hata: null, detay: 'Formül doğru!' };
}

// ============================================================
//  VERİ DOĞRULAMA (Yükleme sırasında çalışır)
// ============================================================
(function dogrula() {
    if (BILESIKLER.length !== 24) {
        console.error(
            `⚠️ BILESIKLER doğrulama hatası: Beklenen 24, mevcut ${BILESIKLER.length}`
        );
        return;
    }

    const kolayCount = BILESIKLER.filter(b => b.zorluk === BILESIK_ZORLUK.KOLAY).length;
    const ortaCount  = BILESIKLER.filter(b => b.zorluk === BILESIK_ZORLUK.ORTA).length;
    const zorCount   = BILESIKLER.filter(b => b.zorluk === BILESIK_ZORLUK.ZOR).length;

    if (kolayCount !== 8 || ortaCount !== 8 || zorCount !== 8) {
        console.error(
            `⚠️ Zorluk dağılımı yanlış: Kolay=${kolayCount}, Orta=${ortaCount}, Zor=${zorCount} (her biri 8 olmalı)`
        );
    }

    const ids = new Set(BILESIKLER.map(b => b.id));
    if (ids.size !== 24) {
        console.error('⚠️ Tekrar eden bileşik ID\'si var!');
    }

    console.log('✅ BILESIKLER veritabanı yüklendi:', BILESIKLER.length, 'bileşik (8+8+8)');
})();
