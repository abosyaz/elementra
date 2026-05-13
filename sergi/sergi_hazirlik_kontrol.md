# ELEMENTRA — Sergi Hazırlık Kontrol Listesi (F9.9)

**Hedef:** Sergi gününden önce yapılması gereken tüm manuel kontrolleri tek dokümanda toparlamak.
**Tarih:** 2026-05-12 yazıldı
**Kapsam:** F4.11 + F5.13 + F7.2/F7.7/F7.8/F7.9 + F9.1–F9.8 tüm manuel test maddeleri

---

## 📅 Sergi Hazırlık Takvimi

| Süre | Yapılacak |
|---|---|
| Sergi -7 gün | İçerik placeholder doldurma + GitHub Pages deploy |
| Sergi -3 gün | Manuel testler (PC + telefon) |
| Sergi -1 gün | PDF üretim + matbaa + USB yedek |
| Sergi günü | Son kontrol + standı kur |

---

## ✅ Bölüm 1 — İçerik Tamamlama (Sergi öncesi 1 hafta)

### 1.1 Placeholder Doldurma

Aşağıdaki dosyalarda `[OKUL]`, `[ŞEHİR]`, `[TARİH]`, `[E-POSTA]`, `[GITHUB_USERNAME]` placeholder'larını gerçek bilgilerle değiştir:

- [ ] `sergi/poster.html` (3 yer: `[OKUL]`, `[ŞEHİR]`, `[GITHUB_USERNAME]`)
- [ ] `sergi/poster_icerik.md` (referans)
- [ ] `sergi/brosur.html` (4 yer: `[OKUL]`, `[ŞEHİR]`, `[TARİH]`, `[GITHUB_USERNAME]`, `[E-POSTA]`)
- [ ] `sergi/brosur_icerik.md` (referans)
- [ ] `sergi/juri_karti.html` (1 yer: `[OKUL]`)
- [ ] `sergi/juri_karti_icerik.md` (referans)

**İpucu:** Editörünüzde global "Find and Replace" ile her placeholder bir kerede değiştirilebilir.

### 1.2 GitHub Pages Deploy

`sergi/deploy_kilavuzu.md`'i izle:

- [ ] GitHub'da repo oluştur (`elementra`)
- [ ] `git init` + `git add .` + `git commit` + `git push`
- [ ] Settings → Pages → Source: `main / root`
- [ ] URL açılıyor mu? (`https://[kullanıcı].github.io/elementra/`)
- [ ] Ana menü görünüyor, 3 modül başlatılabiliyor

### 1.3 QR Kod Üretimi

- [ ] `sergi/qr_olustur.html` tarayıcıda aç
- [ ] GitHub Pages URL'ini gir → QR Kod Oluştur
- [ ] PNG İndir → `sergi/qr.png` olarak kaydet
- [ ] `poster.html` + `brosur.html` placeholder'larını `<img src="qr.png" ...>` ile değiştir

### 1.4 PDF Üretim

Her dosyayı tarayıcıda açıp `Cmd+P` ile PDF kaydet:

- [ ] `sergi/poster.html` → `sergi/elementra_poster_A1.pdf` (A1 portrait, no margin, background graphics)
- [ ] `sergi/brosur.html` → `sergi/elementra_brosur_A4.pdf` (A4 landscape, 2 sayfa)
- [ ] `sergi/juri_karti.html` → `sergi/elementra_juri_A6.pdf` (A6, 2 sayfa)

### 1.5 Matbaa

- [ ] Poster: A1 boyutta, parlak kağıt, tek taraf
- [ ] Broşür: A4 yatay, çift taraf, 3-kola katlama (matbaaya katlama isteyin)
- [ ] Jüri kartı: A6, çift taraf, lamine opsiyonel

---

## ✅ Bölüm 2 — Manuel Testler (Sergi öncesi 3 gün)

### 2.1 Modül Testleri (F4.11 + F5.13 ertelenmiş)

Her 3 modül için **her zorlukta en az 1 oyun** oyna ve kontrol et:

#### Element Avı (F4.11)
- [ ] Kolay (10 soru, ilk 20 element) — doğru/yanlış geri bildirim çalışıyor
- [ ] Orta (12 soru, 36 element) — atom numarası soru tipi geliyor
- [ ] Zor (15 soru, 36 element + grup) — kategori soru tipi çıkıyor
- [ ] Uzman (20 soru, 60sn süre) — HUD geri sayım + son 10sn pulse
- [ ] Sonuç ekranı: skor + süre + doğru/yanlış + öğrenilen elementler listesi
- [ ] Rozet kazanma: m1-ilk-adim / m1-mukemmellik / m1-periyot-ustasi / m1-hizli-kimyaci

#### Sembol Eşleştirme (mevcut F3)
- [ ] Kolay (6 çift, 12 kart) — flip animasyonu + eşleşme
- [ ] Orta/Zor — Latince köken modal'ı çıkıyor
- [ ] Uzman — 90sn süre baskısı + tuzaklar

