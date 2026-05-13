# ELEMENTRA v2 — Proje Durum / Devir Dosyası

> **Bu dosya, oturumlar arası geçişlerde kullanılır.** Her oturum sonunda güncellenir, yeni oturum başında okunur.
> Yeni oturuma başlarken: Bu dosyayı + `kapsam_onay_listesi.md` + `tasarim_kararlari.md` + `proje_plani.md` ana bağlamda (agent kullanmadan, Read tool ile) oku.

---

## 📊 Mevcut Durum

**Son oturum tarihi:** 2026-05-12 (Oturum 2 — Mega final)
**Tamamlanma:** **77/84 adım = %92** (asistan tarafında)
**Aktif faz:** **FAZ 9 — Final Test ve Yayın** (asistan ucu kapalı, kullanıcı manuel testler bekliyor)
**Bir sonraki adım:** Kullanıcı `sergi/sergi_hazirlik_kontrol.md`'yi takip eder; bug çıkarsa asistana gelir.

---

## 🗂 Proje Klasör Yapısı

```
/Users/abos/projects/tubitak_elementra/
├── index.html                          (~75KB — ana giriş + 12 modal + scripts)
├── style.css                           (~110KB — 28 bölüm tasarım sistemi)
├── .nojekyll                           (boş — GitHub Pages Jekyll bypass)
├── proje_durum.md                      (BU DOSYA)
├── proje_plani.md                      (orijinal 9-faz plan)
├── tasarim_kararlari.md                (F0.1-F0.4)
├── kapsam_onay_listesi.md              (42 madde — 35 onay + 7 ret)
├── kimya_arastirma.md                  (MEB + 36 element + 24 bileşik)
├── egitici_oyun_arastirma.md           (Hu 2022 + Snakeleev + tasarım)
├── data/
│   ├── elements.js                     (~12KB — 36 element)
│   └── bilesikler.js                   (~10KB — 24 bileşik)
├── game/
│   ├── ortak.js                        (~52KB — 10 manager + BaglamKarti + Web Audio fallback)
│   ├── sembolEslestirme.js             (~17KB — Modül 2)
│   ├── elementAvi.js                   (~22KB — Modül 1)
│   ├── formulYapboz.js                 (~25KB — Modül 3 — F5)
│   ├── ansiklopedi.js                  (~9KB — F6.2)
│   ├── yansitma.js                     (~7KB — F6.3)
│   ├── basarimlar.js                   (~6KB — F6.4)
│   └── yonetici.js                     (~5KB — F6.5)
├── assets/
│   └── icons.svg.html                  (~9KB — 37 SVG ikon)
└── sergi/                              (FAZ 8 sergi materyalleri)
    ├── poster.html                     (~16KB — A1 print-ready)
    ├── poster_icerik.md                (içerik referans)
    ├── brosur.html                     (~22KB — A4 trifold)
    ├── brosur_icerik.md                (içerik referans)
    ├── juri_karti.html                 (~13KB — A6 çift taraflı)
    ├── juri_karti_icerik.md            (içerik referans)
    ├── qr_olustur.html                 (~8KB — QR üretici araç)
    ├── qrcode.min.js                   (~20KB — lokal lib, MIT)
    ├── deploy_kilavuzu.md              (GitHub Pages adım adım)
    └── sergi_hazirlik_kontrol.md       (F9.9 — kullanıcı manuel test paketi)
```

**Eksik dosyalar (sergi öncesi kullanıcı tarafında):**
- `sergi/qr.png` (kullanıcı `qr_olustur.html` ile üretecek)
- `sergi/elementra_poster_A1.pdf` (kullanıcı tarayıcıdan PDF kaydedecek)
- `sergi/elementra_brosur_A4.pdf` (aynı)
- `sergi/elementra_juri_A6.pdf` (aynı)
- `assets/sesler/*.mp3` — opsiyonel (Web Audio fallback aktif, sessiz çalışsa da kabul)
- `assets/muzikler/*.mp3` — opsiyonel

