// app-part1.js — Navigation + Dashboard + Ideas + Planner
let currentPage='dashboard';

// Global error boundary wrapper for renderers
function withErrorBoundary(renderFn, name) {
  return function(el) {
    try {
      if (typeof renderFn === 'function') {
        renderFn(el);
      } else {
        throw new Error(`${name} is not a function`);
      }
    } catch (e) {
      console.error(`Error rendering ${name}:`, e);
      el.innerHTML = `<div style="padding:40px;text-align:center;color:var(--red)"><div style="font-size:32px;margin-bottom:12px">⚠️</div><h3>Failed to load ${name}</h3><p style="font-size:12px;color:var(--text-muted);margin-top:8px">${e.message}</p></div>`;
    }
  };
}

const routes = {
  dashboard: 'renderDashboard',
  ideas: 'renderIdeas',
  planner: 'renderPlanner',
  prompts: 'renderPrompts',
  tasks: 'renderTasks',
  bugs: 'renderBugs',
  launch: 'renderLaunch',
  monetization: 'renderMonetization',
  gtm: 'renderGTM',
  schemas: 'renderSchemas',
  starthere: 'renderStartHere' // Added explicit support for Start Here
};

// Expose navigate on window safely
window.navigate = function(page){
  if (!routes[page]) page = 'dashboard';
  currentPage=page;
  
  document.querySelectorAll('.nav-item').forEach(n=>{
    n.classList.toggle('active',n.dataset.page===page);
  });
  
  const m=document.getElementById('main-content');
  if (!m) return;
  
  const renderFnName = routes[page];
  const renderFn = window[renderFnName];
  
  // Render with error boundaries
  withErrorBoundary(renderFn, renderFnName)(m);
  
  // Inject outcome messaging (from app-polish)
  setTimeout(()=>{
    if (window.OUTCOME_COPY && window.OUTCOME_COPY[page]) {
      const subEl = document.querySelector('.page-header-left p');
      if(subEl) subEl.textContent = window.OUTCOME_COPY[page];
    }
  }, 10);
}

