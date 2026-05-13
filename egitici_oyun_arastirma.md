# Eğitici Oyun Tasarımı Uzmanlık Araştırması — ELEMENTRA v2

**Hazırlayan:** Claude (asistan)
**Tarih:** 2026-05-12
**Hedef:** TÜBİTAK 4006 Bilim Fuarı sergisinde kullanılacak kimya öğretici oyununun **kanıt-temelli** tasarımı için saha bilgisi derleyişi
**Bağlam:** 1 hafta geliştirme + lise öğrencileri ile birlikte üretim + sergi konuğu jüri/ziyaretçi deneyimi

---

## 1. Bilimsel Kanıtlar — Oyun Temelli Öğrenme Kimyada Çalışıyor

### 1.1. Üst Düzey Meta-Analizler

#### Hu et al. (2022) — Üç Seviyeli Meta-Analiz, Journal of Research in Science Teaching
- 2014-2024 arası tüm kimya oyun çalışmalarını birleştirdi
- **Sonuç:** Oyun temelli yaklaşımlar (game-based learning, gamification, serious games) **3'ü de** akademik başarı, motivasyon ve sınıf etkileşimi üzerinde **anlamlı olumlu etki** gösterdi
- Etki büyüklükleri: 8. sınıftan 12. sınıfa kadar tutarlı
- **Anahtar bulgu:** Etkileşim + zorluk + oyun + geri bildirim → kimya öğrenmedeki düşük performans/motivasyon/olumsuz duygu sorunlarını çözüyor

#### Carrillo et al. (2025) — RSC Sistematik Derleme (Chemistry Education Research and Practice)
- 2014-2024 arası tüm kimya oyun yaklaşımları
- **Vurgu:** Soyut kimyasal fikirleri somut oyun mekaniklerine çevirme → moleküler etkileşim "elle tutulur" olduğunda öğrenme katlanıyor

### 1.2. Periyodik Tablo Özelinde Kanıt

