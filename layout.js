/**
 * СКВОШ СУББОТНИК — единая шапка и футер
 * ─────────────────────────────────────
 * Единственный источник правды для хедера и футера на ВСЕХ страницах.
 * Меняешь навигацию здесь — она обновляется везде сразу.
 *
 * Подключение на странице:
 *   <div id="header-mount"></div>   (в начале <body>)
 *   ...контент...
 *   <div id="footer-mount"></div>   (в конце <body>)
 *   <script src="config.js"></script>
 *   <script src="layout.js"></script>
 *
 * CTA «Узнай свой рейтинг» на всех страницах открывает модалку
 * «Скачать приложение» — её разметка и логика тоже живут здесь.
 */
(function () {

  // Единый список разделов — повторяется в шапке и футере
  var NAV = [
    { label: 'Платформа',     hash: '#top' },
    { label: 'Рейтинг',       hash: '#why' },
    { label: 'Как работает',  hash: '#how' },
    { label: 'Для кого',      hash: '#for-whom' },
    { label: 'Клубы',         hash: '#where' },
    { label: 'Организаторам', hash: '#organizers' },
    { label: 'Контакты',      page: 'contacts.html' }
  ];

  var isHome = document.body.getAttribute('data-page') === 'home';

  // href раздела: на главной — якорь, на внутренних — переход на index.html#…
  function navHref(item) {
    if (item.page) return item.page;
    return isHome ? item.hash : ('index.html' + item.hash);
  }

  function navLinks() {
    return NAV.map(function (item) {
      return '<a href="' + navHref(item) + '">' + item.label + '</a>';
    }).join('');
  }

  var logoHref = isHome ? '#top' : 'index.html';

  // CTA: на всех страницах открывает модалку «Скачать приложение»
  var cta = '<button class="btn-header-cta" id="headerCta">Узнай свой рейтинг</button>';

  var headerHTML =
    '<header class="site-header">' +
      '<div class="container header-inner">' +
        '<a class="logo" href="' + logoHref + '">СКВОШ<br>СУББОТНИК</a>' +
        '<nav class="main-nav" aria-label="Основная навигация">' + navLinks() + '</nav>' +
        cta +
      '</div>' +
    '</header>';

  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="container footer-inner">' +
        '<div class="footer-brand">' +
          '<p class="footer-logo">СКВОШ СУББОТНИК</p>' +
          '<p class="footer-tagline">прогресс начинается в игре</p>' +
        '</div>' +
        '<div class="footer-right">' +
          '<nav class="footer-nav" aria-label="Навигация в футере">' + navLinks() + '</nav>' +
          '<div class="footer-legal">' +
            '<a href="privacy.html">Политика конфиденциальности</a>' +
            '<a href="terms.html">Пользовательское соглашение</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // ── Модалка «Скачать приложение» — единая для всех страниц ──
  var modalHTML =
    '<div class="modal-overlay" id="downloadModal" role="dialog" aria-modal="true" aria-labelledby="modalHeading">' +
      '<div class="modal-card">' +
        '<button class="modal-close" id="modalClose" aria-label="Закрыть">' +
          '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
            '<line x1="1" y1="1" x2="12" y2="12"/><line x1="12" y1="1" x2="1" y2="12"/>' +
          '</svg>' +
        '</button>' +
        '<p class="eyebrow">скачать приложение</p>' +
        '<h2 class="modal-heading" id="modalHeading">СКВОШ<br>СУББОТНИК</h2>' +
        '<div class="modal-stores">' +
          '<a class="modal-store-btn" id="storeIos" href="#" target="_blank" rel="noopener">' +
            '<span class="modal-store-icon">' +
              '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>' +
            '</span>' +
            '<div class="modal-store-text">' +
              '<span class="modal-store-name">App Store</span>' +
              '<span class="modal-store-status">Скоро</span>' +
            '</div>' +
          '</a>' +
          '<a class="modal-store-btn" id="storeAndroid" href="#" target="_blank" rel="noopener">' +
            '<span class="modal-store-icon">' +
              '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.18 23.76c.3.17.65.19.98.08l12.15-7.01-2.69-2.69-10.44 9.62zm-1.1-20.1a1.5 1.5 0 0 0-.08.47v15.74c0 .17.03.33.08.47l.07.07 8.82-8.82v-.2L2.15 3.59l-.07.07zm19.16 8.43-2.54-1.47-2.97 2.97 2.97 2.97 2.57-1.48c.73-.42.73-1.57-.03-1.99zM4.16.24 16.31 7.25l-2.69 2.69L3.18.32c.33-.11.68-.09.98.08z"/></svg>' +
            '</span>' +
            '<div class="modal-store-text">' +
              '<span class="modal-store-name">Google Play</span>' +
              '<span class="modal-store-status">Скоро</span>' +
            '</div>' +
          '</a>' +
          '<a class="modal-store-btn" id="storeRustore" href="#" target="_blank" rel="noopener">' +
            '<span class="modal-store-icon">' +
              '<svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true">' +
                '<rect x="0.75" y="0.75" width="18.5" height="18.5" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
                '<path fill="currentColor" d="M6 5.5h5.2c1.8 0 3.1 1.2 3.1 2.9 0 1.1-.6 2.1-1.6 2.6L15 15.5h-2.4l-2.1-4H8v4H6V5.5zm2 2v2.6h3.1c.8 0 1.4-.55 1.4-1.3s-.6-1.3-1.4-1.3H8z"/>' +
              '</svg>' +
            '</span>' +
            '<div class="modal-store-text">' +
              '<span class="modal-store-name">RuStore</span>' +
              '<span class="modal-store-status">Скоро</span>' +
            '</div>' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</div>';

  var headerMount = document.getElementById('header-mount');
  var footerMount = document.getElementById('footer-mount');
  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // ── Логика модалки ──
  var modalOverlay = document.getElementById('downloadModal');
  var modalClose   = document.getElementById('modalClose');

  // Кнопки сторов из config.js → LINKS.app
  var appLinks = (typeof LINKS !== 'undefined' && LINKS.app) ? LINKS.app : {};
  var storeMap = [
    { id: 'storeIos',     url: appLinks.ios },
    { id: 'storeAndroid', url: appLinks.android },
    { id: 'storeRustore', url: appLinks.rustore }
  ];

  storeMap.forEach(function (s) {
    var el = document.getElementById(s.id);
    if (!el) return;
    if (s.url) {
      el.href = s.url;
      el.querySelector('.modal-store-status').textContent = 'Доступно';
    } else {
      el.classList.add('store-soon');
    }
  });

  function openModal() {
    modalOverlay.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('modal--open');
    document.body.style.overflow = '';
  }

  // Открытие по клику на CTA (в шапке и по тексту страниц)
  document.querySelectorAll('.btn-cta, .btn-join, .btn-header-cta').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('modal--open')) {
      closeModal();
    }
  });


  // ── Auto-fit long page headings (e.g. "КОНФИДЕНЦИАЛЬНОСТИ") ──
  // Shrinks the font-size until the longest line fits its container.
  function fitHeadings() {
    document.querySelectorAll('.page-hero h1').forEach(function (el) {
      el.style.fontSize = '';                 // reset to the CSS value first
      var size = parseFloat(getComputedStyle(el).fontSize);
      var guard = 0;
      while (el.scrollWidth > el.clientWidth + 1 && size > 16 && guard < 100) {
        size -= 1;
        el.style.fontSize = size + 'px';
        guard++;
      }
    });
  }

  fitHeadings();
  window.addEventListener('load', fitHeadings);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeadings);

  var fitTimer;
  window.addEventListener('resize', function () {
    clearTimeout(fitTimer);
    fitTimer = setTimeout(fitHeadings, 150);
  });

})();
