# ELEMENTRA v2 — Proje Geliştirme Planı (Onay Sonrası Final)

**Tarih:** 2026-05-12
**Proje:** TÜBİTAK 4006 Bilim Fuarı — Kimya Öğretici Oyun (3 Modüllü)
**Yaklaşım:** Kalite > süre. Premium, şık, tam özellikli.
**Ekip:** Abdullah ÖSELMİŞ (danışman) + Mert Ege KAHRAMAN + Hüseyin Efe BALCI + Claude (asistan)
**Onay Durumu:** 35 madde onaylı / 7 madde reddedildi (Detay: [kapsam_onay_listesi.md](kapsam_onay_listesi.md))

---

## 🛑 ANA KURAL — TEK TEK ONAY (HER ADIM)

> Her geliştirme adımı (kod yazma, dosya oluşturma, mekanik kararı, görsel tasarım, içerik seçimi) **TEK TEK kullanıcı onayı** alınarak yapılır.
> Format: 🟢 Onaylıyorum / 🔴 Reddediyorum / 🟡 Düzenle
> İhlali = eski v1'in karmaşıklık hatasının tekrarı.

Detaylı kural: [memory/feedback_tubitak_elementra_tek_tek_onay.md](file:///Users/abos/.claude/projects/-Users-abos-projects/memory/feedback_tubitak_elementra_tek_tek_onay.md)

---

## 🏗️ Teknoloji Yığını (Onaylı)

- **Frontend:** HTML5 + CSS3 (modern, custom properties) + Vanilla JavaScript (ES2022+)
- **Asset:** Inline SVG ikon (Tabler Icons + custom 6), Google Fonts (Inter + Oxanium), CC0 ses
- **Build:** Build yok (saf dosyalar, tarayıcıda direkt çalışır)
- **Hosting:** USB (sergi PC) + GitHub Pages (QR kod ile sergi sonrası erişim)
- **Tarayıcı hedefi:** Modern Chrome/Edge/Firefox (2024+)
- **Cihaz:** Masaüstü (öncelik) + mobile responsive (QR kod için)

---

## 📁 Hedef Dosya Yapısı

```
tubitak_elementra/
├── index.html                          # Ana giriş
├── style.css                           # Tüm stiller
├── data/
│   ├── elements.js                     # 36 element + meta
│   └── bilesikler.js                   # 24 bileşik + meta
├── game/
│   ├── ortak.js                        # StorageManager + AudioManager + ortak fonksiyonlar
│   ├── anaMenu.js                      # Ana menü + zorluk seçim
│   ├── elementAvi.js                   # Modül 1
│   ├── sembolEslestirme.js             # Modül 2
│   ├── formulYapboz.js                 # Modül 3
│   ├── profil.js                       # Profil sayfası
│   ├── ansiklopedi.js                  # Mini ansiklopedi
│   ├── yansitma.js                     # Yansıtma anı
│   ├── basarimlar.js                   # Başarımlar (20 rozet)
│   └── yonetici.js                     # Yönetici ekranı
├── assets/
│   ├── sesler/
│   │   ├── dogru.mp3
│   │   ├── yanlis.mp3
│   │   ├── combo2.mp3
│   │   ├── combo3plus.mp3
│   │   ├── seviye-atlama.mp3
│   │   ├── rekor.mp3
│   │   ├── buton-tik.mp3
│   │   └── kart-dondur.mp3
│   ├── muzikler/
│   │   ├── menu.mp3
│   │   ├── oyun.mp3
│   │   └── zafer.mp3
│   └── logo.svg
├── sergi/
│   ├── poster.html → poster.pdf       # G.1
│   ├── brosur.html → brosur.pdf       # G.2
│   ├── juri_sunum_karti.html → ...pdf # G.3
│   └── qr_kod.png                     # G.5
├── kimya_arastirma.md                  # Referans (var)
├── egitici_oyun_arastirma.md           # Referans (var)
├── proje_plani.md                      # Bu dosya
└── kapsam_onay_listesi.md              # Onay kayıtları (var)
```

**Tahmini kod büyüklüğü:** ~3000-4000 satır JS + ~1500 satır CSS + ~500 satır HTML
**Eski v1 ile karşılaştırma:** v1=2300 satır, v2≈5500 satır → daha büyük ama her satır **amaca yönelik** ve **modüler**.

---

## 🗺️ Geliştirme Fazları (9 Faz)

### FAZ 0 — Tasarım Kararları (Onaylar)
**Süre:** 1-2 oturum
**Çıktı:** Görsel kimlik dondu, geliştirme başlayabilir
**Onaylanacak Maddeler:**
- F0.1 Renk paleti seçimi (3 alternatif sunulacak — B.4 için somut renkler)
- F0.2 Logo + marka kararı (atom ikonu vs özel logo)
- F0.3 Şifre belirleme (yönetici ekranı için — default 4006, değiştirilebilir)
- F0.4 Element ve bileşik veritabanı son onayı (36+24 listesi)

---

### FAZ 1 — Altyapı (Her Şey için Temel)
**Süre:** 2-3 oturum
**Çıktı:** Geliştirilecek tüm modüller bu altyapıyı kullanacak
**Onaylanacak Adımlar:**
- F1.1 `data/elements.js` — 36 element verisi (sembol, ad, atom no, periyot, grup, kategori, latince köken, bağlam cümlesi)
- F1.2 `data/bilesikler.js` — 24 bileşik verisi (formül, ad, yaygın ad, atom listesi, bağlam, zorluk)
- F1.3 `style.css` — CSS custom properties (renk, tipografi, aralık, gölge, easing)
- F1.4 `style.css` — Ortak component CSS (button, card, modal, badge, progress bar)
- F1.5 Inline SVG ikon kütüphanesi (Tabler 30 + custom 6)
- F1.6 `game/ortak.js` — `StorageManager` (localStorage CRUD + reset)
- F1.7 `game/ortak.js` — `AudioManager` (ses + müzik + mute)
- F1.8 `game/ortak.js` — `AnimationHelper` (CSS keyframes runtime + ease)
- F1.9 `game/ortak.js` — Klavye + touch event dispatcher
- F1.10 `index.html` — Temel iskelet (head + body containers + media meta)

---

### FAZ 2 — Ana Menü + HUD (Ortak Görünüm)
**Süre:** 1-2 oturum
**Çıktı:** Çalışan ana menü, modüllere geçiş, üst HUD
**Onaylanacak Adımlar:**
- F2.1 Ana menü ekranı (3 modül kartı + alt bar)
- F2.2 Modül kartı bileşeni (ikon + başlık + açıklama + ilerleme + son skor)
- F2.3 Üst HUD (skor + süre + combo + mute butonu + geri butonu)
- F2.4 Zorluk seçim ekranı (4 seviye kartı — yıldız sistemi)
- F2.5 Sahne geçiş animasyonu (modül girişi/çıkışı)
- F2.6 Mobile responsive temel layout
- F2.7 Klavye navigasyon (Tab + Enter + Esc + 1/2/3 hızlı seçim)
- F2.8 Touch event handlers

---

### FAZ 3 — Modül 2: Sembol Eşleştirme (Memory) — En Basit, Isınma
**Süre:** 2-3 oturum
**Çıktı:** İlk tam çalışan modül
**Onaylanacak Adımlar:**
- F3.1 Memory kart bileşeni (ön yüz / arka yüz / döndürme animasyonu)
- F3.2 Kart dağıtım algoritması (Fisher-Yates karıştırma)
- F3.3 Tıklama + eşleşme kontrolü mantığı
- F3.4 Doğru eşleşme — bilgi kartı modalı (sembol + ad + Latince köken + bağlam)
- F3.5 Yanlış eşleşme — açıklayıcı geri bildirim
- F3.6 Skor + hamle sayısı + süre takibi
- F3.7 Combo sistemi (arka arkaya doğru = bonus)
- F3.8 Bitiş ekranı — öğrenilen liste + zorlandıkların + skor + tekrar oyna butonu
- F3.9 3 zorluk seviyesi (6/8/10/12 çift)
- F3.10 Manuel test + cila

---

### FAZ 4 — Modül 1: Element Avı (Periyodik Tablo) — Orta Zorluk
**Süre:** 3-4 oturum
**Çıktı:** Görsel ağırlıklı ana modül
**Onaylanacak Adımlar:**
- F4.1 Periyodik tablo grid CSS (7 periyot × 18 grup + lantanit/aktinit alt sırası gösterilecek mi?)
- F4.2 Element hücresi bileşeni (sembol + atom no + kategori rengi)
- F4.3 36 element yerleşim (kalan hücreler "gri" placeholder)
- F4.4 Soru bankası (5 tip × 36 element = ~150 soru kombinasyonu)
- F4.5 Tıklama mantığı + doğru/yanlış kontrol
- F4.6 Doğru cevap — yeşil flash + bağlam kartı
- F4.7 Yanlış cevap — kırmızı flash + doğru cevap vurgu + sık karıştırma açıklaması
- F4.8 Skor + süre + combo entegrasyonu
- F4.9 Bitiş ekranı — öğrenilen elementler + zorlandıkların
- F4.10 4 zorluk seviyesi (Kolay 20 element / Orta 36 element / Zor + grup / Uzman + süre)
- F4.11 Manuel test + cila

---

### FAZ 5 — Modül 3: Formül Yapboz — En Zor, En Eğitsel
**Süre:** 3-4 oturum
**Çıktı:** En derin öğretici modül
**Onaylanacak Adımlar:**
- F5.1 Bileşik adı/yaygın ad sunum üst paneli
- F5.2 Orta panel — kurulan formül gösterimi (H + H + O → görsel)
- F5.3 Atom paleti (zorluk seviyesine göre gereken + yanıltıcı atomlar)
- F5.4 Atom tıklama → formüle ekleme mantığı
- F5.5 Backspace ile silme + "Sıfırla" butonu
- F5.6 İpucu sistemi (zorluk bazlı limit)
- F5.7 Cevap kontrol algoritması (atom sayısı eşleşmesi)
- F5.8 Doğru cevap — formül + ad + atom diyagramı + bağlam
- F5.9 Yanlış cevap — açıklayıcı (oran hatası mı? eksik atom mu?)
- F5.10 Skor + ipucu cezası + süre
- F5.11 Bitiş ekranı — kurduğun bileşikler + zorlandıkların
- F5.12 4 zorluk seviyesi (5/8/10/12 bileşik)
- F5.13 Manuel test + cila

---

### FAZ 6 — Genişleme Özellikleri
**Süre:** 3-4 oturum
**Çıktı:** Profil + ansiklopedi + başarımlar + yönetici
**Onaylanacak Adımlar:**
- F6.1 Profil sayfası (E.1) — istatistik + skor matrisi + yıldız rozetleri + ilerleme çubukları
- F6.2 Mini ansiklopedi (C.4) — element + bileşik detay kartları + arama + filtre
- F6.3 Yansıtma anı (C.5) — kategori bazlı başarı + sık karıştırılan çiftler + öneriler
- F6.4 Başarımlar (E.2) — 20 rozet tanımı + tetikleme algoritmaları + bildirim modalı
- F6.5 Yönetici ekranı (E.5) — Ctrl+Shift+A + şifre + 4 seçenek sıfırlama + sergi modu + dışa aktarma

---

### FAZ 7 — Cila ve Polish
**Süre:** 2-3 oturum
**Çıktı:** Premium ürün hissi
**Onaylanacak Adımlar:**
- F7.1 Animasyon zamanlama tutarlığı kontrolü (200-400ms standardı)
- F7.2 Renk kontrastı doğrulama (WCAG AA — F.1)
- F7.3 Hover/Active/Focus eksiksiz kontrol
- F7.4 Skeleton + boş durumlar
- F7.5 Ses efektleri + müzikler entegrasyon final
- F7.6 Klavye kısayolu yardım modalı
- F7.7 Tipografi hiyerarşi kontrolü
- F7.8 Mobile responsive testler (320px - 2560px arası)
- F7.9 Touch interaction testleri
- F7.10 Eski v1'den kalan tüm bug pattern'leri kontrolü

---

### FAZ 8 — Sergi Materyalleri
**Süre:** 2-3 oturum
**Çıktı:** Stand için fiziksel ve dijital materyaller
**Onaylanacak Adımlar:**
- F8.1 Poster içeriği yazımı (G.1)
- F8.2 Poster HTML/CSS tasarımı + PDF üretim
- F8.3 Broşür v2 içerik güncelleme (G.2)
- F8.4 Broşür HTML/CSS tasarım + PDF
- F8.5 Jüri sunum kartı içerik + tasarım + PDF (G.3)
- F8.6 GitHub Pages deploy hazırlığı
- F8.7 QR kod üretimi + poster/broşüre yerleştirme (G.5)

---

### FAZ 9 — Final Test ve Yayın
**Süre:** 1-2 oturum
**Çıktı:** Sergiye hazır final paket
**Onaylanacak Adımlar:**
- F9.1 Sergi bilgisayar tipi tespit + uyumluluk testi
- F9.2 Çoklu tarayıcı test (Chrome + Edge + Firefox)
- F9.3 Telefon test (QR kod ile mobil deneyim)
- F9.4 Tüm modüller end-to-end test
- F9.5 Yönetici ekranı + sergi modu test
- F9.6 Final bug fix turu
- F9.7 GitHub Pages final deploy
- F9.8 USB hazırlık (sergi PC için yedek)
- F9.9 Sergiye hazır listesi son kontrol

---

## 📋 Onay Formatı (Her Adımda)

Her adım için asistan **şunu sunar:**

```
🔵 [Adım Kodu] — [Adım Adı]

### Ne yapılacak?
[Detaylı açıklama + kod taslağı / mock-up / liste]

### Önerilen yaklaşım
[Eğer alternatif varsa hangisi önerilen + neden]

### Bağımlılıklar
[Önceki adımlardan hangileri tamamlanmış olmalı]

### Tahmini iş yükü
[~N saat / N gün]

---

## ❓ Onayınız
- 🟢 Onaylıyorum
- 🔴 Reddediyorum
- 🟡 Düzenle: [hangi noktayı?]
```

**Kullanıcı yanıtı geldikten sonra:**
- 🟢 → Adım tamamlanır + bir sonrakine geçilir
- 🔴 → Adım atlanır (mümkünse) + bir sonrakine geçilir
- 🟡 → Düzenlenip yeniden sunulur

---

## 🚨 Risk Yönetimi

### R1 — Adım sayısı çok, takvim uzayabilir
- **Senaryo:** ~70 onay adımı var (8 faz × ~10 adım). Her birinde tartışma uzarsa süre çok artar.
- **Plan B:** Bağlantılı küçük adımlar (örn: F1.6 + F1.7 + F1.8 ortak.js dosyası) **paket onay** olarak sunulabilir (kullanıcı isterse)
- **Tetik:** Her faz sonunda durum değerlendirmesi

### R2 — Kapsam çok büyük, kod 5000+ satır olabilir
- **Senaryo:** Önceki v1 reddinin sebebi "karmaşıklıktı". Yeni v2 daha kapsamlı.
- **Korunma:** Her madde **amaca yönelik** (eski karmaşıklık eğlence içindi, yeni karmaşıklık eğitim/sergi içindir)
- **Tetik:** FAZ 6 sonunda satır sayısı kontrolü, ihtiyaç dışı kod tespiti

### R3 — Sergi tarihi yaklaşırsa baskı artar
- **Plan B:** Faz 6 (Genişleme) maddelerinden bazıları geciktirilebilir (Yansıtma + Ansiklopedi sergi günü yoksa minimum olarak sunulabilir)
- **Tetik:** Faz 5 sonu durum değerlendirmesi

### R4 — Test aşamasında ciddi bug çıkar
- **Plan B:** Bug'ı sergi gününde gizlemek yerine **direkt çözüm** uygulanır (eski v1'deki "9 kart bozuk" hatası tekrarlanmaz)
- **Tetik:** Faz 7 ve Faz 9 her şey test

