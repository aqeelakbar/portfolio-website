const CASES={
  'sproutfull':{
    title:'Turning environmental reporting into a decision-support tool',eyebrow:'Sproutfull · UX Engineering / Product Design',
    intro:'Sproutfull began as a tool for calculating environmental footprints. I helped evolve it into a decision-support tool that helps people understand what is driving the result and decide what to do next.',
    facts:[['Role','UX Engineer / Product Designer'],['Scope','Research, product design, testing and front-end development'],['Product','B2B environmental footprinting platform'],['Product shift','From calculation to decision support']],
    snapshot:{
      narrative:['The calculation MVP began in September 2025 and made environmental footprinting more structured. In January 2026, stakeholder feedback exposed the next product problem: once the number appeared, users still needed to understand what drove it, decide whether they trusted it and know where to investigate.','I reframed the reporting experience around those decisions and carried the model from research and usability testing into React and TypeScript implementation across Organisation, Location and Product.'],
      facts:[['Role','UX Engineer / Product Designer'],['Case-study timeframe','January 2026 – present; calculation MVP began September 2025'],['Team','CTO/backend engineer, sustainability specialists and LCA experts'],['Status','Working product; reporting model still being extended']],
      shift:'From producing an environmental number to helping people understand, trust and act on it.',
      story:[['Starting point','Calculation and reporting were treated as the end of the workflow.'],['Product signal','“What can we do with this number?”'],['New direction','Result → Focus → Reliability → Evidence → Investigation']],
      evidence:'In usability testing, a sustainability specialist could identify the main priority, understand why it had been selected and follow the evidence into the underlying contributors.'
    },
    core:['First, we had to make the calculation usable','The number exposed a bigger question','I redesigned the report around decisions','The direction held. The hierarchy changed.','I made trust inspectable','I carried the product model into code','The number became the starting point'],
    supporting:{
      'Learning the domain and finding the bigger need':{label:'Domain evidence',summary:'Turning this signal into a product direction meant understanding both the environmental model and the limits of the data.'},
      'Making the learning reusable':{label:'Product system evidence',summary:'I turned the reporting model into reusable intent, rules and interface patterns so new work did not have to reopen the same decisions.'}
    },
    promote:[],prev:'prototyping-framework',next:'how-sure'
  },
  'how-sure':{
    title:'Designing an AI tool that helps people judge claims, not just get answers',eyebrow:'How Sure · AI-assisted critical thinking / UX Engineering',
    intro:'How Sure examines public claims by comparing what was said with the evidence available to support it. I conceived, designed, built and deployed the product as an independent experiment in making AI reasoning easier to inspect and question.',
    facts:[['Role','Product definition, UX design and frontend engineering'],['Scope','Research, interaction design, AI behaviour and implementation'],['Stack','Next.js, TypeScript, Gemini and Tavily'],['Status','Live independent product experiment']],
    snapshot:{
      narrative:['How Sure began as a claim-verification experiment. Early versions could retrieve sources and produce a clear verdict, but testing exposed a more important risk: the interface could make a generated judgement feel more certain than the evidence allowed.','I reframed the product around critical thinking. I designed the reasoning model, information hierarchy and failure behaviour, then built and deployed the experience with Next.js, TypeScript, Gemini and Tavily.'],
      facts:[['Role','Product definition / UX design / UX engineering'],['Case-study timeframe','2026'],['Team','Independent project'],['Status','Live product and ongoing experiment']],
      shift:'From delivering a confident verdict to helping people inspect evidence, uncertainty and reasoning.',
      story:[['Starting point','Enter a claim, retrieve sources and return a clear answer.'],['Product signal','The system could sound certain even when it had interpreted the claim or evidence incorrectly.'],['New direction','Interpret → Retrieve → Assess → Explain → Inspect']],
      evidence:'A 10-person usability study changed the result order, source language and evidence interactions. In a separate 10-claim quality check, every analysis completed without hard or unresolved quality failures; three needed vocabulary-only repair.'
    },
    core:['AI makes certainty cheap','I designed the reasoning model before the interface','The score was telling the wrong story','Transparency needed a hierarchy','Feedback changed the product','I designed for failure, not only the happy path','Edge cases changed the system','From verdict to critical thinking'],
    promote:[],prev:'sproutfull',next:'adoption-tool'
  },
  'adoption-tool':{
    title:'Turning design-system scoring into a product workflow',eyebrow:'Philips · UX Research / Product Design / React',
    intro:'Philips measured design-system adoption through disconnected spreadsheets. I helped turn that subjective process into a clearer workflow teams could complete, understand and act on.',
    facts:[['Role','UX researcher, experience designer and UX engineer'],['Team','Developer, product owner and me across two locations'],['Timeline','Four months'],['Outcome','Scoring reduced from two days to 48 minutes']],
    snapshot:{
      narrative:['Philips assessed design-system adoption through a spreadsheet process that distributed scores, evidence and reporting across separate files. Completing one assessment could take two days, while designers, product owners and business partners needed different views of the same result.','I interviewed ten people across those roles, translated the findings into product rules, and worked with a developer and product owner to design and test a React tool. Five usability sessions shaped what the workflow captured and how the score became useful after completion.'],
      facts:[['Role','UX researcher / experience designer / UX engineer'],['Case-study timeframe','Four months'],['Team','Developer, product owner and me across two locations'],['Status','Launched internal scoring tool']],
      shift:'From subjective spreadsheet scoring to a structured workflow teams could complete, compare and act on.',
      story:[['Starting point','Manual scoring was split across spreadsheets and could take up to two days.'],['Product signal','The same score had to support guided input and portfolio-level decisions.'],['New direction','Guided assessment → Overview → Comparable results → Improvement priorities']],
      evidence:'After five usability tests, the launched workflow reduced scoring from two days to 48 minutes. Reporting errors fell by 28% and adoption increased by 37%.'
    },
    core:['The score could not be trusted','I followed the score across three roles','Research became product rules','One workflow had to support two different jobs','Testing changed what the tool captured','A faster score became a more useful score'],
    promote:[],prev:'how-sure',next:'design-system-a11y'
  },
  'design-system-a11y':{
    title:'Rebuilding trust in a design system',eyebrow:'The Adecco Group · Design Systems / Accessibility / React',
    intro:'The component library was widely used in design, but engineers no longer trusted it. I led a four-week audit and remediation effort across Figma, Storybook and more than 110 React components.',
    facts:[['Role','Design Technologist Lead; audit and remediation driver'],['Scope','110+ React components'],['Timeline','Four weeks'],['Outcome','Operational signals: QA issues near zero; onboarding around three hours']],
    snapshot:{
      narrative:['The Adecco Group’s design system was widely used in Figma, but engineers had stopped trusting it. Design files, Storybook guidance and React components had drifted apart, accessibility defects repeatedly reached QA, and teams began creating their own versions to meet delivery dates.','As the primary driver, I audited more than 110 components, made the gaps visible and coordinated remediation with three frontend engineers. The work combined component fixes with clearer ownership, release communication and onboarding so trust did not depend on code changes alone.'],
      facts:[['Role','Design Technologist Lead; primary audit and remediation driver'],['Case-study timeframe','Four weeks'],['Team','Three frontend engineers, product teams and me'],['Status','Remediation completed; governance moved into regular delivery']],
      shift:'From a component library teams worked around to a shared system they could trust and use.',
      story:[['Starting point','Figma, Storybook and React represented different versions of the same components.'],['Product signal','Developers were guessing how components worked together and missing important releases.'],['New direction','Audit → Remediate → Verify → Release → Teach']],
      evidence:'Operational evidence after remediation: more than 110 React components were reviewed and aligned, QA-reported accessibility issues fell to near zero, and developer onboarding fell from five days to around three hours.'
    },
    core:['The components existed. Teams stopped trusting them','I made the drift visible','Developer friction changed the priorities','Fixing components was only half the work','The system became usable again'],
    promote:[],prev:'adoption-tool',next:'digital-asset-repository'
  },
  'digital-asset-repository':{
    title:'Making approved assets easier to find and trust',eyebrow:'Philips · UX Design / Vue / Design Systems',
    intro:'Designers depended on an ageing repository whose search only worked when they already knew the right terminology. I redesigned the service, defined its metadata and built a working Vue proof of concept.',
    facts:[['Role','Researcher, experience designer and front-end developer'],['Team','Icon designer and me'],['Timeline','Twelve weeks'],['Outcome','Search and download time improved by 94%']],
    snapshot:{
      narrative:['Philips designers relied on an ageing repository for approved icons, but search only worked when they already knew the system’s terminology. Slow retrieval, unclear version information and no visible request path encouraged people to reuse old assets or create replacements.','Research showed that the problem was larger than the search box. I mapped the service, defined a versioned YAML metadata model and built a Vue proof of concept connected to GitLab. Thirty days of internal use tested discovery, asset context, download and maintenance as one workflow.'],
      facts:[['Role','Researcher / experience designer / front-end developer'],['Case-study timeframe','Twelve weeks'],['Team','Icon designer and me'],['Status','Vue proof of concept used internally for 30 days with 100 icons']],
      shift:'From an asset folder people searched to a governed service they could find, verify and maintain.',
      story:[['Starting point','Finding an approved icon depended on knowing its exact label.'],['Product signal','People also needed version context, usage guidance and a clear request path.'],['New direction','Search → Inspect → Download → Request and maintain']],
      evidence:'Search and download time improved by 94%. In the first 30 days, traffic increased by 78% and users downloaded 43 assets from the initial library of 100 icons.'
    },
    core:['Finding the right icon required knowing the right word','Search was only one part of the service','Metadata became the product foundation','I built and tested the proof of concept in Vue','Faster discovery changed daily use'],
    promote:[],prev:'design-system-a11y',next:'prototyping-framework'
  },
  'prototyping-framework':{
    title:'Helping teams choose how to prototype',eyebrow:'The Adecco Group · Research / Strategy / Facilitation',
    intro:'The brief began as a search for a new prototyping tool. Research showed a broader problem: teams lacked a shared way to decide what to prototype, who it was for and how much fidelity they needed.',
    facts:[['Role','UX researcher and project manager'],['Team','Ten-week solo project with cross-functional contributors'],['Research','Survey and workshop with 13 participants'],['Early evidence','75% top CSAT rating; 43% of target users onboarded']],
    snapshot:{
      narrative:['The Adecco Group wanted teams to test ideas earlier, and the initial brief assumed the answer was a new high-fidelity prototyping tool. Research with designers, developers, product managers, product owners and business partners showed that teams struggled before they reached the tool: they lacked a shared way to define the decision, audience and useful level of realism.','I evaluated the technical options, made a failed React-integration assumption visible and reframed the work as a decision framework. The result connected different prototyping approaches to the jobs they were suited to, rather than presenting one universal default.'],
      facts:[['Role','UX researcher / project manager'],['Case-study timeframe','Ten weeks'],['Team','Solo project with cross-functional research contributors'],['Status','Framework published on the internal design-system site']],
      shift:'From selecting one prototyping tool to helping teams choose the right approach for the decision.',
      story:[['Starting point','The brief assumed teams were missing a high-fidelity tool.'],['Product signal','Different audiences and decisions required different levels of realism and support.'],['New direction','Define the decision → Choose the audience → Select fidelity → Match the tool']],
      evidence:'Early launch evidence only: 15 of 20 respondents gave the framework the highest rating, 43% of the target audience completed onboarding, and one team used it in a project during the first 30 days.'
    },
    core:['The brief assumed the answer was a tool','Teams needed a way to choose, not another default','The first technical assumption was wrong','I reframed the tools around different jobs','The framework made the decision reusable','Early evidence, not proof at scale'],
    promote:[],prev:'digital-asset-repository',next:'sproutfull'
  }
};
const LABELS={'sproutfull':'Sproutfull','how-sure':'How Sure','adoption-tool':'Adoption tool','design-system-a11y':'Accessibility audit','digital-asset-repository':'Digital asset repository','prototyping-framework':'Prototyping framework'};
const navHeadings=new Set(['Sproutfull LCA Platform - UX Engineering / Product Design','Design System Adoption Tool - UX Research / Product Design','Design System Accessibility - UX / Design Systems','Digital Asset Repository - UX Design / Front-end Development','Scaling Experimentation - UX Strategy / Prototyping']);
const iconPattern=/(wheelchair|flow-arrow|sparkle|book-open|presentation|shield-check|list-checks|calendar-check|scroll\.png|users-three|rocket-launch|arrow-fat|product-owner|product-designer|business-partner|user-round|panels-top-left|waypoints|workflow|refresh-cw)/i;
const slug=document.body.dataset.case,meta=CASES[slug];
let reportDialog;

