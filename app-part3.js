// app-part3.js — Monetization + GTM + Schemas + Init

// ── Monetization ──
function renderMonetization(el){
  const m=APP_DATA.monetization;
  const p=m.pricing;
  const totalExp=m.expenses.reduce((a,b)=>a+b.v,0);
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>💰 Monetization</h1><p>Revenue metrics, pricing tiers, and financial health</p></div></div>
  <div class="page-body fade-in">
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-label">MRR</div><div class="stat-value">${fmt$(m.mrr)}</div><div class="stat-change up">↑ 50.6% MoM</div></div>
      <div class="stat-card"><div class="stat-label">ARR</div><div class="stat-value">${fmt$(m.arr)}</div></div>
      <div class="stat-card"><div class="stat-label">Total Users</div><div class="stat-value">${fmtN(m.totalUsers)}</div></div>
      <div class="stat-card"><div class="stat-label">Paid Users</div><div class="stat-value">${m.paidUsers}</div><div class="stat-change up">${m.conversionRate}% conversion</div></div>
      <div class="stat-card"><div class="stat-label">Churn Rate</div><div class="stat-value">${m.churnRate}%</div><div class="stat-change down">Target: &lt;3%</div></div>
      <div class="stat-card"><div class="stat-label">LTV / CAC</div><div class="stat-value" style="font-size:18px">${fmt$(m.ltv)} / ${fmt$(m.cac)}</div><div class="stat-change up">${(m.ltv/m.cac).toFixed(1)}x ratio ✓</div></div>
    </div>

    <div class="grid-2" style="margin-bottom:20px">
      <div class="card">
        <div class="card-header"><div class="card-title">📈 Revenue Growth (MRR)</div></div>
        <div class="chart-bars">
          ${m.revenue.map(r=>{const mx=Math.max(...m.revenue.map(x=>x.v));return`<div class="chart-bar-wrap"><div class="chart-bar" style="height:${r.v/mx*155}px"><div class="chart-bar-value">${fmt$(r.v)}</div></div><div class="chart-bar-label">${r.m}</div></div>`;}).join('')}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="card">
          <div class="card-header"><div class="card-title">💳 Monthly Expenses</div></div>
          ${m.expenses.map(e=>`<div class="expense-item"><span class="expense-cat">${e.cat}</span><span class="expense-val">${fmt$(e.v)}/mo</span></div>`).join('')}
          <div class="expense-item" style="font-weight:700;color:var(--text-primary)"><span>Total</span><span>${fmt$(totalExp)}/mo</span></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">💎 Net Profit</div></div>
          <div style="text-align:center;padding:12px 0">
            <div style="font-size:38px;font-weight:900;color:var(--green)">${fmt$(m.mrr-totalExp)}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:4px">per month · ${Math.round((m.mrr-totalExp)/m.mrr*100)}% margin</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-header" style="margin-top:8px"><div class="section-title">💎 Pricing Tiers</div></div>
    <div class="pricing-grid">
      <div class="pricing-card">
        <div class="pricing-card-name">Free</div>
        <div class="pricing-card-price">$0</div>
        <div class="pricing-card-period">forever · limited features</div>
        ${p.free.features.map(f=>`<div class="pricing-feature"><span class="pricing-feature-icon">✓</span>${f}</div>`).join('')}
        <button class="btn btn-ghost" style="width:100%;margin-top:16px;justify-content:center">Get Free</button>
      </div>
      <div class="pricing-card featured">
        <div class="pricing-card-badge">⭐ Most Popular</div>
        <div class="pricing-card-name">Pro</div>
        <div class="pricing-card-price" style="background:linear-gradient(135deg,var(--accent-light),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent">${fmt$(p.pro.price)}</div>
        <div class="pricing-card-period">per month · cancel anytime</div>
        ${p.pro.features.map(f=>`<div class="pricing-feature"><span class="pricing-feature-icon">✓</span>${f}</div>`).join('')}
        <button class="btn btn-primary" style="width:100%;margin-top:16px;justify-content:center">Start Pro →</button>
      </div>
      <div class="pricing-card">
        <div class="pricing-card-name">Annual Pro</div>
        <div class="pricing-card-price">${fmt$(p.annual.price)}</div>
        <div class="pricing-card-period">per year · save $79 (35% off)</div>
        ${p.annual.features.map(f=>`<div class="pricing-feature"><span class="pricing-feature-icon">✓</span>${f}</div>`).join('')}
        <button class="btn btn-ghost" style="width:100%;margin-top:16px;justify-content:center">Go Annual</button>
      </div>
    </div>
  </div>`;
}

// ── Go-To-Market ──
function renderGTM(el){
  const g=APP_DATA.gtm;
  const channels=[
    {icon:"🛒",name:"Gumroad",desc:"Primary sales channel. Free + Premium tiers.",action:"List product → Set price → Enable affiliate program"},
    {icon:"🐱",name:"Product Hunt",desc:"Launch on Tuesday. Aim for #1 in Productivity.",action:"Schedule for Tue 12:01AM PST → Get 50+ upvotes day 1"},
    {icon:"🐦",name:"Twitter/X",desc:"Build in public. Thread on launch day.",action:"Post daily build updates → Launch thread → Engage replies"},
    {icon:"💼",name:"LinkedIn",desc:"Reach founders and product managers.",action:"Post founder story → Tag relevant communities → DM warm leads"},
    {icon:"💬",name:"Reddit",desc:"r/SideProject, r/Notion, r/Entrepreneur",action:"Provide value first → Share link naturally → Respond to all comments"},
    {icon:"📰",name:"Hacker News",desc:"Show HN post for technical founders.",action:"Post Monday morning → Be present to answer questions all day"}
  ];
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>📣 Go-To-Market</h1><p>Launch strategy, marketing copy, and channel playbook</p></div></div>
  <div class="page-body fade-in">

    <div class="section-header"><div class="section-title">🌍 Channel Strategy</div></div>
    <div class="grid-auto" style="margin-bottom:24px">
      ${channels.map(c=>`<div class="card">
        <div style="font-size:24px;margin-bottom:8px">${c.icon}</div>
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">${c.name}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px">${c.desc}</div>
        <div style="font-size:11px;color:var(--text-muted);background:rgba(0,0,0,0.2);padding:8px 10px;border-radius:6px">${c.action}</div>
      </div>`).join('')}
    </div>

    <div class="section-header"><div class="section-title">💰 Pricing (India + Global)</div></div>
    <div class="grid-2" style="margin-bottom:24px">
      <div class="card"><div class="card-header"><div class="card-title">🇮🇳 India Pricing</div></div>
        <div class="expense-item"><span class="expense-cat">Free Version</span><span class="expense-val">₹0</span></div>
        <div class="expense-item"><span class="expense-cat">Premium (one-time)</span><span class="expense-val">₹799</span></div>
        <div class="expense-item" style="border-bottom:none"><span class="expense-cat">Premium (annual)</span><span class="expense-val">₹2,499/yr</span></div>
      </div>
      <div class="card"><div class="card-header"><div class="card-title">🌍 Global Pricing</div></div>
        <div class="expense-item"><span class="expense-cat">Free Version</span><span class="expense-val">$0</span></div>
        <div class="expense-item"><span class="expense-cat">Premium (one-time)</span><span class="expense-val">$29</span></div>
        <div class="expense-item" style="border-bottom:none"><span class="expense-cat">Premium (annual)</span><span class="expense-val">$149/yr</span></div>
      </div>
    </div>

    <div class="section-header"><div class="section-title">✍️ Marketing Copy</div></div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${[
        {icon:"🛒",title:"Gumroad Product Description",content:g.gumroad.description},
        {icon:"💼",title:"LinkedIn Launch Post",content:g.linkedin},
        {icon:"🐦",title:"Twitter/X Launch Thread Opener",content:g.twitter},
        {icon:"💬",title:"Reddit Post (r/SideProject)",content:g.reddit},
        {icon:"🐱",title:"Product Hunt Tagline + Description",content:`Tagline: ${g.producthunt.tagline}\n\n${g.producthunt.description}`}
      ].map(item=>`
        <div class="gtm-card">
          <div class="gtm-card-header">
            <span style="font-size:18px">${item.icon}</span>
            <div class="gtm-card-title">${item.title}</div>
          </div>
          <div class="gtm-card-body">${item.content}</div>
          <div class="gtm-card-footer">
            <button class="copy-btn" onclick="copyText(\`${item.content.replace(/`/g,"'")}\`)">📋 Copy</button>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

function copyText(text){
  navigator.clipboard.writeText(text).then(()=>showToast('✓ Copied to clipboard!'));
}

// ── DB Schemas ──
function renderSchemas(el){
  const schemaData=[
    {name:"💡 Idea Vault",props:[
      {n:"Title",t:"title"},{n:"Description",t:"rich_text"},{n:"Category",t:"select"},
      {n:"Tags",t:"multi_select"},{n:"Idea Score",t:"number"},{n:"Effort",t:"select"},
      {n:"Market Size",t:"select"},{n:"Status",t:"select"},{n:"AI Prompt",t:"rich_text"},
      {n:"Created",t:"date"},{n:"→ Product",t:"relation"}
    ],views:["Table","Board (Status)","Gallery (Score)"]},
    {name:"🚀 Product Planner",props:[
      {n:"Product Name",t:"title"},{n:"← Idea",t:"relation"},{n:"Stage",t:"select"},
      {n:"Priority",t:"select"},{n:"Target Launch",t:"date"},{n:"Tech Stack",t:"multi_select"},
      {n:"→ Tasks",t:"relation"},{n:"→ Bugs",t:"relation"},{n:"→ Revenue",t:"relation"}
    ],views:["Table","Board (Stage)","Timeline"]},
    {name:"🤖 Prompt Manager",props:[
      {n:"Prompt Title",t:"title"},{n:"Category",t:"select"},{n:"Stage",t:"select"},
      {n:"Prompt Body",t:"rich_text"},{n:"Tags",t:"multi_select"},{n:"Usage Count",t:"number"}
    ],views:["Gallery","Table","Board (Stage)"]},
    {name:"✅ Task Board",props:[
      {n:"Task",t:"title"},{n:"Status",t:"status"},{n:"Priority",t:"select"},
      {n:"← Product",t:"relation"},{n:"Assignee",t:"person"},{n:"Due Date",t:"date"},
      {n:"Tags",t:"multi_select"},{n:"Sprint",t:"number"}
    ],views:["Board (Kanban)","Table","Calendar"]},
    {name:"🐛 Bug Tracker",props:[
      {n:"Bug Title",t:"title"},{n:"Severity",t:"select"},{n:"Status",t:"select"},
      {n:"← Product",t:"relation"},{n:"Description",t:"rich_text"},{n:"Steps",t:"rich_text"},
      {n:"Expected",t:"rich_text"},{n:"Actual",t:"rich_text"},{n:"Reported Date",t:"date"}
    ],views:["Table","Board (Severity)","Board (Status)"]},
    {name:"🎯 Launch Checklist",props:[
      {n:"Task",t:"title"},{n:"Phase",t:"select"},{n:"Category",t:"select"},
      {n:"Done",t:"checkbox"},{n:"← Product",t:"relation"},{n:"Notes",t:"rich_text"}
    ],views:["Table","Board (Phase)","Board (Category)"]},
    {name:"💰 Monetization",props:[
      {n:"Month",t:"date"},{n:"← Product",t:"relation"},{n:"MRR",t:"number ($)"},
      {n:"ARR",t:"number ($)"},{n:"Total Users",t:"number"},{n:"Paid Users",t:"number"},
      {n:"Churn Rate",t:"number (%)"},{n:"Conversion",t:"number (%)"},{n:"LTV",t:"number ($)"},{n:"CAC",t:"number ($)"}
    ],views:["Table","Chart"]}
  ];
  el.innerHTML=`
  <div class="page-header"><div class="page-header-left"><h1>🗄️ Database Schemas</h1><p>Notion-ready schemas for all 7 modules — copy and implement directly</p></div></div>
  <div class="page-body fade-in">
    <div class="schema-grid">
      ${schemaData.map(s=>`
        <div class="schema-card">
          <div class="schema-card-header"><div class="schema-card-name">${s.name}</div></div>
          ${s.props.map(p=>`<div class="schema-prop"><span class="schema-prop-name">${p.n}</span><span class="schema-prop-type">${p.t}</span></div>`).join('')}
          <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border)">
            <div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px">Views</div>
            <div style="display:flex;gap:5px;flex-wrap:wrap">
              ${s.views.map(v=>`<span style="font-size:10px;padding:2px 8px;border-radius:4px;background:rgba(6,182,212,0.1);color:var(--cyan)">${v}</span>`).join('')}
            </div>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

// ── Init ──
// Boot initialization has been moved to app-starthere.js to prevent duplicate rendering