### R5 — Sergi PC'sinde tarayıcı eski sürüm
- **Plan B:** Edge eski / Chrome eski / Firefox eski → polyfill veya basitleştirme
- **Tetik:** Faz 9'da sergi PC tipi netleştirildikten sonra test

---

## 🎯 Başarı Kriterleri (Sergi Hazır Tanımı)

- [ ] 3 modülün tamamı çalışıyor
- [ ] 4 zorluk seviyesi her modülde
- [ ] Skor + süre + combo tutarlı
- [ ] localStorage kalıcılık aktif
- [ ] Yönetici ekranı çalışıyor
- [ ] Sergi modu test edildi
- [ ] 20 başarım tetikleniyor
- [ ] Mini ansiklopedi 36+24 dolu
- [ ] Yansıtma anı çalışıyor
- [ ] Profil sayfası tam
- [ ] Ses + müzik açılır/kapanır
- [ ] Klavye ile tam oynanabilir
- [ ] Touch ile telefon test edildi
- [ ] Renk kontrastı WCAG AA
- [ ] Poster + broşür v2 + jüri kartı + QR kod PDF üretildi
- [ ] GitHub Pages deploy aktif
- [ ] Sergi PC'sinde son test geçti
- [ ] Öğrenciler kodu açıklayabiliyor
- [ ] Jüri sorularına hazır cevaplar var
- [ ] Telifli içerik yok (tüm assetler CC0/MIT/Open Font)

---

## ⏭️ İlk Onay Bekleyen Adım

**F0.1 — Renk Paleti Seçimi**

Bir sonraki mesajda 3 renk paleti alternatifi (kod blokları + örnek görseller) sunulacak. Hangisini onayladığınız tüm projenin görsel kimliğini belirler.