#### Formül Yapboz (F5.13)
- [ ] Kolay (5 bileşik, yanıltıcı yok, sınırsız ipucu)
- [ ] Orta (8 bileşik, 2 yanıltıcı, 3 ipucu)
- [ ] Zor (10 bileşik, 4 yanıltıcı, 1 ipucu)
- [ ] Uzman (12 bileşik, ipucu yok, 90sn)
- [ ] Atom ekleme/silme/sıfırlama çalışıyor
- [ ] İpucu butonu — palette doğru atom mor pulse + toast
- [ ] Yanlış cevap — kırmızı toast pedagojik mesaj ("X atomu eksik...")
- [ ] Doğru cevap — BaglamKarti açılıyor (atom diyagramı + ad reveal + bağlam)
- [ ] Sonuç ekranı: doğru kurduğun bileşikler + zorlananlar bölümü
- [ ] Rozet kazanma: m3-ilk-bilesik / m3-ipucusuz / m3-asit-baz / m3-doga-dostu

### 2.2 Ekran Geçiş Testleri (F7.2 + F7.7 + F7.8 + F7.9 ertelenmiş)

- [ ] Ana menü → Modül kartı → Zorluk modalı → Oyun → Sonuç → Ana menü
- [ ] Ana menü → Profil → Yıldız matrisi + başarım sayacı görünür
- [ ] Profil → Yansıtma → öneriler + modül başarısı + karıştırmalar
- [ ] Profil → Başarımlar → 20 rozet (kazanılan + kilitli)
- [ ] Ana menü → Ansiklopedi → 36 element + 24 bileşik + arama + filtre + tıklama bağlam kartı
- [ ] Esc tuşu — modal kapatma hiyerarşisi (Yardım → Bağlam → Ayarlar → Zorluk → Ana menü)
- [ ] F1 veya `?` tuşu → Klavye yardım modalı
- [ ] M tuşu → Mute toggle

### 2.3 Yönetici Paneli (F9.5)

- [ ] Ctrl+Shift+A → şifre modalı açılıyor
- [ ] `4006` → yönetici paneli açılıyor
- [ ] Yanlış şifre → kırmızı input + hata mesajı
- [ ] "Skorları sıfırla" → confirm dialog → skorlar silinmiş mi?
- [ ] "İstatistikleri sıfırla" → confirm → stat'lar 0
- [ ] "Başarımları sıfırla" → confirm → tüm rozetler kilitli
- [ ] "Tüm verileri sıfırla" → confirm → her şey reset
- [ ] "Şifre değiştir" → 3 validation (mevcut yanlış / eşleşmeyen yeni / 4 karakter altı)

### 2.4 Görsel Kontrol (F7.2 Renk Kontrastı + F7.7 Tipografi)

- [ ] Tüm metinler okunabilir mi? (en az 14px gövde, 18px+ başlık)
- [ ] Buton renkleri net mi? (mor ana, beyaz metin → 5.7:1 kontrast)
- [ ] Hata mesajları yeterince belirgin mi? (kırmızı toast)
- [ ] Atom hücreleri kategori renkleri tutarlı mı?
- [ ] Modal arkaplan blur'lu, modal ön plan beyaz/temiz mi?

### 2.5 Responsive Test (F7.8)

Tarayıcı DevTools → Responsive Design Mode ile dene:
- [ ] **iPhone SE (375×667):** Modüller dikey sığıyor mu? Atom paleti küçülüyor mu?
- [ ] **iPad (768×1024):** Grid 2 sütun mu? Ansiklopedi okunaklı mı?
- [ ] **Desktop (1920×1080):** Tüm öğeler maksimum max-width içinde merkez mi?
- [ ] **Ultrawide (2560×1440):** Yan boşluklar dengeli mi?

### 2.6 Touch Test (F7.9)

Telefonda fiziksel test:
- [ ] Modül kartı tıklama (44px+ touch target)
- [ ] Atom paleti hücresi tıklama yeterince büyük (48px+)
- [ ] Memory kart flip touch ile çalışıyor
- [ ] Periyodik tablo hücresi touch'ta yeterince büyük
- [ ] Modal kapat butonları rahat erişilir

---

## ✅ Bölüm 3 — Sergi PC + Tarayıcı (F9.1 + F9.2)

### 3.1 Sergi Bilgisayar Tipi

- [ ] Sergi PC modeli + işletim sistemi öğren
- [ ] Tarayıcı sürümleri kontrol (Chrome/Edge/Firefox güncel mi?)
- [ ] Eski Internet Explorer/eski tarayıcılar var mı? → ELEMENTRA çalışmaz, uyar

### 3.2 Çoklu Tarayıcı Test

Sergi PC'sinde her tarayıcıda:
- [ ] Chrome → Ana menü açılıyor, 3 modül oynanır
- [ ] Edge → Aynı işlem
- [ ] Firefox → Aynı işlem (Web Audio fallback farklı olabilir)
- [ ] Safari (varsa) → -webkit-print-color-adjust kontrolü

