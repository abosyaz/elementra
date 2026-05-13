// ============================================================
//  ELEMENTRA v2 — game/basarimlar.js
//  F6.4 — Başarımlar Sayfası
//  20 rozet listesi (kazanılan + kilitli) + filtre chipleri
// ============================================================

'use strict';

const Basarimlar = {
    _aktifFiltre: 'tumu',  // 'tumu' | 'kazanildi' | 'kilitli'

    ac() {
        this._aktifFiltre = 'tumu';
        this._render();
    },

    _render() {
        const ekran = document.getElementById('basarim-ekran');
        if (!ekran) return;

        const kazanilan = AchievementManager.getCount();
        const toplam = Object.keys(ROZETLER).length;

        ekran.innerHTML = `
            <header class="ansk-header">
                <button class="btn btn-ghost btn-sm" type="button" data-aksiyon="profilEDon">
                    <svg class="ikon"><use href="#i-geri"/></svg>
                    Geri
                </button>
                <h1 class="ansk-baslik">
                    <svg class="ikon ikon-marka"><use href="#i-rozet"/></svg>
                    Başarımlarım
                </h1>
                <div class="basarim-sayac tabular">${kazanilan} / ${toplam}</div>
            </header>

            <div class="ansk-filtre-bar" id="basarim-filtre-bar"></div>
            <div class="basarim-grid" id="basarim-grid"></div>
        `;

        this._renderFiltre();
        this._renderGrid();

        ekran.querySelectorAll('[data-aksiyon="profilEDon"]').forEach(b => {
            b.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                if (typeof window.profilEkraniDoldur === 'function') window.profilEkraniDoldur();
                SahneManager.go('profil-ekran');
            });
        });
    },

    _renderFiltre() {
        const bar = document.getElementById('basarim-filtre-bar');
        if (!bar) return;

        const kazanilan = AchievementManager.getCount();
        const toplam = Object.keys(ROZETLER).length;
        const kilitli = toplam - kazanilan;

        const filtreler = [
            { id: 'tumu',      ad: `Tümü (${toplam})` },
            { id: 'kazanildi', ad: `Kazanılanlar (${kazanilan})` },
            { id: 'kilitli',   ad: `Kilitliler (${kilitli})` }
        ];

        bar.innerHTML = filtreler.map(f => `
            <button class="ansk-chip ${this._aktifFiltre === f.id ? 'aktif' : ''}" data-filtre="${f.id}" type="button">
                ${f.ad}
            </button>
        `).join('');

        bar.querySelectorAll('.ansk-chip').forEach(b => {
            b.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                this._aktifFiltre = b.dataset.filtre;
                this._render();
            });
        });
    },

    _renderGrid() {
        const grid = document.getElementById('basarim-grid');
        if (!grid) return;

        const rozetIds = Object.keys(ROZETLER);
        const kazanilanlar = AchievementManager.get();

        let liste = rozetIds.map(id => ({
            id,
            ...ROZETLER[id],
            kazanildi: AchievementManager.isUnlocked(id),
            tarih: kazanilanlar[id] || null
        }));

        if (this._aktifFiltre === 'kazanildi') {
            liste = liste.filter(r => r.kazanildi);
        } else if (this._aktifFiltre === 'kilitli') {
            liste = liste.filter(r => !r.kazanildi);
        }

        if (liste.length === 0) {
            grid.innerHTML = this._emptyStateHTML();
            return;
        }

        grid.innerHTML = liste.map(r => this._kartHTML(r)).join('');
    },

    _kartHTML(r) {
        const kilitKls = r.kazanildi ? '' : 'basarim-kart-kilitli';
        const renkKls  = r.kazanildi ? (r.renk || 'badge-brand') : 'badge-muted';

        let tarihMetni = null;
        if (r.kazanildi && r.tarih) {
            try {
                tarihMetni = new Date(r.tarih).toLocaleDateString('tr-TR', {
                    day: '2-digit', month: 'long', year: 'numeric'
                });
            } catch (e) {
                tarihMetni = r.tarih.slice(0, 10);
            }
        }

        return `
            <div class="basarim-kart ${kilitKls}" data-rozet="${r.id}">
                ${!r.kazanildi ? '<div class="basarim-kilit" aria-label="Kilitli">🔒</div>' : ''}
                <div class="basarim-ikon ${renkKls}">
                    <svg class="ikon ikon-lg"><use href="#${r.ikon || 'i-rozet'}"/></svg>
                </div>
                <h3 class="basarim-ad">${r.ad}</h3>
                <p class="basarim-aciklama">${r.aciklama}</p>
                ${r.kazanildi
                    ? `<div class="basarim-tarih tabular">🎉 ${tarihMetni || 'Kazanıldı'}</div>`
                    : '<div class="basarim-tarih basarim-tarih-kilitli">Kilitli</div>'}
            </div>
        `;
    },

    _emptyStateHTML() {
        if (this._aktifFiltre === 'kazanildi') {
            return `
                <div class="empty-state basarim-empty">
                    <svg class="empty-state-icon ikon-2xl"><use href="#i-rozet"/></svg>
                    <p class="empty-state-baslik">Henüz başarım kazanmadın</p>
                    <p class="empty-state-aciklama">İlk oyununu oyna, rozetler burada görünecek!</p>
                </div>
            `;
        }
        if (this._aktifFiltre === 'kilitli') {
            return `
                <div class="empty-state basarim-empty">
                    <svg class="empty-state-icon ikon-2xl"><use href="#i-kupa"/></svg>
                    <p class="empty-state-baslik">Tüm rozetler kazanıldı! 🎉</p>
                    <p class="empty-state-aciklama">Tebrikler, bütün başarımları tamamladın!</p>
                </div>
            `;
        }
        return '';
    }
};

window.Basarimlar = Basarimlar;
console.log('✅ Başarımlar yüklendi');
