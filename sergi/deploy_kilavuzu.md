# ELEMENTRA — GitHub Pages Deploy Kılavuzu (F8.6)

**Hedef:** Projeyi `https://[kullanıcı].github.io/elementra/` adresine yayınlamak.
**Süre:** İlk kurulum ~5 dakika, sonraki güncellemeler ~1 dakika.
**Maliyet:** Ücretsiz (GitHub Pages free tier).

---

## ✅ Ön Koşullar

- [ ] GitHub hesabı (yoksa github.com/signup)
- [ ] Bilgisayarda Git kurulu (Mac/Linux varsayılan, Windows için git-scm.com)
- [ ] Bu proje dosyaları (tubitak_elementra/ klasörü)

---

## 🚀 Adım Adım Kurulum

### 1️⃣ GitHub'da Yeni Repo Oluştur

1. **github.com** → giriş yap
2. Sağ üst köşedeki `+` butonu → **New repository**
3. Form doldur:
   - **Repository name:** `elementra` (önerilen) ya da `elementra-tubitak-4006`
   - **Description:** "TÜBİTAK 4006 Bilim Fuarı — Kimya öğretici oyun"
   - **Public** seç (GitHub Pages free için zorunlu)
   - `Add a README file` → **işaretleme** (zaten dosyalar bizde)
   - `.gitignore` → **None**
   - License → ister `MIT License` ister boş
4. **Create repository** tıkla

### 2️⃣ Yerel Repository Başlat

Terminal'de proje klasörüne git:

```bash
cd /Users/abos/projects/tubitak_elementra
```

Git başlat ve ilk commit:

```bash
git init
git add .
git commit -m "ELEMENTRA v2 — TÜBİTAK 4006 sergi yayını"
```

### 3️⃣ Remote Bağla ve Push

GitHub'daki repo URL'i kopyala (sayfada görünür):
`https://github.com/[kullanıcı-adı]/elementra.git`

```bash
git branch -M main
git remote add origin https://github.com/[KULLANICI-ADI]/elementra.git
git push -u origin main
```

GitHub kullanıcı adı + şifre (veya Personal Access Token) sorabilir.

### 4️⃣ GitHub Pages Aktif Et

1. Repo sayfasında **Settings** sekmesine git
2. Sol menüde **Pages**'a tıkla
3. **Build and deployment** bölümünde:
   - **Source:** "Deploy from a branch"
   - **Branch:** `main` seç + `/ (root)` seç
   - **Save** butonu
4. Sayfayı yenile — birkaç saniye sonra üstte URL görünür:
   > 🌐 Your site is live at https://[KULLANICI].github.io/elementra/

### 5️⃣ Test Et

- Tarayıcıda yukarıdaki URL'i aç
- Ana menü açılmalı, 3 modül görünmeli
- Bir oyunu dene — sesler Web Audio fallback ile çalmalı

---

## 🔄 Sonraki Güncellemeler

Dosyada değişiklik yaptıkça:

```bash
git add .
git commit -m "Açıklama (örn: poster düzeltme)"
git push
```

GitHub Pages 1-2 dakikada otomatik yeniler.

**Önemli:** `index.html` içindeki script tag'lerindeki `?v=12` değerini değişiklikten sonra `?v=13`, `?v=14` olarak artırın (cache busting).

---

## 🔍 Sorun Giderme

### "404 Page Not Found"
- Settings → Pages'te Source `main / root` mu kontrol et
- 2-3 dakika bekle (ilk deploy biraz uzun)

### CSS/JS yüklenmiyor
- F12 ile DevTools → Network sekmesi → 404 alan dosya var mı?
- Genelde dosya adı case-sensitive (`Style.css` ≠ `style.css`)

### Sesler çalmıyor
- Bu beklenen davranış — `assets/sesler/*.mp3` dosyaları yok
- Web Audio API fallback otomatik devrede (F7.5)
- İlk tıklamadan sonra çalmalı (browser autoplay engeli)

---

## 💾 Sergi PC için Offline Yedek

Sergi gününde internet kesilirse diye **USB yedek**:

1. `tubitak_elementra/` klasörünün tamamını USB'ye kopyala
2. Sergi PC'sinde Chrome/Edge ile:
   - `index.html` dosyasını çift tıkla
   - Veya: tarayıcıya `file:///` yolu yapıştır
3. Direkt çalışır — internet gerekmez (Google Fonts hariç, fontsız çalışsa da kullanılabilir)

**Tavsiye:** USB'de poster.pdf + brosur.pdf + juri_karti.pdf de bulunsun.

---

## 📱 F8.7 Bağlantısı

Deploy URL'i hazır olduğunda:
- F8.7'de QR kod bu URL'i kodlar
- Poster + broşürdeki `[GITHUB_USERNAME]` placeholder gerçek kullanıcı adıyla değiştirilir

---

## 🎁 Bonus: Custom Domain (Opsiyonel)

Eğer `elementra.[okul].edu.tr` gibi özel domain istenirse:
1. Domain DNS → CNAME → `[kullanıcı].github.io`
2. GitHub Pages Settings → Custom domain → adresi gir
3. HTTPS otomatik aktiflenir (Let's Encrypt)

Sergide gerekli değil — standart `*.github.io` URL'i yeterli ve hatırlanır.

---

## ✅ Kontrol Listesi (Sergi Öncesi)

- [ ] Repo oluşturuldu, public
- [ ] Tüm dosyalar push edildi
- [ ] GitHub Pages aktif
- [ ] URL açılıyor, ana menü görünüyor
- [ ] 3 modül oynanabilir (Element Avı / Memory / Yapboz)
- [ ] Yansıtma + Profil + Ansiklopedi sekmeleri çalışıyor
- [ ] QR kod URL'i F8.7'de oluşturuldu
- [ ] Poster + broşür + jüri kartı PDF'leri yazdırıldı
- [ ] USB yedeği hazırlandı (offline)

---

**Hazırlayan:** ELEMENTRA Ekip · Claude (asistan) · 2026-05-12
