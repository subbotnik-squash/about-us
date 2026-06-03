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
 * data-page="home" на <body> главной — там CTA открывает модалку.
 * На остальных страницах CTA ведёт в Telegram.
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
  var tg = (typeof LINKS !== 'undefined' && LINKS.telegram) ? LINKS.telegram : 'https://t.me/squashsubbotnik';

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

  // CTA: на главной — кнопка (открывает модалку через script.js); иначе — ссылка в Telegram
  var cta = isHome
    ? '<button class="btn-header-cta" id="headerCta">Узнай свой рейтинг</button>'
    : '<a class="btn-header-cta" href="' + tg + '" target="_blank" rel="noopener">Узнай свой рейтинг</a>';

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

  var headerMount = document.getElementById('header-mount');
  var footerMount = document.getElementById('footer-mount');
  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;


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
