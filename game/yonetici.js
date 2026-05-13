// ============================================================
//  ELEMENTRA v2 — game/yonetici.js
//  F6.5 — Yönetici Ekranı (E.5)
//  Ctrl+Shift+A + şifre 4006 + 4 sıfırlama + şifre değiştirme
// ============================================================

'use strict';

const Yonetici = {
    SIFRE_KEY:     'elementra_v2_admin_pwd',
    DEFAULT_SIFRE: '4006',

    _getSifre() {
        try {
            const raw = localStorage.getItem(this.SIFRE_KEY);
            if (raw === null || raw === '') return this.DEFAULT_SIFRE;
            // JSON encoded olabilir (StorageManager ile uyumluluk)
            try {
                const parsed = JSON.parse(raw);
                if (typeof parsed === 'string' && parsed.length > 0) return parsed;
            } catch (_) {
                // Plain string — döndür
            }
            return raw;
        } catch (e) {
            return this.DEFAULT_SIFRE;
        }
    },

    _setSifre(yeni) {
        try {
            // JSON encoded olarak yaz (StorageManager ile uyumlu, _getSifre okurken parse eder)
            localStorage.setItem(this.SIFRE_KEY, JSON.stringify(yeni));
            return true;
        } catch (e) {
            console.warn('Şifre kaydedilemedi:', e);
            return false;
        }
    },

    /**
     * Ctrl+Shift+A ile çağrılır. Şifre giriş modal'ını açar.
     */
    acSifreModal() {
        const modal = document.getElementById('yonetici-sifre-modal');
        const input = document.getElementById('yonetici-sifre-input');
        const hata  = document.getElementById('yonetici-sifre-hata');
        if (!modal || !input) return;

        modal.classList.remove('hidden');
        if (hata) hata.classList.add('hidden');
        input.value = '';
        input.classList.remove('hata');
        setTimeout(() => input.focus(), 100);
    },

    kapatSifreModal() {
        document.getElementById('yonetici-sifre-modal')?.classList.add('hidden');
    },

    sifreDogrula() {
        const input = document.getElementById('yonetici-sifre-input');
        const hata  = document.getElementById('yonetici-sifre-hata');
        if (!input) return;

        const girilen = input.value.trim();
        if (girilen === this._getSifre()) {
            AudioManager.sesCal('butonTik');
            this.kapatSifreModal();
            this.acPanel();
        } else {
            input.classList.add('hata');
            if (hata) hata.classList.remove('hidden');
            input.value = '';
            input.focus();
            AudioManager.sesCal('yanlis');
        }
    },

    acPanel() {
        document.getElementById('yonetici-panel-modal')?.classList.remove('hidden');
    },

    kapatPanel() {
        document.getElementById('yonetici-panel-modal')?.classList.add('hidden');
    },

    _onayIste(mesaj, callback) {
        if (window.confirm(mesaj)) callback();
    },

    tumunuSifirla() {
        this._onayIste(
            'TÜM verileri sıfırlamak istediğinize emin misiniz?\n\nSkorlar, istatistikler, keşfedilen elementler/bileşikler, başarımlar — hepsi silinir.\n\nBu işlem geri alınamaz.',
            () => {
                StorageManager.clearAll();
                AudioManager.sesCal('seviyeAtlama');
                this._bildirGoster('Tüm veriler sıfırlandı.');
                this._refreshAnaMenu();
            }
        );
    },

    skorSifirla() {
        this._onayIste(
            'Skorları sıfırlamak istediğinize emin misiniz?\n\nTüm en iyi skorlar silinir.',
            () => {
                StorageManager.clearCategory('scores');
                AudioManager.sesCal('butonTik');
                this._bildirGoster('Skorlar sıfırlandı.');
                this._refreshAnaMenu();
            }
        );
    },

    statSifirla() {
        this._onayIste(
            'İstatistikleri sıfırlamak istediğinize emin misiniz?\n\nOyun sayısı, doğru/yanlış, karıştırma kayıtları silinir.',
            () => {
                StorageManager.clearCategory('stats');
                AudioManager.sesCal('butonTik');
                this._bildirGoster('İstatistikler sıfırlandı.');
                this._refreshAnaMenu();
            }
        );
    },

    rozetSifirla() {
        this._onayIste(
            'Başarımları sıfırlamak istediğinize emin misiniz?\n\nTüm rozetler kilitlenir.',
            () => {
                StorageManager.clearCategory('achievements');
                AudioManager.sesCal('butonTik');
                this._bildirGoster('Başarımlar sıfırlandı.');
                this._refreshAnaMenu();
            }
        );
    },

    acSifreDegistirModal() {
        const modal = document.getElementById('yonetici-sifre-degistir-modal');
        if (!modal) return;
        modal.classList.remove('hidden');

        ['mevcut', 'yeni', 'yeni2'].forEach(k => {
            const el = document.getElementById(`yonetici-sifre-${k}`);
            if (el) {
                el.value = '';
                el.classList.remove('hata');
            }
        });
        document.getElementById('yonetici-sifre-degistir-hata')?.classList.add('hidden');
        setTimeout(() => document.getElementById('yonetici-sifre-mevcut')?.focus(), 100);
    },

    kapatSifreDegistirModal() {
        document.getElementById('yonetici-sifre-degistir-modal')?.classList.add('hidden');
    },

    sifreDegistir() {
        const mevcutEl = document.getElementById('yonetici-sifre-mevcut');
        const yeniEl   = document.getElementById('yonetici-sifre-yeni');
        const yeni2El  = document.getElementById('yonetici-sifre-yeni2');
        if (!mevcutEl || !yeniEl || !yeni2El) return;

        const mevcut = mevcutEl.value.trim();
        const yeni   = yeniEl.value.trim();
        const yeni2  = yeni2El.value.trim();

        if (mevcut !== this._getSifre()) {
            this._sifreDegistirHata('Mevcut şifre yanlış.');
            return;
        }
        if (yeni.length < 4) {
            this._sifreDegistirHata('Yeni şifre en az 4 karakter olmalı.');
            return;
        }
        if (yeni !== yeni2) {
            this._sifreDegistirHata('Yeni şifreler eşleşmiyor.');
            return;
        }

        this._setSifre(yeni);
        AudioManager.sesCal('seviyeAtlama');
        this.kapatSifreDegistirModal();
        this._bildirGoster('Şifre değiştirildi.');
    },

    _sifreDegistirHata(mesaj) {
        const hata = document.getElementById('yonetici-sifre-degistir-hata');
        if (hata) {
            hata.textContent = mesaj;
            hata.classList.remove('hidden');
        }
        AudioManager.sesCal('yanlis');
    },

    /**
     * Başarı toast'u (FormulYapboz toast altyapısı reuse — yeşil varyant).
     */
    _bildirGoster(mesaj) {
        document.querySelectorAll('.fy-toast').forEach(t => t.remove());
        const toast = document.createElement('div');
        toast.className = 'fy-toast yonetici-toast';
        toast.innerHTML = `<svg class="ikon ikon-sm"><use href="#i-tik"/></svg> <span>${mesaj}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('fy-toast-exit'), 2300);
        setTimeout(() => toast.remove(), 2700);
    },

    _refreshAnaMenu() {
        this.kapatPanel();
        if (typeof SahneManager !== 'undefined') SahneManager.anaMenuyeDon();
        if (typeof window.modulKartGuncelle === 'function') {
            document.querySelectorAll('[data-modul]').forEach(window.modulKartGuncelle);
        }
    }
};

window.Yonetici = Yonetici;
console.log('✅ Yönetici yüklendi');
