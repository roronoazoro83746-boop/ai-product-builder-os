// app-part1.js — Navigation + Dashboard + Ideas + Planner
let currentPage='dashboard';

function init(){renderSidebar();navigate('dashboard');}

function navigate(page){
  currentPage=page;
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.page===page));
  const m=document.getElementById('main-content');
  ({dashboard:renderDashboard,ideas:renderIdeas,planner:renderPlanner,
    prompts:renderPrompts,tasks:renderTasks,bugs:renderBugs,
    launch:renderLaunch,monetization:renderMonetization,
    gtm:renderGTM,schemas:renderSchemas}[page]||renderDashboard)(m);
}

function renderSidebar(){
  document.getElementById('sidebar').innerHTML=`
  <div class="sidebar-header">
    <div class="sidebar-logo"><div class="logo-icon">⚡</div>AI Product Builder OS</div>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section">
      <div class="nav-section-title">Overview</div>
      <div class="nav-item active" data-page="dashboard" onclick="navigate('dashboard')"><span class="icon">📊</span>Dashboard</div>
    </div>
    <div class="nav-section">
      <div class="nav-section-title">Build</div>
      <div class="nav-item" data-page="ideas" onclick="navigate('ideas')"><span class="icon">💡</span>Idea Vault<span class="nav-badge">${APP_DATA.ideas.length}</span></div>
      <div class="nav-item" data-page="planner" onclick="navigate('planner')"><span class="icon">🚀</span>Product Planner</div>
      <div class="nav-item" data-page="prompts" onclick="navigate('prompts')"><span class="icon">🤖</span>Prompt Library<span class="nav-badge">${APP_DATA.prompts.length}</span></div>
      <div class="nav-item" data-page="tasks" onclick="navigate('tasks')"><span class="icon">✅</span>Task Board</div>
      <div class="nav-item" data-page="bugs" onclick="navigate('bugs')"><span class="icon">🐛</span>Bug Tracker<span class="nav-badge">${APP_DATA.bugs.filter(b=>b.status==='Open').length}</span></div>
    </div>
    <div class="nav-section">
      <div class="nav-section-title">Ship</div>
      <div class="nav-item" data-page="launch" onclick="navigate('launch')"><span class="icon">🎯</span>Launch Checklist</div>
      <div class="nav-item" data-page="monetization" onclick="navigate('monetization')"><span class="icon">💰</span>Monetization</div>
    </div>
    <div class="nav-section">
      <div class="nav-section-title">Strategy</div>
      <div class="nav-item" data-page="gtm" onclick="navigate('gtm')"><span class="icon">📣</span>Go-To-Market</div>
      <div class="nav-item" data-page="schemas" onclick="navigate('schemas')"><span class="icon">🗄️</span>DB Schemas</div>
    </div>
  </nav>
  <div class="sidebar-footer">v2.0 · All 7 Phases Complete</div>`;
}

// ── Helpers ──
function badge(s){return`<span class="badge" style="background:${getStatusColor(s)}22;color:${getStatusColor(s)}"><span class="badge-dot" style="background:${getStatusColor(s)}"></span>${s}</span>`;}
function tag(t){return`<span class="kanban-tag">${t}</span>`;}

