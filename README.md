# AI Product Builder OS ⚡

The complete Notion-inspired operating system to go from Idea → Build → Launch → Revenue. Powered by AI.

## Overview
Stop context-switching between 10 different tools. AI Product Builder OS is a completely free, vanilla JavaScript workspace that gives you a premium SaaS experience entirely in your browser.

- 💡 **Idea Vault** — Score and validate ideas before wasting weeks building the wrong thing
- 🚀 **Product Planner** — Roadmap, sprint board, and feature tracker in one place
- 🤖 **Prompt Library** — 12+ copy-paste prompts for every stage (idea → build → launch)
- ✅ **Task Board** — Kanban workflow to ship fast without losing track
- 🐛 **Bug Tracker** — Never let bugs slip through the cracks again
- 🎯 **Launch Checklist** — 30+ items across Pre-Launch, Launch Day, and Post-Launch
- 💰 **Monetization Dashboard** — Track MRR, ARR, LTV, CAC and net profit

## Tech Stack
- **HTML/CSS/JS**: Pure vanilla implementation with zero build step dependencies (no Webpack, Vite, or React needed).
- **Framer Motion**: Premium, dynamic entry and layout animations via the standalone DOM package (`esm.sh/framer-motion@11/dom`).
- **GStack**: Configured for AI-assisted development via `CLAUDE.md`.

## Setup
1. Clone the repository.
2. Run `npm install` (installs `framer-motion` for offline bundle access if needed).
3. Start a local server (e.g. `npx http-server -p 8080`).
4. Open `http://localhost:8080` in your browser.

## AI Assistant Guidelines (GStack)
This repository is configured with Garry Tan's **GStack** for AI-assisted development.
- Agents (like Claude Code) should refer to `CLAUDE.md` to access the approved slash commands (`/review`, `/ship`, `/qa`, `/office-hours`, etc.).
- Ensure all architectural changes pass through the GStack sprint structure: `Think → Plan → Build → Review → Test → Ship → Reflect`.