---

## 🎯 Karar Hafızası (FAZ 0 — Tasarım Kararları)

| Kod | Karar | Detay |
|---|---|---|
| F0.1 | **Renk paleti: Nebula Premium** | Mor `#7C3AED` + Pembe `#EC4899` |
| F0.2 | **Logo: Atomik Sade** | Atom + "ELEMENTRA" gradient |
| F0.3 | **Yönetici şifresi:** `4006` | TÜBİTAK 4006 referansı |
| F0.4 | **Veritabanı:** 36 element + 24 bileşik | |

**Teknoloji yığını:** Vanilla HTML5 + CSS3 + JavaScript ES2022. Build yok.

---

## 📋 Kapsam Onayları (42/42 madde)

**Onaylanan: 35** — geliştirilecek özellikler
**Reddedilen: 7** — B.5 karanlık mod, D.1 çoklu dil, D.8 reduced-motion, F.2 aria, F.3 renk körü, F.4 yazı boyutu, G.4 README

Detay: `kapsam_onay_listesi.md`

---

## ✅ Tamamlanan Fazlar — Detaylı Liste

### 🎉 FAZ 0 — Tasarım Kararları (TAM — 4/4)
F0.1 Palet · F0.2 Logo · F0.3 Şifre · F0.4 Veritabanı

