(() => {
  const runner = document.querySelector('.about-dog-run');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!runner || reduceMotion.matches) return;

  const idleDelay = 12000;
  const previewMode = new URLSearchParams(window.location.search).has('dog');
  let idleTimer;
  let hasRun = false;

  const run = () => {
    if (hasRun || document.hidden) return;
    hasRun = true;
    runner.classList.add('is-running');
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
