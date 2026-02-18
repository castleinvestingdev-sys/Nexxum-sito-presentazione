(function () {
    'use strict';

    var STORAGE_KEY = 'nexxum_cookie_consent';

    function getConsent() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function setConsent(value) {
        try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    }

    function removeBanner(banner) {
        banner.style.transform = 'translateY(100%)';
        setTimeout(function () {
            if (banner.parentNode) banner.parentNode.removeChild(banner);
        }, 400);
    }

    function init() {
        if (getConsent()) return; // already chosen

        var banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Consenso cookie');
        banner.innerHTML =
            '<div class="cookie-banner-text">' +
                '<strong>Questo sito utilizza cookie.</strong> ' +
                'Utilizziamo cookie tecnici, necessari al funzionamento del sito, e cookie di marketing per mostrarti contenuti personalizzati. ' +
                'Consulta la nostra <a href="privacy.html#cookie-policy">Cookie Policy</a> per saperne di più.' +
            '</div>' +
            '<div class="cookie-banner-buttons">' +
                '<button class="btn-cookie-accept" id="cookie-accept">Accetta tutti</button>' +
                '<button class="btn-cookie-reject" id="cookie-reject">Solo necessari</button>' +
            '</div>';

        document.body.appendChild(banner);

        // Trigger slide-in animation
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                banner.classList.add('visible');
            });
        });

        document.getElementById('cookie-accept').addEventListener('click', function () {
            setConsent('all');
            removeBanner(banner);
        });

        document.getElementById('cookie-reject').addEventListener('click', function () {
            setConsent('necessary');
            removeBanner(banner);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
