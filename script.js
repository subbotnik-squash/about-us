document.addEventListener('DOMContentLoaded', function () {

  // ── Platform-aware CTA ────────────────────────────────
  // All links are managed in config.js (LINKS object)
  function resolveCtaHref() {
    var ua = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua) && LINKS.app.ios)     return LINKS.app.ios;
    if (/android/i.test(ua)           && LINKS.app.android) return LINKS.app.android;
    return LINKS.telegram;
  }

  document.querySelectorAll('.btn-cta').forEach(function (btn) {
    btn.href = resolveCtaHref();
  });

  // ── Club card links (must run BEFORE carousel clones the cards) ────
  document.querySelectorAll('.club-card[data-club]').forEach(function (card) {
    var url = LINKS.clubs[card.dataset.club];
    if (url) card.href = url;
  });



  // Модалка «Скачать приложение» живёт в layout.js (общая для всех страниц)

  // ── Clubs carousel — infinite auto-scroll ─────────────
  (function () {
    var track = document.getElementById('clubsTrack');
    if (!track) return;

    // Clone all original cards and append for seamless loop
    var origCards = Array.from(track.querySelectorAll('.club-card'));
    origCards.forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    var pos       = 0;
    var target    = 0;
    var animating = false;
    var speed     = 0.5;   // px per frame  ≈ 30 px/s @ 60fps
    var paused    = false;

    function halfWidth() {
      return track.scrollWidth / 2;
    }

    function tick() {
      if (animating) {
        var diff = target - pos;
        if (Math.abs(diff) < 0.5) {
          pos = target;
          animating = false;
        } else {
          pos += diff * 0.12;
        }
        track.scrollLeft = pos;
      } else if (!paused) {
        pos += speed;
        if (pos >= halfWidth()) pos = 0;
        target = pos;
        track.scrollLeft = pos;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    track.addEventListener('mouseenter', function () { paused = true; });
    track.addEventListener('mouseleave', function () {
      if (!animating) paused = false;
    });

    var prevBtn     = document.getElementById('clubsPrev');
    var nextBtn     = document.getElementById('clubsNext');
    var resumeTimer = null;

    function cardStep() {
      var c   = track.querySelector('.club-card');
      var gap = parseFloat(getComputedStyle(track).gap) || 16;
      return c ? c.offsetWidth + gap : 280;
    }

    function nudge(dir) {
      clearTimeout(resumeTimer);
      paused = true;
      var half = halfWidth();
      var base = animating ? target : pos;
      target = Math.max(0, Math.min(half - 1, base + dir * cardStep()));
      animating = true;
      resumeTimer = setTimeout(function () {
        animating = false;
        paused = false;
      }, 800);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { nudge(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { nudge(+1); });
  })();



  // ── Cap each section lead to its heading width ─────
  function syncLeadWidths() {
    document.querySelectorAll('.section-head').forEach(function (head) {
      var h2   = head.querySelector('h2');
      var lead = head.querySelector('.section-lead');
      if (!h2 || !lead) return;
      lead.style.maxWidth = Math.round(h2.getBoundingClientRect().width) + 'px';
    });
  }
  syncLeadWidths();
  window.addEventListener('load', syncLeadWidths);
  var leadResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(leadResizeTimer);
    leadResizeTimer = setTimeout(syncLeadWidths, 150);
  });



  // ── Scroll reveal ─────────────────────────────────
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  function addReveal(selector, staggerSec) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add('reveal');
      if (staggerSec) el.style.transitionDelay = (i * staggerSec) + 's';
      revealObserver.observe(el);
    });
  }

  addReveal('.section-head');
  addReveal('.stat',         0.09);
  addReveal('.problem-row',  0.08);
  addReveal('.feature',      0.09);
  addReveal('.level',        0.09);
  addReveal('.org-col',      0.1);
  addReveal('.btn-primary');



  // ── Animated counters ──────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString('ru');
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-val[data-target]').forEach(el => {
            if (!el.hasAttribute('data-noanimate')) animateCounter(el);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

});
