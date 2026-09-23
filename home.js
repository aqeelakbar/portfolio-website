const journey = document.querySelector('#journey');
const world = document.querySelector('#world');
const root = document.documentElement;
const sceneEls = [...document.querySelectorAll('[data-scene]')];
const timelinePoints = [...document.querySelectorAll('.timeline-point')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const workLink = document.querySelector('.topnav a[href="/#work"]');
const introTransition = document.querySelector('[data-intro]');

let progress = 0;
let activeScene = 0;
let snapIndex = 0;
let raf = 0;
let scrollTween = 0;
let snapTimer = 0;
let isAnimating = false;
let journeyRange = 1;
let worldMaxShift = 0;
let sceneCenters = [];
let sceneProgresses = [];

const clamp = value => Math.min(1, Math.max(0, value));
const smooth = value => value * value * (3 - 2 * value);
const settleEase = value => {
  const overshoot = 0.55;
  const shifted = value - 1;
  return 1 + (overshoot + 1) * shifted ** 3 + overshoot * shifted ** 2;
};

sceneEls.forEach(scene => scene.setAttribute('tabindex', '-1'));
journey.style.setProperty('--journey-height', `${sceneEls.length * 145}vh`);

function measure() {
  journeyRange = Math.max(1, journey.offsetHeight - innerHeight);
  worldMaxShift = Math.max(0, world.scrollWidth - innerWidth);
  sceneCenters = sceneEls.map(scene => scene.offsetLeft + scene.offsetWidth / 2);
  sceneProgresses = sceneCenters.map(centre =>
    clamp((centre - innerWidth / 2) / Math.max(1, worldMaxShift))
  );
  positionPoints();
}

function range() {
  return journeyRange;
}

function maxShift() {
  return worldMaxShift;
}

function sceneProgress(index) {
  return sceneProgresses[index] ?? 0;
}

function sceneScrollTop(index) {
  return journey.offsetTop + range() * sceneProgress(index);
}

function positionPoints() {
  timelinePoints.forEach((point, index) => {
    const position = sceneEls.length > 1 ? index / (sceneEls.length - 1) : 0;
    point.style.left = `${position * 100}%`;
  });
}

function animateScenes() {
  const viewportWidth = innerWidth;
  const horizontalShift = progress * maxShift();

  sceneEls.forEach((scene, index) => {
    const centre = (sceneCenters[index] ?? viewportWidth / 2) - horizontalShift;
    const offset = (centre - viewportWidth / 2) / (viewportWidth * 0.88);
    const presence = clamp(1 - Math.abs(offset));

    // Resolve each scene in sequence. Keeping opacity at zero outside the
    // active window prevents neighbouring headlines from reading as collisions.
    const label = smooth(clamp((presence - 0.06) / 0.64));
    const copy = smooth(clamp((presence - 0.18) / 0.60));
    const side = smooth(clamp((presence - 0.24) / 0.56));
    const card = smooth(clamp((presence - 0.30) / 0.52));
    const travelDirection = offset >= 0 ? 1 : -0.58;
    const isNearViewport = Math.abs(offset) < 1;

    scene.style.setProperty('--label-opacity', isNearViewport ? label.toFixed(3) : '0');
    scene.style.setProperty('--label-x', `${(1 - label) * 18 * travelDirection}px`);
    scene.style.setProperty('--copy-opacity', isNearViewport ? copy.toFixed(3) : '0');
    scene.style.setProperty('--copy-x', `${(1 - copy) * 48 * travelDirection}px`);
    scene.style.setProperty('--copy-y', '0px');
    scene.style.setProperty('--side-opacity', isNearViewport ? side.toFixed(3) : '0');
    scene.style.setProperty('--side-x', `${(1 - side) * 38 * travelDirection}px`);
    scene.style.setProperty('--card-opacity', isNearViewport ? card.toFixed(3) : '0');
    scene.style.setProperty('--card-x', `${(1 - card) * 88 * travelDirection}px`);
    scene.style.setProperty('--card-scale', (0.96 + card * 0.04).toFixed(4));
    const cardClip = `${(1 - card) * 18}%`;
    scene.style.setProperty('--card-clip-left', offset >= 0 ? cardClip : '0%');
    scene.style.setProperty('--card-clip-right', offset < 0 ? cardClip : '0%');
  });
}

function setActive(index) {
  activeScene = index;
  timelinePoints.forEach((point, pointIndex) => {
    point.classList.toggle('active', pointIndex === index);
    if (pointIndex === index) point.setAttribute('aria-current', 'step');
    else point.removeAttribute('aria-current');
  });
  document.querySelector('#sceneIndex').textContent =
    `${String(index + 1).padStart(2, '0')} / ${String(sceneEls.length).padStart(2, '0')}`;
}

function setWorkNav(active) {
  if (!workLink) return;
  if (active) workLink.setAttribute('aria-current', 'page');
  else workLink.removeAttribute('aria-current');
}

function isWorkScene(index) {
  return index > 0 && index < sceneEls.length - 1;
}

function update() {
  const hasMoved = Math.max(0, scrollY - journey.offsetTop) > 16;
  document.body.classList.toggle('has-moved', hasMoved);

  if (innerWidth <= 900 || reducedMotion.matches) {
    let active = 0;
    let best = Infinity;
    sceneEls.forEach((scene, index) => {
      const rect = scene.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - innerHeight / 2);
      if (distance < best) {
        best = distance;
        active = index;
      }
    });
    setActive(active);
    setWorkNav(isWorkScene(active));
    raf = 0;
    return;
  }

  progress = clamp((scrollY - journey.offsetTop) / range());
  root.style.setProperty('--shift', `${-progress * maxShift()}px`);
  root.style.setProperty('--progress', progress);
  animateScenes();

  let active = 0;
  let best = Infinity;
  sceneEls.forEach((scene, index) => {
    const distance = Math.abs(progress - sceneProgress(index));
    if (distance < best) {
      best = distance;
      active = index;
    }
  });

  if (!isAnimating) snapIndex = active;
  active = isAnimating ? snapIndex : active;
  setActive(active);
  setWorkNav(isWorkScene(active));
  raf = 0;
}

