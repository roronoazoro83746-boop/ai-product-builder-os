// app-kanban-interaction.js — Click-to-move Kanban + Task counter badges

// Override renderTasks with interactive version
function renderTasks(el){
  const cols=["To Do","In Progress","Done","Backlog"];
  const td=APP_DATA.tasks.filter(t=>t.status==='Done').length;
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>✅ Task Board</h1><p>Click a card to move it between columns · ${td}/${APP_DATA.tasks.length} tasks complete</p></div>
    <button class="btn btn-ghost" onclick="resetTasks()" style="font-size:11px">↺ Reset</button>
  </div>
  <div class="page-body fade-in">
    <div class="stats-grid" style="margin-bottom:20px" id="task-stats"></div>
    <div class="kanban" id="kanban-board"></div>
  </div>`;
  renderKanban();
  renderTaskStats();
}

function renderTaskStats(){
  const cols=["To Do","In Progress","Done","Backlog"];
  document.getElementById('task-stats').innerHTML=cols.map(c=>{
    const n=APP_DATA.tasks.filter(t=>t.status===c).length;
    return`<div class="stat-card"><div class="stat-label">${c}</div><div class="stat-value" style="color:${getStatusColor(c)}">${n}</div></div>`;
  }).join('');
}

function renderKanban(){
  const cols=["To Do","In Progress","Done","Backlog"];
  const board=document.getElementById('kanban-board');
  if(!board)return;
  board.innerHTML=cols.map(col=>{
    const items=APP_DATA.tasks.filter(t=>t.status===col);
    return`<div class="kanban-column" id="col-${col.replace(/\s+/g,'-')}">
      <div class="kanban-col-header">
        <div class="kanban-col-title"><span class="badge-dot" style="background:${getStatusColor(col)};display:inline-block;margin-right:4px"></span>${col}</div>
        <span class="kanban-col-count" id="count-${col.replace(/\s+/g,'-')}">${items.length}</span>
      </div>
      ${items.map(t=>buildKanbanCard(t,col,cols)).join('')}
    </div>`;
  }).join('');
}

function buildKanbanCard(t,currentCol,cols){
  const idx=cols.indexOf(currentCol);
  const prevCol=idx>0?cols[idx-1]:null;
  const nextCol=idx<cols.length-1?cols[idx+1]:null;
  return`<div class="kanban-card" id="card-${t.id}">
    <div class="kanban-card-title">${t.title}</div>
    <div class="kanban-card-meta" style="margin-bottom:8px">
      <span class="badge" style="background:${getStatusColor(t.priority)}22;color:${getStatusColor(t.priority)};font-size:10px">${t.priority}</span>
      ${t.tags.map(tg=>`<span class="kanban-tag">${tg}</span>`).join('')}
      ${t.dueDate?`<span style="font-size:10px;color:var(--text-muted);margin-left:auto">📅 ${t.dueDate.slice(5)}</span>`:''}
    </div>
    <div class="kanban-move-btns" style="display:flex;gap:5px;border-top:1px solid rgba(255,255,255,0.06);padding-top:8px">
      ${prevCol?`<button class="move-btn" onclick="moveTask('${t.id}','${prevCol}')" title="Move to ${prevCol}">← ${prevCol}</button>`:'<span></span>'}
      ${nextCol?`<button class="move-btn move-btn-fwd" onclick="moveTask('${t.id}','${nextCol}')" title="Move to ${nextCol}">${nextCol} →</button>`:''}
    </div>
  </div>`;
}

function moveTask(id,newStatus){
  const task=APP_DATA.tasks.find(t=>t.id===id);
  if(!task)return;
  task.status=newStatus;
  renderKanban();
  renderTaskStats();
  showToast(`✓ Moved to "${newStatus}"`);
  // Also update dashboard badge
  const badge=document.querySelector('.nav-item[data-page="tasks"] .nav-badge');
  if(badge)badge.textContent=APP_DATA.tasks.filter(t=>t.status==='In Progress').length||'';
}

function resetTasks(){
  const orig=["Done","Done","Done","In Progress","In Progress","To Do","To Do","To Do","To Do","Backlog"];
  APP_DATA.tasks.forEach((t,i)=>{if(orig[i])t.status=orig[i];});
  renderKanban();renderTaskStats();showToast('✓ Board reset');
}

// ── Add move-btn styles dynamically ──
(function injectMoveStyles(){
  const s=document.createElement('style');
  s.textContent=`
    .move-btn{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:var(--text-muted);font-size:10px;font-weight:600;padding:3px 9px;border-radius:5px;cursor:pointer;transition:all 0.15s;white-space:nowrap;}
    .move-btn:hover{background:rgba(124,92,252,0.15);border-color:var(--accent);color:var(--accent-light);}
    .move-btn-fwd{margin-left:auto;}
    .kanban-card{transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s;}
  `;
  document.head.appendChild(s);
})();
