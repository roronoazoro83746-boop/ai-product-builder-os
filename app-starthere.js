// app-starthere.js — Clean Start Here wiring (loads last, no conflicts)


// Re-render sidebar with Start Here added at top
function renderSidebar() {
  document.getElementById('sidebar').innerHTML = `
  <div class="sidebar-header">
    <div class="sidebar-logo"><div class="logo-icon">⚡</div>AI Product Builder OS</div>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-section">
      <div class="nav-section-title">Start</div>
      <div class="nav-item" data-page="starthere" onclick="navigate('starthere')" style="color:var(--green)">
        <span class="icon">👋</span>Start Here
      </div>
      <div class="nav-item" data-page="dashboard" onclick="navigate('dashboard')">
        <span class="icon">📊</span>Dashboard
      </div>
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

// Boot into Start Here on load
document.addEventListener('DOMContentLoaded', () => {
  if (window.appBooted) return;
  window.appBooted = true;
  renderSidebar();
  navigate('starthere');
});