### 3.3 Telefon Testi (F9.3)

- [ ] QR kod ile mobil tarayıcıda aç
- [ ] iPhone Safari → çalışıyor mu?
- [ ] Android Chrome → çalışıyor mu?
- [ ] Touch event'ler düzgün mü?
- [ ] Modaller mobile uygun açılıyor mu?

---

## ✅ Bölüm 4 — Final Bug Fix (F9.6)

Manuel testlerde tespit edilen bug'lar varsa:
- [ ] Liste oluştur
- [ ] Önceliklendir (kritik → minor)
- [ ] Asistanla birlikte fix uygulayıp tekrar test et

---

## ✅ Bölüm 5 — USB Yedek (F9.8)

Sergi PC'sinde internet kesilirse diye:

- [ ] USB'ye `tubitak_elementra/` tüm klasörü kopyala (sergi dahil)
- [ ] USB'ye `elementra_poster_A1.pdf` kopyala
- [ ] USB'ye `elementra_brosur_A4.pdf` kopyala
- [ ] USB'ye `elementra_juri_A6.pdf` kopyala (yedek)
- [ ] USB'de `index.html` çift tıkla → çalışıyor mu kontrol

---

## ✅ Bölüm 6 — Sergi Günü Son Kontrol

### 6.1 Stand Kurulumu

- [ ] Poster duvarda, göz hizasında
- [ ] Broşürler stand'da, ziyaretçinin alabileceği yerde (50+ kopya)
- [ ] Sergi PC'si açık, ana menü açık, ses ayarı dengeli
- [ ] QR kod kartı görünür yerde
- [ ] Jüri kartları öğrencilerin cebinde

### 6.2 Sergi PC Hazırlık

- [ ] Tarayıcı tam ekran (F11)
- [ ] Ana menü açık, Element Avı kartı vurgulanmış
- [ ] Ses ayarı orta seviye (sergi ortamı için)
- [ ] Ekran koruyucu DEVRE DIŞI
- [ ] localStorage temiz (yönetici → tüm verileri sıfırla)

### 6.3 Öğrenci Hazırlık

- [ ] Jüri kartı cepte
- [ ] 30 saniye pitch ezberlenmiş
- [ ] 6 hazır soru-cevap pratik edilmiş
- [ ] Mobil cihazda da örnek oynama tecrübesi var

### 6.4 Yönetici Erişim Test

- [ ] Ctrl+Shift+A çalışıyor (önemli ziyaretçi öncesi sıfırlama için)
- [ ] Şifre `4006` (veya değiştirildiyse yeni şifre) hatırla

---

## 🎯 Başarı Kriterleri (proje_plani.md'den)

- [x] 3 modülün tamamı çalışıyor
- [x] 4 zorluk seviyesi her modülde
- [x] Skor + süre + combo tutarlı
- [x] localStorage kalıcılık aktif
- [x] Yönetici ekranı çalışıyor
- [ ] Sergi modu test edildi (manuel)
- [x] 20 başarım tetikleniyor
- [x] Mini ansiklopedi 36+24 dolu
- [x] Yansıtma anı çalışıyor
- [x] Profil sayfası tam
- [x] Ses + müzik açılır/kapanır (Web Audio fallback)
- [x] Klavye ile tam oynanabilir
- [ ] Touch ile telefon test edildi (manuel)
- [ ] Renk kontrastı WCAG AA (manuel)
- [ ] Poster + broşür v2 + jüri kartı + QR kod PDF üretildi (manuel)
- [ ] GitHub Pages deploy aktif (manuel)
- [ ] Sergi PC'sinde son test geçti (manuel)
- [ ] Öğrenciler kodu açıklayabiliyor (öğrenci hazırlık)
- [ ] Jüri sorularına hazır cevaplar var (✅ juri_karti.html'de)
- [x] Telifli içerik yok (tüm assetler CC0/MIT/Open Font)

---

## 📞 Sergi Anı Acil Durum

Sergi sırasında bir şey ters giderse:

| Sorun | Çözüm |
|---|---|
| İnternet kesildi | USB'deki `index.html`'i çift tıkla — offline çalışır |
| Tarayıcı kilitlendi | F5 ile yenile, localStorage kaybolmaz |
| Sergi PC sesli değil | Donanım problemi; oyun ses olmadan da oynanır |
| Touch çalışmıyor | Klavye + fare ile oyna (Tab + Enter + 1-4) |
| Skorlar bozuldu | Ctrl+Shift+A + 4006 → "Tüm verileri sıfırla" |
| Jüri zorluk soruyor | Jüri kartını cebden çıkar, 6 hazır cevaba bak |
| QR çalışmıyor | Telefon kamerasında permission ver; URL'i manuel yazdır |

---

## ✅ Tamamlanma

Tüm bu maddeler ✓ işaretlendiğinde **proje tamamen sergi-hazır**.

**Hazırlayan:** ELEMENTRA Ekip · Claude (asistan) · 2026-05-12