### 🎉 FAZ 1 — Altyapı (TAM — 10/10)
F1.1 elements.js · F1.2 bilesikler.js · F1.3 CSS değişkenleri · F1.4 Component CSS · F1.5 SVG sprite · F1.6 8 Manager · F1.7 AudioManager + Web Audio fallback (F7.5'te eklendi) · F1.8 AnimationHelper · F1.9 EventDispatcher · F1.10 index.html iskelet

### 🎉 FAZ 2 — Ana Menü + HUD (TAM — 7/7)
F2.1 Modül kartları · F2.2 Zorluk modali · F2.3 SahneManager · F2.4 HUD · F2.5 Esc handler · F2.6 Ayarlar modali · F2.7 Profil placeholder

### 🎉 FAZ 3 — Modül 2: Sembol Eşleştirme (TAM — 8/8)
F3.1-F3.8 — Memory mekaniği, kart flip, eşleşme, bağlam kartı, skor/combo, sonuç ekranı, 5 rozet

### 🟢 FAZ 4 — Modül 1: Element Avı (10/11 + F4.11 sergi öncesi test)
F4.1-F4.10 kod tamamlandı. F4.11 = manuel test, `sergi_hazirlik_kontrol.md`'de.

### 🎉 FAZ 5 — Modül 3: Formül Yapboz (TAM — 13/13)
- **F5.1** Mekanik kararı (tap-tap atom paleti)
- **F5.2** Üst panel (yaygın ad + alt yönlendirme + ipucu butonu)
- **F5.3** Orta panel (sıralı atom hücreleri + 3 buton + boş durum dashed border)
- **F5.4** Atom paleti (zorluk-bazlı yanıltıcı: 0/2/4)
- **F5.5** Atom ekleme/silme/sıfırlama + buton state
- **F5.6** İpucu sistemi (mor pulse + toast + -15 skor cezası)
- **F5.7** Cevap kontrol akışı (doğru/yanlış branch + combo + karistirmalar)
- **F5.8** BaglamKarti.acBilesik() — atom diyagramı + ad reveal + bağlam
- **F5.9** Yanlış cevap toast (kırmızı + uyari ikonu + formulHataAnaliz.detay)
- **F5.10** Son 10sn pulse uyarısı (uzman modunda)
- **F5.11** Sonuç ekranı (4 stat + doğru bileşikler + zorlananlar + rozet)
- **F5.12** 4 zorluk seviyesi (5/8/10/12 bileşik, kademeli havuz)
- **F5.13** Manuel test → `sergi_hazirlik_kontrol.md`

### 🎉 FAZ 6 — Genişleme Özellikleri (TAM — 5/5)
- **F6.1** Profil sayfası FULL — Yıldız matrisi (3 modül × 4 zorluk) + Başarım sayacı + Yansıtma bağlantı kartı
- **F6.2** Mini ansiklopedi — Tab (Element/Bileşik) + 9 kategori chipi + arama + 36+24 kart + keşfedilmemiş kilit
- **F6.3** Yansıtma anı — Genel başarı + modül bar'ları + en sık karıştırılanlar + 4 dinamik öneri
- **F6.4** Başarımlar sayfası — 20 rozet grid + 3 filtre chipi (Tümü/Kazanılan/Kilitli) + kazanılma tarihi
- **F6.5** Yönetici paneli — Ctrl+Shift+A + şifre modal + 4 sıfırlama + şifre değiştirme

### 🎉 FAZ 7 — Cila ve Polish (TAM — 10/10, 4 manuel test → kullanıcı)
- **F7.1** Animasyon zamanlama audit — `--dur-*` sistemi tutarlı, değişiklik yok
- **F7.2** Renk kontrastı — manuel test (`sergi_hazirlik_kontrol.md`)
- **F7.3** Hover/Active/Focus audit — global `:focus-visible` kuralı var, 20 hover/8 active sağlam
- **F7.4** Empty state audit — Profil/Ansiklopedi/Yansıtma/Başarımlar'da hep mevcut
- **F7.5** Web Audio API fallback — 8 ses tipi programatik üretim (dosya yoksa)
- **F7.6** Klavye yardım modalı — F1/? aç + Esc hiyerarşi 5 katman
- **F7.7** Tipografi — manuel (kullanıcı)
- **F7.8** Mobile responsive — manuel (kullanıcı)
- **F7.9** Touch interaction — manuel (kullanıcı)
- **F7.10** v1 bug pattern audit — 13 tuzak listelendi, yeni bulgu yok

### 🎉 FAZ 8 — Sergi Materyalleri (TAM — 7/7)
- **F8.1** Poster içeriği (`sergi/poster_icerik.md`)
- **F8.2** Poster HTML (A1 portrait, print CSS, 6 bölüm)
- **F8.3** Broşür içeriği (`sergi/brosur_icerik.md` — 6 panel trifold)
- **F8.4** Broşür HTML (A4 landscape trifold, 2 sayfa × 3 panel)
- **F8.5** Jüri kartı (A6 çift taraflı — pitch + 3 modül + 6 SC)
- **F8.6** GitHub Pages deploy hazırlığı (`.nojekyll` + `deploy_kilavuzu.md`)
- **F8.7** QR kod üretici (`qr_olustur.html` + lokal `qrcode.min.js`)

### 🟢 FAZ 9 — Final Test ve Yayın (2/9 asistan + 7 manuel kullanıcı)
- **F9.1-F9.3** Sergi PC + tarayıcı + telefon test → kullanıcı manuel
- **F9.4** Otomatik end-to-end test → ertelendi (kullanıcı "tüm testler sona")
- **F9.5** Yönetici test → kullanıcı manuel
- **F9.6** Final bug fix → kullanıcı test sonrası bug çıkarsa
- **F9.7** GitHub Pages final deploy → kullanıcı manuel
- **F9.8** USB yedek → kullanıcı manuel
- **F9.9** Sergiye hazır kontrol listesi (`sergi/sergi_hazirlik_kontrol.md` — 6 bölüm, tüm manuel testleri toparlar)

---

## ❓ Kullanıcı Tercih Hafızası (ALTIN KURALLAR)

1. **TEK TEK ONAY** — her geliştirme adımı için ayrı onay
2. **YÜZDE GÖSTERGESİ** — her "❓ Onayınız" yanında %N (tamamlanan/84)
3. **Reddedilen özellikler asla yapılmaz:** B.5 dark mode, D.1 i18n, D.8 reduced-motion, F.2 aria, F.3 renk körü, F.4 font ayar, G.4 README
4. **"Tüm testler en son"** — Manuel test gerektiren adımlar `sergi_hazirlik_kontrol.md`'ye ertelendi

---

## 🔥 Teknik Tuzaklar / Edinilen Dersler

### Önceki oturumdan (FAZ 1-4)
1. Container-app flex column grid sıkışması — `width: 100%` + `align-self: center`
2. SVG sprite file:// CORS — inline embed
3. AudioManager autoplay engeli — `_baslatildi` + play().catch()
4. HUD süre sayacı çakışması — uzman modda HUD.sureDurdur + kendi sayaç
5. BaglamKarti modüller arası paylaşım — `ac` + `acBilesik` ortak API
6. localStorage incognito — `StorageManager.available()` kontrolü
7. Modal kuyruk (RozetBildirim) — sıralı modal
8. Periyodik tablo lantanit/aktinit YOK (36 elementimiz onlarda değil)
9. Element seçim stratejileri — KONFIG-bazlı

### Bu oturumda (FAZ 5-9)
10. **`:has()` CSS selector** — modern browser desteği (orta panel boş durum tespiti)
11. **Cache busting** — `?v=N` parametresi (script tag'lerinde, her major değişiklikte artırılır)
12. **Formül Yapboz karistirmalar format uyumsuzluğu** — F5.11 _oyunBitti'de `[]` gönder (StatManager `{yanlis, dogru}` bekliyor, FY `{bilesikId, hataTipi}` üretiyordu)
13. **Yönetici şifre JSON encode bug** — `_getSifre`'de JSON.parse fallback (localStorage başka kanaldan JSON encoded değer alıyor olabilir)
14. **Web Audio API fallback** — dosya yoksa programatik oscillator+gain ile ses üretimi
15. **`:focus-visible` global kural** — D.5 klavye erişimi için tek satır, tüm interaktif elementlerde otomatik aktif
16. **CDN bloke (preview sandbox)** — `cdn.jsdelivr.net` / `unpkg.com` bloke, `cdnjs.cloudflare.com` çalıştı; lokal kütüphane (qrcode.min.js, 20KB) sergi PC offline güvencesi için tercih edildi
17. **A1/A4 print CSS** — `@page { size: A1 portrait; margin: 0; }` + `-webkit-print-color-adjust: exact` (background graphics)

---

## 🌐 Preview Server Bilgisi

- **Server adı:** `elementra` (`.claude/launch.json`)
- **Port:** 8094
- **Komut:** `python3 -m http.server 8094 --directory tubitak_elementra`
- Sergi materyalleri URL'leri:
  - `http://localhost:8094/sergi/poster.html`
  - `http://localhost:8094/sergi/brosur.html`
  - `http://localhost:8094/sergi/juri_karti.html`
  - `http://localhost:8094/sergi/qr_olustur.html`

---

## ⏭️ Sonraki Oturumda Yapılacaklar

### Sergi öncesi kullanıcı eylem (manuel — asistan beklemede)

1. **Placeholder doldurma** (`sergi_hazirlik_kontrol.md` Bölüm 1.1)
   - `poster.html`, `brosur.html`, `juri_karti.html`'de `[OKUL]` / `[ŞEHİR]` / `[TARİH]` / `[E-POSTA]` / `[GITHUB_USERNAME]`

2. **GitHub Pages deploy** (`deploy_kilavuzu.md`)
   - Repo oluştur, git push, Settings → Pages

3. **QR kod üretimi**
   - `qr_olustur.html` tarayıcıda aç, URL gir, PNG indir → `sergi/qr.png`
   - poster/brosur placeholder'larını `<img src="qr.png">` ile değiştir

4. **PDF üretim**
   - `Cmd+P` ile her HTML'i PDF olarak kaydet (A1/A4/A6 ayar)
   - Matbaa için hazır

5. **Manuel testler** (`sergi_hazirlik_kontrol.md` Bölüm 2)
   - 3 modül × 4 zorluk
   - Ekran geçişleri (Profil/Ansiklopedi/Yansıtma/Başarımlar/Yardım/Yönetici)
   - Esc hiyerarşisi 5 katman
   - Responsive (375px-2560px)
   - Touch (telefon)

6. **Sergi PC + çoklu tarayıcı test** (Bölüm 3)
7. **Bug fix turu** (varsa)
8. **USB yedek** (Bölüm 5)

### Asistandan beklenenler

Manuel testler sırasında bug çıkarsa asistana gel:
- Kod fix
- Tasarım revize
- İçerik düzeltme

Yeni özellik isteği geldiğinde 84-adım listesi dışı kapsam değerlendirilir.

---

## 📝 Oturum Geçmişi

### 2026-05-12 — Oturum 1 (Önceki, ~16 saat)
- FAZ 0-3 TAM + FAZ 4 (10/11)
- 39 adım tamamlandı (~46%)
- 7 dosya: data + game + assets + index + style
- 4 md dosyası proje altyapı

### 2026-05-12 — Oturum 2 (Bu — Mega Final)
- **38 adım tamamlandı** (39 → 77, %46 → %92)
- Tamamlanan fazlar: F4.11 erteleme + FAZ 5 TAM (13/13) + FAZ 6 TAM (5/5) + FAZ 7 TAM (10/10) + FAZ 8 TAM (7/7) + FAZ 9 (2/9)
- **Yeni dosyalar (15):**
  - `game/`: formulYapboz.js, ansiklopedi.js, yansitma.js, basarimlar.js, yonetici.js
  - `sergi/`: poster.html + içerik md, brosur.html + içerik md, juri_karti.html + içerik md, qr_olustur.html, qrcode.min.js, deploy_kilavuzu.md, sergi_hazirlik_kontrol.md
  - root: `.nojekyll`
- **Genişletilenler:**
  - `ortak.js`: BaglamKarti.acBilesik() + Web Audio API fallback (_webAudioCal + _getWebAudioCtx)
  - `index.html`: 4 yeni ekran (ansiklopedi/yansitma/basarim/yonetici-panel) + 3 yeni modal (yardim, yönetici-sifre, yönetici-sifre-degistir) + alt bar Ansiklopedi butonu + Esc hiyerarşi güncelleme
  - `style.css`: 26 → 28 bölüm (Formül Yapboz + Profil yıldız matrisi + Ansiklopedi + Yansıtma + Başarımlar + Yönetici + Yardım)
- **Bug fix (oturum içi tespit + düzeltme):**
  - Formül Yapboz karistirmalar format uyumsuzluğu (F5.11 → boş array)
  - Yönetici şifre JSON encode parse fallback (F6.5)
- **Cache bust sürümü:** `?v=12` (her major değişiklikte +1)

---

## 🚀 Devam Stratejisi

Yeni oturum başında:

1. **Dosyaları kendin oku (agent kullanmadan):**
   - `proje_durum.md` (bu dosya — güncel)
   - `kapsam_onay_listesi.md`
   - `tasarim_kararlari.md`
   - `proje_plani.md`
   - `sergi/sergi_hazirlik_kontrol.md` (kullanıcı sergi öncesi takvim)
   - Memory: `feedback_tubitak_elementra_tek_tek_onay.md` + `feedback_tubitak_elementra_yuzde_onay.md` + `project_elementra_v2_tubitak.md`

2. **Preview server kontrol:** `preview_start("elementra")`

3. **Kullanıcı durumunu sor:**
   - Manuel testlerde bug çıkmış mı?
   - Sergi tarihi yaklaştı mı? (öncelik ayarlama için)
   - Placeholder bilgileri verecek mi?
   - Yeni özellik isteği var mı? (kapsam değişikliği — onay listesi güncellemeli)

4. **Bekleyen iş yoksa kullanıcı tarafına devret** — sergi_hazirlik_kontrol.md'ye göre kullanıcı yola devam eder.
