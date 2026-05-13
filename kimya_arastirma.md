# Kimya Alanı Uzmanlık Araştırması — ELEMENTRA v2

**Hazırlayan:** Claude (asistan)
**Tarih:** 2026-05-12
**Hedef:** TÜBİTAK 4006 Bilim Fuarı kapsamında geliştirilecek lise düzeyi kimya eğitim oyunu için müfredat-temelli içerik haritası
**Hedef kitle:** Lise 9-10. sınıf öğrencileri (oyun oynayanlar) + ortaokul ve genel halk ziyaretçileri (sergi)

---

## 1. MEB Müfredatı Genel Yapısı

### 1.1. Lise 9. Sınıf Kimya Üniteleri (Kaynak: MEB Öğretim Programı)

| Ünite | Süre | İçerik (özet) |
|---|---|---|
| 1. Kimya Bilimi | ~10 saat | Tarihçe, simyacılar, modern kimya, laboratuvar |
| 2. Atom ve Periyodik Sistem | ~22 saat | Atom modelleri, atom yapısı, **periyodik tablo**, **element sembolleri** |
| 3. Kimyasal Türler Arası Etkileşimler | ~16 saat | İyonik/kovalent/metalik bağ, **bileşik adlandırma**, zayıf etkileşimler |
| 4. Maddenin Halleri | ~12 saat | Katı, sıvı, gaz, plazma; hal değişimleri |
| 5. Doğa ve Kimya | ~12 saat | Su, hava, toprak, çevre |

**ELEMENTRA v2 için en kritik üniteler: 2. ve 3. ünite.** Bu iki ünite oyun içeriğinin tamamını besler.

### 1.2. Lise 10. Sınıf Kimya Üniteleri

| Ünite | İçerik |
|---|---|
| 1. Kimyanın Temel Kanunları | Kütle korunumu, sabit oranlar |
| 2. Mol Kavramı | Mol, Avogadro, mol hesapları |
| 3. Karışımlar | Heterojen/homojen, çözeltiler, derişim |
| 4. Asitler, Bazlar ve Tuzlar | pH, nötrleşme, **yaygın asit-baz-tuz formülleri** |
| 5. Kimyasal Tepkimeler | Denklem denkleştirme, tepkime türleri |

**10. sınıfta ELEMENTRA v2 için ek destek:** 4. ünite "Asitler, Bazlar ve Tuzlar" → bileşik formülü modülüne ek içerik (HCl, H₂SO₄, NaOH, NaCl vb.)

---

## 2. Periyodik Tablo — Modül 1 Temeli

### 2.1. Müfredat Kazanımları (MEB 9. sınıf 2. Ünite)

- **9.2.3.1.** Periyodik sistemin oluşturulma sürecini açıklar.
- **9.2.3.2.** Periyodik sistemde periyodik özelliklerin değişimini açıklar (atom yarıçapı, iyonlaşma enerjisi, elektronegatiflik).
- **9.2.3.3.** Periyodik sistemdeki ilk 20 elementi ve günlük hayatta sıkça kullanılan diğer elementlerin sembollerini tanır.
- **9.2.3.4.** Periyodik sistemdeki temel grupları (alkali metaller, toprak alkali metaller, halojenler, soy gazlar) açıklar.

### 2.2. Öğretilmesi Beklenen Elementler

**İlk 20 element (atom numarasıyla):**
| No | Sembol | Ad | Türkçe | Sınıf |
|---|---|---|---|---|
| 1 | H | Hydrogen | Hidrojen | Ametal |
| 2 | He | Helium | Helyum | Soy gaz |
| 3 | Li | Lithium | Lityum | Alkali metal |
| 4 | Be | Beryllium | Berilyum | Toprak alkali metal |
| 5 | B | Boron | Bor | Yarı metal |
| 6 | C | Carbon | Karbon | Ametal |
| 7 | N | Nitrogen | Azot | Ametal |
| 8 | O | Oxygen | Oksijen | Ametal |
| 9 | F | Fluorine | Flor | Halojen |
| 10 | Ne | Neon | Neon | Soy gaz |
| 11 | Na | Sodium | Sodyum | Alkali metal |
| 12 | Mg | Magnesium | Magnezyum | Toprak alkali metal |
| 13 | Al | Aluminum | Alüminyum | Metal |
| 14 | Si | Silicon | Silisyum | Yarı metal |
| 15 | P | Phosphorus | Fosfor | Ametal |
| 16 | S | Sulfur | Kükürt | Ametal |
| 17 | Cl | Chlorine | Klor | Halojen |
| 18 | Ar | Argon | Argon | Soy gaz |
| 19 | K | Potassium | Potasyum | Alkali metal |
| 20 | Ca | Calcium | Kalsiyum | Toprak alkali metal |

