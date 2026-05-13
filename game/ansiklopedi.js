// ============================================================
//  ELEMENTRA v2 — game/ansiklopedi.js
//  F6.2 — Mini Ansiklopedi
//  36 element + 24 bileşik kart listesi + arama + kategori filtresi
//  Tıklama → BaglamKarti modal (F4.6 + F5.8 ortak)
// ============================================================

'use strict';

const Ansiklopedi = {
    _aktifTab: 'elementler',  // 'elementler' | 'bilesikler'
    _aktifFiltre: 'tumu',
    _aramaTerimi: '',

    ELEMENT_KATEGORILER: [
        { id: 'tumu',          ad: 'Tümü' },
        { id: 'alkali',        ad: 'Alkali' },
        { id: 'toprak-alkali', ad: 'Toprak Alkali' },
        { id: 'gecis',         ad: 'Geçiş' },
        { id: 'gecis-sonrasi', ad: 'Geçiş Sonrası' },
        { id: 'yari-metal',    ad: 'Yarı Metal' },
        { id: 'ametal',        ad: 'Ametal' },
        { id: 'halojen',       ad: 'Halojen' },
        { id: 'soy-gaz',       ad: 'Soy Gaz' }
    ],

    BILESIK_KATEGORILER: [
        { id: 'tumu',         ad: 'Tümü' },
        { id: 'asit',         ad: 'Asit' },
        { id: 'baz',          ad: 'Baz' },
        { id: 'tuz',          ad: 'Tuz' },
        { id: 'oksit',        ad: 'Oksit' },
        { id: 'karbonat',     ad: 'Karbonat' },
        { id: 'hidrokarbon',  ad: 'Hidrokarbon' },
        { id: 'basit-gaz',    ad: 'Basit Gaz' },
        { id: 'diger',        ad: 'Diğer' }
    ],

    /**
     * Ansiklopedi ekranını aç. SahneManager.go ile birlikte çağrılır.
     */
    ac() {
        this._aktifTab = 'elementler';
        this._aktifFiltre = 'tumu';
        this._aramaTerimi = '';
        this._cizTahta();
        this._render();
    },

    _cizTahta() {
        const ekran = document.getElementById('ansiklopedi-ekran');
        if (!ekran) return;

        ekran.innerHTML = `
            <header class="ansk-header">
                <button class="btn btn-ghost btn-sm" type="button" data-ansk-aksiyon="anaMenu">
                    <svg class="ikon"><use href="#i-geri"/></svg>
                    Geri
                </button>
                <h1 class="ansk-baslik">
                    <svg class="ikon ikon-marka"><use href="#i-element-hucre"/></svg>
                    Ansiklopedi
                </h1>
                <div class="ansk-ara-grup">
                    <svg class="ikon ikon-sm"><use href="#i-arama"/></svg>
                    <input type="search"
                           id="ansk-ara"
                           class="ansk-ara"
                           placeholder="Ara: sembol, ad, latince, yaygın..."
                           autocomplete="off" />
                </div>
            </header>

            <div class="ansk-tab-bar">
                <button class="ansk-tab" data-tab="elementler" type="button">
                    Elementler <span class="ansk-tab-sayi">(${ELEMENTS.length})</span>
                </button>
                <button class="ansk-tab" data-tab="bilesikler" type="button">
                    Bileşikler <span class="ansk-tab-sayi">(${BILESIKLER.length})</span>
                </button>
            </div>

            <div class="ansk-filtre-bar" id="ansk-filtre-bar"></div>
            <div class="ansk-kart-grid" id="ansk-kart-grid"></div>
        `;

        // Event'leri bağla
        ekran.querySelectorAll('[data-ansk-aksiyon]').forEach(b => {
            b.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                SahneManager.anaMenuyeDon();
            });
        });

        ekran.querySelectorAll('[data-tab]').forEach(b => {
            b.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                this._aktifTab = b.dataset.tab;
                this._aktifFiltre = 'tumu';
                this._render();
            });
        });

        const araEl = document.getElementById('ansk-ara');
        araEl?.addEventListener('input', (e) => {
            this._aramaTerimi = e.target.value.trim().toLocaleLowerCase('tr-TR');
            this._render();
        });
    },

    _render() {
        // Tab aktif sınıfını güncelle
        document.querySelectorAll('#ansiklopedi-ekran [data-tab]').forEach(b => {
            b.classList.toggle('aktif', b.dataset.tab === this._aktifTab);
        });

        this._renderFiltreler();
        this._renderKartlar();
    },

    _renderFiltreler() {
        const filtreBar = document.getElementById('ansk-filtre-bar');
        if (!filtreBar) return;

        const kategoriler = this._aktifTab === 'elementler'
            ? this.ELEMENT_KATEGORILER
            : this.BILESIK_KATEGORILER;

        filtreBar.innerHTML = kategoriler.map(k => `
            <button class="ansk-chip ${this._aktifFiltre === k.id ? 'aktif' : ''}" data-filtre="${k.id}" type="button">
                ${k.ad}
            </button>
        `).join('');

        filtreBar.querySelectorAll('.ansk-chip').forEach(b => {
            b.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                this._aktifFiltre = b.dataset.filtre;
                this._render();
            });
        });
    },

    _renderKartlar() {
        const grid = document.getElementById('ansk-kart-grid');
        if (!grid) return;

        if (this._aktifTab === 'elementler') {
            const filtreli = this._filtreElement();
            if (filtreli.length === 0) {
                grid.innerHTML = this._emptyStateHTML();
                this._emptyStateEvent();
                return;
            }
            grid.innerHTML = filtreli.map(e => this._elementKartHTML(e)).join('');
        } else {
            const filtreli = this._filtreBilesik();
            if (filtreli.length === 0) {
                grid.innerHTML = this._emptyStateHTML();
                this._emptyStateEvent();
                return;
            }
            grid.innerHTML = filtreli.map(b => this._bilesikKartHTML(b)).join('');
        }

        // Kart tıklama event'leri
        grid.querySelectorAll('.ansk-kart').forEach(kart => {
            kart.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                const id = kart.dataset.id;
                if (this._aktifTab === 'elementler') {
                    const el = bulElementBySembol(id);
                    if (el && typeof BaglamKarti?.ac === 'function') {
                        BaglamKarti.ac(el, {
                            baslik: 'ELEMENT',
                            basliksinif: 'baglam-bilesik-rozet ansk-rozet-bilgi',
                            ikon: 'i-element-hucre'
                        });
                    }
                } else {
                    const b = bulBilesikById(id);
                    if (b && typeof BaglamKarti?.acBilesik === 'function') {
                        BaglamKarti.acBilesik(b, {
                            baslik: 'BİLEŞİK',
                            basliksinif: 'baglam-bilesik-rozet ansk-rozet-bilgi',
                            ikon: 'i-molekul'
                        });
                    }
                }
            });
        });
    },

    _filtreElement() {
        let liste = ELEMENTS.slice();
        if (this._aktifFiltre !== 'tumu') {
            liste = liste.filter(e => e.kategori === this._aktifFiltre);
        }
        if (this._aramaTerimi) {
            const q = this._aramaTerimi;
            liste = liste.filter(e =>
                e.sembol.toLocaleLowerCase('tr-TR').includes(q) ||
                e.ad.toLocaleLowerCase('tr-TR').includes(q) ||
                (e.latince  || '').toLocaleLowerCase('tr-TR').includes(q) ||
                (e.yayginAd || '').toLocaleLowerCase('tr-TR').includes(q)
            );
        }
        return liste;
    },

    _filtreBilesik() {
        let liste = BILESIKLER.slice();
        if (this._aktifFiltre !== 'tumu') {
            liste = liste.filter(b => b.kategori === this._aktifFiltre);
        }
        if (this._aramaTerimi) {
            const q = this._aramaTerimi;
            liste = liste.filter(b =>
                b.formulDuz.toLocaleLowerCase('tr-TR').includes(q) ||
                b.formul.toLocaleLowerCase('tr-TR').includes(q) ||
                b.ad.toLocaleLowerCase('tr-TR').includes(q) ||
                (b.yayginAd || '').toLocaleLowerCase('tr-TR').includes(q)
            );
        }
        return liste;
    },

    _elementKartHTML(e) {
        const kesfedildi = KesifManager.isElementKesfedilmis(e.sembol);
        const klsKesif = kesfedildi ? '' : 'ansk-kart-kesfedilmemis';
        return `
            <button class="ansk-kart ansk-element-kart kat-${e.kategori} ${klsKesif}" data-id="${e.sembol}" type="button" title="${e.ad}">
                <div class="ansk-kart-no">${e.atomNo}</div>
                <div class="ansk-kart-sembol">${e.sembol}</div>
                <div class="ansk-kart-ad">${e.ad}</div>
                ${!kesfedildi ? '<div class="ansk-kart-kilit" aria-label="Henüz keşfedilmedi" title="Henüz keşfedilmedi">🔒</div>' : ''}
            </button>
        `;
    },

    _bilesikKartHTML(b) {
        const kesfedildi = KesifManager.isBilesikKesfedilmis(b.id);
        const klsKesif = kesfedildi ? '' : 'ansk-kart-kesfedilmemis';
        return `
            <button class="ansk-kart ansk-bilesik-kart kat-bilesik-${b.kategori} ${klsKesif}" data-id="${b.id}" type="button" title="${b.ad}">
                <div class="ansk-kart-formul">${b.formul}</div>
                <div class="ansk-kart-ad">${b.ad}</div>
                ${b.yayginAd && b.yayginAd !== b.ad ? `<div class="ansk-kart-yaygin">"${b.yayginAd}"</div>` : ''}
                ${!kesfedildi ? '<div class="ansk-kart-kilit" aria-label="Henüz keşfedilmedi" title="Henüz keşfedilmedi">🔒</div>' : ''}
            </button>
        `;
    },

    _emptyStateHTML() {
        return `
            <div class="empty-state ansk-empty">
                <svg class="empty-state-icon ikon-2xl"><use href="#i-arama"/></svg>
                <p class="empty-state-baslik">Eşleşme bulunamadı</p>
                <p class="empty-state-aciklama">
                    ${this._aramaTerimi ? `"${this._aramaTerimi}" araması ile eşleşen kayıt yok.` : 'Bu filtrede kayıt yok.'}
                </p>
                ${this._aramaTerimi ? '<button class="btn btn-outline btn-sm" type="button" id="ansk-temizle">Aramayı Temizle</button>' : ''}
            </div>
        `;
    },

    _emptyStateEvent() {
        const tEl = document.getElementById('ansk-temizle');
        if (!tEl) return;
        tEl.addEventListener('click', () => {
            AudioManager.sesCal('butonTik');
            const araEl = document.getElementById('ansk-ara');
            if (araEl) araEl.value = '';
            this._aramaTerimi = '';
            this._render();
        });
    }
};

// Global expose
window.Ansiklopedi = Ansiklopedi;

console.log('✅ Ansiklopedi yüklendi');