function queue() {
  if (!raf) raf = requestAnimationFrame(update);
}

function cancelScrollTween() {
  if (scrollTween) cancelAnimationFrame(scrollTween);
  scrollTween = 0;
  isAnimating = false;
  root.classList.remove('is-editorial-scrolling');
}

function animateScrollTo(destination, duration = 600) {
  cancelScrollTween();
  const start = scrollY;
  const distance = destination - start;

  if (Math.abs(distance) < 1 || reducedMotion.matches) {
    scrollTo({ top: destination, behavior: 'auto' });
    queue();
    return;
  }

  isAnimating = true;
  root.classList.add('is-editorial-scrolling');
  const startedAt = performance.now();

  function frame(now) {
    const elapsed = clamp((now - startedAt) / duration);
    scrollTo({ top: start + distance * settleEase(elapsed), behavior: 'auto' });
    if (elapsed < 1) {
      scrollTween = requestAnimationFrame(frame);
    } else {
      scrollTo({ top: destination, behavior: 'auto' });
      scrollTween = 0;
      isAnimating = false;
      root.classList.remove('is-editorial-scrolling');
      queue();
    }
  }

  scrollTween = requestAnimationFrame(frame);
}

function setPositionInstant(index) {
  cancelScrollTween();
  snapIndex = index;
  progress = sceneProgress(index);
  setWorkNav(isWorkScene(index));
  setActive(index);
  root.style.setProperty('--shift', `${-progress * maxShift()}px`);
  root.style.setProperty('--progress', progress);
  scrollTo({ top: sceneScrollTop(index), behavior: 'auto' });
  animateScenes();
}

function goTo(index, focus = false) {
  snapIndex = index;
  setWorkNav(isWorkScene(index));
  setActive(index);

  if (innerWidth <= 900) {
    sceneEls[index].scrollIntoView({
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
      block: 'start'
    });
  } else {
    animateScrollTo(sceneScrollTop(index));
  }

  if (focus) {
    setTimeout(
      () => sceneEls[index].focus({ preventScroll: true }),
      reducedMotion.matches ? 0 : 630
    );
  }
}

function nearestScene() {
  const raw = clamp((scrollY - journey.offsetTop) / range());
  let nearest = 0;
  let best = Infinity;
  sceneEls.forEach((scene, index) => {
    const distance = Math.abs(raw - sceneProgress(index));
    if (distance < best) {
      best = distance;
      nearest = index;
    }
  });
  return nearest;
}

function snapToNearest() {
  if (innerWidth <= 900 || reducedMotion.matches || isAnimating) return;
  const nearest = nearestScene();
  if (Math.abs(scrollY - sceneScrollTop(nearest)) > 1) goTo(nearest);
}

function scheduleSnap() {
  clearTimeout(snapTimer);
  if (innerWidth <= 900 || reducedMotion.matches || isAnimating) return;
  snapTimer = setTimeout(snapToNearest, 360);
}

