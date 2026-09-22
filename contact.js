(() => {
  const flight = document.querySelector('.contact-flight');
  const route = document.querySelector('#contact-flight-route');
  const plane = document.querySelector('.contact-flight__plane');
  const trail = document.querySelector('.contact-flight__trail');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!flight || !route || !plane || !trail || reduceMotion.matches) return;

  const idleDelay = 11000;
  const flightDuration = 6600;
  const planeHeadingCorrection = -17;
  const previewMode = new URLSearchParams(window.location.search).has('plane');
  let idleTimer;
  let hasRun = false;

  const hermite = (value, start, end, startSpeed, endSpeed, duration) => {
    const value2 = value * value;
    const value3 = value2 * value;
    return (2 * value3 - 3 * value2 + 1) * start
      + (value3 - 2 * value2 + value) * duration * startSpeed
      + (-2 * value3 + 3 * value2) * end
      + (value3 - value2) * duration * endSpeed;
  };

  // Map elapsed time to distance travelled. The plane loses speed while
  // climbing into the loop, gathers it again on the descent, then glides out.
  const distanceProgress = (timeProgress) => {
    if (timeProgress < 0.3) {
      return hermite(timeProgress / 0.3, 0, 0.29, 1.15, 0.55, 0.3);
    }
    if (timeProgress < 0.59) {
      return hermite((timeProgress - 0.3) / 0.29, 0.29, 0.49, 0.55, 0.6, 0.29);
    }
    if (timeProgress < 0.82) {
      return hermite((timeProgress - 0.59) / 0.23, 0.49, 0.81, 0.6, 1.7, 0.23);
    }
    return hermite((timeProgress - 0.82) / 0.18, 0.81, 1, 1.7, 0.75, 0.18);
  };

  const shortestAngle = (from, to) => {
    let difference = to - from;
    while (difference > 180) difference -= 360;
    while (difference < -180) difference += 360;
    return difference;
  };

  const animateFlight = () => {
    const routeLength = route.getTotalLength();
    let startedAt;
    let displayedAngle;

    const frame = (now) => {
      if (!startedAt) startedAt = now;
      const timeProgress = Math.min((now - startedAt) / flightDuration, 1);
      const travelled = distanceProgress(timeProgress);
      const distance = travelled * routeLength;
      const point = route.getPointAtLength(distance);
      const lookAhead = route.getPointAtLength(Math.min(distance + 7, routeLength));
      const targetAngle = Math.atan2(lookAhead.y - point.y, lookAhead.x - point.x) * 180 / Math.PI;

      if (displayedAngle === undefined) displayedAngle = targetAngle;
      displayedAngle += shortestAngle(displayedAngle, targetAngle) * 0.16;

      const loopAmount = Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, (timeProgress - 0.27) / 0.57))));
      const bank = 1 - loopAmount * 0.16;
      const lift = Math.sin(timeProgress * Math.PI * 5) * (1.2 - loopAmount * 0.5);

      plane.setAttribute('transform', `translate(${point.x} ${point.y + lift}) rotate(${displayedAngle + planeHeadingCorrection}) scale(1 ${-bank})`);
      trail.style.strokeDashoffset = String(1 - travelled);
      trail.style.opacity = String(Math.min(1, timeProgress / 0.08) * (timeProgress > 0.82 ? (1 - timeProgress) / 0.18 : 1));

      if (timeProgress < 1) {
        window.requestAnimationFrame(frame);
      }
    };

    window.requestAnimationFrame(frame);
  };

  const run = () => {
    if (hasRun || document.hidden) return;
    hasRun = true;
    flight.classList.add('is-flying');
    animateFlight();
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
