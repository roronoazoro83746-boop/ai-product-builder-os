// app-part2.js — Prompts + Tasks + Bugs + Launch

function renderPrompts(el){
  const cats=["All","Ideation","Frontend","Backend","Debugging","Launch","Marketing"];
  const catColors={Ideation:"var(--accent)",Frontend:"var(--cyan)",Backend:"var(--green)",Debugging:"var(--red)",Launch:"var(--orange)",Marketing:"var(--yellow)"};
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>🤖 Prompt Library</h1><p>${APP_DATA.prompts.length} AI prompt templates — copy-paste ready for every stage</p></div></div>
  <div class="page-body fade-in">
    <div class="section-header">
      <div class="section-title">${APP_DATA.prompts.length} Templates</div>
      <div class="section-tabs">${cats.map((c,i)=>`<div class="section-tab ${i===0?'active':''}" onclick="filterPrompts('${c}',this)">${c}</div>`).join('')}</div>
    </div>
    <div class="prompt-grid" id="prompt-list">${buildPromptCards(APP_DATA.prompts,catColors)}</div>
  </div>`;
}

function buildPromptCards(list,catColors){
  if(!catColors)catColors={Ideation:"var(--accent)",Frontend:"var(--cyan)",Backend:"var(--green)",Debugging:"var(--red)",Launch:"var(--orange)",Marketing:"var(--yellow)"};
  return list.map(p=>`
    <div class="prompt-card" onclick="showPrompt('${p.id}')">
      <div class="prompt-card-header">
        <span style="font-weight:600;font-size:13.5px">${p.title}</span>
        <span class="prompt-card-cat" style="background:${catColors[p.category]||'var(--accent)'}22;color:${catColors[p.category]||'var(--accent)'}">${p.category}</span>
      </div>
      <div class="prompt-card-body">${p.prompt}</div>
      <div class="prompt-card-footer">
        <span>Stage: ${p.stage} · Used ${p.uses}×</span>
        <button class="copy-btn" id="cpbtn-${p.id}" onclick="event.stopPropagation();copyPrompt('${p.id}')">📋 Copy</button>
      </div>
    </div>`).join('');
}

function filterPrompts(cat,tabEl){
  document.querySelectorAll('.section-tab').forEach(t=>t.classList.remove('active'));
  tabEl.classList.add('active');
  const list=cat==='All'?APP_DATA.prompts:APP_DATA.prompts.filter(p=>p.category===cat);
  document.getElementById('prompt-list').innerHTML=buildPromptCards(list);
}

function showPrompt(id){
  const p=APP_DATA.prompts.find(x=>x.id===id);if(!p)return;
  document.getElementById('modal-content').innerHTML=`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>${p.title}</h2>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px">${p.category} · Stage: ${p.stage} · Used ${p.uses}×</p>
    <pre>${p.prompt}</pre>
    <div style="margin-top:14px"><button class="copy-btn" style="padding:8px 20px;font-size:12px" onclick="copyPrompt('${p.id}',this)">📋 Copy Prompt</button></div>`;
  document.getElementById('modal-overlay').classList.add('open');
}

function copyPrompt(id,btn){
  const p=APP_DATA.prompts.find(x=>x.id===id);if(!p)return;
  navigator.clipboard.writeText(p.prompt).then(()=>{showToast('✓ Prompt copied to clipboard!');if(btn){btn.textContent='✓ Copied';btn.classList.add('copied');setTimeout(()=>{btn.textContent='📋 Copy';btn.classList.remove('copied');},2000);}});
}

function closeModal(){document.getElementById('modal-overlay').classList.remove('open');}

function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

// ── Task Board ──
function renderTasks(el){
  const cols=["To Do","In Progress","Done","Backlog"];
  const td=APP_DATA.tasks.filter(t=>t.status==='Done').length;
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>✅ Task Board</h1><p>Kanban execution board — ${td}/${APP_DATA.tasks.length} tasks complete</p></div></div>
  <div class="page-body fade-in">
    <div class="stats-grid" style="margin-bottom:20px">
      ${cols.map(c=>{const n=APP_DATA.tasks.filter(t=>t.status===c).length;return`<div class="stat-card"><div class="stat-label">${c}</div><div class="stat-value" style="color:${getStatusColor(c)}">${n}</div></div>`;}).join('')}
    </div>
    <div class="kanban">
      ${cols.map(col=>{
        const items=APP_DATA.tasks.filter(t=>t.status===col);
        return`<div class="kanban-column">
          <div class="kanban-col-header">
            <div class="kanban-col-title"><span class="badge-dot" style="background:${getStatusColor(col)};display:inline-block"></span>${col}</div>
            <span class="kanban-col-count">${items.length}</span>
          </div>
          ${items.map(t=>`<div class="kanban-card">
            <div class="kanban-card-title">${t.title}</div>
            <div class="kanban-card-meta">
              <span class="badge" style="background:${getStatusColor(t.priority)}22;color:${getStatusColor(t.priority)};font-size:10px">${t.priority}</span>
              ${t.tags.map(tg=>`<span class="kanban-tag">${tg}</span>`).join('')}
              ${t.dueDate?`<span style="font-size:10px;color:var(--text-muted);margin-left:auto">📅 ${t.dueDate.slice(5)}</span>`:''}
              ${t.sprint?`<span style="font-size:10px;color:var(--accent-light)">S${t.sprint}</span>`:''}
            </div>
          </div>`).join('')}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

// ── Bug Tracker ──
function renderBugs(el){
  const open=APP_DATA.bugs.filter(b=>b.status==='Open').length;
  const inprog=APP_DATA.bugs.filter(b=>b.status==='In Progress').length;
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>🐛 Bug Tracker</h1><p>Track and squash every issue before launch</p></div></div>
  <div class="page-body fade-in">
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-label">Open</div><div class="stat-value" style="color:var(--red)">${open}</div></div>
      <div class="stat-card"><div class="stat-label">In Progress</div><div class="stat-value" style="color:var(--yellow)">${inprog}</div></div>
      <div class="stat-card"><div class="stat-label">Fixed</div><div class="stat-value" style="color:var(--green)">${APP_DATA.bugs.filter(b=>b.status==='Fixed').length}</div></div>
      <div class="stat-card"><div class="stat-label">Total</div><div class="stat-value">${APP_DATA.bugs.length}</div></div>
    </div>
    <div class="card">
      ${APP_DATA.bugs.map(b=>`
        <div style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px">
            <div>
              <div style="font-weight:600;color:var(--text-primary);margin-bottom:4px">${b.id} · ${b.title}</div>
              <div style="font-size:12px;color:var(--text-secondary)">${b.description}</div>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0">
              <span class="badge" style="background:${getStatusColor(b.severity)}22;color:${getStatusColor(b.severity)}"><span class="badge-dot" style="background:${getStatusColor(b.severity)}"></span>${b.severity}</span>
              <span class="badge" style="background:${getStatusColor(b.status)}22;color:${getStatusColor(b.status)}"><span class="badge-dot" style="background:${getStatusColor(b.status)}"></span>${b.status}</span>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
            <div style="background:rgba(0,0,0,0.2);padding:8px 10px;border-radius:6px;font-size:11px;color:var(--text-muted)"><span style="color:var(--text-secondary);font-weight:600">Expected: </span>${b.expected}</div>
            <div style="background:rgba(239,68,68,0.06);padding:8px 10px;border-radius:6px;font-size:11px;color:var(--text-muted)"><span style="color:var(--red);font-weight:600">Actual: </span>${b.actual}</div>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:8px">Reported: ${b.reportedDate}</div>
        </div>`).join('')}
    </div>
  </div>`;
}

// ── Launch Checklist ──
function renderLaunch(el){
  const lc=APP_DATA.launchChecklist;
  const sections=[{title:"🔧 Pre-Launch",emoji:"🔧",items:lc.preLaunch},{title:"🚀 Launch Day",emoji:"🚀",items:lc.launch},{title:"📈 Post-Launch",emoji:"📈",items:lc.postLaunch}];
  const allItems=[...lc.preLaunch,...lc.launch,...lc.postLaunch];
  const totalDone=allItems.filter(i=>i.done).length;
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>🎯 Launch Checklist</h1><p>${totalDone}/${allItems.length} items complete across all phases</p></div></div>
  <div class="page-body fade-in">
    <div class="stats-grid">
      ${sections.map(s=>{const d=s.items.filter(i=>i.done).length;return`<div class="stat-card"><div class="stat-label">${s.title}</div><div class="stat-value">${d}/${s.items.length}</div><div style="margin-top:8px"><div class="progress-bar"><div class="progress-fill" style="width:${d/s.items.length*100}%"></div></div></div></div>`;}).join('')}
      <div class="stat-card"><div class="stat-label">Overall Progress</div><div class="stat-value">${Math.round(totalDone/allItems.length*100)}%</div><div style="margin-top:8px"><div class="progress-bar"><div class="progress-fill" style="width:${totalDone/allItems.length*100}%"></div></div></div></div>
    </div>
    ${sections.map(s=>{
      const done=s.items.filter(i=>i.done).length;
      return`<div class="launch-phase">
        <div class="launch-phase-header">
          <div class="launch-phase-title">${s.title}</div>
          <div class="launch-phase-progress">${done}/${s.items.length} · ${Math.round(done/s.items.length*100)}%</div>
        </div>
        <div style="margin-bottom:12px"><div class="progress-bar" style="height:6px"><div class="progress-fill" style="width:${done/s.items.length*100}%"></div></div></div>
        <div class="card">
          ${s.items.map(item=>`<div class="checklist-item">
            <div class="checklist-check ${item.done?'checked':''}"></div>
            <span class="checklist-text ${item.done?'done':''}">${item.task}</span>
            <span class="checklist-cat">${item.cat}</span>
          </div>`).join('')}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}