addEventListener('scroll', () => {
  queue();
  if (!isAnimating) scheduleSnap();
}, { passive: true });

addEventListener('wheel', () => {
  if (isAnimating) cancelScrollTween();
  scheduleSnap();
}, { passive: true });

addEventListener('touchstart', () => {
  if (isAnimating) cancelScrollTween();
  clearTimeout(snapTimer);
}, { passive: true });

addEventListener('resize', () => {
  cancelScrollTween();
  measure();
  queue();
});

document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', () => goTo(Number(button.dataset.go), true));
});

workLink?.addEventListener('click', event => {
  event.preventDefault();
  history.replaceState(null, '', '#work');
  goTo(1, true);
});

addEventListener('keydown', event => {
  if (
    innerWidth <= 900 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    /INPUT|TEXTAREA|SELECT|BUTTON|A|SUMMARY/.test(event.target.tagName)
  ) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    goTo(Math.min(sceneEls.length - 1, activeScene + 1), true);
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    goTo(Math.max(0, activeScene - 1), true);
  }
});

world.addEventListener('focusin', event => {
  const scene = event.target.closest('[data-scene]');
  if (scene && innerWidth > 900 && !reducedMotion.matches) {
    const index = sceneEls.indexOf(scene);
    if (index !== activeScene) goTo(index);
  }
});

function runIntroTransition() {
  if (!introTransition || !root.classList.contains('intro-will-play')) {
    introTransition?.remove();
    return;
  }

  const introImage = introTransition.querySelector('img');
  const introLabel = introTransition.querySelector('span');
  const introIdentity = introTransition.querySelector('.intro-transition__identity');
  const wash = introTransition.querySelector('.intro-transition__wash');
  const headerBrand = document.querySelector('.topbar .brand');
  const headerImage = headerBrand?.querySelector('.headshot');
  const headerLabel = headerBrand?.querySelector('.brand-label');
  let introTimer = 0;
  let hasFinished = false;
  const dismissEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

  function finishIntro() {
    if (hasFinished) return;
    hasFinished = true;
    clearTimeout(introTimer);
    dismissEvents.forEach(type => removeEventListener(type, finishIntro));
    root.classList.remove('intro-will-play');
    introTransition.remove();
    try {
      sessionStorage.setItem('aqeel-portfolio-intro', 'seen');
    } catch {}
  }

  function animateToTarget(source, target) {
    const from = source.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const scale = to.height / Math.max(1, from.height);
    return source.animate([
      { transform: 'translate3d(0,0,0) scale(1)' },
      { transform: `translate3d(${to.left - from.left}px,${to.top - from.top}px,0) scale(${scale})` }
    ], {
      duration: 750,
      easing: 'cubic-bezier(.2,.78,.2,1)',
      fill: 'forwards'
    });
  }

  if (!introImage || !introLabel || !introIdentity || !wash || !headerImage || !headerLabel) {
    finishIntro();
    return;
  }

  dismissEvents.forEach(type => addEventListener(type, finishIntro, {
    once: true,
    passive: type !== 'keydown'
  }));

  introIdentity.animate([
    { opacity: 0, transform: 'translate3d(0,14px,0)' },
    { opacity: 1, transform: 'translate3d(0,0,0)' }
  ], {
    duration: 350,
    easing: 'cubic-bezier(.2,.7,.2,1)',
    fill: 'both'
  });

  introTimer = setTimeout(() => {
    if (hasFinished) return;
    const imageMotion = animateToTarget(introImage, headerImage);
    const labelMotion = animateToTarget(introLabel, headerLabel);
    const washMotion = wash.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 500,
      delay: 250,
      easing: 'ease',
      fill: 'forwards'
    });

    Promise.allSettled([
      imageMotion.finished,
      labelMotion.finished,
      washMotion.finished
    ]).then(finishIntro);
  }, 1050);
}

function restoreInitialRoute() {
  measure();
  if (location.hash === '#work') setPositionInstant(1);
  else queue();
}

measure();
if (location.hash === '#work') {
  requestAnimationFrame(restoreInitialRoute);
  document.fonts?.ready?.then(() => requestAnimationFrame(restoreInitialRoute));
  addEventListener('load', () => requestAnimationFrame(restoreInitialRoute), { once: true });
  addEventListener('pageshow', () => requestAnimationFrame(restoreInitialRoute));
} else {
  queue();
}
requestAnimationFrame(runIntroTransition);
