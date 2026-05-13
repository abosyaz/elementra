# ELEMENTRA v2 — Tasarım Kararları

**Amaç:** Geliştirme sırasında alınan tüm tasarım ve içerik kararlarının kayıt defteri. Onay listesi (`kapsam_onay_listesi.md`) "ne yapılacak?" sorusunu cevaplar — bu dosya "nasıl yapılacak?" sorusunu cevaplar.

---

## F0.1 — Renk Paleti

**Karar:** ✅ **PALET B — "Nebula Premium" (Mor + Pembe + Turkuaz)**
**Onaylanma Tarihi:** 2026-05-12
**Gerekçe:** Modern + premium hissi + sergide wow faktörü + Apple/Linear/Notion estetik dili

### Ana Renkler

| Rol | İsim | Hex | RGB | Kullanım Yeri |
|---|---|---|---|---|
| `--brand-primary` | Nebula moru | `#7C3AED` | 124, 58, 237 | Ana buton, link, ana vurgu |
| `--brand-primary-hover` | Daha koyu mor | `#6D28D9` | 109, 40, 217 | Hover state |
| `--brand-secondary` | Pembe vurgu | `#EC4899` | 236, 72, 153 | İkincil buton, dekoratif |
| `--brand-secondary-hover` | Daha koyu pembe | `#DB2777` | 219, 39, 119 | Hover state |
| `--color-success` | Akıcı yeşil | `#10B981` | 16, 185, 129 | Doğru cevap, başarı |
| `--color-success-light` | Açık yeşil | `#D1FAE5` | 209, 250, 229 | Doğru cevap arkaplanı |
| `--color-error` | Sıcak kırmızı | `#EF4444` | 239, 68, 68 | Yanlış cevap, hata |
| `--color-error-light` | Açık kırmızı | `#FEE2E2` | 254, 226, 226 | Yanlış cevap arkaplanı |
| `--color-warning` | Sıcak turuncu | `#F59E0B` | 245, 158, 11 | İpucu, dikkat |
| `--color-info` | Turkuaz | `#06B6D4` | 6, 182, 212 | Bilgi mesajları |

### Yüzey Renkleri

| Rol | İsim | Hex | Kullanım |
|---|---|---|---|
| `--surface-0` | Çok açık mor | `#FAF5FF` | Sayfa zemini |
| `--surface-1` | Beyaz | `#FFFFFF` | Kart zemini |
| `--surface-2` | Açık gri-mor | `#F3F4F6` | Yükseltilmiş kart |
| `--surface-3` | Beyaz + gölge | `#FFFFFF` (shadow ile) | Modal, popover |

### Metin Renkleri

| Rol | İsim | Hex | Kontrast (Beyaz üzerine) | Kullanım |
|---|---|---|---|---|
| `--text-primary` | Koyu mor-siyah | `#1E1B4B` | 16.8:1 (AAA) | Başlık + ana gövde |
| `--text-secondary` | Orta gri | `#4B5563` | 7.6:1 (AAA) | Açıklama, gövde |
| `--text-muted` | Açık gri | `#6B7280` | 5.7:1 (AA) | Caption, placeholder |
| `--text-inverse` | Beyaz | `#FFFFFF` | — | Koyu zemin üzerinde |

### Kontrast Doğrulaması (WCAG AA — F.1 Gereği)

✅ Tüm metin/zemin kombinasyonları en az **4.5:1** sağlıyor.
✅ Ana buton (`#7C3AED` üzeri beyaz metin) = **5.7:1** (AA)
✅ Hata mesajı (`#EF4444` üzeri beyaz) = **3.9:1** — büyük metin (≥18pt) için yeterli; küçük metinde **koyu metin** kullanılacak

### Periyodik Tablo Kategori Renkleri (Standart Kimya Sistemi)

Bu palet ana marka renklerinden **bağımsız** — kimya öğretim geleneğine uygun:

| Kategori | Renk Adı | Hex |
|---|---|---|
| `--cat-alkali` | Alkali kırmızı | `#FCA5A5` |
| `--cat-alkaline-earth` | Toprak alkali turuncu | `#FDBA74` |
| `--cat-transition` | Geçiş sarı | `#FCD34D` |
| `--cat-post-transition` | Geçiş sonrası yeşil-sarı | `#A3E635` |
| `--cat-metalloid` | Yarı metal turkuaz | `#67E8F9` |
| `--cat-nonmetal` | Ametal mavi | `#93C5FD` |
| `--cat-halogen` | Halojen mor | `#C4B5FD` |
| `--cat-noble-gas` | Soy gaz pembe | `#FBCFE8` |
| `--cat-lanthanide` | Lantanit açık pembe | `#FBCFE8` |
| `--cat-actinide` | Aktinit açık turuncu | `#FED7AA` |
| `--cat-unknown` | Bilinmeyen gri | `#E5E7EB` |

### Gradient Tanımları (Premium Efektler için)

```css
--gradient-brand: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
--gradient-success: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);
--gradient-night: linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%);
```

### Gölge Tanımları

