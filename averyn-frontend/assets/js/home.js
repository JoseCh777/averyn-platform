(function () {
  'use strict';

  var peek = document.querySelector('.av-header-peek');
  var backToTop = document.querySelector('.av-back-to-top');

  var revealScheduled = false;
  var revealFromTop = function (event) {
    if (revealScheduled) return;
    revealScheduled = true;
    requestAnimationFrame(function () {
      revealScheduled = false;
      if (peek) peek.classList.toggle('is-visible', event.clientY <= 96);
    });
  };
  window.addEventListener('mousemove', revealFromTop);
  if (peek) {
    peek.addEventListener('mouseenter', function () { peek.classList.add('is-visible'); });
    peek.addEventListener('mouseleave', function () { peek.classList.remove('is-visible'); });
  }

  var updateBackToTop = function () {
    if (backToTop) {
      var visible = window.scrollY > 520;
      backToTop.classList.toggle('is-visible', visible);
      backToTop.setAttribute('aria-hidden', String(!visible));
      backToTop.tabIndex = visible ? 0 : -1;
    }
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var revealTargets = document.querySelectorAll('.av-reveal');
  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();