**Ek günlük hayat elementleri (MEB özel vurgu):**
| Sembol | Ad | Türkçe | Atom No |
|---|---|---|---|
| Cr | Chromium | Krom | 24 |
| Mn | Manganese | Manganez | 25 |
| Fe | Iron | Demir | 26 |
| Co | Cobalt | Kobalt | 27 |
| Ni | Nickel | Nikel | 28 |
| Cu | Copper | Bakır | 29 |
| Zn | Zinc | Çinko | 30 |
| Br | Bromine | Brom | 35 |
| Ag | Silver | Gümüş | 47 |
| Sn | Tin | Kalay | 50 |
| I | Iodine | İyot | 53 |
| Ba | Barium | Baryum | 56 |
| Pt | Platinum | Platin | 78 |
| Au | Gold | Altın | 79 |
| Hg | Mercury | Cıva | 80 |
| Pb | Lead | Kurşun | 82 |

**Toplam:** 20 + 16 = **36 element** lise 9. sınıfta tanınması beklenir. **ELEMENTRA v2 oyun veritabanının çekirdek listesi bu.**

### 2.3. Periyodik Tablo Yapısı

- **7 periyot** (yatay sıra) — aynı periyotta elektron katman sayısı aynı
- **18 grup** (dikey sütun) = 8 A grubu (1A-8A) + 10 B grubu — aynı grupta değerlik elektron sayısı aynı, kimyasal özellikler benzer
- **Özel grup adları:**
  - 1A: Alkali metaller (H hariç)
  - 2A: Toprak alkali metaller
  - 7A: Halojenler
  - 8A: Soy gazlar (asal gazlar)
- **Metal/Ametal/Yarı metal ayrımı** zigzag çizgisiyle
- **Atom numarası artışı:** Soldan sağa + yukarıdan aşağıya

### 2.4. Periyodik Özellikler (Tablo Trendleri)

| Özellik | Sağa doğru | Aşağı doğru |
|---|---|---|
| Atom yarıçapı | Azalır | Artar |
| İyonlaşma enerjisi | Artar | Azalır |
| Elektronegatiflik | Artar | Azalır |
| Metal karakteri | Azalır | Artar |

Bu trendler **oyun mekaniği için** doğrudan kullanılmayacak ama "Eğlence sorusu" / "Trivia" tipi soru bankası için kullanılabilir.

---

## 3. Element Sembolleri — Modül 2 Temeli

### 3.1. Sembol Yazım Kuralları

- **Tek harfli semboller:** Büyük harf (H, C, N, O, F, P, S, K, V, Y, I, W, U)
- **İki harfli semboller:** İlk harf büyük, ikinci küçük (He, Li, Be, Na, Mg, Al, Si, Cl, Ar, Ca, Fe, Cu, Zn, Ag, Sn, Au, Hg, Pb)
- **Latince kökenli özel semboller** (öğrencilere mutlaka anlatılır):
  - Na = Natrium (Sodyum)
  - K = Kalium (Potasyum)
  - Fe = Ferrum (Demir)
  - Cu = Cuprum (Bakır)
  - Ag = Argentum (Gümüş)
  - Au = Aurum (Altın)
  - Hg = Hydrargyrum (Cıva)
  - Pb = Plumbum (Kurşun)
  - Sn = Stannum (Kalay)
  - Sb = Stibium (Antimon)
  - W = Wolfram (Tungsten)

**Pedagojik değer:** Latince köken bilgisi öğrencilerin sembol-ad ilişkisini daha kalıcı öğrenmesini sağlar. Modül 2'de **bilgi kartı** olarak gösterilebilir.

### 3.2. Sık Karıştırılan Semboller (Eğitici Tuzak Noktaları)

| Sembol | Doğru Element | Yanlış Tahmin |
|---|---|---|
| C | Karbon | Kalsiyum (yanlış — Ca) |
| Co | Kobalt | Karbon + Oksijen birleşik (yanlış) |
| Mn | Manganez | Magnezyum (yanlış — Mg) |
| Hg | Cıva | Hidrojen + Altın (yanlış) |
| Si | Silisyum | Kükürt (yanlış — S) |
| K | Potasyum | Kalsiyum / Karbon (yanlış) |
| Na | Sodyum | Nitrojen + Alüminyum (yanlış) |