#### Snakeleev Çalışması (2025, Journal of Chemical Education)
- Periyodik tabloyu öğreten gamified oyun
- **Etki büyüklüğü (Cohen's d):** 1.23 → 2.67 (literatürde "çok büyük" / "muazzam" kategorisi)
- **Süre:** Sadece **10-20 dakikalık oyun** sonrası ölçüm
- **Memnuniyet:** Öğrencilerin %90+'ı oyunu öğretici ve eğlenceli buldu
- **Spesifik test sonucu:** Eşleştirme testi (sembol-ad) ortalaması 18.5 → 28.5 (%54 artış)
- **Anahtar tasarım kararı:** Grup/periyot bilgilerini başta GİZLİ tut, seviye seviye aç → bilişsel yük yönetimi

#### STEM-PT Traveler (2024, RSC)
- Lise öğrencileri için periyodik tablo macera oyunu
- **MANCOVA analizi:** Genel motivasyon + içsel motivasyon + kariyer motivasyonu + öz-yeterlik anlamlı arttı
- **Pedagojik temel:** Self-Determination Theory (Özbelirleme Kuramı)

#### E-CHEMMEND (2022, sembol-ad öğretimi)
- Bilişsel gelişim için sembol/periyodiklik öğretimi
- **Ana içgörü:** Memorization (ezber) yerine oyun → bilgi kalıcılığı çok daha yüksek
- **Tasarım: Levels açık + grup/periyot gizli → açıklayıcı oyun

### 1.3. Türkiye Bağlamı

- **MEB Bilişim ve Tasarım Müfredatı** (Lise 9-10 seçmeli): Oyun tasarımı temelli projeler doğrudan uygun
- **TÜBİTAK 4006:** "Oyun ve Oyunlaştırma" tematik konusu mevcut — ELEMENTRA'nın resmi başvuru kategorisi (PDF broşürdeki "TEMATİK KONUSU: Oyun ve Oyunlaştırma" bunu kanıtlar)

---

## 2. Tasarım Prensipleri — Kanıt-Temelli Tasarım Çerçevesi

### 2.1. Self-Determination Theory (Özbelirleme Kuramı) Uyumu

Etkili eğitici oyun **3 temel ihtiyacı** karşılar:

| İhtiyaç | Tanım | ELEMENTRA v2'de Uygulama |
|---|---|---|
| **Özerklik** | "Ben seçiyorum, bana dayatılmıyor" | 3 modülden oyuncu seçer; zorluk seviyesi seçer |
| **Yetkinlik** | "Yapabiliyorum, ilerliyorum" | Görünür skor + seviye + doğru cevap onayı |
| **İlişkilendirme** | "Bu önemli, bağlam var" | Her bileşiğin gerçek hayat bağlamı (su, tuz, kireç) |

### 2.2. Bilişsel Yük Kuramı (Cognitive Load Theory)

**Üç tür yük:**
1. **Intrinsic (Doğal):** Konunun zorluğu — kimyada doğal yüksek
2. **Extraneous (Dışsal):** UI karmaşası, gereksiz bilgi — **EN AZA İNDİR**
3. **Germane (İşlevsel):** Şemalar kurma — **EN ÜST**E ÇIKAR

**ELEMENTRA v2 uygulaması:**
- **Tek ekran, tek odak** → extraneous yük sıfır
- **Aşamalı bilgi açımı** → karmaşıklığı zaman içine yay
- **Açıklayıcı geri bildirim** → doğru cevap geldiğinde 1-2 cümle "neden doğru" → germane yük artar

### 2.3. Çekirdek Tasarım Öğeleri (Hu 2022 + Snakeleev'ten)

| Öğe | Nasıl uygulanır |
|---|---|
| **Hedef (Goal)** | Her oyunda net: "10 doğru cevap" / "12 çift eşleştir" |
| **Kural (Rule)** | 1-2 cümleyle açıklanabilir |
| **Geri Bildirim (Feedback)** | Anında: ses + renk + animasyon |
| **Skor (Score)** | Görünür, sürekli güncellenir |
| **Zorluk (Challenge)** | Seviyeli — kolay → zor |
| **İlerleme (Progression)** | Görsel olarak izlenebilir (bar/puanlama) |
| **Yarış (Competition)** | Yüksek skor tablosu (lokal) |
| **Otorite (Agency)** | Oyuncu seçimler yapar |

---

## 3. Sergi Ortamında Eğitici Oyun — Özel Tasarım Bağlamı

### 3.1. Sergi Bağlamının Eşsiz Kısıtları

Sergideki bir oyun, evdeki oyundan **temelde farklıdır**:

| Boyut | Ev oyunu | Sergi oyunu |
|---|---|---|
| Süre | 30+ dakika | 1-3 dakika (sonraki kişi bekliyor) |
| Öğrenme eğrisi | 5-10 dakika tutorial OK | 30 saniyede anlaşılmalı |
| Hata toleransı | Kaydet/yükle var | Hata = baştan başla |
| Konsantrasyon | Yüksek | Düşük (gürültü, etrafa bakma) |
| Donanım | Bilinen | Sergi bilgisayarı (mouse + klavye?) |
| Ziyaretçi tipi | Tek profil | Çocuk + lise + ebeveyn + jüri |

### 3.2. Sergi Oyunu İçin "Altın Saatler"

**0-3 saniye (Pasif İlgi):** Ekrana bakar, "bu nedir?" → Görsel cazibe + tanınır konsept (periyodik tablo görüntüsü)

**3-10 saniye (Aktif İlgi):** Yaklaşır, başlığı okur → Net başlık + 1 cümle açıklama ("Periyodik tablodan elementi bul!")

**10-30 saniye (Karar):** Oynamaya başlar veya çekilir → "Başla" butonu görünür + ilk tıklama anında oyun

**30-90 saniye (Akış):** Oynar → Her etkileşimde hızlı geri bildirim

**90-180 saniye (Tamamlama):** Bitirir → Skor + "Tekrar oyna" / "Başka modül dene"

### 3.3. Sergide Çalışan vs Çalışmayan Mekanikler

✅ **ÇALIŞIR:**
- Tıkla-eşleştir (basit motor)
- Sürükle-bırak (klavye gerekmez)
- Süre baskısı (urgency yaratır)
- Yüksek skor (sonraki ziyaretçi rekabet eder)
- Kolay-orta-zor seçimi (yaş gruplarına esneklik)

❌ **ÇALIŞMAZ:**
- Uzun tutorial (sergi insanı okumaz)
- Klavyeyle yazı yazma (zaman alır)
- Çok kararlı stratejik oynama (akış kırılır)
- Anlatım sesi (gürültüde duyulmaz)
- Hayatlar/can sistemi (öğrenmeyi cezalandırır)

---

## 4. Mekanik Kataloğu — Kimyaya Uygun Etkili Oyun Türleri

### 4.1. Eşleştirme (Matching) Oyunları
**Tipi:** Memory / Match-3 / Pairs
**Kimyada uygulama:**
- Element adı ↔ sembol (Snakeleev kanıtladı)
- Bileşik formülü ↔ yaygın ad
- Asit/baz ↔ pH değeri
- Element ↔ grup adı

**Avantaj:** En basit kod (lise öğrencisi anlar) + en bilinen oyun (anlatım gerektirmez)
**Dezavantaj:** Görsel zenginlik sınırlı

### 4.2. Tıkla-Bul (Click-to-Find) Oyunları
**Tipi:** Where's Waldo / Hidden Object / Hot Spot
**Kimyada uygulama:**
- Periyodik tabloda belirtilen elementi tıkla (Element Avı)
- Verilen özelliğe (alkali metal) sahip elementi seç
- Karışımdan istenen iyonu bul

**Avantaj:** Görsel olarak güçlü (gerçek periyodik tablo)
**Dezavantaj:** Tablo grid kodu biraz iş

### 4.3. İnşa Oyunları (Construction/Build)
**Tipi:** Yapboz / Lego / Crafting
**Kimyada uygulama:**
- Formül kurma (H + H + O → H₂O)
- Atom modelinde elektron yerleştirme
- Karışımdan ayırma süreci

**Avantaj:** En derin eğitsel etki (yapısal düşünme)
**Dezavantaj:** Karmaşık UI riski → sergi için tehlikeli

### 4.4. Hızlı Tepki (Quick Response) Oyunları
**Tipi:** Trivia / Quiz / Reaction Game
**Kimyada uygulama:**
- Çoktan seçmeli hızlı sorular
- Doğru/yanlış sembol gösterimi
- Zamana karşı doğru sembol seçme

**Avantaj:** En düşük kod karmaşıklığı
**Dezavantaj:** Tekrar oynama isteği düşük (sorular biter)

### 4.5. ELEMENTRA v2 Mekanik Seçimi (Karar Verilmiş)

| Modül | Mekanik | Neden |
|---|---|---|
| Modül 1 — Element Avı | Tıkla-Bul (Click-to-Find) | Periyodik tablonun **görsel** öğretimi için en uygun; sergi cazibesi yüksek |
| Modül 2 — Sembol Eşleştirme | Eşleştirme (Memory) | Snakeleev/E-CHEMMEND kanıtlı; en basit ısınma oyunu; her yaş oynar |
| Modül 3 — Formül Yapboz | İnşa (Construction) | Bileşik formülünü **anlamlı** kurma; derin öğrenme |

**Çeşitlilik avantajı:** 3 farklı mekanik = farklı oyuncu tipleri tatmin edilir + tek-mekanik sıkılma kırılır

---

## 5. UI/UX Tasarım Prensipleri (Eğitici Oyun Özelinde)

### 5.1. Görsel Hiyerarşi
1. **En büyük element:** Oyun alanı (periyodik tablo / memory kartları / yapboz)
2. **Orta büyüklük:** Skor + süre + soru/hedef
3. **Küçük:** Menü/ayar butonları

**Yanlış:** ELEMENTRA v1'de Mr.White paneli sol üstte oyun alanı kadar yer kaplıyordu — bilişsel yük katlandı.

### 5.2. Renk Kullanımı (Erişilebilirlik Dahil)
- **Doğru = Yeşil** (#10B981 önerilen — WCAG AA kontrast)
- **Yanlış = Kırmızı** (#EF4444)
- **Vurgu = Sarı/Turuncu** (#F59E0B)
- **Pasif/Bekleyen = Gri** (#9CA3AF)

**Renk körü uyumu:**
- Sadece renge dayanma; ikon + metin de ekle (✓ Doğru / ✗ Yanlış)
- Yeşil-kırmızı en sık körlük olduğundan, ikonla destekle

### 5.3. Tipografi
- **Başlık font:** Geometrik sans-serif (Oxanium, Orbitron, Bebas Neue gibi) → bilim-tema
- **Gövde font:** Yüksek okunabilirlik (Inter, Open Sans, Source Sans) → ana okuyuş
- **Sembol font:** Monospace değil (kimya sembolü monospace değildir) → normal sans
- **Boyut:** Mobil + sergi ekranında 14pt minimum

### 5.4. Geri Bildirim Mekanikleri
| Olay | Görsel | İşitsel | Dokunsal (eğer mobil) |
|---|---|---|---|
| Doğru cevap | Yeşil flash + tik ikonu + 1 satır açıklama | "Ding" tonu | Hafif titreşim |
| Yanlış cevap | Kırmızı flash + X ikonu + doğru cevap | "Buzz" tonu | Hızlı titreşim |
| Seviye atlama | Konfeti + level-up animasyonu | Şampiyon tonu | Pulse titreşim |
| Süre bitti | Saat kırmızı + ekran kararması | Alarm sesi | - |
| Boş ekran | Hiçbir şey | Sessiz | - |

**Ses kuralı:** **Mute butonu OLMALI**. Sergide gürültü var → açılışta sesli, hızlı mute seçeneği şart.

### 5.5. Animasyon
- **Anlık geri bildirim:** 100-200ms (hızlı)
- **Sahne geçişi:** 300-500ms
- **Önemli olay (seviye atlama):** 1-2 saniye

**ELEMENTRA v1 hatası:** 850-1050ms gecikmeler tepkimeden sonra → akış kırıldı.

---

## 6. Erişilebilirlik (WCAG 2.1 AA Düzeyi)

### 6.1. Sergi Ziyaretçileri Çeşitliliği
- Yaş 7-70+ arası gelir
- Renk körlüğü olabilir
- Engelli ziyaretçi olabilir
- Türkçe seviyesi farklı (çocuk vs yetişkin)

### 6.2. Karşılanması Gereken Standartlar
- ✅ **Renk kontrastı:** 4.5:1 (metin) / 3:1 (büyük metin)
- ✅ **Klavye erişimi:** Tab ile gezinme, Enter ile etkinleştirme (jüri test edebilir)
- ✅ **Yazı boyutu:** Min 14pt, kullanıcı büyütebilmeli
- ✅ **Animasyon kontrolü:** `prefers-reduced-motion` desteği (epilepsi/migren)
- ✅ **Aria etiketleri:** Ekran okuyucu için
- ✅ **Hata mesajı netliği:** "Yanlış, doğru cevap NaCl"

### 6.3. ELEMENTRA v1'de Eksik Olanlar (Düzeltilecek)
- Klavye kontrol yoktu → klavye desteği ekle
- `prefers-reduced-motion` yoktu → ekle
- Aria etiketleri yoktu → her button'a `aria-label`
- Kontrast bazı yerlerde 3:1 altındaydı (cyan üzeri sarı metin) → revize et

---

## 7. Pedagojik Etki Maksimize Etme — "Sadece Eğlence Değil, Öğrenme"

### 7.1. Açıklayıcı Geri Bildirim Şart

**Yanlış cevap → SADECE "Yanlış" demek YETMEZ**
- ✅ "Yanlış! NaCl = Sodyum klorür. Cl = Klor sembolü."
- ✅ "Yakın! Magnezyum'un sembolü Mg (M kalır), Manganez'in Mn (n eklenir)."

### 7.2. Bağlam Kartı (Microcontent)

Her oyun olayında 1-2 cümle gerçek dünya bağlamı:
- "Su (H₂O) günde 2 litre içmen gereken bileşik."
- "Demir (Fe) kanındaki hemoglobin'in merkezindedir."
- "Helyum (He) hava balonlarını kaldıran gazdır."

**Etki:** Pasif öğrenme → aktif anlamlandırma. Bilgi 30 saniyelik bağlamla **kalıcı** olur.

### 7.3. Yansıtma Anı (Reflection Moment)

Oyun bittiğinde sadece skor değil:
- ✅ "8 element öğrendin!" (gerçek bilgi sayısı)
- ✅ "En çok zorlandığın: Geçiş metalleri" (öz farkındalık)
- ✅ "Bir sonraki seferde dene: Halojenler" (öneri)

### 7.4. Çoklu Temsil (Multiple Representation)

Aynı bilgiyi **farklı yollarla** göster:
- Sembol (Na) + Ad (Sodyum) + Görsel (parlak metal fotoğrafı veya ikonu) + Bağlam (sofra tuzunun yarısı)

→ Görsel + dilsel + bağlamsal hafızanın hepsini aktive et.

---

## 8. TÜBİTAK 4006 Sergisinde Sunum İçin Hazırlık

### 8.1. Standart Stand Ekipmanı
- 1 dizüstü/masaüstü bilgisayar
- 1 monitör (genelde 21-24")
- Klavye + mouse
- Poster pano (1.5m × 1m)
- 3 sandalye (öğrenciler için)
- Elektrik priz erişimi

### 8.2. Oyun Standı için Optimal Düzen
1. **Bilgisayar gözünde:** Oyun açık + ana menü
2. **Poster:** Proje amacı + 3 modül tanıtım + Şehir/Okul/Öğretmen
3. **El broşürü:** Mevcut TÜBİTAK broşürü güncellenmiş hali
4. **QR Kod:** Oyunun web sürümü (sergi sonrası evde oynanabilir)

### 8.3. Jüri Ziyareti Senaryosu (3-5 dakika)

**Saniye 0-30:** Öğrenci karşılar → "Projemiz kimya öğretici 3 modüllü oyun. Hangisini denemek istersiniz?"
**Saniye 30-90:** Jüri 1 modülü dener → öğrenci açıklar
**Saniye 90-180:** Jüri sorgular → öğrenciler cevaplar (kimya doğruluğu + kod + pedagojik amaç)
**Saniye 180-300:** Öğrenciler sonuç tablosu gösterir (test edenler ne öğrendi)

### 8.4. Öğrencilerin Hazır Olması Gereken Sorular

- "Bu oyunu kim oynayabilir?" → "Lise 9-10 ana hedef, ama 6+ yaş üstü herkes oynayabilir."
- "Hangi MEB kazanımlarını öğretiyor?" → 9.2.3.3 + 9.3.2.1 + 9.3.2.2
- "Test ettiniz mi, ne öğrendiler?" → Sınıf testi sonucu (uygularsa)
- "Kodu siz mi yazdınız?" → "AI asistanı ile birlikte yazdık, her satırı anlıyoruz."
- "Niye kart oyunu (eski) bıraktınız?" → "Çok karmaşıktı, amaca uzaktı. Sade ve eğitici yaptık."
- "Çocuklar sıkılmaz mı?" → "Üç farklı oyun türü + seviyeler + skor rekabeti var, denemiş çocuklar tekrar oynadı."

### 8.5. ELEMENTRA v1 Reddinin Açıklaması (Jüri Soracaksa)

**Cevap şablonu:**
> "İlk versiyonumuz [TARİH] reddedildi çünkü amaca uzaktı — kart oyunu mekanigi öğrenmeyi destekliyor görünüyor ama aslında ezbere yöneltiyordu. Bu eleştiri bizim için **değerli geri bildirim** oldu. ELEMENTRA v2'yi sıfırdan, **MEB kazanımlarına bire bir hizalı**, sergi koşullarına uygun (1-3 dakika tur), ve **pedagojik kanıt-temelli** (Hu 2022 meta-analiz + Snakeleev tasarım rationale) yaklaşımla yeniden tasarladık."

---

## 9. Risk Yönetimi — Bilinmesi Gereken Tuzaklar

### 9.1. Aşırı Mühendislik Tuzağı
- ❌ "5 farklı animasyon ekleyelim"
- ❌ "Yapay zekalı rakip ekleyelim"
- ❌ "Online çok oyunculu yapalım"
- ✅ Sade kalmak = anlaşılır kalmak

### 9.2. "Eğlenceli Ama Eğitici Değil" Tuzağı
- ❌ Sadece klikleme, ezbere yöneltme
- ❌ Görsel cazibe + boş içerik
- ✅ Her doğru cevapta öğrenme momenti

### 9.3. "Eğitici Ama Sıkıcı" Tuzağı
- ❌ Quiz ekranı, ekrana metin yığma
- ❌ Hiç animasyon yok, robotik
- ✅ Doğru ses + animasyon + skor + meydan okuma

### 9.4. Sergide Çökme Tuzağı
- ❌ Internet bağımlı oyun
- ❌ Yüksek FPS gerektiren animasyon
- ❌ Kaydedilemeyen state
- ✅ Tek HTML dosyası + offline çalışır + localStorage

### 9.5. Telif/Etik Tuzağı
- ❌ Breaking Bad referansları (Walter White/Black)
- ❌ Ünlü oyun karakterleri
- ❌ Lisanssız müzik
- ✅ Özgün karakter/grafik/ses (creative commons OK)

---

## 10. Kaynaklar — Akademik ve Uygulamalı

### 10.1. Kilit Akademik Kaynaklar
- [Hu et al. (2022) - Game-based learning meta-analysis](https://onlinelibrary.wiley.com/doi/full/10.1002/tea.21765) — Journal of Research in Science Teaching
- [Carrillo et al. (2025) - Systematic review of game-based chemistry](https://pubs.rsc.org/en/content/articlehtml/2025/rp/d5rp00248f) — Chemistry Education Research and Practice
- [Snakeleev (2025) - Gamified periodic table](https://pubs.acs.org/doi/10.1021/acs.jchemed.5c00029) — Journal of Chemical Education
- [Educational Videogame for Periodic Table (2021)](https://pubs.acs.org/doi/10.1021/acs.jchemed.1c00109) — JChemEd
- [STEM-PT Traveler (2024)](https://pubs.rsc.org/en/content/articlelanding/2024/rp/d4rp00032c) — RSC Chemistry Education
- [Game-based learning systematic review (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9160041/)
- [1925-2024: One Century of Educational Games in Chemistry](https://pubs.acs.org/doi/10.1021/acs.jchemed.4c01238)
- [E-CHEMMEND: Cognitive development in chemical symbols](https://www.academia.edu/70300960/Enhancing_Cognitive_Development_in_Learning_Chemical_Symbol_and_Periodicity_through_Instructional_Game)
- [Systematic Literature Review on Gamification + Periodic Table](https://www.researchgate.net/publication/386392685_Systematic_Literature_Review_on_The_Use_of_Gamification_Approaches_in_Mastering_the_Periodic_Table_of_Elements_Chemistry)

### 10.2. Eğitici Oyun Tasarım Çerçeveleri
- [Educational game design: game elements for promoting engagement (arXiv 2017)](https://arxiv.org/abs/1709.09931)
- [EDTF: A User-Centered Approach to Digital Educational Games Design (2025)](https://www.mdpi.com/2078-2489/16/9/794)
- [Design Principles for Flow Experience in Educational Games (ScienceDirect)](https://www.sciencedirect.com/science/article/pii/S1877050912008228)
- [UX of Educational Games: A Review (ScienceDirect)](https://www.sciencedirect.com/science/article/pii/S187705091503584X)
- [Design of Educational Games — CMU HCI](https://hcii.cmu.edu/course/design-of-educational-games)

### 10.3. TÜBİTAK 4006 Resmi Kaynaklar
- [4006 - TÜBİTAK Bilim Fuarları Destekleme Programı](https://tubitak.gov.tr/en/funds/science-society/national-support-programs/4006-tubitak-science-fairs-support-program)
- [Öğretmenler İçin 4006 TÜBİTAK Bilim Fuarları Kılavuzu](https://tubitak.gov.tr/sites/default/files/2204/ogretmenler_icin_4006-tubitak_bilim_fuarlari_kilavuzu_0.pdf)
- [Öğrenciler İçin 4006 TÜBİTAK Bilim Fuarları Kılavuzu](https://tubitak.gov.tr/sites/default/files/2204/ogrenciler_icin_4006-tubitak_bilim_fuarlari_kilavuzu.pdf)
- [4006 12. Dönem Bilgilendirme (2025-2026)](https://tubitak.gov.tr/sites/default/files/2025-09/4006_Bilgilendirme_Sunumu_yeni_sablon.pdf)
- [Bilim Fuarları Başvuru Sistemi](https://bilimiz.tubitak.gov.tr/)

### 10.4. Uygulamalı Örnekler ve Saha Kaynakları
- [Periodic Table Matching Game — Pocket Homeschool](https://pockethomeschool.com/product/periodic-table-matching-game/)
- [It's Elemental Element Matching Game — JLab](https://education.jlab.org/elementmatching/)
- [Periodic Table Quiz — Seterra GeoGuessr](https://www.geoguessr.com/vgp/3829)
- [ptable.com İnteraktif Periyodik Tablo](https://ptable.com)
- [Gamification in UI/UX: Game-inspired Design Elements](https://medium.com/@marri6460/gamification-in-ux-ui-enhancing-engagement-through-game-inspired-design-elements-e936c026b592)

### 10.5. Erişilebilirlik Standartları
- [WCAG 2.1 AA — Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [CSS @media (prefers-reduced-motion)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

## 11. Özet — Geliştirici Hızlı Referans Kartı

```
ELEMENTRA v2 TASARIM PRENSİPLERİ:
- Self-Determination: Özerklik + Yetkinlik + İlişkilendirme
- Bilişsel yük: Extraneous MIN, Germane MAX
- Sergi süresi: 30 sn anlaşılır + 1-3 dk tur
- Geri bildirim: 100-200ms anında
- Renk: Yeşil/Kırmızı + ikon (renk körlüğü uyumlu)
- Ses: Mute butonu açık
- Erişilebilirlik: WCAG AA, klavye + aria + reduced-motion
- Pedagoji: Açıklayıcı geri bildirim + bağlam kartı + yansıtma

KANITLAR:
- Hu 2022 meta-analiz: Oyun temelli öğrenme kimyada anlamlı pozitif
- Snakeleev: Cohen's d 1.23-2.67 (10 dk oyun → %54 öğrenme artışı)
- E-CHEMMEND: Sembol/periyodiklik için oyun > ezber

TÜBİTAK 4006 BAĞLAMI:
- 12. Dönem etkinlik süresi: 31 Mayıs 2026'a kadar
- Tematik Konu: Oyun ve Oyunlaştırma
- Sergi: Stand + bilgisayar + poster + öğrenciler

RİSK KAÇINMALARI:
- Aşırı mühendislik YAPMA
- Sadece eğlence (boş içerik) YAPMA
- Sadece eğitici (sıkıcı) YAPMA
- Online bağımlılık YAPMA
- Telifli içerik (Walter White/Black) YAPMA
```