function openImageDialog(item){
  if(!reportDialog){
    const dialog=document.createElement('dialog'),panel=document.createElement('div'),close=document.createElement('button'),figure=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption'),label=document.createElement('span'),question=document.createElement('strong');
    dialog.className='image-modal';panel.className='image-modal__panel';close.type='button';close.className='image-modal__close';close.setAttribute('aria-label','Close image');close.textContent='×';label.className='meta';caption.append(label,question);figure.append(img,caption);panel.append(close,figure);dialog.append(panel);close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));document.body.append(dialog);reportDialog={dialog,img,label,question};
  }
  reportDialog.img.src=item.src;reportDialog.img.alt=item.alt||'';if(item.width>0&&item.height>0){reportDialog.img.width=item.width;reportDialog.img.height=item.height}else{reportDialog.img.removeAttribute('width');reportDialog.img.removeAttribute('height')}reportDialog.label.textContent=item.label||'Project evidence';reportDialog.question.textContent=item.question||item.caption||item.alt||'';document.body.classList.add('modal-open');reportDialog.dialog.showModal();
}
const cleanId=(s,i)=>'chapter-'+i+'-'+s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,42);

function createScan(){
  const section=document.createElement('section');section.className='case-scan';section.setAttribute('aria-labelledby','scan-title');
  const label=document.createElement('div');label.className='kicker';label.textContent='At a glance';
  const title=document.createElement('h2');title.id='scan-title';title.textContent='The project in one minute';
  section.classList.add('case-scan--editorial');
  const summary=meta.snapshot,snapshot=document.createElement('div');snapshot.className='case-snapshot';
  const narrative=document.createElement('div');narrative.className='snapshot-narrative';summary.narrative.forEach(text=>{const paragraph=document.createElement('p');paragraph.textContent=text;narrative.append(paragraph)});
  const facts=document.createElement('dl');facts.className='snapshot-facts';summary.facts.forEach(([name,value])=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=value;row.append(dt,dd);facts.append(row)});snapshot.append(narrative,facts);
  const shift=document.createElement('div');shift.className='snapshot-shift';const shiftLabel=document.createElement('span'),shiftCopy=document.createElement('strong');shiftLabel.className='meta';shiftLabel.textContent='Product shift';shiftCopy.textContent=summary.shift;shift.append(shiftLabel,shiftCopy);
  const story=document.createElement('div');story.className='snapshot-story';summary.story.forEach(([name,value])=>{const item=document.createElement('div'),heading=document.createElement('span'),copy=document.createElement('strong');heading.className='meta';heading.textContent=name;copy.textContent=value;item.append(heading,copy);story.append(item)});
  const evidence=document.createElement('div');evidence.className='snapshot-evidence';const evidenceLabel=document.createElement('span'),evidenceCopy=document.createElement('p');evidenceLabel.className='meta';evidenceLabel.textContent='Evidence';evidenceCopy.textContent=summary.evidence;evidence.append(evidenceLabel,evidenceCopy);
  section.append(label,title,snapshot,shift,story,evidence);return section;
}

