/* Experiment 07 v10 — scroll-up scene exits and scroll-linked entrances, based on original portfolio.
   Ported from aqeelakbar/portfolio-website home.js: smooth(), settleEase(),
   staggered label/copy/side/card presence, 600ms chapter tween and 360ms snap.
   The travel axis is Y rather than X; there is no separate chapter wipe. */
(() => {
  const root=document.documentElement;
  const site=document.querySelector('.vertical-site');
  if(!site)return;
  const scenes=[...site.querySelectorAll('.v-section')];
  const links=[...document.querySelectorAll('.v-rail a')];
  const fill=document.getElementById('railFill');
  const intro=document.getElementById('experience');
  const ledger=document.getElementById('openLedger');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=matchMedia('(min-width: 1101px) and (min-height: 820px)');
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>n*n*(3-2*n);
  const settleEase=n=>{const overshoot=.55, shifted=n-1;return 1+(overshoot+1)*shifted**3+overshoot*shifted**2;};
  const stagger=(presence,threshold,window)=>smooth(clamp((presence-threshold)/window));
  let userNavigated=false;
  let flowTops=[],raf=0,tween=0,snapTimer=0,isAnimating=false,activeIndex=0;
  const cinematic=()=>desktop.matches&&!reduced.matches;
  const measure=()=>{flowTops=scenes.map(s=>s.getBoundingClientRect().top+scrollY);};
  const destination=i=>Math.max(0,flowTops[i]??0);
  const nearest=()=>{let best=0,delta=Infinity;scenes.forEach((_,i)=>{const d=Math.abs(scrollY-destination(i));if(d<delta){best=i;delta=d;}});return best;};
  const reveal=scene=>{scene.classList.add('is-chapter-visible');scene.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));};
  function update(){
    raf=0;
    const height=innerHeight, y=scrollY, on=cinematic();
    activeIndex=nearest();
    links.forEach((link,i)=>{
      link.classList.toggle('active',i===activeIndex);
      if(i===activeIndex)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    if(fill)fill.style.height=`${clamp(y/Math.max(1,root.scrollHeight-height))*100}%`;
    if(!on || document.body.classList.contains('intro-active')){
      if(reduced.matches)scenes.forEach(reveal);
      else if(!on)scenes.forEach(s=>{if(s.getBoundingClientRect().top<height*.86)reveal(s);});
      return;
    }
    const travel=height-68;
    scenes.forEach((scene,i)=>{
      // Each scene's centre travels from below the viewport to the fixed 68px
      // header boundary. The same natural document scroll drives both axes.
      const naturalTop=destination(i)-y;
      const entering=i===0?1:clamp((height-68-naturalTop)/travel);
      const nextTop=i+1<scenes.length?destination(i+1)-y:Infinity;
      const leaving=i+1<scenes.length?clamp((height-68-nextTop)/travel):0;
      const label=stagger(entering,.06,.64);
      const copy=stagger(entering,.18,.60);
      const side=stagger(entering,.24,.56);
      const card=stagger(entering,.30,.52);
      // The outgoing scene softens as the new scene rises across it. The
      // incoming composition remains fully readable once settled.
      // Scroll-up handoff: outgoing content rises by up to 285px while fading
      // to zero; the incoming scene rises naturally from below. The white
      // scene surface remains opaque to avoid overlapping ghost imagery.
      const out=1-smooth(clamp((leaving-.12)/.88));
      const incoming=i===0?1:smooth(clamp(entering/.72));
      const chapterOpacity=incoming*out;
      const vars={
        '--v-chapter-opacity':chapterOpacity,
        '--v-scene-travel-y':(1-entering)*65 - leaving*55,
        '--v-enter':entering,'--v-leave':leaving,
        '--v-label-opacity':label,
        '--v-label-y':(1-label)*18-leaving*20,
        '--v-copy-opacity':copy,
        '--v-copy-y':(1-copy)*48-leaving*26,
        '--v-side-opacity':side,
        '--v-side-y':(1-side)*38-leaving*23,
        '--v-card-opacity':card,
        '--v-card-y':(1-card)*88-leaving*32,
        '--v-card-scale':.96+.04*card,
        '--v-card-clip':(1-card)*18,
        '--v-media-y':(1-card)*105-leaving*44,
        '--v-type-y':(1-copy)*16-leaving*20
      };
      for(const [k,v] of Object.entries(vars))scene.style.setProperty(k,Number(v.toFixed(4))+(k.endsWith('-y')?'px':k==='--v-card-clip'?'%':''));
      if(entering>.08)reveal(scene);
    });
  }
  const queue=()=>{if(!raf)raf=requestAnimationFrame(update);};
  const cancel=()=>{if(tween)cancelAnimationFrame(tween);tween=0;isAnimating=false;root.classList.remove('v-navigating');};
  const focus=i=>{const heading=scenes[i]?.querySelector('h1,h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}};
  function animateTo(index,opts={}){
    index=Math.max(0,Math.min(scenes.length-1,index));
    clearTimeout(snapTimer);cancel();
    const from=scrollY,to=destination(index),distance=to-from;
    if(!cinematic()||Math.abs(distance)<1){
      scrollTo({top:to,left:0,behavior:'instant'});
      if(opts.hash)history.replaceState(null,'',opts.hash);
      if(opts.focus)focus(index);
      queue();return;
    }
    isAnimating=true;root.classList.add('v-navigating');
    // The original portfolio uses 600ms with settleEase. Long jumps get a
    // small allowance so multi-chapter jumps do not become unreadable blurs.
    const duration=Math.min(1050,600+Math.max(0,Math.abs(index-activeIndex)-1)*90);
    const started=performance.now();
    function frame(now){
      const t=clamp((now-started)/duration);
      scrollTo({top:from+distance*settleEase(t),left:0,behavior:'instant'});
      queue();
      if(t<1){tween=requestAnimationFrame(frame);return;}
      scrollTo({top:to,left:0,behavior:'instant'});
      tween=0;isAnimating=false;root.classList.remove('v-navigating');
      if(opts.hash)history.replaceState(null,'',opts.hash);
      if(opts.focus)focus(index);
      queue();
    }
    tween=requestAnimationFrame(frame);
  }
  function scheduleSnap(){
    // Native wheel motion stays at the exact scroll position; chapter links still tween.
    clearTimeout(snapTimer);
  }
  addEventListener('scroll',()=>{queue();if(!isAnimating)scheduleSnap();},{passive:true});
  addEventListener('wheel',()=>{if(isAnimating)cancel();scheduleSnap();},{passive:true});
  addEventListener('touchstart',()=>{if(isAnimating)cancel();clearTimeout(snapTimer);},{passive:true});
  addEventListener('resize',()=>{cancel();measure();queue();},{passive:true});
  reduced.addEventListener?.('change',()=>{if(reduced.matches)scenes.forEach(reveal);measure();queue();});
  document.fonts?.ready?.then(()=>{measure();if(!userNavigated)alignHash();queue();});
  scenes[0]&&reveal(scenes[0]);
  document.querySelectorAll('.v-rail a,.vertical-site a[href^="#"],.preview-nav a[href^="#"]').forEach(link=>{
    link.addEventListener('click',e=>{
      const hash=link.getAttribute('href');
      const target=hash?.startsWith('#')?document.getElementById(hash.slice(1)):null;
      if(!target||!target.classList.contains('v-section'))return;
      e.preventDefault();
      if(document.body.classList.contains('intro-active'))return;
      animateTo(scenes.indexOf(target),{hash,focus:true});
    });
  });
  addEventListener('keydown',e=>{
    if(!cinematic()||document.body.classList.contains('intro-active')||e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT|BUTTON|A|SUMMARY/.test(e.target.tagName))return;
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      e.preventDefault();animateTo(activeIndex+(e.key==='ArrowDown'?1:-1),{focus:true});
    }
  });
  function alignHash(){
    if(document.body.classList.contains('intro-active'))return;
    const target=document.getElementById(location.hash.slice(1));
    if(!target?.classList.contains('v-section'))return;
    cancel();measure();scrollTo({top:destination(scenes.indexOf(target)),left:0,behavior:'instant'});queue();
  }
  ['wheel','touchstart','pointerdown','keydown'].forEach(event=>addEventListener(event,()=>{userNavigated=true;},{once:true,passive:true}));
  addEventListener('hashchange',alignHash);
  addEventListener('load',()=>{if(!userNavigated)alignHash();},{once:true});
  requestAnimationFrame(()=>{if(!userNavigated)alignHash();});
  if(intro&&ledger){
    const sync=()=>{ledger.hidden=intro.hidden||root.classList.contains('skip-intro');queue();};
    new MutationObserver(sync).observe(intro,{attributes:true,attributeFilter:['hidden']});sync();
  }
  measure();queue();
})();