**ELEMENTRA v2 Modül 2 (Memory) için:** Bu sık karıştırma noktaları seviye 2-3'te çekici "yanlış cevap" olarak kullanılabilir.

---

## 4. Bileşik Formülleri — Modül 3 Temeli

### 4.1. Müfredat Kazanımları (MEB 9. sınıf 3. Ünite)

- **9.3.2.1.** İyonik bileşiklerin formüllerini yazar (değerlik kullanarak).
- **9.3.2.2.** Kovalent bileşiklerin formüllerini yazar.
- **9.3.2.3.** Yaygın bileşiklerin sistematik ve yaygın adlarını eşleştirir.
- **9.3.3.1.** Kimyasal türler arasındaki zayıf etkileşimleri (Van der Waals, hidrojen bağı) açıklar.

### 4.2. Lise 9. Sınıf Kapsamında Yaygın Bileşikler

#### 4.2.1. Su ve Basit Moleküller
| Formül | Ad | Yaygın Ad |
|---|---|---|
| H₂O | Dihidrojen monoksit | Su |
| H₂O₂ | Hidrojen peroksit | Oksijenli su |
| O₂ | Dioksijen | Oksijen gazı |
| O₃ | Triokisjen | Ozon |
| N₂ | Diazot | Azot gazı |
| H₂ | Dihidrojen | Hidrojen gazı |
| Cl₂ | Diklor | Klor gazı |

#### 4.2.2. Karbon Bileşikleri (Çok Tanıdık)
| Formül | Ad | Yaygın Ad / Bağlam |
|---|---|---|
| CO₂ | Karbondioksit | Soluduğumuz gaz, asitli içecek gazı |
| CO | Karbonmonoksit | Zehirli gaz |
| CH₄ | Metan | Doğalgaz ana bileşeni |
| C₂H₆O / C₂H₅OH | Etanol | Alkol |
| CaCO₃ | Kalsiyum karbonat | Kireç taşı, mermer |
| NaHCO₃ | Sodyum bikarbonat | Karbonat (mutfak) |

#### 4.2.3. Tuzlar (İyonik Bileşikler — En Çok Öğretilen)
| Formül | Ad | Yaygın Ad |
|---|---|---|
| NaCl | Sodyum klorür | Sofra tuzu |
| KCl | Potasyum klorür | Tuz alternatifi |
| CaCl₂ | Kalsiyum klorür | Yol tuzu |
| MgCl₂ | Magnezyum klorür | — |
| AgCl | Gümüş klorür | Fotoğraf filmi |
| NaF | Sodyum florür | Diş macunu |
| KI | Potasyum iyodür | İyotlu tuz |
| FeS | Demir sülfür | — |
| ZnO | Çinko oksit | Güneş kremi |
| Fe₂O₃ | Demir(III) oksit | Pas |
| Al₂O₃ | Alüminyum oksit | Korundum |

#### 4.2.4. Asitler (10. Sınıf Asit-Baz-Tuz Ünitesi)
| Formül | Ad | Yaygın Ad |
|---|---|---|
| HCl | Hidroklorik asit | Tuz ruhu |
| H₂SO₄ | Sülfürik asit | Zaç yağı |
| HNO₃ | Nitrik asit | Kezzap |
| H₃PO₄ | Fosforik asit | Kolada bulunur |
| CH₃COOH | Asetik asit | Sirke |
| H₂CO₃ | Karbonik asit | Asitli içecek |

#### 4.2.5. Bazlar
| Formül | Ad | Yaygın Ad |
|---|---|---|
| NaOH | Sodyum hidroksit | Sud kostik, çamaşır suyu hammaddesi |
| KOH | Potasyum hidroksit | Potas |
| Ca(OH)₂ | Kalsiyum hidroksit | Sönmüş kireç |
| Mg(OH)₂ | Magnezyum hidroksit | Mide ilacı (antiasit) |
| NH₃ | Amonyak | Temizlik maddesi |
| NH₄OH | Amonyum hidroksit | Sıvı amonyak |

#### 4.2.6. Diğer Önemli Bileşikler
| Formül | Ad | Bağlam |
|---|---|---|
| C₆H₁₂O₆ | Glikoz | Şeker (kan şekeri) |
| C₁₂H₂₂O₁₁ | Sukroz | Çay/kahve şekeri |
| C₆H₆ | Benzen | Organik çözücü |
| H₂S | Hidrojen sülfür | Çürük yumurta kokusu |
| SO₂ | Kükürt dioksit | Hava kirletici |
| NO₂ | Azot dioksit | Hava kirletici |
| KMnO₄ | Potasyum permanganat | Antiseptik |
| CuSO₄ | Bakır(II) sülfat | Mavi vitriol |
| Na₂SO₄ | Sodyum sülfat | Tuz |