function appendBlock(container,block,context){
  if(block.type==='external-link'){
    const link=document.createElement('a');link.className='explore case-external-link';link.href=block.href;link.target='_blank';link.rel='noopener noreferrer';const label=document.createElement('span'),arrow=document.createElement('span');label.textContent=block.label;arrow.textContent='↗';link.append(label,arrow);container.append(link);return;
  }
  if(block.type==='report-levels'){
    const grid=document.createElement('div');grid.className='report-levels';block.items.forEach(item=>{const article=document.createElement('article'),trigger=document.createElement('button'),img=document.createElement('img'),label=document.createElement('span'),question=document.createElement('strong');trigger.type='button';trigger.className='report-levels__trigger';trigger.setAttribute('aria-label','Enlarge '+item.label+' report detail');trigger.addEventListener('click',()=>openImageDialog(item));img.src=item.src;img.alt=item.alt;img.loading='lazy';img.decoding='async';img.width=item.width;img.height=item.height;trigger.append(img);label.className='meta';label.textContent=item.label;question.textContent=item.question;article.append(trigger,label,question);grid.append(article)});container.append(grid);return;
  }
  if(block.type==='workflow-chain'){
    const list=document.createElement('ol');list.className='workflow-chain';block.items.forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item)});container.append(list);return;
  }
  if(block.type==='trust-model'){
    const model=document.createElement('div');model.className='trust-model';
    const labels=block.headings||['Layer','User question','What the interface reveals'];const head=document.createElement('div');head.className='trust-model__head';labels.forEach(text=>{const cell=document.createElement('span');cell.textContent=text;head.append(cell)});model.append(head);
    block.rows.forEach(([layer,question,reveals])=>{const row=document.createElement('div');row.className='trust-model__row';[layer,question,reveals].forEach((text,index)=>{const cell=document.createElement(index===0?'strong':'p');cell.textContent=text;if(index>0)cell.dataset.label=labels[index];row.append(cell)});model.append(row)});container.append(model);return;
  }
  if(block.type==='hierarchy-sequence'){
    const list=document.createElement('ol');list.className='hierarchy-sequence';block.items.forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item)});container.append(list);return;
  }
  if(block.type==='decision-questions'){
    const list=document.createElement('ol');list.className='decision-questions';block.items.forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item)});container.append(list);return;
  }
  if(block.type==='quotes'){
    const group=document.createElement('div');group.className='signal-quotes'+(block.items.length===3?' signal-quotes--three':'');block.items.forEach(text=>{const quote=document.createElement('blockquote');quote.textContent=text;group.append(quote)});container.append(group);return;
  }
  if(block.type==='evidence-grid'){
    const grid=document.createElement('div');grid.className='evidence-grid'+(block.variant?' evidence-grid--'+block.variant:'');block.items.forEach(([name,value])=>{const item=document.createElement('div'),heading=document.createElement('strong'),copy=document.createElement('p');heading.textContent=name;copy.textContent=value;item.append(heading,copy);grid.append(item)});container.append(grid);return;
  }
  if(block.type==='stat'){
    const stat=document.createElement('aside');stat.className='chapter-stat';
    const value=document.createElement('strong');value.textContent=block.value;
    const copy=document.createElement('div');const label=document.createElement('span');label.textContent=block.label;const detail=document.createElement('p');detail.textContent=block.text;copy.append(label,detail);stat.append(value,copy);container.append(stat);return;
  }
  if(block.type==='insight'){
    const insight=document.createElement('aside');insight.className='chapter-insight';
    const label=document.createElement('span');label.className='meta';label.textContent=block.label;
    const copy=document.createElement('p');copy.textContent=block.text;insight.append(label,copy);container.append(insight);return;
  }
  if(block.type==='comparison'){
    const comparison=document.createElement('div');comparison.className='workflow-comparison'+(block.variant?' workflow-comparison--'+block.variant:'');
    const labels=block.headings||['Existing workflow','First MVP target'];const headings=document.createElement('div');headings.className='workflow-comparison__head';labels.forEach(text=>{const heading=document.createElement('span');heading.textContent=text;headings.append(heading)});comparison.append(headings);
    block.rows.forEach(([before,after])=>{const row=document.createElement('div');row.className='workflow-comparison__row';const first=document.createElement('p'),second=document.createElement('p');first.textContent=before;second.textContent=after;second.dataset.label=labels[1];row.append(first,second);comparison.append(row)});container.append(comparison);return;
  }
  if(block.type==='engineering-evidence'){
    const evidence=document.createElement('aside');evidence.className='engineering-evidence';
    const head=document.createElement('div');head.className='engineering-evidence__head';const label=document.createElement('span');label.className='meta';label.textContent=block.label;const title=document.createElement('strong');title.textContent=block.title;head.append(label,title);evidence.append(head);
    const list=document.createElement('ol');block.items.forEach(([rule,test])=>{const item=document.createElement('li'),ruleText=document.createElement('code'),testText=document.createElement('span');ruleText.textContent=rule;testText.textContent=test;item.append(ruleText,testText);list.append(item)});evidence.append(list);container.append(evidence);return;
  }
  if(block.type==='item'){
    let ul=container.lastElementChild;if(!ul||ul.tagName!=='UL'){ul=document.createElement('ul');container.append(ul)}
    const li=document.createElement('li');li.textContent=block.text;ul.append(li);return;
  }
  if(block.type==='image'){
    const figure=document.createElement('figure');figure.className='case-figure'+(iconPattern.test(block.src)?' asset-icon':'')+(block.variant?' '+block.variant:'');
    const img=document.createElement('img');img.src=block.src;img.alt=block.alt||('Visual supporting '+context);img.loading='lazy';img.decoding='async';
    if(block.width>0&&block.height>0){img.width=block.width;img.height=block.height}
    const captionText=block.caption||(slug!=='sproutfull'?block.alt:'');
    if(!iconPattern.test(block.src)){const trigger=document.createElement('button');trigger.type='button';trigger.className='case-figure__trigger';trigger.setAttribute('aria-label','Enlarge project image: '+(block.alt||context));trigger.addEventListener('click',()=>openImageDialog({...block,label:'Project evidence',question:captionText||block.alt}));trigger.append(img);figure.append(trigger)}else figure.append(img);
    if(captionText){const caption=document.createElement('figcaption');caption.textContent=captionText;figure.append(caption)}container.append(figure);return;
  }
  if(block.type==='embed'){
    const figure=document.createElement('figure');figure.className='case-figure';const video=document.createElement('video');video.src=block.src;video.controls=true;video.playsInline=true;video.preload='metadata';video.poster='https://video.squarespace-cdn.com/content/v1/67dc1386a3934742f1cb4d76/29c20d66-f718-49cd-97a1-91118f26a5f3/thumbnail';video.setAttribute('aria-label','TAG design system promotional video');figure.append(video);container.append(figure);return;
  }
  if(block.type==='p'&&/^Role:/.test(block.text)){
    const match=block.text.match(/^Role:\s*(.*?)\s*Scope:\s*(.*?)\s*Product:\s*(.*)$/s);if(match){const dl=document.createElement('dl');dl.className='brief-facts';[['Role',match[1]],['Scope',match[2]],['Product',match[3]]].forEach(([name,value])=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=value;row.append(dt,dd);dl.append(row)});container.append(dl);return}
  }
  if(block.type==='p'&&/^(For users|For the product|For the team)/.test(block.text)){
    const match=block.text.match(/^(For users|For the product|For the team):?\s*(.+)$/);if(match){const callout=document.createElement('div');callout.className='outcome-callout';const heading=document.createElement('strong');heading.textContent=match[1];const copy=document.createElement('p');copy.textContent=match[2];callout.append(heading,copy);container.append(callout);return}
  }
  const tag=block.type==='quote'?'blockquote':/^h[3-4]$/.test(block.type)?block.type:'p';const el=document.createElement(tag);el.textContent=block.text;
  if(tag==='p'&&(/^\d{2}\s*-\s*/.test(block.text)||/^(OVERVIEW|SUMMARY|RESEARCH|PROCESS|IMPACT|EXPERIENCE DESIGN|PROTOTYPE, TEST & ITERATE|OUTCOMES & LESSONS)$/.test(block.text)))el.className='section-label';
  container.append(el);
}