// ── Dashboard ──
function renderDashboard(el){
  const d=APP_DATA;
  const td=d.tasks.filter(t=>t.status==='Done').length,tt=d.tasks.length;
  const cd=d.launchChecklist.preLaunch.filter(c=>c.done).length,ct=d.launchChecklist.preLaunch.length;
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>📊 Dashboard</h1><p>Your AI product building command center</p></div></div>
  <div class="page-body fade-in">
    <div class="welcome-banner">
      <h2>Welcome back, Builder! 🚀</h2>
      <p>${d.tasks.filter(t=>t.status==='In Progress').length} tasks in progress · ${d.bugs.filter(b=>b.status==='Open').length} open bugs · ${d.ideas.filter(i=>i.status==='Validated').length} ideas validated</p>
    </div>
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-label">Active Ideas</div><div class="stat-value">${d.ideas.length}</div><div class="stat-change up">↑ ${d.ideas.filter(i=>i.status==='Validated').length} validated</div></div>
      <div class="stat-card"><div class="stat-label">Tasks Progress</div><div class="stat-value">${td}/${tt}</div><div style="margin-top:8px"><div class="progress-bar"><div class="progress-fill" style="width:${td/tt*100}%"></div></div></div></div>
      <div class="stat-card"><div class="stat-label">Monthly Revenue</div><div class="stat-value">${fmt$(d.monetization.mrr)}</div><div class="stat-change up">↑ 50.6% MoM</div></div>
      <div class="stat-card"><div class="stat-label">Launch Ready</div><div class="stat-value">${Math.round(cd/ct*100)}%</div><div style="margin-top:8px"><div class="progress-bar"><div class="progress-fill" style="width:${cd/ct*100}%"></div></div></div></div>
      <div class="stat-card"><div class="stat-label">Prompt Library</div><div class="stat-value">${d.prompts.length}</div><div class="stat-change up">↑ 12 templates ready</div></div>
      <div class="stat-card"><div class="stat-label">Open Bugs</div><div class="stat-value" style="color:var(--red)">${d.bugs.filter(b=>b.status==='Open').length}</div><div class="stat-change down">Needs attention</div></div>
    </div>
    <div class="grid-2" style="margin-bottom:20px">
      <div class="card">
        <div class="card-header"><div class="card-title">🗺️ Roadmap</div></div>
        ${d.roadmap.map((r,i)=>`
          <div class="roadmap-item">
            <div class="roadmap-marker"><div class="roadmap-dot ${r.status==='Done'?'done':''}"></div>${i<d.roadmap.length-1?'<div class="roadmap-line"></div>':''}</div>
            <div class="roadmap-content"><div class="roadmap-phase">${r.phase}</div><div class="roadmap-timeline">${r.timeline}</div><div class="roadmap-goals">${r.goals}</div></div>
            ${badge(r.status)}
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">📈 Revenue Growth</div></div>
        <div class="chart-bars">
          ${d.monetization.revenue.map(r=>{const mx=Math.max(...d.monetization.revenue.map(x=>x.v));return`<div class="chart-bar-wrap"><div class="chart-bar" style="height:${r.v/mx*155}px"><div class="chart-bar-value">${fmt$(r.v)}</div></div><div class="chart-bar-label">${r.m}</div></div>`;}).join('')}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">⚡ Recent Tasks</div><button class="btn btn-ghost" onclick="navigate('tasks')">View All →</button></div>
      <table class="data-table"><thead><tr><th>Task</th><th>Status</th><th>Priority</th><th>Due</th></tr></thead><tbody>
      ${d.tasks.slice(0,5).map(t=>`<tr><td style="color:var(--text-primary);font-weight:500">${t.title}</td><td>${badge(t.status)}</td><td>${badge(t.priority)}</td><td style="font-size:12px">${t.dueDate||'—'}</td></tr>`).join('')}
      </tbody></table>
    </div>
  </div>`;
}

// ── Idea Vault ──
function renderIdeas(el){
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>💡 Idea Vault</h1><p>Score, validate, and prioritize product ideas</p></div></div>
  <div class="page-body fade-in">
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-label">Total Ideas</div><div class="stat-value">${APP_DATA.ideas.length}</div></div>
      <div class="stat-card"><div class="stat-label">Validated</div><div class="stat-value" style="color:var(--green)">${APP_DATA.ideas.filter(i=>i.status==='Validated').length}</div></div>
      <div class="stat-card"><div class="stat-label">Building</div><div class="stat-value" style="color:var(--yellow)">${APP_DATA.ideas.filter(i=>i.status==='Building').length}</div></div>
      <div class="stat-card"><div class="stat-label">Avg Score</div><div class="stat-value">${Math.round(APP_DATA.ideas.reduce((a,b)=>a+b.score,0)/APP_DATA.ideas.length)}</div></div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead><tr><th>Idea</th><th>Category</th><th>Score</th><th>Effort</th><th>Market</th><th>Revenue Model</th><th>Status</th></tr></thead>
        <tbody>
        ${APP_DATA.ideas.map(i=>`<tr>
          <td><div style="font-weight:600;color:var(--text-primary)">${i.title}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px">${i.description}</div></td>
          <td>${tag(i.category)}</td>
          <td><div class="idea-score-bar"><span class="idea-score-num" style="color:${i.score>=85?'var(--green)':i.score>=70?'var(--yellow)':'var(--text-muted)'}">${i.score}</span><div class="progress-bar" style="width:55px"><div class="progress-fill" style="width:${i.score}%;background:${i.score>=85?'var(--green)':i.score>=70?'var(--yellow)':'var(--text-muted)'}"></div></div></div></td>
          <td><span style="font-size:12px">${i.effort}</span></td>
          <td><span style="font-size:12px">${i.market}</span></td>
          <td style="font-size:12px;color:var(--green)">${i.revenue}</td>
          <td>${badge(i.status)}</td>
        </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ── Product Planner ──
function renderPlanner(el){
  const r=APP_DATA.roadmap;
  const features=[
    {n:"Resume Upload & Parse",p:"Must-have",s:1,st:"Done"},
    {n:"Job Description Matching",p:"Must-have",s:1,st:"In Progress"},
    {n:"AI Rewrite Engine",p:"Must-have",s:2,st:"In Progress"},
    {n:"ATS Score Checker",p:"Must-have",s:2,st:"To Do"},
    {n:"PDF Export",p:"Must-have",s:3,st:"To Do"},
    {n:"Cover Letter Generator",p:"Nice-to-have",s:3,st:"To Do"},
    {n:"LinkedIn Import",p:"Nice-to-have",s:null,st:"Backlog"},
    {n:"Analytics Dashboard",p:"Nice-to-have",s:null,st:"Backlog"}
  ];
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>🚀 Product Planner</h1><p>Roadmap, features, and tech stack for AI Resume Optimizer</p></div></div>
  <div class="page-body fade-in">
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-label">Total Features</div><div class="stat-value">${features.length}</div></div>
      <div class="stat-card"><div class="stat-label">Completed</div><div class="stat-value" style="color:var(--green)">${features.filter(f=>f.st==='Done').length}</div></div>
      <div class="stat-card"><div class="stat-label">In Progress</div><div class="stat-value" style="color:var(--yellow)">${features.filter(f=>f.st==='In Progress').length}</div></div>
      <div class="stat-card"><div class="stat-label">Target Launch</div><div class="stat-value" style="font-size:18px">Jun 15</div></div>
    </div>
    <div class="grid-2" style="margin-bottom:20px">
      <div class="card">
        <div class="card-header"><div class="card-title">🗺️ Roadmap Phases</div></div>
        ${r.map((item,i)=>`<div class="roadmap-item"><div class="roadmap-marker"><div class="roadmap-dot ${item.status==='Done'?'done':''}"></div>${i<r.length-1?'<div class="roadmap-line"></div>':''}</div><div class="roadmap-content"><div class="roadmap-phase">${item.phase}</div><div class="roadmap-timeline">${item.timeline}</div><div class="roadmap-goals">${item.goals}</div></div>${badge(item.status)}</div>`).join('')}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">🛠️ Tech Stack</div></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
          ${["Next.js 14","TypeScript","OpenAI GPT-4","Supabase","Vercel","Stripe","pdf-parse","React PDF"].map(t=>`<span class="kanban-tag" style="font-size:12px;padding:5px 12px">${t}</span>`).join('')}
        </div>
        <div class="card-header" style="margin-top:16px"><div class="card-title">📊 Sprint Progress</div></div>
        ${[1,2,3].map(s=>{const sf=features.filter(f=>f.s===s);const done=sf.filter(f=>f.st==='Done').length;return`<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Sprint ${s}</span><span style="color:var(--text-muted)">${done}/${sf.length} done</span></div><div class="progress-bar"><div class="progress-fill" style="width:${sf.length?done/sf.length*100:0}%"></div></div></div>`;}).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">📋 Feature Breakdown</div></div>
      <table class="data-table"><thead><tr><th>Feature</th><th>Priority</th><th>Sprint</th><th>Status</th></tr></thead><tbody>
      ${features.map(f=>`<tr><td style="color:var(--text-primary);font-weight:500">${f.n}</td><td>${tag(f.p)}</td><td style="font-size:12px">${f.s||'—'}</td><td>${badge(f.st)}</td></tr>`).join('')}
      </tbody></table>
    </div>
  </div>`;
}