### 4.3. ELEMENTRA v2 Modül 3 İçin Önerilen Bileşik Setleri

**Seviye 1 (Kolay — 8 bileşik):**
H₂O, CO₂, NaCl, O₂, CH₄, HCl, NH₃, H₂

**Seviye 2 (Orta — 8 bileşik):**
NaOH, H₂SO₄, CaCO₃, Fe₂O₃, NaHCO₃, KI, MgO, AgCl

**Seviye 3 (Zor — 8 bileşik):**
H₃PO₄, Ca(OH)₂, KMnO₄, CuSO₄, Al₂O₃, NH₄Cl, Na₂SO₄, H₂CO₃

**Toplam: 24 bileşik** — kullanıcı isterse daha azı / daha fazlası seçilebilir.

---

## 5. Adlandırma Mantığı (Modül 3 İçin)

### 5.1. İyonik Bileşik Adlandırma (Türkçe MEB Kuralları)
- **Metal + Ametal → Metal adı + Ametal kökü + "-ür" eki**
  - Örn: Na + Cl → Sodyum klorür (NaCl)
  - Örn: K + I → Potasyum iyodür (KI)
- **Değerlik (yük) farklı olabilen metal varsa → Roma rakamı**
  - Örn: FeCl₂ → Demir(II) klorür
  - Örn: FeCl₃ → Demir(III) klorür

### 5.2. Kovalent Bileşik Adlandırma
- **Sayı önekleri:** mono, di, tri, tetra, penta, heksa
  - Örn: CO₂ → Karbondioksit (mono karbon + di oksit)
  - Örn: N₂O₅ → Diazot pentaoksit

### 5.3. Asit Adlandırma
- HCl → Hidroklorik asit (hidrojen + klorik + asit)
- H₂SO₄ → Sülfürik asit
- HNO₃ → Nitrik asit
- CH₃COOH → Asetik asit (etanoik asit)

### 5.4. Baz Adlandırma
- NaOH → Sodyum hidroksit (metal adı + hidroksit)
- Ca(OH)₂ → Kalsiyum hidroksit

---

## 6. ELEMENTRA v2 İçin Pedagojik Eşleştirme

| Modül | MEB Kazanımı | Hedef Kalıcı Bilgi |
|---|---|---|
| Modül 1 — Element Avı (Periyodik Tablo) | 9.2.3.3, 9.2.3.4 | İlk 36 elementin tabloda konumu + grup adları |
| Modül 2 — Sembol Eşleştirme (Memory) | 9.2.3.3 | Element adı ↔ sembol eşleşmesi, Latince kökenler |
| Modül 3 — Formül Yapboz | 9.3.2.1, 9.3.2.2, 9.3.2.3 | Bileşik formülünü ad ile eşleme, atom oranı kurma |

**Üçü birlikte → MEB 9. sınıf 2. ve 3. ünitenin tüm "tanıma/eşleştirme" boyutu kapsanır.** Hesaplama (mol vb.) ve denklem denkleştirme bu oyunun kapsamı dışındadır (zaman + karmaşıklık riski).

---

## 7. Bilim Doğruluğu Kontrolleri (Sergide Jüri/Öğretmen Sorularına Hazırlık)

### 7.1. Tarihsel/Bilim Felsefesi Notları
- **Mendeleev (1869):** İlk modern periyodik tablo. Atom kütlesine göre sıralama. Eksik elementlerin yerini boş bırakıp özelliklerini tahmin etti (Ga, Ge, Sc).
- **Moseley (1913):** Atom numarasını (proton sayısı) keşfetti → modern sıralama bu temele dayanır.
- **IUPAC:** Uluslararası kuralları belirleyen kurum. "Sembol nasıl yazılır" gibi standartlar IUPAC'tan.