function init(){
  renderSidebar();
  navigate('dashboard');
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
  const mrr=d.monetization.mrr;
  const activeIdeas=d.ideas.filter(i=>i.status==='Building').length;
  const launchReady=Math.round(cd/ct*100)||0;
  
  const sparks = () => Array.from({length: 12}, () => Math.floor(Math.random() * 70 + 30));
  const sparklineHTML = () => `<div class="sparkline">${sparks().map(v => `<div class="spark-bar" style="height:${v}%"></div>`).join('')}</div>`;

  el.innerHTML=`
  <div class="premium-dashboard fade-in">
    <!-- HERO SECTION -->
    <div class="hero-glass">
      <div class="hero-content">
        <div>
          <div class="hero-title">Your startup operating system.</div>
          <div class="hero-subtitle">Welcome back, Founder. Momentum is high this week. You have ${d.tasks.filter(t=>t.status==='In Progress').length} tasks in progress.</div>
          <div class="hero-actions">
            <button class="btn-glass btn-glow" onclick="navigate('ideas')"><span style="font-size:16px">+</span> New Idea</button>
            <button class="btn-glass" onclick="navigate('planner')">🚀 Launch Product</button>
            <button class="btn-glass" onclick="navigate('prompts')">🤖 Generate Prompt</button>
            <button class="btn-glass" onclick="navigate('monetization')">📊 View Analytics</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="momentum-score">87<span style="font-size:24px;color:#888;text-shadow:none">/100</span></div>
          <div style="font-size:12px;font-weight:700;color:#aaa;text-transform:uppercase;letter-spacing:1.5px">Weekly Momentum</div>
        </div>
      </div>
    </div>

    <!-- ADVANCED METRICS GRID -->
    <div class="premium-grid">
      <div class="glass-card stat-hover">
        <div class="stat-header"><div class="stat-title">Monthly Revenue</div><div class="stat-icon">💰</div></div>
        <div class="stat-value">${fmt$(mrr)} <span class="stat-trend">+14%</span></div>
        ${sparklineHTML()}
      </div>
      <div class="glass-card stat-hover">
        <div class="stat-header"><div class="stat-title">Active Products</div><div class="stat-icon">🚀</div></div>
        <div class="stat-value">${activeIdeas} <span class="stat-trend" style="background:rgba(245,158,11,0.1);color:#f59e0b">+2</span></div>
        ${sparklineHTML()}
      </div>
      <div class="glass-card stat-hover">
        <div class="stat-header"><div class="stat-title">Launch Readiness</div><div class="stat-icon">🎯</div></div>
        <div class="stat-value">${launchReady}% <span class="stat-trend">+5%</span></div>
        <div class="progress-bar" style="margin-top:20px;background:rgba(255,255,255,0.1);height:8px;border-radius:4px">
          <div class="progress-fill" style="width:${launchReady}%;background:linear-gradient(90deg,var(--neon-purple),var(--neon-blue));height:100%;border-radius:4px;box-shadow:0 0 12px var(--neon-blue)"></div>
        </div>
      </div>
      <div class="glass-card stat-hover">
        <div class="stat-header"><div class="stat-title">Tasks Completed</div><div class="stat-icon">✅</div></div>
        <div class="stat-value">${td}/${tt} <span class="stat-trend">+12</span></div>
        ${sparklineHTML()}
      </div>
    </div>

    <!-- MAIN LAYOUT 2 COL -->
    <div class="layout-2-col">
      <!-- BEAUTIFUL ANALYTICS SECTION -->
      <div class="glass-card flex-col">
        <div class="stat-header" style="margin-bottom:12px">
          <div class="stat-title" style="font-size:14px;color:#fff">Revenue Growth (MRR)</div>
          <div class="legend">
            <span><span class="legend-dot purple"></span> Target</span>
            <span><span class="legend-dot blue"></span> Actual</span>
          </div>
        </div>
        <div class="chart-premium">
          ${d.monetization.revenue.map(r=>{
            const mx=Math.max(...d.monetization.revenue.map(x=>x.v));
            const h = (r.v/mx*100);
            return `
            <div class="chart-col">
              <div class="chart-bar-container">
                <div class="bar-premium" style="height:${h}%">
                  <div class="bar-val">${fmt$(r.v)}</div>
                </div>
              </div>
              <div class="chart-label">${r.m}</div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- AI INSIGHTS PANEL -->
      <div class="glass-card ai-panel">
        <div class="ai-header">
          <div class="ai-indicator"></div>
          <div style="font-size:16px;font-weight:700;color:#fff">AI Founder Insights</div>
        </div>
        <div class="insight-list">
          <div class="insight-item">
            <div class="insight-title">Launch Readiness Increased</div>
            <div class="insight-desc">You completed 5 pre-launch tasks this week. Readiness is up 14%.</div>
          </div>
          <div class="insight-item">
            <div class="insight-title">Templates Outperforming</div>
            <div class="insight-desc">Your "Feature Brainstorm" prompt has been used ${d.prompts[0]?.uses || 0} times. Highly effective.</div>
          </div>
          <div class="insight-item">
            <div class="insight-title">Optimal Launch Window</div>
            <div class="insight-desc">Historical data suggests Tuesday 10AM PST maximizes Product Hunt engagement.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="layout-2-col" style="grid-template-columns: 1fr 2fr">
      <!-- SMART PRODUCTIVITY PANEL -->
      <div class="glass-card flex-col" style="justify-content:center">
        <div class="stat-header"><div class="stat-title">Shipping Velocity</div></div>
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <path class="circle circle-purple" stroke-dasharray="${launchReady}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <path class="circle circle-blue" stroke-dasharray="${td/tt*100}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          <text x="18" y="21.5" class="percentage">🚀</text>
        </svg>
        <div style="text-align:center;margin-top:20px">
          <div style="font-size:28px;font-weight:900;color:#fff;letter-spacing:-1px">8 Days</div>
          <div style="font-size:12px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:1px">until target launch</div>
        </div>
      </div>

      <!-- ACTIVITY TIMELINE -->
      <div class="glass-card">
        <div class="stat-header"><div class="stat-title">Live Founder Activity</div></div>
        <div class="timeline">
          <div class="feed-item">
            <div class="feed-dot blue-dot"></div>
            <div class="feed-time">Just now</div>
            <div class="feed-content">Completed task <strong style="color:#fff">"Setup Stripe Webhooks"</strong></div>
          </div>
          <div class="feed-item">
            <div class="feed-dot purple-dot"></div>
            <div class="feed-time">2 hours ago</div>
            <div class="feed-content">New idea <strong style="color:#fff">"AI Video Editor"</strong> scored 85. Validated.</div>
          </div>
          <div class="feed-item">
            <div class="feed-dot"></div>
            <div class="feed-time">Yesterday</div>
            <div class="feed-content">Squashed bug <strong style="color:#fff">"OAuth login failing on Safari"</strong></div>
          </div>
          <div class="feed-item">
            <div class="feed-dot green-dot"></div>
            <div class="feed-time">2 days ago</div>
            <div class="feed-content">Milestone reached: <strong style="color:#10b981">Crossed $5,000 MRR! 🎉</strong></div>
          </div>
        </div>
      </div>
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
