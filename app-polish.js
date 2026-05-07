// app-polish.js — Phase 1: Interactions + Phase 2: Start Here + Phase 3: Messaging

// ── Phase 2: "Start Here" page ──
function renderStartHere(el){
  const steps=[
    {title:"Duplicate this workspace",desc:"Click ··· → Duplicate in Notion. This becomes your personal copy.",icon:"📋"},
    {title:"Add your first idea",desc:"Open Idea Vault → add your product idea → score it (aim for 70+).",icon:"💡"},
    {title:"Create your product",desc:"Once an idea hits 70+, add it to Product Planner and set a launch date.",icon:"🚀"},
    {title:"Break it into tasks",desc:"Add tasks to the Task Board → assign priority and due date → start shipping.",icon:"✅"},
    {title:"Launch and track revenue",desc:"Complete the Launch Checklist → go live → track MRR in Monetization.",icon:"💰"}
  ];
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left">
    <h1>👋 Start Here</h1>
    <p>5 steps to go from zero to your first launch</p>
  </div></div>
  <div class="page-body fade-in">
    <div class="start-here-banner">
      <div style="font-size:15px;font-weight:700;margin-bottom:4px">You're 5 steps away from your first launch. 🎯</div>
      <div style="font-size:13px;color:var(--text-secondary)">Complete these in order. Each step takes 10–20 minutes.</div>
    </div>
    <div class="card" style="margin-bottom:20px">
      ${steps.map((s,i)=>`<div class="start-here-step">
        <div class="step-num">${i+1}</div>
        <div>
          <div class="step-title">${s.icon} ${s.title}</div>
          <div class="step-desc">${s.desc}</div>
        </div>
      </div>`).join('')}
    </div>
    <div class="section-header"><div class="section-title">⚡ Quick Access</div></div>
    <div class="quick-links">
      ${[
        {icon:"💡",label:"Idea Vault",page:"ideas"},
        {icon:"🚀",label:"Product Planner",page:"planner"},
        {icon:"🤖",label:"Prompt Library",page:"prompts"},
        {icon:"✅",label:"Task Board",page:"tasks"},
        {icon:"🐛",label:"Bug Tracker",page:"bugs"},
        {icon:"🎯",label:"Launch Checklist",page:"launch"},
        {icon:"💰",label:"Monetization",page:"monetization"},
        {icon:"📣",label:"Go-To-Market",page:"gtm"},
        {icon:"🗄️",label:"DB Schemas",page:"schemas"}
      ].map(l=>`<div class="quick-link" onclick="navigate('${l.page}')">
        <div class="quick-link-icon">${l.icon}</div>
        <div class="quick-link-label">${l.label}</div>
      </div>`).join('')}
    </div>
    <div class="card" style="margin-top:4px">
      <div class="card-header"><div class="card-title">💬 Need help? Use these prompts.</div></div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
        ${[
          {q:"Stuck on your idea?",a:'Go to Prompt Library → "Feature Brainstorm" prompt'},
          {q:"Not sure what to build first?",a:'Score your ideas → highest score = build first'},
          {q:"Overwhelmed by tasks?",a:'Focus only on P0 tasks. Everything else is backlog.'},
          {q:"Ready to launch?",a:'Run through Launch Checklist top to bottom. Miss nothing.'}
        ].map(item=>`<div style="display:flex;gap:12px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
          <div style="font-size:12px;color:var(--accent-light);font-weight:600;min-width:160px">${item.q}</div>
          <div style="font-size:12px;color:var(--text-secondary)">${item.a}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

// ── Phase 3: Outcome-focused messaging patch ──
// Rewrites dashboard welcome + page subtitles with benefit language
const OUTCOME_COPY = {
  dashboard:"Ship your next product without the chaos.",
  ideas:"Kill bad ideas early. Double down on the right ones.",
  planner:"Know exactly what to build — and in what order.",
  prompts:"Copy AI prompts instead of writing them from scratch.",
  tasks:"Stop losing track. See exactly what's blocking you.",
  bugs:"Find it, fix it, ship it. Nothing slips through.",
  launch:"Never wonder if you missed a step before going live.",
  monetization:"See your numbers. Know what's working. Grow it.",
  gtm:"Your launch playbook. Ready to copy and paste.",
  schemas:"Your Notion workspace, pre-designed and ready to build."
};

// Patch navigate to inject outcome copy into page headers
const _origNavigate = window.navigate || navigate;
window.navigate = function(page){
  _origNavigate(page);
  setTimeout(()=>{
    const subEl = document.querySelector('.page-header-left p');
    if(subEl && OUTCOME_COPY[page]) subEl.textContent = OUTCOME_COPY[page];
  },10);
};

// ── Enhanced copy-to-clipboard with visual feedback ──
function copyPrompt(id, btn){
  const p = APP_DATA.prompts.find(x=>x.id===id);
  if(!p) return;
  navigator.clipboard.writeText(p.prompt).then(()=>{
    showToast('✓ Prompt copied — paste it into ChatGPT or Claude');
    if(btn){
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(()=>{ btn.innerHTML=orig; btn.classList.remove('copied'); }, 2000);
    }
    // increment usage count visually
    const usageEl = document.querySelector(`[data-prompt-id="${id}"] .prompt-uses`);
    if(usageEl){ const n=parseInt(usageEl.textContent)||0; usageEl.textContent=n+1; }
  });
}

// Boot handled by app-starthere.js