### 7.2. Sık Sorulan Sorular (Sergi Hazırlığı)
1. "En çok element nerede bulunur?" → Evren'de H (%75) ve He (%24); Dünya'da O (%46), Si (%28), Fe; İnsan vücudunda O (%65), C (%18), H (%10).
2. "Yapay element nedir?" → Atom numarası 95'ten büyük olanlar (Am, Cm, Bk, vb.) laboratuvarda üretilir.
3. "En yeni elementler?" → 113-118 arası (Nh, Fl, Mc, Lv, Ts, Og) 2016'da resmi olarak adlandırıldı.
4. "Türk bilim insanı element keşfetti mi?" → Hayır resmi olarak. Ancak Türk araştırmacılar uluslararası ekiplerde nadir toprak elementi araştırmalarında bulundu.

### 7.3. Yaygın Yanlış Bilgi (Düzeltme)
- ❌ "Hidrojen alkali metaldir" → ✅ Hidrojen ametaldir, sadece 1A grubunda gösterilir (değerlik elektron sayısı 1).
- ❌ "Helyum 8A grubundadır ama değerlik elektronu 8'dir" → ✅ He'nin değerlik elektronu 2'dir (1s²), tek istisna.
- ❌ "H₂O bir element" → ✅ Su bir bileşiktir, element değildir.

---

## 8. Kaynaklar

### Resmi MEB Kaynakları
- [MEB Kimya Dersi Öğretim Programı (Ortaöğretim)](https://mufredat.meb.gov.tr/Dosyalar/201812102955190-19.01.2018%20Kimya%20Dersi%20%C3%96%C4%9Fretim%20Program%C4%B1.pdf)
- [MEB 9. Sınıf Kimya Programı](https://mufredat.meb.gov.tr/Dosyalar/TTKB/Lise/9/Kimya/kimya_9.pdf)
- [MEB 10. Sınıf Kimya Programı](https://mufredat.meb.gov.tr/Dosyalar/TTKB/Lise/10/Kimya/kimya_10.pdf)
- [MEB Öğretim Programları Portalı](https://mufredat.meb.gov.tr/ProgramDetay.aspx?PID=350)
- [TYMM (Türk Yetkinlik Modelleme Merkezi) Kimya Programı](https://tymm.meb.gov.tr/ogretim-programlari/kimya-dersi)

### Eğitim Portalları
- [Khan Academy Türkçe 9. Sınıf Kimya: Kimyasal Türler Arası Etkileşimler](https://tr.khanacademy.org/science/9-sinif-kimya/xc2e85e5e5552a301:3-unite-kimyasal-turler-arasi-etkilesimler)
- [EBA OGM Materyal: Kimya 9 - Kimyasal Türler Arası Etkileşimler](https://ogmmateryal.eba.gov.tr/panel/panel/EKitapUniteOnizle.aspx?Id=171)
- [Bikifi: Elementler ve Bileşikler](https://bikifi.com/biki/bilim-olarak-kimya-elementler-ve-bilesikler/)

### Müfredat Özetleri
- [10. Sınıf Kimya Konuları ve Müfredatı (2025-2026)](https://www.basarisiralamalari.com/10-sinif-kimya-konulari-meb/)
- [Periyodik Tabloda İlk 20 Element](https://www.sabah.com.tr/egitim/periyodik-tabloda-ilk-20-element-nedir-ilk-20-element-sembolleri-ve-ozellikleri-e1-5388987)
- [9. Sınıf Periyodik Tablo Ders Notu](https://www.eokultv.com/element-sembolleri/9047)

### Açık İçerik Periyodik Tablo Verileri (Kod İçin)
- [ptable.com — İnteraktif Periyodik Tablo](https://ptable.com) (broşürdeki kaynak)
- [webelements.com — Element Verileri](https://webelements.com) (broşürdeki kaynak)
- [PubChem Periodic Table](https://pubchem.ncbi.nlm.nih.gov/periodic-table/)

---

## 9. Özet — Geliştiriciye Hızlı Referans Kart

```
ELEMENTRA v2 KİMYA İÇERİĞİ:
- 36 element çekirdek listesi (ilk 20 + 16 yaygın)
- 24 bileşik (8 kolay + 8 orta + 8 zor)
- 4 grup adı (alkali, toprak alkali, halojen, soy gaz)
- 5 sınıflandırma (metal, ametal, yarı metal, soy gaz, geçiş metali)
- 7 periyot × 18 grup periyodik tablo grid

MÜFREDAT BAĞLAMI:
- 9. sınıf 2. Ünite (Atom ve Periyodik Sistem) — Modül 1 + 2
- 9. sınıf 3. Ünite (Kimyasal Türler Arası Etkileşimler) — Modül 3
- 10. sınıf 4. Ünite (Asit-Baz-Tuz) — Modül 3 ek içerik
```
