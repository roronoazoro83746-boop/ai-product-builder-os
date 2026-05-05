// AI Product Builder OS — Complete Data Layer (v2)
const APP_DATA = {
  ideas: [
    { id:"IDEA-001", title:"AI Resume Optimizer", description:"SaaS that rewrites resumes using GPT to match JDs and pass ATS.", category:"SaaS", tags:["AI","HR Tech","B2C"], score:92, effort:"Medium", market:"Large", status:"Validated", createdAt:"2026-04-10", revenue:"$29/mo", competitors:"Rezi, Kickresume" },
    { id:"IDEA-002", title:"Micro-SaaS Invoice Generator", description:"Invoicing for freelancers with auto-tax calculation and PDF export.", category:"Micro-SaaS", tags:["Finance","Freelancers"], score:78, effort:"Low", market:"Medium", status:"Exploring", createdAt:"2026-04-15", revenue:"$9/mo", competitors:"Wave, FreshBooks" },
    { id:"IDEA-003", title:"AI Thumbnail Maker", description:"YouTube thumbnails via AI with text overlay and A/B testing.", category:"Creator Tool", tags:["AI","YouTube","Design"], score:85, effort:"High", market:"Large", status:"Building", createdAt:"2026-04-20", revenue:"$19/mo", competitors:"Canva, Thumbnail.ai" },
    { id:"IDEA-004", title:"Habit Tracker + AI Coach", description:"Mobile-first habit app with AI-powered coaching and insights.", category:"Mobile App", tags:["Health","AI"], score:71, effort:"High", market:"Medium", status:"Exploring", createdAt:"2026-04-25", revenue:"$4.99/mo", competitors:"Habitica, Streaks" },
    { id:"IDEA-005", title:"Notion Template Marketplace", description:"Curated marketplace for premium Notion templates with reviews.", category:"Marketplace", tags:["Notion","Templates"], score:88, effort:"Medium", market:"Large", status:"Validated", createdAt:"2026-05-01", revenue:"15% commission", competitors:"Gumroad, Etsy" }
  ],
  tasks: [
    { id:"TASK-001", title:"Set up Next.js project with TypeScript", status:"Done", priority:"High", dueDate:"2026-05-01", tags:["setup"], sprint:1 },
    { id:"TASK-002", title:"Design Supabase database schema", status:"Done", priority:"High", dueDate:"2026-05-03", tags:["backend"], sprint:1 },
    { id:"TASK-003", title:"Build resume upload component", status:"Done", priority:"High", dueDate:"2026-05-05", tags:["frontend"], sprint:1 },
    { id:"TASK-004", title:"Integrate OpenAI API for resume rewrite", status:"In Progress", priority:"High", dueDate:"2026-05-08", tags:["AI","backend"], sprint:2 },
    { id:"TASK-005", title:"Build ATS score algorithm", status:"In Progress", priority:"Medium", dueDate:"2026-05-10", tags:["AI"], sprint:2 },
    { id:"TASK-006", title:"Create PDF export service", status:"To Do", priority:"Medium", dueDate:"2026-05-12", tags:["backend"], sprint:2 },
    { id:"TASK-007", title:"Design landing page", status:"To Do", priority:"Medium", dueDate:"2026-05-14", tags:["frontend","design"], sprint:3 },
    { id:"TASK-008", title:"Set up Stripe integration", status:"To Do", priority:"High", dueDate:"2026-05-15", tags:["payments"], sprint:3 },
    { id:"TASK-009", title:"Write API documentation", status:"To Do", priority:"Low", dueDate:"2026-05-18", tags:["docs"], sprint:3 },
    { id:"TASK-010", title:"Set up CI/CD pipeline", status:"Backlog", priority:"Low", dueDate:null, tags:["devops"], sprint:null }
  ],
  bugs: [
    { id:"BUG-001", title:"Resume parser fails on multi-column PDFs", severity:"High", status:"Open", reportedDate:"2026-05-03", description:"Two-column layout causes merged/interleaved text output.", steps:"Upload 2-col PDF → View parsed output → Text is jumbled", expected:"Columns parsed in reading order", actual:"Left/right columns interleaved" },
    { id:"BUG-002", title:"AI rewrite exceeds token limit on 3+ page resumes", severity:"Medium", status:"In Progress", reportedDate:"2026-05-04", description:"Entire resume sent as one prompt, hitting the 4096-token limit.", steps:"Upload 3+ page resume → Click Optimize → Token error", expected:"Resume chunked and processed in parts", actual:"Single prompt fails with token error" },
    { id:"BUG-003", title:"Mobile upload zone overflows on small screens", severity:"Low", status:"Open", reportedDate:"2026-05-05", description:"Drag-and-drop zone extends beyond viewport on screens < 375px.", steps:"Open on iPhone SE → Go to upload page → Horizontal scroll appears", expected:"Responsive upload zone", actual:"Zone cut off, horizontal scroll" }
  ],
  prompts: [
    { id:"P-001", title:"Feature Brainstorm", category:"Ideation", stage:"Idea", uses:47, prompt:"I'm building a [PRODUCT TYPE] for [TARGET AUDIENCE].\n\nGenerate 20 feature ideas organized by:\n- Must-have (MVP)\n- Should-have (v2)\n- Nice-to-have (v3)\n\nFor each feature include:\n1. One-line description\n2. Estimated effort (Low/Medium/High)\n3. User value score (1-10)\n\nFocus on solving real pain points, not flashy features." },
    { id:"P-002", title:"Market Validation", category:"Ideation", stage:"Idea", uses:31, prompt:"I want to validate this product idea: [IDEA DESCRIPTION]\n\nProvide:\n1. Target audience analysis (who exactly)\n2. Top 5 competitors + their pricing\n3. Market gaps and opportunities\n4. 3 ways to validate this idea in 7 days (no code)\n5. Go/No-go recommendation with reasoning\n\nBe brutally honest." },
    { id:"P-003", title:"Landing Page Copy", category:"Frontend", stage:"Build", uses:34, prompt:"Write a conversion-optimized landing page for [PRODUCT NAME], a [DESCRIPTION] for [AUDIENCE].\n\nInclude:\n1. Hero headline (max 10 words, benefit-focused)\n2. Subheadline (max 25 words)\n3. 3 feature sections (icon + title + 2-line description)\n4. Social proof section (3 testimonial templates)\n5. Pricing section copy\n6. FAQ (5 objection-handling questions)\n7. CTA button text options (give 5 variations)\n\nTone: [professional/casual/bold]. Write to convert, not to impress." },
    { id:"P-004", title:"API Architecture", category:"Backend", stage:"Build", uses:28, prompt:"Design a production-ready REST API for [PRODUCT NAME].\n\nInclude:\n1. All endpoints with HTTP methods and paths\n2. Request/Response JSON schemas\n3. JWT authentication flow\n4. Rate limiting strategy\n5. Error handling patterns with status codes\n6. PostgreSQL database schema (tables + columns + types)\n7. Environment variables needed\n\nFormat as OpenAPI 3.0 where possible." },
    { id:"P-005", title:"React Component Generator", category:"Frontend", stage:"Build", uses:52, prompt:"Build a React component for [COMPONENT NAME].\n\nRequirements:\n- Framework: [Next.js/React + Vite]\n- Styling: [TailwindCSS/CSS Modules/styled-components]\n- TypeScript: Yes\n- State: [useState/Zustand/Redux]\n\nComponent should:\n[DESCRIBE WHAT IT DOES]\n\nInclude:\n1. Full component code\n2. TypeScript interfaces/types\n3. Usage example\n4. Edge cases handled" },
    { id:"P-006", title:"Bug Investigation", category:"Debugging", stage:"Build", uses:89, prompt:"I have a bug in my [FRAMEWORK] app. Help me debug it.\n\nError:\n```\n[PASTE ERROR MESSAGE HERE]\n```\n\nContext:\n- What I was doing: [ACTION]\n- What happened: [UNEXPECTED RESULT]\n- Tech stack: [STACK]\n- Recent changes: [WHAT CHANGED]\n\nPlease:\n1. Identify root cause\n2. Provide exact fix with code\n3. Explain why this happened\n4. Suggest prevention strategy" },
    { id:"P-007", title:"Performance Audit", category:"Debugging", stage:"Build", uses:19, prompt:"Audit the performance of my [TYPE] app.\n\nCurrent metrics:\n- Lighthouse score: [SCORE]\n- LCP: [TIME]\n- FID: [TIME]\n- CLS: [SCORE]\n\nCode snippets with issues:\n[PASTE CODE]\n\nProvide:\n1. Top 5 performance bottlenecks identified\n2. Specific fixes with code examples\n3. Expected improvement after each fix\n4. Tools to monitor ongoing performance" },
    { id:"P-008", title:"Product Hunt Launch Post", category:"Launch", stage:"Launch", uses:15, prompt:"Write a complete Product Hunt launch package for [PRODUCT NAME].\n\nProduct: [DESCRIPTION]\nTarget user: [AUDIENCE]\nKey differentiator: [WHAT MAKES IT UNIQUE]\n\nDeliver:\n1. Tagline (max 60 chars, punchy)\n2. First comment / description (300 words, founder voice)\n3. 5 feature bullets with emojis\n4. Maker story (why you built this, 100 words)\n5. 5 questions to ask early supporters to leave\n6. Launch day Twitter thread (5 tweets)\n7. LinkedIn announcement (200 words)" },
    { id:"P-009", title:"Pricing Strategy", category:"Marketing", stage:"Launch", uses:22, prompt:"Design a pricing strategy for [PRODUCT NAME], a [TYPE] targeting [AUDIENCE].\n\nContext:\n- Cost per user/month: [COST]\n- Top 3 competitors + their prices: [LIST]\n- Primary value delivered: [VALUE]\n\nProvide:\n1. Free tier: exact limits that create friction to upgrade\n2. Pro tier: price + feature list + positioning\n3. Enterprise tier (if applicable)\n4. Annual vs monthly discount strategy\n5. Trial period recommendation + reasoning\n6. Pricing page headline and CTA copy\n7. How to raise prices later without backlash" },
    { id:"P-010", title:"Email Drip Sequence", category:"Marketing", stage:"Launch", uses:11, prompt:"Write a 5-email onboarding drip sequence for [PRODUCT NAME].\n\nUser just signed up for: [FREE/TRIAL/PAID]\nGoal of sequence: [GET THEM TO X OUTCOME]\n\nFor each email provide:\n- Subject line (+ A/B variant)\n- Preview text\n- Body (200-300 words, conversational)\n- Primary CTA\n- Send timing (Day 0, 1, 3, 7, 14)\n\nTone: Helpful, human, not salesy. Write like a founder, not a marketer." },
    { id:"P-011", title:"SEO Content Plan", category:"Marketing", stage:"Launch", uses:8, prompt:"Create a 90-day SEO content plan for [PRODUCT NAME] in the [NICHE] space.\n\nTarget audience: [AUDIENCE]\nDomain authority: [LOW/MEDIUM]\nMain keywords: [LIST 3-5]\n\nDeliver:\n1. 20 blog post ideas with target keywords\n2. 5 pillar page topics\n3. Internal linking strategy\n4. Content calendar (Month 1, 2, 3)\n5. Quick-win SEO opportunities\n6. Tools recommended (free and paid)" },
    { id:"P-012", title:"Database Schema Design", category:"Backend", stage:"Build", uses:24, prompt:"Design a complete database schema for [PRODUCT NAME].\n\nFeatures to support:\n[LIST CORE FEATURES]\n\nProvide:\n1. All tables with columns, types, constraints\n2. Primary and foreign keys\n3. Indexes for performance\n4. Enum types/values\n5. Sample seed data (5 rows per table)\n6. Migration SQL script\n7. Entity Relationship Diagram (text format)\n\nOptimize for [PostgreSQL/MySQL/SQLite]." }
  ],
  launchChecklist: {
    preLaunch: [
      { task:"Core features complete and tested (happy path)", done:true, cat:"Product" },
      { task:"Landing page live with clear value prop + CTA", done:true, cat:"Marketing" },
      { task:"Pricing page finalized and live", done:false, cat:"Marketing" },
      { task:"Stripe payment integration tested end-to-end", done:false, cat:"Product" },
      { task:"Terms of Service & Privacy Policy published", done:false, cat:"Legal" },
      { task:"Social media profiles created (Twitter, LinkedIn)", done:true, cat:"Marketing" },
      { task:"Email waitlist / signup set up (ConvertKit/Mailchimp)", done:true, cat:"Marketing" },
      { task:"Analytics installed (Plausible or GA4)", done:false, cat:"Product" },
      { task:"SEO meta tags on all pages (title, description, OG)", done:false, cat:"Product" },
      { task:"Lighthouse performance score > 90", done:false, cat:"Product" },
      { task:"Error monitoring set up (Sentry)", done:false, cat:"Product" },
      { task:"Beta tester feedback collected and actioned", done:true, cat:"Product" },
      { task:"Domain email set up (hello@yourproduct.com)", done:false, cat:"Product" },
      { task:"Backup and disaster recovery plan", done:false, cat:"Product" }
    ],
    launch: [
      { task:"Product Hunt submission scheduled (Tuesday 12:01 AM PST)", done:false, cat:"Marketing" },
      { task:"Twitter/X launch thread written and queued", done:false, cat:"Marketing" },
      { task:"LinkedIn announcement post ready", done:false, cat:"Marketing" },
      { task:"Reddit posts in r/SideProject, r/Entrepreneur, r/Notion", done:false, cat:"Marketing" },
      { task:"Hacker News Show HN post submitted", done:false, cat:"Marketing" },
      { task:"Email blast to entire waitlist", done:false, cat:"Marketing" },
      { task:"Ask friends/supporters to upvote on PH", done:false, cat:"Marketing" },
      { task:"Monitor server health and error logs", done:false, cat:"Product" },
      { task:"Have customer support channel ready (email/Discord)", done:false, cat:"Product" }
    ],
    postLaunch: [
      { task:"Collect and publish user testimonials", done:false, cat:"Marketing" },
      { task:"Analyze conversion funnel (visitors → signups → paid)", done:false, cat:"Growth" },
      { task:"Plan v2 features based on user feedback", done:false, cat:"Product" },
      { task:"Set up in-app customer support (Crisp / Intercom)", done:false, cat:"Product" },
      { task:"Create onboarding email drip sequence", done:false, cat:"Marketing" },
      { task:"Write case study / success story post", done:false, cat:"Marketing" },
      { task:"Explore partnership and integration opportunities", done:false, cat:"Growth" },
      { task:"Submit to directories (ProductHunt, BetaList, etc.)", done:false, cat:"Marketing" }
    ]
  },
  monetization: {
    mrr:2847, arr:34164, totalUsers:423, paidUsers:67,
    churnRate:4.2, conversionRate:15.8, ltv:127, cac:23,
    revenue:[{m:"Jan",v:380},{m:"Feb",v:720},{m:"Mar",v:1250},{m:"Apr",v:1890},{m:"May",v:2847}],
    expenses:[{cat:"OpenAI API",v:145},{cat:"Vercel Hosting",v:20},{cat:"Supabase",v:25},{cat:"Stripe Fees (~3%)",v:85},{cat:"Domain & Email",v:12}],
    pricing:{
      free:{ price:0, label:"Free", features:["3 resume optimizations/month","Basic AI rewrite","1 job match at a time","Community support"] },
      pro:{ price:19, label:"Pro", features:["Unlimited optimizations","Advanced AI rewrite","ATS score checker","PDF export","Cover letter generator","Priority support","All future features"] },
      annual:{ price:149, label:"Annual Pro", features:["Everything in Pro","Save 35% ($79 off)","Early access to new features","1-on-1 onboarding call"] }
    }
  },
  roadmap: [
    { phase:"MVP", timeline:"Week 1-3", goals:"Core resume parsing + AI rewrite engine", status:"Done" },
    { phase:"Beta", timeline:"Week 4-5", goals:"ATS scoring + PDF export + user testing", status:"In Progress" },
    { phase:"Launch", timeline:"Week 6", goals:"Stripe payments + Product Hunt launch", status:"To Do" },
    { phase:"Growth", timeline:"Week 7+", goals:"Iterate on feedback + cover letter + LinkedIn import", status:"To Do" }
  ],
  gtm: {
    gumroad:{
      title:"AI Product Builder OS — Build & Launch Digital Products with AI",
      tagline:"The complete Notion system to go from Idea → Build → Launch → Revenue. Powered by AI.",
      description:"Stop context-switching between 10 different tools.\n\nAI Product Builder OS is a done-for-you Notion workspace that gives you:\n\n✅ Idea Vault — Score and validate ideas before wasting weeks building the wrong thing\n✅ Product Planner — Roadmap, sprint board, and feature tracker in one place\n✅ AI Prompt Library — 12+ copy-paste prompts for every stage (idea → build → launch)\n✅ Task Board — Kanban workflow to ship fast without losing track\n✅ Bug Tracker — Never let bugs slip through the cracks again\n✅ Launch Checklist — 30+ items across Pre-Launch, Launch Day, and Post-Launch\n✅ Monetization Dashboard — Track MRR, ARR, LTV, CAC and net profit\n\nPerfect for:\n→ Solo founders building their first SaaS\n→ Indie hackers launching micro-products\n→ Freelancers productizing their services\n→ No-code builders launching on Gumroad\n\nWhat's inside:\n→ 7 linked Notion databases\n→ 12+ AI prompt templates\n→ Pre-filled demo data (AI Resume Optimizer case study)\n→ Full launch checklist (30+ items)\n→ Monetization calculator\n→ GTM playbook\n\nThis is not a pretty template. It's a system built by a founder who has shipped 5+ products.",
      pricing:{ india:"₹799 (Free) / ₹2,499 (Premium)", global:"$0 (Free) / $29 (Premium)" }
    },
    linkedin:"🚀 I just launched something I wish existed when I started building products.\n\nIntroducing: AI Product Builder OS\n\nA complete Notion workspace to go from idea → build → launch → revenue — powered by AI prompts at every step.\n\nHere's what's inside:\n💡 Idea Vault — Score & validate ideas before you build\n🚀 Product Planner — Roadmap + sprints + features\n🤖 Prompt Library — 12+ AI prompts for every stage\n✅ Task Board — Kanban to ship without chaos\n🐛 Bug Tracker — Track and squash every issue\n🎯 Launch Checklist — 30+ items so you miss nothing\n💰 Monetization Dashboard — MRR, ARR, LTV, CAC\n\nI built this because I kept rebuilding the same system for every product.\n\nNow it's done once. Ready to duplicate.\n\n🔗 Get it free → [LINK]\n\n#buildinpublic #saas #notion #indiemaker #productbuilding",
    twitter:"I built the Notion system I wish I had when I launched my first product 👇\n\nAI Product Builder OS — go from idea to revenue without losing your mind.\n\n🧵 What's inside (thread):",
    reddit:"Title: I built a complete Notion OS for building and launching digital products (free version available)\n\nHey r/SideProject,\n\nI've been building micro-SaaS products for 2 years. The biggest problem? Every time I start something new, I waste the first week setting up the same project management system.\n\nSo I built one system that covers everything:\n- Idea Vault (score and validate before you build)\n- Product Planner (roadmap + features + sprints)\n- 12+ AI prompts copy-paste ready\n- Kanban task board\n- Bug tracker\n- 30-item launch checklist\n- Monetization tracker (MRR, ARR, LTV, CAC)\n\nFree version available. Premium has the full prompt library and monetization dashboard.\n\nLink: [LINK]\n\nHappy to answer any questions about the system or how I use it.",
    producthunt:{ tagline:"Notion OS to go from idea → build → launch → revenue with AI", description:"AI Product Builder OS is a complete Notion workspace for founders who want to ship fast without chaos.\n\n7 linked databases, 12+ AI prompts, a 30-item launch checklist, and a monetization dashboard — all pre-built and ready to duplicate.\n\nStop rebuilding your system for every new product. Ship instead." }
  },
  schemas: {
    ideaVault:{ name:"💡 Idea Vault", views:["Table — All Ideas","Board — By Status","Gallery — Top Scored"] },
    productPlanner:{ name:"🚀 Product Planner", views:["Table — All Products","Board — By Stage","Timeline — Roadmap"] },
    promptManager:{ name:"🤖 Prompt Manager", views:["Gallery — By Category","Table — All Prompts","Board — By Stage"] },
    taskBoard:{ name:"✅ Task Board", views:["Board — Kanban","Table — All Tasks","Calendar — Due Dates"] },
    bugTracker:{ name:"🐛 Bug Tracker", views:["Table — All Bugs","Board — By Severity","Board — By Status"] },
    launchChecklist:{ name:"🎯 Launch Checklist", views:["Table — All Items","Board — By Phase","Board — By Category"] },
    monetization:{ name:"💰 Monetization", views:["Table — Monthly Metrics","Chart — Revenue Growth"] }
  }
};

function getStatusColor(s){
  const c={"Done":"#10b981","Validated":"#10b981","Fixed":"#10b981","In Progress":"#f59e0b","Building":"#f59e0b","Exploring":"#f59e0b","To Do":"#6366f1","Open":"#ef4444","Backlog":"#64748b","Killed":"#ef4444","Critical":"#ef4444","High":"#f97316","Medium":"#eab308","Low":"#6366f1","Raw":"#94a3b8","Shipped":"#06b6d4","Launched":"#06b6d4"};
  return c[s]||"#64748b";
}
function fmt$(n){return"$"+Number(n).toLocaleString();}
function fmtN(n){return Number(n).toLocaleString();}
function fmtINR(n){return"₹"+Number(n).toLocaleString("en-IN");}
