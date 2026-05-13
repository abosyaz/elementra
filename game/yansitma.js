// ============================================================
//  ELEMENTRA v2 — game/yansitma.js
//  F6.3 — Yansıtma Anı
//  Genel başarı + modül bazlı başarı + en sık karıştırılanlar + dinamik öneriler
// ============================================================

'use strict';

const Yansitma = {
    /**
     * Yansıtma ekranını aç. SahneManager.go ile birlikte çağrılır.
     */
    ac() {
        this._render();
    },

    _render() {
        const ekran = document.getElementById('yansitma-ekran');
        if (!ekran) return;

        const stats = StatManager.get();
        const ilerleme = KesifManager.getIlerleme();

        // Hiç oyun oynamamış → empty state
        if (stats.toplamOyun < 1) {
            ekran.innerHTML = this._emptyStateHTML();
            this._bindGeri();
            return;
        }

        const genelBasari = StatManager.genelBasari();
        const sureGosterim = sureFormatla(stats.toplamSure);
        const modulHTML = this._modulBasariHTML(stats);
        const karistirmaHTML = this._karistirmaHTML();
        const onerilerHTML = this._onerilerHTML(stats, ilerleme);

        ekran.innerHTML = `
            <header class="ansk-header">
                <button class="btn btn-ghost btn-sm" type="button" data-aksiyon="profilEDon">
                    <svg class="ikon"><use href="#i-geri"/></svg>
                    Geri
                </button>
                <h1 class="ansk-baslik">
                    <svg class="ikon ikon-marka"><use href="#i-ampul"/></svg>
                    Yansıtma Anı
                </h1>
            </header>

            <section class="yans-bolum yans-genel">
                <div class="yans-stat-blok">
                    <div class="yans-stat-buyuk">
                        <span class="yans-stat-deger tabular">%${genelBasari}</span>
                        <span class="yans-stat-etiket">Genel başarın</span>
                    </div>
                    <div class="yans-stat-kucuk">
                        <div><strong>${stats.toplamOyun}</strong> oyun oynandı</div>
                        <div><strong>${stats.toplamDogru}</strong> doğru · <strong>${stats.toplamYanlis}</strong> yanlış</div>
                        <div><strong>${sureGosterim}</strong> toplam süre</div>
                    </div>
                </div>
            </section>

            <section class="yans-bolum">
                <h2 class="yans-bolum-baslik">Modüllere Göre Başarı</h2>
                ${modulHTML}
            </section>

            ${karistirmaHTML}

            <section class="yans-bolum">
                <h2 class="yans-bolum-baslik">Önerilerimiz</h2>
                <div class="yans-oneri-grid">${onerilerHTML}</div>
            </section>
        `;

        this._bindGeri();
    },

    _bindGeri() {
        document.querySelectorAll('#yansitma-ekran [data-aksiyon="profilEDon"]').forEach(b => {
            b.addEventListener('click', () => {
                AudioManager.sesCal('butonTik');
                if (typeof window.profilEkraniDoldur === 'function') {
                    window.profilEkraniDoldur();
                }
                SahneManager.go('profil-ekran');
            });
        });
    },

    _emptyStateHTML() {
        return `
            <header class="ansk-header">
                <button class="btn btn-ghost btn-sm" type="button" data-aksiyon="profilEDon">
                    <svg class="ikon"><use href="#i-geri"/></svg>
                    Geri
                </button>
                <h1 class="ansk-baslik">
                    <svg class="ikon ikon-marka"><use href="#i-ampul"/></svg>
                    Yansıtma Anı
                </h1>
            </header>
            <div class="empty-state" style="padding: var(--space-12) var(--space-6); margin-top: var(--space-4);">
                <svg class="empty-state-icon ikon-2xl"><use href="#i-ampul"/></svg>
                <p class="empty-state-baslik">Henüz yeterli veri yok</p>
                <p class="empty-state-aciklama">
                    En az 1 oyun oyna — yansıtma sayfası sana özel önerileri burada gösterecek.
                </p>
            </div>
        `;
    },

    _modulBasariHTML(stats) {
        const moduller = [
            { id: 'elementAvi',       ad: 'Element Avı' },
            { id: 'sembolEslestirme', ad: 'Sembol Eşleştirme' },
            { id: 'formulYapboz',     ad: 'Formül Yapboz' }
        ];

        return moduller.map(m => {
            const ms = stats.modulIstatistik[m.id] || { oyun: 0, dogru: 0, yanlis: 0 };
            const toplam = ms.dogru + ms.yanlis;
            const yuzde = toplam > 0 ? Math.round((ms.dogru / toplam) * 100) : 0;
            const oyunMetni = ms.oyun > 0 ? `${ms.oyun} oyun` : 'Hiç oynanmamış';

            return `
                <div class="yans-modul-satir">
                    <div class="yans-modul-baslik">
                        <span>${m.ad}</span>
                        <span class="yans-modul-meta tabular">%${yuzde} · ${oyunMetni}</span>
                    </div>
                    <div class="progress">
                        <div class="progress-fill" style="width: ${yuzde}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    },

    _karistirmaHTML() {
        const liste = StatManager.enCokKaristirilan(5)
            .filter(k => k.yanlis && k.dogru);  // sadece geçerli element çiftleri

        if (liste.length === 0) return '';

        return `
            <section class="yans-bolum">
                <h2 class="yans-bolum-baslik">En Sık Karıştırdıkların</h2>
                <div class="yans-karistirma-liste">
                    ${liste.map(k => `
                        <div class="yans-karistirma-satir">
                            <span class="yans-karistirma-ciftler">
                                <strong>${k.yanlis}</strong>
                                <span class="text-muted">↔</span>
                                <strong>${k.dogru}</strong>
                            </span>
                            <span class="yans-karistirma-sayi tabular">${k.sayi} kez</span>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },

    _onerilerHTML(stats, ilerleme) {
        const oneriler = [];
        const moduller = ['elementAvi', 'sembolEslestirme', 'formulYapboz'];

        // 1) En düşük başarılı modül (< %60)
        let enZayifModul = null;
        let enDusukBasari = 100;
        moduller.forEach(m => {
            const ms = stats.modulIstatistik[m] || { oyun: 0, dogru: 0, yanlis: 0 };
            const toplam = ms.dogru + ms.yanlis;
            if (ms.oyun >= 2 && toplam > 0) {
                const basari = (ms.dogru / toplam) * 100;
                if (basari < enDusukBasari) {
                    enDusukBasari = basari;
                    enZayifModul = m;
                }
            }
        });
        if (enZayifModul && enDusukBasari < 60) {
            oneriler.push({
                ikon: 'i-uyari',
                renk: 'warning',
                mesaj: `<strong>${MODUL_ADLAR_TR[enZayifModul]}</strong>'da başarın <strong>%${Math.round(enDusukBasari)}</strong>. Kolay zorluğa dönmek faydalı olabilir.`
            });
        }

        // 2) Element keşfi düşük
        if (ilerleme.elementler.yuzde < 60) {
            oneriler.push({
                ikon: 'i-element-hucre',
                renk: 'info',
                mesaj: `Henüz <strong>${ilerleme.elementler.kesfedilen}/36</strong> element keşfettin. <strong>Ansiklopedi</strong>'ye göz atıp eksikleri görebilirsin.`
            });
        }

        // 3) Bileşik keşfi düşük
        if (ilerleme.bilesikler.yuzde < 60) {
            oneriler.push({
                ikon: 'i-molekul',
                renk: 'info',
                mesaj: `Henüz <strong>${ilerleme.bilesikler.kesfedilen}/24</strong> bileşik kurdun. <strong>Formül Yapboz</strong>'da daha çok oyna.`
            });
        }

        // 4) Hiç öneri yoksa tebrik
        if (oneriler.length === 0) {
            oneriler.push({
                ikon: 'i-yildiz-dolu',
                renk: 'success',
                mesaj: 'Performansın harika! Daha zor seviyeleri denemeye hazırsın. <strong>Uzman</strong> zorluğu seni bekliyor.'
            });
        }

        return oneriler.map(o => `
            <div class="yans-oneri-kart yans-oneri-${o.renk}">
                <div class="yans-oneri-ikon">
                    <svg class="ikon"><use href="#${o.ikon}"/></svg>
                </div>
                <p class="yans-oneri-metin">${o.mesaj}</p>
            </div>
        `).join('');
    }
};

window.Yansitma = Yansitma;
console.log('✅ Yansıtma yüklendi');
