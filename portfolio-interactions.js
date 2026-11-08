/* Header idle interactions ported from the original portfolio. */
function initialiseHeadshotIdleMotion(){
  const headshot=document.querySelector('#headerPhoto');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!headshot)return;

  const motionClasses=['headshot--glow','headshot--pulse','headshot--bob'];
  const activityEvents=['pointerdown','keydown','wheel','touchstart','scroll'];
  let timer=0;
  let isAnimating=false;
  let lastPointerReset=0;

  const clearMotion=()=>{
    motionClasses.forEach(className=>headshot.classList.remove(className));
    isAnimating=false;
  };

  const schedule=(first=true)=>{
    window.clearTimeout(timer);
    if(reducedMotion.matches||document.hidden||document.body.classList.contains('intro-active'))return;
    const minimum=first?5000:10000;
    const range=first?2000:5000;
    timer=window.setTimeout(play,minimum+Math.random()*range);
  };

  const play=()=>{
    if(reducedMotion.matches||document.hidden||document.body.classList.contains('intro-active')||isAnimating){schedule();return;}
    isAnimating=true;
    const roll=Math.random();
    const className=roll<.45?'headshot--glow':roll<.85?'headshot--pulse':'headshot--bob';
    headshot.classList.add(className);
  };

  const handleActivity=()=>{
    clearMotion();
    schedule(true);
  };

  headshot.addEventListener('animationend',()=>{
    clearMotion();
    schedule(false);
  });
  activityEvents.forEach(eventName=>window.addEventListener(eventName,handleActivity,{passive:true}));
  window.addEventListener('pointermove',()=>{
    const now=Date.now();
    if(now-lastPointerReset<750)return;
    lastPointerReset=now;
    handleActivity();
  },{passive:true});
  document.addEventListener('visibilitychange',()=>{
    window.clearTimeout(timer);
    clearMotion();
    if(!document.hidden)schedule(true);
  });
  reducedMotion.addEventListener?.('change',handleActivity);
  new MutationObserver(handleActivity).observe(document.body,{attributes:true,attributeFilter:['class']});
  schedule(true);
}

initialiseHeadshotIdleMotion();
