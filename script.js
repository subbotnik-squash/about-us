document.addEventListener('DOMContentLoaded', function () {

  // ── Platform-aware CTA ────────────────────────────────
  // Fill in links when app launches; fallback stays Telegram
  const APP_LINKS = {
    ios:      '',   // 'https://apps.apple.com/...'
    android:  '',   // 'https://play.google.com/store/...'
    fallback: 'https://t.me/squashsubbotnik'
  };

  function resolveCtaHref() {
    const ua = navigator.userAgent;
    if (/iphone|ipad|ipod/i.test(ua) && APP_LINKS.ios) return APP_LINKS.ios;
    if (/android/i.test(ua) && APP_LINKS.android) return APP_LINKS.android;
    return APP_LINKS.fallback;
  }

  document.querySelectorAll('.btn-cta').forEach(function (btn) {
    btn.href = resolveCtaHref();
  });



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
        // Ease-out toward target (factor 0.12 ≈ ~0.4 s for one card)
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
        target = pos;          // keep target in sync during auto-scroll
        track.scrollLeft = pos;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // Pause on hover so user can read / hover-inspect
    track.addEventListener('mouseenter', function () { paused = true; });
    track.addEventListener('mouseleave', function () {
      if (!animating) paused = false;
    });

    // Arrow buttons — smooth ease to nearest card, then resume auto-scroll
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
      // Base off current target if already animating (stacks clicks), else off pos
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



  // ── Animated counters ──────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString('ru') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
            if (!el.hasAttribute('data-noanimate')) animateCounter(el);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

});
