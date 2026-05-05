// AI Product Builder OS — Application Logic
let currentPage = 'dashboard';

function init() {
  renderSidebar();
  navigate('dashboard');
}

function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === page));
  const main = document.getElementById('main-content');
  const renderers = {
    dashboard: renderDashboard,
    ideas: renderIdeas,
    planner: renderPlanner,
    prompts: renderPrompts,
    tasks: renderTasks,
    bugs: renderBugs,
    launch: renderLaunch,
    monetization: renderMonetization
  };
  if (renderers[page]) renderers[page](main);
}

function renderSidebar() {
  document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div class="logo-icon">⚡</div>
        AI Product Builder OS
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-section-title">Overview</div>
        <div class="nav-item active" data-page="dashboard" onclick="navigate('dashboard')">
          <span class="icon">📊</span> Dashboard
        </div>
      </div>
      <div class="nav-section">
        <div class="nav-section-title">Build</div>
        <div class="nav-item" data-page="ideas" onclick="navigate('ideas')">
          <span class="icon">💡</span> Idea Vault
          <span class="nav-badge">${APP_DATA.ideas.length}</span>
        </div>
        <div class="nav-item" data-page="planner" onclick="navigate('planner')">
          <span class="icon">🚀</span> Product Planner
        </div>
        <div class="nav-item" data-page="prompts" onclick="navigate('prompts')">
          <span class="icon">🤖</span> Prompt Manager
          <span class="nav-badge">${APP_DATA.prompts.length}</span>
        </div>
        <div class="nav-item" data-page="tasks" onclick="navigate('tasks')">
          <span class="icon">✅</span> Task Board
        </div>
        <div class="nav-item" data-page="bugs" onclick="navigate('bugs')">
          <span class="icon">🐛</span> Bug Tracker
          <span class="nav-badge">${APP_DATA.bugs.filter(b=>b.status==='Open').length}</span>
        </div>
      </div>
      <div class="nav-section">
        <div class="nav-section-title">Ship</div>
        <div class="nav-item" data-page="launch" onclick="navigate('launch')">
          <span class="icon">🎯</span> Launch Checklist
        </div>
        <div class="nav-item" data-page="monetization" onclick="navigate('monetization')">
          <span class="icon">💰</span> Monetization
        </div>
      </div>
    </nav>`;
}

// ── Dashboard ──────────────────────────────
function renderDashboard(el) {
  const d = APP_DATA;
  const tasksDone = d.tasks.filter(t=>t.status==='Done').length;
  const tasksTotal = d.tasks.length;
  const checkDone = d.launchChecklist.preLaunch.filter(c=>c.done).length;
  const checkTotal = d.launchChecklist.preLaunch.length;

  el.innerHTML = `
    <div class="page-header">
      <h1>📊 Dashboard</h1>
      <p>Your AI product building command center</p>
    </div>
    <div class="page-body fade-in">
      <div class="welcome-banner">
        <h2>Welcome back, Builder! 🚀</h2>
        <p>You have ${d.tasks.filter(t=>t.status==='In Progress').length} tasks in progress and ${d.bugs.filter(b=>b.status==='Open').length} open bugs to squash.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Active Ideas</div>
          <div class="stat-value">${d.ideas.length}</div>
          <div class="stat-change up">↑ ${d.ideas.filter(i=>i.status==='Validated').length} validated</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Tasks Progress</div>
          <div class="stat-value">${tasksDone}/${tasksTotal}</div>
          <div style="margin-top:8px"><div class="progress-bar"><div class="progress-fill" style="width:${(tasksDone/tasksTotal*100)}%"></div></div></div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Monthly Revenue</div>
          <div class="stat-value">${fmt$(d.monetization.mrr)}</div>
          <div class="stat-change up">↑ 50.6% from last month</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Launch Ready</div>
          <div class="stat-value">${Math.round(checkDone/checkTotal*100)}%</div>
          <div style="margin-top:8px"><div class="progress-bar"><div class="progress-fill" style="width:${(checkDone/checkTotal*100)}%"></div></div></div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom:24px">
        <div class="card">
          <div class="card-header">
            <div class="card-title">🗺️ Roadmap Progress</div>
          </div>
          ${d.roadmap.map((r,i)=>`
            <div class="roadmap-item">
              <div class="roadmap-marker">
                <div class="roadmap-dot ${r.status==='Done'?'done':''}"></div>
                ${i<d.roadmap.length-1?'<div class="roadmap-line"></div>':''}
              </div>
              <div class="roadmap-content">
                <div class="roadmap-phase">${r.phase}</div>
                <div class="roadmap-timeline">${r.timeline}</div>
                <div class="roadmap-goals">${r.goals}</div>
              </div>
              <span class="badge" style="background:${getStatusColor(r.status)}22;color:${getStatusColor(r.status)};height:fit-content">
                <span class="badge-dot" style="background:${getStatusColor(r.status)}"></span>${r.status}
              </span>
            </div>`).join('')}
        </div>
        <div class="card">
          <div class="card-header">
            <div class="card-title">📈 Revenue Growth</div>
          </div>
          <div class="chart-bars">
            ${d.monetization.revenue.map(r=>{
              const maxV = Math.max(...d.monetization.revenue.map(x=>x.v));
              const h = (r.v/maxV*160);
              return `<div class="chart-bar-wrap">
                <div class="chart-bar" style="height:${h}px">
                  <div class="chart-bar-value">${fmt$(r.v)}</div>
                </div>
                <div class="chart-bar-label">${r.m}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">⚡ Recent Tasks</div>
          <span class="section-tab active" onclick="navigate('tasks')" style="cursor:pointer">View All →</span>
        </div>
        <table class="data-table">
          <thead><tr><th>Task</th><th>Status</th><th>Priority</th><th>Due</th></tr></thead>
          <tbody>
            ${d.tasks.slice(0,5).map(t=>`
              <tr>
                <td style="color:var(--text-primary);font-weight:500">${t.title}</td>
                <td><span class="badge" style="background:${getStatusColor(t.status)}22;color:${getStatusColor(t.status)}"><span class="badge-dot" style="background:${getStatusColor(t.status)}"></span>${t.status}</span></td>
                <td><span class="badge" style="background:${getStatusColor(t.priority)}22;color:${getStatusColor(t.priority)}">${t.priority}</span></td>
                <td>${t.dueDate||'—'}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

// ── Idea Vault ─────────────────────────────
function renderIdeas(el) {
  el.innerHTML = `
    <div class="page-header">
      <h1>💡 Idea Vault</h1>
      <p>Store, score, and validate your product ideas</p>
    </div>
    <div class="page-body fade-in">
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-label">Total Ideas</div><div class="stat-value">${APP_DATA.ideas.length}</div></div>
        <div class="stat-card"><div class="stat-label">Validated</div><div class="stat-value">${APP_DATA.ideas.filter(i=>i.status==='Validated').length}</div></div>
        <div class="stat-card"><div class="stat-label">Building</div><div class="stat-value">${APP_DATA.ideas.filter(i=>i.status==='Building').length}</div></div>
        <div class="stat-card"><div class="stat-label">Avg Score</div><div class="stat-value">${Math.round(APP_DATA.ideas.reduce((a,b)=>a+b.score,0)/APP_DATA.ideas.length)}</div></div>
      </div>
      <div class="card">
        <table class="data-table">
          <thead><tr><th>Idea</th><th>Category</th><th>Score</th><th>Effort</th><th>Market</th><th>Status</th></tr></thead>
          <tbody>
            ${APP_DATA.ideas.map(i=>`
              <tr>
                <td>
                  <div style="font-weight:600;color:var(--text-primary)">${i.title}</div>
                  <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${i.description}</div>
                </td>
                <td><span class="kanban-tag">${i.category}</span></td>
                <td>
                  <div class="idea-score-bar">
                    <span class="idea-score-num" style="color:${i.score>=85?'var(--green)':i.score>=70?'var(--yellow)':'var(--text-muted)'}">${i.score}</span>
                    <div class="progress-bar" style="width:60px"><div class="progress-fill" style="width:${i.score}%;background:${i.score>=85?'var(--green)':i.score>=70?'var(--yellow)':'var(--text-muted)'}"></div></div>
                  </div>
                </td>
                <td>${i.effort}</td>
                <td>${i.market}</td>
                <td><span class="badge" style="background:${getStatusColor(i.status)}22;color:${getStatusColor(i.status)}"><span class="badge-dot" style="background:${getStatusColor(i.status)}"></span>${i.status}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

// ── Product Planner ────────────────────────
function renderPlanner(el) {
  const r = APP_DATA.roadmap;
  el.innerHTML = `
    <div class="page-header">
      <h1>🚀 Product Planner</h1>
      <p>Features, roadmap, and priorities for your products</p>
    </div>
    <div class="page-body fade-in">
      <div class="section-header">
        <div class="section-title">AI Resume Optimizer — Roadmap</div>
      </div>
      <div class="card" style="margin-bottom:24px">
        ${r.map((item,i)=>`
          <div class="roadmap-item">
            <div class="roadmap-marker">
              <div class="roadmap-dot ${item.status==='Done'?'done':''}"></div>
              ${i<r.length-1?'<div class="roadmap-line"></div>':''}
            </div>
            <div class="roadmap-content">
              <div class="roadmap-phase">${item.phase}</div>
              <div class="roadmap-timeline">${item.timeline}</div>
              <div class="roadmap-goals">${item.goals}</div>
            </div>
            <span class="badge" style="background:${getStatusColor(item.status)}22;color:${getStatusColor(item.status)};height:fit-content">
              <span class="badge-dot" style="background:${getStatusColor(item.status)}"></span>${item.status}
            </span>
          </div>`).join('')}
      </div>
      <div class="section-header"><div class="section-title">Tech Stack</div></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px">
        ${["Next.js","OpenAI API","Supabase","Vercel","Stripe"].map(t=>`<span class="kanban-tag" style="font-size:12px;padding:5px 14px">${t}</span>`).join('')}
      </div>
      <div class="section-header"><div class="section-title">Feature Breakdown</div></div>
      <div class="card">
        <table class="data-table">
          <thead><tr><th>Feature</th><th>Priority</th><th>Sprint</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              {n:"Resume Upload & Parse",p:"Must-have",s:1,st:"Done"},
              {n:"Job Description Matching",p:"Must-have",s:1,st:"In Progress"},
              {n:"AI Rewrite Engine",p:"Must-have",s:2,st:"In Progress"},
              {n:"ATS Score Checker",p:"Must-have",s:2,st:"To Do"},
              {n:"PDF Export",p:"Must-have",s:3,st:"To Do"},
              {n:"Cover Letter Generator",p:"Nice-to-have",s:3,st:"To Do"},
              {n:"LinkedIn Import",p:"Nice-to-have",s:null,st:"Backlog"},
              {n:"Analytics Dashboard",p:"Nice-to-have",s:null,st:"Backlog"}
            ].map(f=>`
              <tr>
                <td style="color:var(--text-primary);font-weight:500">${f.n}</td>
                <td><span class="kanban-tag">${f.p}</span></td>
                <td>${f.s||'—'}</td>
                <td><span class="badge" style="background:${getStatusColor(f.st)}22;color:${getStatusColor(f.st)}"><span class="badge-dot" style="background:${getStatusColor(f.st)}"></span>${f.st}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

// ── Prompt Manager ─────────────────────────
function renderPrompts(el) {
  const cats = ["All","Ideation","Frontend","Backend","Debugging","Launch","Marketing"];
  el.innerHTML = `
    <div class="page-header">
      <h1>🤖 Prompt Manager</h1>
      <p>Reusable AI prompts for every stage of product building</p>
    </div>
    <div class="page-body fade-in">
      <div class="section-header">
        <div class="section-title">${APP_DATA.prompts.length} Prompt Templates</div>
        <div class="section-tabs">
          ${cats.map((c,i)=>`<div class="section-tab ${i===0?'active':''}" onclick="filterPrompts('${c}',this)">${c}</div>`).join('')}
        </div>
      </div>
      <div class="prompt-grid" id="prompt-list">
        ${renderPromptCards(APP_DATA.prompts)}
      </div>
    </div>`;
}

function renderPromptCards(list) {
  const catColors = {Ideation:"var(--accent)",Frontend:"var(--cyan)",Backend:"var(--green)",Debugging:"var(--red)",Launch:"var(--orange)",Marketing:"var(--yellow)"};
  return list.map(p=>`
    <div class="prompt-card" onclick="showPrompt('${p.id}')">
      <div class="prompt-card-header">
        <span style="font-weight:600;font-size:14px">${p.title}</span>
        <span class="prompt-card-cat" style="background:${catColors[p.category]}22;color:${catColors[p.category]}">${p.category}</span>
      </div>
      <div class="prompt-card-body">${p.prompt}</div>
      <div class="prompt-card-footer">
        <span>Stage: ${p.stage} · Used ${p.uses}x</span>
        <button class="copy-btn" onclick="event.stopPropagation();copyPrompt('${p.id}')">📋 Copy</button>
      </div>
    </div>`).join('');
}

function filterPrompts(cat, tabEl) {
  document.querySelectorAll('.section-tab').forEach(t=>t.classList.remove('active'));
  tabEl.classList.add('active');
  const filtered = cat==='All' ? APP_DATA.prompts : APP_DATA.prompts.filter(p=>p.category===cat);
  document.getElementById('prompt-list').innerHTML = renderPromptCards(filtered);
}

function showPrompt(id) {
  const p = APP_DATA.prompts.find(x=>x.id===id);
  if(!p) return;
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-content').innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>${p.title}</h2>
    <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${p.category} · ${p.stage} Stage · Used ${p.uses} times</p>
    <pre>${p.prompt}</pre>
    <div style="margin-top:16px;display:flex;gap:8px">
      <button class="copy-btn" style="padding:8px 20px;font-size:13px" onclick="copyPrompt('${p.id}')">📋 Copy Prompt</button>
    </div>`;
  overlay.classList.add('open');
}

function copyPrompt(id) {
  const p = APP_DATA.prompts.find(x=>x.id===id);
  if(p) navigator.clipboard.writeText(p.prompt).then(()=>{ /* toast could go here */ });
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// ── Task Board (Kanban) ────────────────────
function renderTasks(el) {
  const cols = ["To Do","In Progress","Done","Backlog"];
  el.innerHTML = `
    <div class="page-header">
      <h1>✅ Task Board</h1>
      <p>Track your execution with Kanban workflow</p>
    </div>
    <div class="page-body fade-in">
      <div class="kanban">
        ${cols.map(col=>{
          const items = APP_DATA.tasks.filter(t=>t.status===col);
          return `<div class="kanban-column">
            <div class="kanban-col-header">
              <div class="kanban-col-title">
                <span class="badge-dot" style="background:${getStatusColor(col)};display:inline-block"></span>
                ${col}
              </div>
              <span class="kanban-col-count">${items.length}</span>
            </div>
            ${items.map(t=>`
              <div class="kanban-card">
                <div class="kanban-card-title">${t.title}</div>
                <div class="kanban-card-meta">
                  <span class="badge" style="background:${getStatusColor(t.priority)}22;color:${getStatusColor(t.priority)};font-size:10px">${t.priority}</span>
                  ${t.tags.map(tag=>`<span class="kanban-tag">${tag}</span>`).join('')}
                  ${t.dueDate?`<span style="font-size:10px;color:var(--text-muted);margin-left:auto">📅 ${t.dueDate.slice(5)}</span>`:''}
                </div>
              </div>`).join('')}
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

// ── Bug Tracker ────────────────────────────
function renderBugs(el) {
  el.innerHTML = `
    <div class="page-header">
      <h1>🐛 Bug Tracker</h1>
      <p>Track and squash bugs across your products</p>
    </div>
    <div class="page-body fade-in">
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-label">Open Bugs</div><div class="stat-value" style="color:var(--red)">${APP_DATA.bugs.filter(b=>b.status==='Open').length}</div></div>
        <div class="stat-card"><div class="stat-label">In Progress</div><div class="stat-value" style="color:var(--yellow)">${APP_DATA.bugs.filter(b=>b.status==='In Progress').length}</div></div>
        <div class="stat-card"><div class="stat-label">Total Bugs</div><div class="stat-value">${APP_DATA.bugs.length}</div></div>
      </div>
      <div class="card">
        <table class="data-table">
          <thead><tr><th>Bug</th><th>Severity</th><th>Status</th><th>Reported</th></tr></thead>
          <tbody>
            ${APP_DATA.bugs.map(b=>`
              <tr>
                <td>
                  <div style="font-weight:600;color:var(--text-primary)">${b.title}</div>
                  <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${b.description}</div>
                </td>
                <td><span class="badge" style="background:${getStatusColor(b.severity)}22;color:${getStatusColor(b.severity)}"><span class="badge-dot" style="background:${getStatusColor(b.severity)}"></span>${b.severity}</span></td>
                <td><span class="badge" style="background:${getStatusColor(b.status)}22;color:${getStatusColor(b.status)}"><span class="badge-dot" style="background:${getStatusColor(b.status)}"></span>${b.status}</span></td>
                <td>${b.reportedDate}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

// ── Launch Checklist ───────────────────────
function renderLaunch(el) {
  const lc = APP_DATA.launchChecklist;
  const sections = [{title:"🔧 Pre-Launch",items:lc.preLaunch},{title:"🚀 Launch Day",items:lc.launch},{title:"📈 Post-Launch",items:lc.postLaunch}];

  el.innerHTML = `
    <div class="page-header">
      <h1>🎯 Launch Checklist</h1>
      <p>Everything you need before, during, and after launch</p>
    </div>
    <div class="page-body fade-in">
      ${sections.map(s=>{
        const done = s.items.filter(i=>i.done).length;
        const pct = Math.round(done/s.items.length*100);
        return `<div class="launch-phase">
          <div class="launch-phase-header">
            <div class="launch-phase-title">${s.title}</div>
            <div class="launch-phase-progress">${done}/${s.items.length} complete (${pct}%)</div>
          </div>
          <div style="margin-bottom:12px"><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>
          <div class="card">
            ${s.items.map(item=>`
              <div class="checklist-item">
                <div class="checklist-check ${item.done?'checked':''}"></div>
                <span class="checklist-text ${item.done?'done':''}">${item.task}</span>
                <span class="checklist-cat">${item.cat}</span>
              </div>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

// ── Monetization ───────────────────────────
function renderMonetization(el) {
  const m = APP_DATA.monetization;
  const totalExp = m.expenses.reduce((a,b)=>a+b.v,0);

  el.innerHTML = `
    <div class="page-header">
      <h1>💰 Monetization</h1>
      <p>Revenue, pricing, and financial metrics</p>
    </div>
    <div class="page-body fade-in">
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-label">MRR</div><div class="stat-value">${fmt$(m.mrr)}</div><div class="stat-change up">↑ 50.6%</div></div>
        <div class="stat-card"><div class="stat-label">ARR</div><div class="stat-value">${fmt$(m.arr)}</div></div>
        <div class="stat-card"><div class="stat-label">Total Users</div><div class="stat-value">${fmtN(m.totalUsers)}</div></div>
        <div class="stat-card"><div class="stat-label">Paid Users</div><div class="stat-value">${m.paidUsers}</div><div class="stat-change up">${m.conversionRate}% conversion</div></div>
        <div class="stat-card"><div class="stat-label">Churn Rate</div><div class="stat-value">${m.churnRate}%</div></div>
        <div class="stat-card"><div class="stat-label">LTV / CAC</div><div class="stat-value">${fmt$(m.ltv)} / ${fmt$(m.cac)}</div><div class="stat-change up">${(m.ltv/m.cac).toFixed(1)}x ratio</div></div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title">📈 Revenue Growth</div></div>
          <div class="chart-bars">
            ${m.revenue.map(r=>{
              const maxV=Math.max(...m.revenue.map(x=>x.v));
              return `<div class="chart-bar-wrap">
                <div class="chart-bar" style="height:${r.v/maxV*160}px"><div class="chart-bar-value">${fmt$(r.v)}</div></div>
                <div class="chart-bar-label">${r.m}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
        <div>
          <div class="card" style="margin-bottom:16px">
            <div class="card-header"><div class="card-title">💳 Monthly Expenses</div></div>
            ${m.expenses.map(e=>`
              <div class="expense-item">
                <span class="expense-cat">${e.cat}</span>
                <span class="expense-val">${fmt$(e.v)}/mo</span>
              </div>`).join('')}
            <div class="expense-item" style="border-bottom:none;font-weight:700;color:var(--text-primary)">
              <span>Total</span><span>${fmt$(totalExp)}/mo</span>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title">💎 Net Profit</div></div>
            <div style="text-align:center;padding:16px 0">
              <div style="font-size:36px;font-weight:800;color:var(--green)">${fmt$(m.mrr - totalExp)}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:4px">per month</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ── Init ───────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
