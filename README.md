# Soclue.io Engage  
*A Clueso.io-inspired engagement and insights platform*

## Overview

Soclue.io Engage is a functional clone of **Clueso.io**, built to recreate its
**core workflows, data flows, and system architecture** rather than focusing on
media rendering specifics.

The product models Clueso as a **workflow-driven engagement platform** where users:
- create content projects,
- collect structured feedback,
- generate AI-powered insights,
- and iterate securely within a workspace.

Studio-quality video and AI voiceover are treated as **derivative outputs** of this
workflow and are intentionally not implemented in this clone.

---

## Product Understanding

At a product level, Clueso is not just a video tool — it is a **content enablement
and feedback-driven improvement system**.

The core loop is:

> Create project → Collect feedback → Analyze with AI → Improve → Publish

This project faithfully recreates that loop.

---

## Features Implemented

### ✅ Authentication & Onboarding
- Email/password signup & login
- Persistent sessions
- Protected routes
- Logout support
- Powered by Supabase Auth

### ✅ Dashboard & Project Management
- Workspace-style dashboard
- Project creation and listing
- Project detail view
- Project lifecycle status

### ✅ Feedback Collection
- Project-level feedback submission
- Feedback history display
- Persistent storage
- Ownership enforced via RLS

### ✅ AI Insights 

AI insights are generated using deterministic, rule-based analysis of user feedback. This ensures real, explainable intelligence without relying on external APIs. The architecture allows seamless replacement with a machine learning or LLM-based service in the future.

### ✅ Data Security & Management
- PostgreSQL via Supabase
- Explicit schema design
- Row Level Security (RLS) on all tables
- User-scoped access to projects, feedback, and insights

---

## Architecture

Next.js (App Router, TypeScript)
│
├── UI Components
├── Service Layer (projects, feedback, ai)
│
└── Supabase
├── Auth
├── PostgreSQL
└── Row Level Security


Key architectural principles:
- Clear separation of concerns
- No database logic inside UI components
- Services abstract external dependencies
- Extensible by design

---

## Why Video & AI Voiceover Are Not Implemented

Clueso’s studio-quality video rendering and AI voiceover capabilities were
**intentionally excluded** from this clone.

Reasoning:
- The assignment prioritizes **workflows, architecture, and data flow**
- Media pipelines (FFmpeg, TTS, rendering) are expensive and orthogonal
- The current system is designed so media services can be added as isolated extensions

This demonstrates **engineering tradeoff awareness** under time constraints.

---

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API routes / service layer
- **Database & Auth:** Supabase (PostgreSQL, RLS)
- **AI:** Mocked (architecture supports real integration)

---

## Setup Instructions

1. Clone the repository
2. Install dependencies
```bash
   npm install
```
3. Create a Supabase project
4. Add environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
5. Run the app
```bash
npm run dev
```

## Tradeoffs & Future Improvements
### Tradeoffs

- Mocked AI insights instead of real LLM calls

- No media rendering pipeline

- Minimal UI polish

### Future Improvements

- Video upload & rendering service

- AI voiceover integration

- Collaboration features

- Analytics & usage metrics

## Demo Flow

- User signup/login
- Dashboard walkthrough
- Create project
- Add feedback
- Generate AI insights
- Explain architecture & tradeoffs

## Conclusion

This project focuses on product understanding, system design, and clean
architecture, mirroring how Clueso operates at its core while making
intentional tradeoffs appropriate for the assignment scope.