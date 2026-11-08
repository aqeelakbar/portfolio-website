/* Self-contained motion prototype; no live private data requests. */
const introLink=new URLSearchParams(location.search).has('intro');
const chapters=[
{name:'A year or so',eyebrow:'',title:'What’s it been like <em>working with me?</em>',sub:'Over the past year or so…',note:'',shape:'opening',duration:4200},
{name:'Co-create',eyebrow:'',title:'Workshops to<br><em>co-create.</em><br>Plenty to talk through.',sub:'We brought people together to share perspectives, work through problems and shape what came next.',note:'',shape:'workshops',spokenNumber:'4',duration:6500},
{name:'Simplify',eyebrow:'',title:'Less to work through.<br><em>Still enough to check.</em>',sub:'I worked with sustainability specialists to turn a complex calculation workflow into fewer structured actions, keeping the assumptions and evidence people needed to check the result.',note:'',shape:'simplify',spokenNumber:'More than 20 manual steps became six structured actions.',duration:7000},
{name:'Listen',eyebrow:'',title:'People tried<br><em>one of my projects.</em>',sub:'Their feedback changed how I presented certainty, so confident language wouldn’t look more trustworthy than the evidence behind it.',note:'',shape:'feedback',spokenNumber:'10',duration:7300},
{name:'Improve',eyebrow:'',title:'Less data sent<br><em>to the browser.</em>',sub:'I changed how a dashboard handled its data, sending only what it needed while preserving the calculation results.',note:'',shape:'building',spokenNumber:'96%',duration:7000},
{name:'Explore',eyebrow:'',title:'Beyond the<br><em>day job.</em>',sub:'I built an AI product, explored agent workflows and wrote about what I was learning.',note:'',shape:'explore',duration:6000},
{name:'Hello',eyebrow:'',title:'Hi, I’m <em>Aqeel.</em>',sub:'',note:'',shape:'portrait',duration:5000}];
const evidence=[
['4 documented workshops · September 2025–June 2026','Co-creation in September 2025; supplier workshops on 26 May and 9 June 2026; brand/product workshop on 2 June 2026. This is the identified set, not a complete annual total. The introduction uses “over the past year or so” to reflect that scope.'],
['More than 20 manual steps → six structured actions · Sproutfull','The calculation workflow was redesigned, implemented and tested as six structured actions. This compares workflow steps, not time saved or a measured productivity gain. Assumptions, evidence and traceability were preserved.'],
['10 usability participants · How Sure','Ten people took part in a documented human usability evaluation of the independent AI product. Their feedback informed certainty presentation, reading order and evidence interactions. This count is separate from automated quality checks and does not imply a measured percentage improvement in understanding.'],
['96% less lifecycle data sent to the browser · Dashboard optimisation','Rounded from a 95.85% reduction in raw lifecycle JSON. Compressed lifecycle payload reduction was 98.06%. This concerns the lifecycle payload, not all dashboard traffic or page-load time. Calculation results were preserved.'],
['Beyond the day job · Independent exploration and writing','This scene refers to the independently built How Sure product, exploration of agent workflows and professional writing. It describes workstreams rather than asserting an unverified project or publication count.']];
const $=id=>document.getElementById(id),eyebrow=$('eyebrow'),headline=$('headline'),sub=$('sub'),note=$('note'),progress=$('progress'),counter=$('counter'),portrait=$('portrait'),photo=$('photo'),canvas=$('canvas'),ctx=canvas.getContext('2d');
function setIntroAccessibility(active){$('portfolio').inert=active;$('sectionRail').inert=active;$('previewHeader').inert=active}
let current=0,paused=false,elapsed=0,lastTime=0,finished=false,frame=0,handoffTimer=0,handoffInProgress=false,morphing=false,morphTimer=0;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const W=500,H=500,N=880;let particles=[],targets=[];
function rand(seed){const n=Math.sin(seed*127.1+78.233)*43758.5453;return n-Math.floor(n)}
for(let i=0;i<N;i++)particles.push({x:W/2+(rand(i+4)-.5)*W,y:H/2+(rand(i+199)-.5)*H,r:1.1+rand(i+55)*1.5,phase:rand(i+99)*6.28});
function shapePoints(kind){
 if(kind==='cloud')return Array.from({length:N},(_,i)=>{
   const angle=rand(i+17)*Math.PI*2,radius=Math.sqrt(rand(i+97))*185;
   return {x:250+Math.cos(angle)*radius,y:250+Math.sin(angle)*radius*.86};
 });
 const lines=[];
 const line=(points)=>lines.push(points);
 const circle=(x,y,r)=>line(Array.from({length:65},(_,i)=>[x+r*Math.cos(i*Math.PI/32),y+r*Math.sin(i*Math.PI/32)]));
 const digits={
 '6':[[85,15],[50,10],[15,50],[5,130],[20,175],[65,175],[85,150],[85,110],[65,90],[10,100]],
 '9':[[85,95],[20,95],[5,70],[5,35],[25,10],[65,10],[85,35],[85,125],[55,175],[10,175]],
 '4':[[75,180],[75,10],[5,120],[98,120]],
 '1':[[25,35],[55,10],[55,180]],
 '2':[[5,35],[25,10],[65,10],[85,35],[80,65],[5,175],[90,175]],
 '7':[[0,10],[90,10],[28,180]],
 '3':[[5,15],[70,15],[90,40],[80,72],[45,92],[80,105],[92,140],[75,175],[5,175]],
 '0':[[25,10],[65,10],[85,35],[85,150],[65,175],[25,175],[5,150],[5,35],[25,10]]};
 if(kind==='workflow'){
  const digit=(d,x,y,k)=>line(digits[d].map(([a,b])=>[x+a*k,y+b*k]));
  digit('2',145,65,.8);digit('0',235,65,.8);
  line([[335,110],[335,150]]);line([[315,130],[355,130]]);
  line([[250,225],[250,270]]);line([[230,250],[250,270],[270,250]]);
  digit('6',215,290,.8);
 }else if(/^[0-9%+]+$/.test(kind)){
  const scale=1.65,total=kind.length*110*scale;
  [...kind].forEach((d,j)=>{
   const ox=250-total/2+j*110*scale;
   if(d==='+'){line([[ox+15*scale,95+95*scale],[ox+85*scale,95+95*scale]]);line([[ox+50*scale,95+60*scale],[ox+50*scale,95+130*scale]])}
   else if(d==='%'){line([[ox+10*scale,95+170*scale],[ox+85*scale,95+15*scale]]);circle(ox+22*scale,95+36*scale,16*scale);circle(ox+76*scale,95+146*scale,16*scale)}
   else line((digits[d]||digits['0']).map(([x,y])=>[ox+x*scale,95+y*scale]));
  });
 }else if(kind==='research'||kind==='wheel'){
  circle(250,250,48);
  for(let j=0;j<8;j++){const a=j*Math.PI/4,x=250+155*Math.cos(a),y=250+155*Math.sin(a);line([[250,250],[x,y]]);circle(x,y,25)}
 }else if(kind==='system'){
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){let x=75+c*140,y=75+r*140;line([[x,y],[x+70,y],[x+70,y+70],[x,y+70],[x,y]]);if(c<2)line([[x+70,y+35],[x+140,y+35]]);if(r<2)line([[x+35,y+70],[x+35,y+140]])}
 }else if(kind==='explorations'){
  circle(250,250,38);
  for(const [x,y] of [[120,110],[390,210],[160,390]]){line([[250,250],[x,y]]);circle(x,y,42)}
 }else if(kind==='design-build'){
  line([[70,330],[80,275],[280,75],[330,125],[130,325],[70,330]]);
  line([[290,300],[250,340],[290,380]]);line([[380,300],[420,340],[380,380]]);line([[350,285],[325,395]]);
 }else if(kind==='flow'){
  const points=Array.from({length:5},(_,i)=>[65+i*90,250+(i%2?65:-65)]);line(points);points.forEach(([x,y])=>circle(x,y,27));
 }else{circle(250,250,150)}
 const segments=[];let total=0;
 lines.forEach(points=>points.slice(1).forEach((end,i)=>{const start=points[i],len=Math.hypot(end[0]-start[0],end[1]-start[1]);if(len){total+=len;segments.push({start,end,len,total})}}));
 return Array.from({length:N},(_,i)=>{const n=rand(i*7+kind.length*33)*total,seg=segments.find(v=>v.total>=n)||segments[0],t=(n-(seg.total-seg.len))/seg.len;return {x:seg.start[0]+(seg.end[0]-seg.start[0])*t+(rand(i+818)-.5)*(kind==='20+'||kind==='6'?12:28),y:seg.start[1]+(seg.end[1]-seg.start[1])*t+(rand(i+919)-.5)*(kind==='20+'||kind==='6'?12:28)}});
}
function setShape(kind){const shapes={opening:'cloud',workshops:'4',simplify:'20+',feedback:'10',building:'96%',explore:'explorations',thread:'cloud',connect:'design-build',portrait:'cloud'};const resolved=shapes[kind]||kind;targets=shapePoints(resolved);
// The visible circle has radius 185 in the 500-unit viewBox. Keep solid
// particle artwork within radius 140, leaving breathing room for thick dots.
if(resolved!=='cloud'){
 const extent=Math.max(...targets.map(p=>Math.hypot(p.x-250,p.y-250)));
 const scale=Math.min(1,140/extent);
 targets=targets.map(p=>({x:250+(p.x-250)*scale,y:250+(p.y-250)*scale}));
}
for(let i=0;i<N;i++){particles[i].tx=targets[i].x;particles[i].ty=targets[i].y}}
const particleSvg=document.createElementNS('http://www.w3.org/2000/svg','svg');
particleSvg.setAttribute('viewBox','0 0 500 500');particleSvg.setAttribute('aria-hidden','true');particleSvg.classList.add('particle-art');canvas.after(particleSvg);
// A separate ambient cloud remains present as the foreground forms each shape.
const ambientDots=Array.from({length:240},(_,i)=>{
 const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
 const angle=rand(i+2701)*Math.PI*2,radius=Math.sqrt(rand(i+3101))*218;
 dot.setAttribute('r',.8+rand(i+3301)*1.2);dot.setAttribute('fill','#292029');
 dot.setAttribute('opacity',.16+rand(i+3501)*.22);particleSvg.appendChild(dot);
 return {dot,angle,radius,x:250+Math.cos(angle)*radius,y:250+Math.sin(angle)*radius*.91,phase:rand(i+3701)*Math.PI*2,speed:.25+rand(i+3901)*.35};
});
let cloudTime=0,cloudLast=0;
const particleDots=particles.map(p=>{const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');dot.setAttribute('r',p.r);dot.setAttribute('fill','#292029');particleSvg.appendChild(dot);return dot});
function draw(){
 const now=performance.now(),delta=cloudLast?Math.min(.1,(now-cloudLast)/1000):0;cloudLast=now;
 if(!reduce&&!paused)cloudTime+=delta;
 for(const p of ambientDots){
  const t=cloudTime*p.speed+p.phase;
  const final=current===chapters.length-1;
  const baseX=final?250+Math.cos(p.angle)*(170+p.radius*.22):p.x;
  const baseY=final?250+Math.sin(p.angle)*(170+p.radius*.22)*.94:p.y;
  p.dot.setAttribute('opacity',final?.38+rand(p.phase+3501)*.28:.16+rand(p.phase+3501)*.22);
  p.dot.setAttribute('cx',baseX+(reduce?0:Math.sin(t)*12+Math.sin(t*.43)*5));
  p.dot.setAttribute('cy',baseY+(reduce?0:Math.cos(t*.81)*10));
 }
 for(let i=0;i<N;i++){
  const p=particles[i],blend=reduce?1:1-Math.exp(-delta*9);p.x+=(p.tx-p.x)*blend;p.y+=(p.ty-p.y)*blend;
  const w=reduce?0:Math.sin(cloudTime*.8+p.phase)*1.7;
  const isCloud=chapters[current].shape==='opening'||chapters[current].shape==='thread';
  particleDots[i].setAttribute('r',p.r*(isCloud?1:1.5));
  particleDots[i].setAttribute('cx',p.x+w);particleDots[i].setAttribute('cy',p.y+w);
  particleDots[i].setAttribute('opacity',current===chapters.length-1?.46:isCloud?.55+rand(i+7)*.45:.78+rand(i+7)*.22);
 }
 frame++;
}
function updateProgress(){if(chapters[current].shape==='simplify'&&!workflowReduced&&(elapsed>=2600||reduce)){workflowReduced=true;setShape('6');document.querySelector('.workflow-label').textContent='structured actions';}[...progress.children].forEach((b,i)=>{b.classList.toggle('active',i===current);b.querySelector('.fill').style.width=(i<current?100:i>current?0:Math.min(100,elapsed/chapters[current].duration*100))+'%'})}
let workflowReduced=false;
function paintScene(){
  workflowReduced=false;
  document.querySelector('.workflow-label').textContent='manual steps';
  const last=current===chapters.length-1;
  const stage=$('experience');
  const visual=stage.querySelector('.visual');
  const before=visual.getBoundingClientRect();
  const previousLayout=stage.dataset.layout;
  stage.classList.remove('handoff-ready','reveal-scene','exiting');
  clearTimeout(handoffTimer);
  const c=chapters[current];
  stage.dataset.scene=c.shape;
  stage.dataset.layout=Boolean(c.spokenNumber)?'visual-left':'visual-right';
  const after=visual.getBoundingClientRect();
  if(!reduce&&previousLayout&&previousLayout!==stage.dataset.layout&&innerWidth>850){
    visual.getAnimations().forEach(a=>a.cancel());
    visual.animate([{translate:`${before.left-after.left}px 0`},{translate:'0px 0px'}],{duration:900,easing:'cubic-bezier(.22,.75,.2,1)'});
  }
  eyebrow.textContent=c.eyebrow;
  headline.innerHTML=c.title;
  headline.setAttribute('aria-label',(c.spokenNumber?c.spokenNumber+' ':'')+c.title.replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g,'').replace(/\s+/g,' '));
  headline.classList.toggle('tight',current!==chapters.length-1);
  sub.textContent=c.sub;
  note.textContent=c.note;
  counter.textContent=String(current+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0');
  portrait.classList.toggle('show',last);
  setShape(c.shape);
  updateProgress();
}
let sceneTransition=0,copyAnimation=null;
function cancelCopyTransition(){
  sceneTransition++;
  copyAnimation?.cancel();
  copyAnimation=null;
}
async function go(i,instant=false){
  if(handoffInProgress)return;
  $('introEndActions').hidden=true;
  const target=Math.max(0,Math.min(chapters.length-1,i));
  clearTimeout(morphTimer);
  const copy=document.querySelector('.stage .copy');
  const fromOpacity=copy?getComputedStyle(copy).opacity:'1';
  cancelCopyTransition();
  const transition=sceneTransition;
  morphing=false;
  if(instant||reduce||target===current){
    current=target;elapsed=0;finished=false;paintScene();
    if(copy){copy.style.opacity='';copy.style.visibility='';}
    return;
  }
  morphing=true;
  if(copy){
    copyAnimation=copy.animate([{opacity:fromOpacity},{opacity:0}],{duration:180,easing:'ease-in',fill:'forwards'});
    try{await copyAnimation.finished;}catch{return;}
  }
  if(transition!==sceneTransition||$('experience').hidden)return;
  // Swap only after the old copy has finished fading. Explicit visibility
  // prevents old composited text surviving the layout/font change in Safari.
  if(copy){copy.style.opacity='0';copy.style.visibility='hidden';}
  copyAnimation?.cancel();copyAnimation=null;
  current=target;elapsed=0;finished=false;
  paintScene();
  await new Promise(requestAnimationFrame);
  if(transition!==sceneTransition||$('experience').hidden)return;
  if(copy){
    copy.style.visibility='';
    copyAnimation=copy.animate([{opacity:0},{opacity:1}],{duration:280,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});
    try{await copyAnimation.finished;}catch{return;}
  }
  if(transition!==sceneTransition)return;
  if(copy)copy.style.opacity='';
  copyAnimation?.cancel();copyAnimation=null;
  morphing=false;
}
async function revealPortfolio(){
  if(handoffInProgress)return;
  handoffInProgress=true;
  clearTimeout(handoffTimer);
  cancelCopyTransition();
  const stage=$('experience'),cloud=stage.querySelector('.particle-art');
  const headerImage=$('headerPhoto'),headerLabel=$('headerLabel');
  const complete=()=>{
    // Hide the whole intro before resetting any composited animation layers.
    stage.hidden=true;
    [stage,portrait,headline,cloud].filter(Boolean).forEach(element=>element.getAnimations().forEach(animation=>animation.cancel()));
    if(cloud){cloud.style.visibility='';cloud.style.opacity='';}
    stage.classList.remove('exiting');
    document.body.classList.remove('intro-active');
    try{sessionStorage.setItem('aqeel-experiment-07-seen','yes')}catch{}
    setIntroAccessibility(false);
    $('portfolio').focus({preventScroll:true});
    handoffInProgress=false;
  };
  if(reduce){complete();return;}
  const move=(source,target)=>{
    const from=source.getBoundingClientRect(),to=target.getBoundingClientRect();
    if(!from.height||!to.height)return null;
    return source.animate([
      {transform:'translate3d(0,0,0) scale(1)',transformOrigin:'top left'},
      {transform:`translate3d(${to.left-from.left}px,${to.top-from.top}px,0) scale(${to.height/from.height})`,transformOrigin:'top left'}
    ],{duration:850,easing:'cubic-bezier(.2,.78,.2,1)',fill:'forwards'});
  };
  stage.classList.add('exiting');
  const motions=[move(portrait,headerImage),move(headline,headerLabel)].filter(Boolean);
  // Clear the cloud while the intro is still opaque. Its portrait-scene CSS
  // otherwise overrides the generic exiting fade, leaving particles over text.
  if(cloud){
    const fade=cloud.animate([{opacity:1},{opacity:0}],{duration:180,easing:'ease-out',fill:'forwards'});
    await fade.finished.catch(()=>{});
    cloud.style.visibility='hidden';
    cloud.style.opacity='0';
  }
  const wash=stage.animate([
    {backgroundColor:'#ffffff'},
    {backgroundColor:'rgba(255,255,255,0)'}
  ],{duration:420,easing:'ease',fill:'forwards'});
  await Promise.allSettled([...motions.map(m=>m.finished),wash.finished]);
  complete();
}
function end(){
  if(finished)return;
  finished=true;paused=true;elapsed=chapters[current].duration;updateProgress();
  $('pause').textContent='↺';$('pause').setAttribute('aria-label','Replay introduction');
  // Hold the original portrait-and-particle scene before shrinking it into the header.
  if(introLink){
    $('introEndActions').hidden=false;
    $('continuePortfolio').focus({preventScroll:true});
  }else handoffTimer=setTimeout(revealPortfolio,reduce?0:350);
}
function tick(t){const delta=lastTime?Math.min(60,t-lastTime):0;lastTime=t;if(!paused&&!finished&&!morphing){elapsed+=delta;if(elapsed>=chapters[current].duration){if(current===chapters.length-1){elapsed=chapters[current].duration;end()}else go(current+1)}updateProgress()}draw();requestAnimationFrame(tick)}
progress.style.gridTemplateColumns=`repeat(${chapters.length},minmax(0,1fr))`;
chapters.forEach((c,i)=>{const b=document.createElement('button');b.className='step';b.type='button';b.setAttribute('aria-label','Go to '+c.name);b.innerHTML='<span>'+c.name+'</span><div class="track"><div class="fill"></div></div>';b.addEventListener('click',()=>{paused=true;$('pause').textContent='▶';$('pause').setAttribute('aria-label','Resume animation');go(i)});progress.appendChild(b)});
$('skip').addEventListener('click',()=>{cancelCopyTransition();morphing=false;clearTimeout(handoffTimer);finished=true;paused=true;$('experience').hidden=true;document.body.classList.remove('intro-active');try{sessionStorage.setItem('aqeel-experiment-07-seen','yes')}catch{};setIntroAccessibility(false);$('portfolio').focus({preventScroll:true})});
$('back').addEventListener('click',()=>{paused=true;$('pause').textContent='▶';$('pause').setAttribute('aria-label','Resume animation');go(current-1)});$('next').addEventListener('click',()=>{if(current===chapters.length-1){end();return}paused=true;$('pause').textContent='▶';$('pause').setAttribute('aria-label','Resume animation');go(current+1)});
$('pause').addEventListener('click',()=>{if(finished){paused=false;finished=false;$('pause').textContent='Ⅱ';window.scrollTo({top:0,behavior:reduce?'instant':'smooth'});go(0);return}paused=!paused;$('pause').textContent=paused?'▶':'Ⅱ';$('pause').setAttribute('aria-label',paused?'Resume animation':'Pause animation')});
const backdrop=$('backdrop');let priorFocus=null;function closeDialog(){backdrop.classList.remove('open');paused=backdrop.dataset.wasPaused==='true';$('pause').textContent=paused?'▶':'Ⅱ';if(priorFocus)priorFocus.focus()}
$('openLedger').addEventListener('click',()=>{priorFocus=$('openLedger');backdrop.dataset.wasPaused=String(paused);paused=true;$('pause').textContent='▶';backdrop.classList.add('open');$('closeLedger').focus()});$('closeLedger').addEventListener('click',closeDialog);backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeDialog()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&backdrop.classList.contains('open'))closeDialog();if(backdrop.classList.contains('open')&&e.key==='Tab'){const f=[...backdrop.querySelectorAll('button,a[href]')];if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===f.at(-1)){e.preventDefault();f[0].focus()}}});
$('evidenceList').innerHTML=evidence.map(e=>'<div class="evidence"><strong>'+e[0]+'</strong><small>'+e[1]+'</small></div>').join('');
function showPortraitPhoto(){if(photo.naturalWidth){photo.hidden=false;portrait.querySelector('.initials').hidden=true;}}
photo.addEventListener('load',showPortraitPhoto);
// Cached images can finish before this script installs its load listener.
if(photo.complete)showPortraitPhoto();
photo.decode?.().then(showPortraitPhoto).catch(()=>{});
photo.addEventListener('error',()=>{if(photo.dataset.fallback)return;photo.dataset.fallback='1';photo.src='https://www.aqeelakbar.me/assets/profile/aqeel-akbar.webp'});
function replayIntroduction(){
  $('introEndActions').hidden=true;
  clearTimeout(handoffTimer);clearTimeout(morphTimer);morphing=false;
  $('experience').hidden=false;
  $('experience').classList.remove('exiting');
  document.body.classList.add('intro-active');
  document.documentElement.classList.remove('skip-intro');
  setIntroAccessibility(true);
  finished=false;paused=false;elapsed=0;lastTime=0;
  $('pause').textContent='Ⅱ';$('pause').setAttribute('aria-label','Pause animation');
  window.scrollTo({top:0,behavior:'instant'});
  go(0);
}
$('replayIntro').addEventListener('click',replayIntroduction);
$('replayExperience').addEventListener('click',replayIntroduction);
$('continuePortfolio').addEventListener('click',()=>{
  $('introEndActions').hidden=true;
  revealPortfolio();
});
setIntroAccessibility(!reduce&&!document.documentElement.classList.contains('skip-intro'));
if(reduce||document.documentElement.classList.contains('skip-intro')){paused=true;$('experience').hidden=true;document.body.classList.remove('intro-active');go(0)}else go(0,true);
requestAnimationFrame(tick);
