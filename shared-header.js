const HEADSHOT='/assets/profile/aqeel-akbar.webp';
if(!document.querySelector('link[rel~="icon"]')){const favicon=document.createElement('link');favicon.rel='icon';favicon.href='/favicon.svg';favicon.type='image/svg+xml';document.head.append(favicon)}
function headerMarkup(current=''){
  const workIsCurrent=current==='work'&&!document.body.classList.contains('home');
  const brandLetters=[...'Hi, I’m Aqeel'].map((letter,index)=>`<span aria-hidden="true" style="--letter:${index}">${letter===' '?'&nbsp;':letter}</span>`).join('');
  return `<a class="skip-link" href="#main">Skip to content</a><header class="topbar"><a class="brand" href="/"><img class="headshot" src="${HEADSHOT}" alt=""><span class="brand-label" aria-label="Hi, I’m Aqeel">${brandLetters}</span></a><nav class="topnav" aria-label="Primary"><a href="/#work" ${workIsCurrent?'aria-current="page"':''}>Work</a><a href="/about/" ${current==='about'?'aria-current="page"':''}>About</a><a href="/contact/" ${current==='contact'?'aria-current="page"':''}>Contact</a></nav><div class="socials" aria-label="Social links"><a href="https://www.linkedin.com/in/akbaraqeel/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 9h3.56v11.45H3.56V9Z"/></svg></a><a href="https://github.com/aqeelakbar?tab=repositories" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.29-5.27-5.68 0-1.26.45-2.28 1.19-3.08-.12-.3-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.4-2.71 5.38-5.29 5.67.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg></a><a href="mailto:akbar.aqeel@outlook.com" aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5h18v13H3zM4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></a></div></header>`;
}
function footerMarkup(){return `<footer class="site-footer"><span>© ${new Date().getFullYear()} Aqeel Akbar</span><nav aria-label="Footer"><a href="/">Home</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav></footer>`}
document.querySelector('[data-site-header]')?.replaceChildren(document.createRange().createContextualFragment(headerMarkup(document.body.dataset.page||'')));
document.querySelector('[data-site-footer]')?.replaceChildren(document.createRange().createContextualFragment(footerMarkup()));

function initialiseHeadshotIdleMotion(){
  const headshot=document.querySelector('.topbar .headshot');
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
    if(reducedMotion.matches||document.hidden)return;
    const minimum=first?5000:10000;
    const range=first?2000:5000;
    timer=window.setTimeout(play,minimum+Math.random()*range);
  };

  const play=()=>{
    if(reducedMotion.matches||document.hidden||isAnimating){schedule();return;}
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
  schedule(true);
}

initialiseHeadshotIdleMotion();