```css
--shadow-sm: 0 1px 2px rgba(30, 27, 75, 0.05);
--shadow-md: 0 4px 6px rgba(30, 27, 75, 0.10);
--shadow-lg: 0 10px 25px rgba(30, 27, 75, 0.15);
--shadow-xl: 0 20px 40px rgba(30, 27, 75, 0.20);
--shadow-glow-brand: 0 0 24px rgba(124, 58, 237, 0.35);
--shadow-glow-success: 0 0 24px rgba(16, 185, 129, 0.35);
```

---

---

## F0.2 — Logo + Marka

**Karar:** ✅ **KONSEPT A — "Atomik Sade"**
**Onaylanma Tarihi:** 2026-05-12
**Gerekçe:** En evrensel kimya sembolü (atom), her boyutta okunur, premium minimal estetik

### Logo Yapısı

**Tam Logo (yatay — header, poster):**
```
[Atom ikonu] ELEMENTRA
```

**Sadece İkon (favicon, kare alanlar):**
- Atom (çekirdek + 2-3 yörünge halkası)
- Vector SVG, scale-independent

**Sadece Yazı (footer, alt başlık):**
- "ELEMENTRA"
- Oxanium 800
- Letter-spacing: 2px

### Renk Uygulamaları

| Kullanım Yeri | Atom İkonu | Yazı |
|---|---|---|
| Ana menü logo (büyük) | Gradient (mor→pembe) | Marka moru `#7C3AED` |
| Header logo (küçük) | Tek renk mor | Marka moru |
| Poster üst köşe | Gradient | Marka moru veya beyaz (zemine göre) |
| Favicon (16×16, 32×32) | Tek renk mor | Yazı yok (sadece atom) |
| Sergi sunum karta | Sadece yazı (kare yok) | Marka moru |

### SVG Yapısı (Geliştirme Aşaması)

```svg
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <!-- Çekirdek -->
  <circle cx="32" cy="32" r="4" fill="url(#gradBrand)"/>

  <!-- Yörünge 1 -->
  <ellipse cx="32" cy="32" rx="24" ry="10" fill="none"
           stroke="url(#gradBrand)" stroke-width="2"
           transform="rotate(30 32 32)"/>

  <!-- Yörünge 2 -->
  <ellipse cx="32" cy="32" rx="24" ry="10" fill="none"
           stroke="url(#gradBrand)" stroke-width="2"
           transform="rotate(-30 32 32)"/>

  <!-- Yörünge 3 -->
  <ellipse cx="32" cy="32" rx="24" ry="10" fill="none"
           stroke="url(#gradBrand)" stroke-width="2"
           transform="rotate(90 32 32)"/>

  <!-- Elektron noktaları (opsiyonel) -->
  <circle cx="56" cy="32" r="2" fill="#EC4899"/>

  <!-- Gradient tanımı -->
  <defs>
    <linearGradient id="gradBrand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
  </defs>
</svg>
```

**Geliştirme aşamasında bu SVG ince ayar yapılacak** (yörünge sayısı, açılar, elektron noktası gösterimi).

---

---

## F0.3 — Yönetici Şifresi

**Karar:** ✅ **`4006`** (TÜBİTAK 4006 programı referansı)
**Onaylanma Tarihi:** 2026-05-12
**Erişim:** `Ctrl+Shift+A` → şifre girişi modalı → yönetici paneli
**Değiştirme:** Yönetici panelinden sonradan değiştirilebilir (E.5)
**localStorage anahtarı:** `elementra_v2_admin_pwd`
**Default değer:** `"4006"` (string)

---

## F0.4 — Element ve Bileşik Veritabanı

**Karar:** ✅ **36 element + 24 bileşik (olduğu gibi)**
**Onaylanma Tarihi:** 2026-05-12
**Kaynak:** [kimya_arastirma.md](kimya_arastirma.md) — MEB 9.2.3.3, 9.2.3.4, 9.3.2.1, 9.3.2.2 kazanımlarına uyumlu

### Element Listesi (36)
- **İlk 20:** H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar, K, Ca
- **Ek 16:** Cr, Mn, Fe, Co, Ni, Cu, Zn, Br, Ag, Sn, I, Ba, Pt, Au, Hg, Pb

### Bileşik Listesi (24)
- **Kolay (8):** H₂O, CO₂, NaCl, O₂, CH₄, HCl, NH₃, H₂
- **Orta (8):** NaOH, H₂SO₄, CaCO₃, Fe₂O₃, NaHCO₃, KI, MgO, AgCl
- **Zor (8):** H₃PO₄, Ca(OH)₂, KMnO₄, CuSO₄, Al₂O₃, NH₄Cl, Na₂SO₄, H₂CO₃

### Dosya Yapısı
- `data/elements.js` — 36 element + meta
- `data/bilesikler.js` — 24 bileşik + meta

---

# 🎉 FAZ 0 TAMAMLANDI

Tüm tasarım kararları alındı. **FAZ 1 — Altyapı** başlıyor.

| Karar | Sonuç |
|---|---|
| Renk paleti | Nebula Premium (Mor + Pembe + Turkuaz) |
| Logo | Atomik Sade (atom + ELEMENTRA yazısı) |
| Yönetici şifresi | `4006` |
| Veritabanı | 36 element + 24 bileşik |

---

## Sonraki Adım: FAZ 1 — Altyapı

İlk adım: **F1.1 — `data/elements.js` veritabanı dosyası yazımı**