function renderBlocks(container,blocks,context){
  for(let i=0;i<blocks.length;i++){
    const block=blocks[i];if(i>0&&blocks[i-1].text===block.text&&['item','quote'].includes(blocks[i-1].type))continue;
    if(block.type==='image'&&!iconPattern.test(block.src)){
      if(block.variant==='concept-primary'||block.variant==='trust-overview'){appendBlock(container,block,context);continue}
      const run=[];let cursor=i;while(cursor<blocks.length&&blocks[cursor].type==='image'&&!iconPattern.test(blocks[cursor].src)){run.push(blocks[cursor]);cursor++}
      if(run.length>1){const grid=document.createElement('div');grid.className='media-grid'+(run.every(image=>image.variant==='concept-secondary')?' concept-grid':'')+(run.every(image=>image.variant==='trust-detail')?' trust-detail-grid':'');run.forEach(image=>appendBlock(grid,image,context));container.append(grid);i=cursor-1;continue}
    }
    appendBlock(container,block,context);
  }
}

function renderSegmentBlocks(container,blocks,context){
  const supporting=meta.supporting||{};let run=[];
  const flush=()=>{if(run.length){renderBlocks(container,run,context);run=[]}};
  for(let i=0;i<blocks.length;i++){
    const block=blocks[i],config=block.type==='h3'?supporting[block.text]:null;
    if(!config){run.push(block);continue}
    flush();let end=i+1;while(end<blocks.length&&blocks[end].type!=='h3'&&!(blocks[end].type==='p'&&/^\d{2}\s*-\s*/.test(blocks[end].text)))end++;
    const summary=document.createElement('p');summary.className='chapter-bridge';summary.textContent=config.summary;container.append(summary);
    container.append(makeDeepDive(block.text,blocks.slice(i+1,end),config.label));i=end-1;
  }
  flush();
}

