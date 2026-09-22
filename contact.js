(() => {
  const flight = document.querySelector('.contact-flight');
  const motion = document.querySelector('#contact-plane-motion');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!flight || !motion || reduceMotion.matches) return;

  const idleDelay = 11000;
  const previewMode = new URLSearchParams(window.location.search).has('plane');
  let idleTimer;
  let hasRun = false;

  const run = () => {
    if (hasRun || document.hidden) return;
    hasRun = true;
    flight.classList.add('is-flying');
    motion.beginElement();
  };

  const resetIdleTimer = () => {
    if (hasRun) return;
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(run, idleDelay);
  };

  ['pointermove', 'keydown', 'touchstart', 'scroll'].forEach((eventName) => {
    window.addEventListener(eventName, resetIdleTimer, { passive: true });
  });

  document.addEventListener('visibilitychange', resetIdleTimer);
  if (previewMode) {
    window.setTimeout(run, 450);
  } else {
    resetIdleTimer();
  }
})();
