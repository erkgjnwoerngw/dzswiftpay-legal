/* DZ SwiftPay — Language Engine
   Requires window.TRANSLATIONS to be defined before this script runs. */
(function () {
  window.setLanguage = function (lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) lang = 'en';
    try { localStorage.setItem('dzsw_lang', lang); } catch (e) {}

    var root = document.documentElement;
    root.lang = lang;
    root.dir  = lang === 'ar' ? 'rtl' : 'ltr';

    var T = window.TRANSLATIONS[lang];

    /* plain text */
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var k = els[i].getAttribute('data-i18n');
      if (T[k] !== undefined) els[i].textContent = T[k];
    }

    /* rich HTML */
    var hels = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < hels.length; j++) {
      var hk = hels[j].getAttribute('data-i18n-html');
      if (T[hk] !== undefined) hels[j].innerHTML = T[hk];
    }

    /* page <title> */
    if (T.doc_title) document.title = T.doc_title;

    /* active lang button */
    var btns = document.querySelectorAll('.lang-btn');
    for (var b = 0; b < btns.length; b++) {
      btns[b].classList.toggle('lang-btn-active',
        btns[b].getAttribute('data-lang') === lang);
    }
  };

  function init() {
    var saved;
    try { saved = localStorage.getItem('dzsw_lang'); } catch (e) {}
    window.setLanguage(saved || 'en');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