function makeDeepDive(title,blocks,label='Supporting detail'){
  const details=document.createElement('details');details.className='deep-dive';
  const summary=document.createElement('summary');const text=document.createElement('span');text.innerHTML='<small>'+label+'</small><strong></strong>';text.querySelector('strong').textContent=title;const mark=document.createElement('i');mark.setAttribute('aria-hidden','true');mark.textContent='+';summary.append(text,mark);
  const body=document.createElement('div');body.className='deep-dive-body';renderBlocks(body,blocks,title);details.append(summary,body);return details;
}

async function renderCase(){
  if(!meta)return;document.title=meta.title+', Aqeel Akbar';
  const description=document.querySelector('meta[name="description"]');if(description)description.content=meta.intro;
  const response=await fetch('/data/'+slug+'.json');if(!response.ok)throw new Error('Content unavailable');const data=await response.json();
  let blocks=data.blocks.filter(block=>!(block.type==='h2'&&navHeadings.has(block.text))&&!(slug==='sproutfull'&&(block.type==='h1'||(block.type==='p'&&/^\d{2}\s*-\s*/.test(block.text))))).map(block=>meta.promote.includes(block.text)?{...block,type:'h2'}:block);
  const heroIndex=blocks.findIndex(block=>block.type==='image'),hero=heroIndex>=0?blocks[heroIndex]:null;if(heroIndex>=0)blocks.splice(heroIndex,1);
  document.querySelector('#caseEyebrow').textContent=meta.eyebrow;document.querySelector('#caseTitle').textContent=meta.title;document.querySelector('#caseIntro').textContent=meta.intro;
  const heroImg=document.querySelector('#caseHeroImage');if(hero){heroImg.src=hero.src;heroImg.alt=hero.alt||meta.title+' project overview';if(hero.width>0&&hero.height>0){heroImg.width=hero.width;heroImg.height=hero.height}}
  const layout=document.querySelector('.case-layout');layout.before(createScan());
  const firstSection=blocks.findIndex(block=>block.type==='h2'),briefBlocks=firstSection>0?blocks.splice(0,firstSection):[];
  const segments=[];let segment=null;blocks.forEach(block=>{if(block.type==='h2'){segment={heading:block.text,blocks:[]};segments.push(segment)}else if(segment)segment.blocks.push(block);else briefBlocks.push(block)});
  const article=document.querySelector('#caseArticle'),rail=document.querySelector('#chapterLinks');
  let expand=null;if(slug!=='sproutfull'){const controls=document.createElement('div');controls.className='case-controls';expand=document.createElement('button');expand.type='button';expand.textContent='Expand all supporting detail';expand.setAttribute('aria-expanded','false');controls.append(expand);article.before(controls)}
  const mobileMenu=document.createElement('details');mobileMenu.className='mobile-chapter-menu';mobileMenu.innerHTML='<summary>Jump to a chapter <span aria-hidden="true">+</span></summary><nav aria-label="Case study chapters"></nav>';article.before(mobileMenu);
  if(briefBlocks.length&&slug!=='sproutfull')article.append(makeDeepDive('Project brief, responsibilities and technical contribution',briefBlocks,'Project overview'));
  let chapter=0;
  segments.forEach(segment=>{
    const isCore=meta.core.includes(segment.heading);
    if(!isCore){article.append(makeDeepDive(segment.heading,segment.blocks));return}
    chapter++;const section=document.createElement('section');section.className='case-section';section.id=cleanId(segment.heading,chapter);const heading=document.createElement('h2');heading.textContent=segment.heading;heading.dataset.chapter='Chapter '+String(chapter).padStart(2,'0');section.append(heading);renderSegmentBlocks(section,segment.blocks,segment.heading);article.append(section);
    [rail,mobileMenu.querySelector('nav')].forEach(nav=>{const link=document.createElement('a');link.href='#'+section.id;link.textContent=String(chapter).padStart(2,'0')+', '+segment.heading;link.addEventListener('click',()=>{mobileMenu.open=false});nav.append(link)});
  });
  const prev=meta.prev,next=meta.next;document.querySelector('#prevCase').href='/portfolio/'+prev+'/';document.querySelector('#prevTitle').textContent=LABELS[prev];document.querySelector('#nextCase').href='/portfolio/'+next+'/';document.querySelector('#nextTitle').textContent=LABELS[next];
  const allDetails=[...article.querySelectorAll('details.deep-dive')];if(expand&&allDetails.length)expand.addEventListener('click',()=>{const open=expand.getAttribute('aria-expanded')!=='true';allDetails.forEach(item=>item.open=open);expand.setAttribute('aria-expanded',String(open));expand.textContent=open?'Collapse supporting detail':'Expand all supporting detail'});else if(expand)expand.parentElement.remove();
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{rootMargin:'0px 0px -8%'});[...article.children].forEach(element=>reveal.observe(element));
  const sections=[...article.querySelectorAll('.case-section')],links=[...rail.querySelectorAll('a')];const chapterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id))}),{rootMargin:'-20% 0px -65%'});sections.forEach(section=>chapterObserver.observe(section));
  document.querySelector('#caseLoading').remove();document.querySelector('#caseContent').hidden=false;
}

addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.transform='scaleX('+(max?scrollY/max:0)+')'},{passive:true});
renderCase().catch(()=>{document.querySelector('#caseLoading').textContent='This case study could not be loaded.'});
