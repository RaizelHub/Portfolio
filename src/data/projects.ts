import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "studio-ecommerce",
    slug: "studio-ecommerce",
    emoji: "🛍️",
    title: "Studio — Storefront & Merchant Tools",
    category: "Web",
    role: "Full-Stack Developer",
    status: "Working Prototype",
    badge: "React / Django REST / PostgreSQL",
    description:
      "A full-stack clothing store prototype with a React and TypeScript frontend, a Django REST API, and merchant tools for products, orders, customers, and discounts.",
    longDescription:
      "A clothing store prototype with a React and TypeScript storefront, a Django REST API, and merchant workflows. SQLite supports local development; PostgreSQL is configurable. Payment and password-reset demo flows require production integration.",
    problem:
      "A storefront and its merchant tools need consistent product, inventory, customer, and order data across the shopping workflow.",
    solution:
      "Built a React storefront and administration interface around a Django REST API. A browser-local mock API supports frontend-only demonstrations, while the backend supports SQLite for local development and PostgreSQL configuration.",
    technologies: [
      "React",
      "TypeScript",
      "Django REST Framework",
      "PostgreSQL",
      "SQLite",
      "Tailwind CSS",
      "Python",
      "Docker",
    ],
    features: [
      "Product catalog, search, filters, variants, collections, and reviews.",
      "Cart, wishlist, coupons, shipping quotes, checkout, and order history.",
      "Registration, JWT login, profile and address management.",
      "Merchant screens for inventory, orders, customers, discounts, and store settings.",
      "Browser-local mock API for frontend-only demonstrations.",
    ],

    architecture:
      "React / TypeScript → Django REST Framework → SQLite for local development or configured PostgreSQL. A separate browser-local mock API supports UI demonstrations.",
    technicalDecisions:
      "Kept the storefront and merchant interface on the same backend API. The local SQLite setup lowers the setup cost; PostgreSQL is configurable for deployment. Mock API mode is explicitly separate from the real Django API.",
    challenges:
      "Keeping checkout and inventory behavior consistent across frontend demonstrations and the real API requires clear separation of mock data from persisted backend records. Form validation and backend checks handle invalid inputs.",
    lessonsLearned:
      "A complete-looking storefront still needs independent validation of payment, inventory, and deployment behavior before production use.",
    currentLimitations:
      "Working prototype with simulated payments and demo password-reset flows. Production payment acceptance, deployment configuration, and operational validation remain separate work.",
    results:
      "Implemented storefront and merchant workflows with a documented local setup. Screenshots demonstrate the available interfaces; payment simulation and demo flows are not evidence of production transaction processing.",
    process:
      "Designed normalized PostgreSQL relational schema for products, variants, orders, items, and discounts → Engineered Django 5 REST Framework API with SimpleJWT authentication and transactional order services → Built React 18 client with Vite, Tailwind CSS, TanStack Query, and Zustand → Developed all 18 storefront and admin ERP interfaces → Containerized full stack using Docker, Docker Compose, Nginx, and Gunicorn.",
    image: "img/optimized/01_home_hero.webp",
    images: [
      "img/optimized/01_home_hero.webp",
      "img/studio/02_home_full.png",
      "img/studio/03_catalog_new_arrivals.png",
      "img/studio/04_category_tshirts.png",
      "img/studio/05_product_detail.png",
      "img/studio/06_cart_drawer.png",
      "img/studio/07_checkout_shipping.png",
      "img/studio/08_checkout_payment.png",
      "img/studio/09_login.png",
      "img/studio/10_register.png",
      "img/studio/11_admin_dashboard.png",
      "img/studio/12_admin_products.png",
      "img/studio/13_admin_product_editor.png",
      "img/studio/14_admin_orders.png",
      "img/studio/15_admin_customers.png",
      "img/studio/16_admin_discounts.png",
      "img/studio/17_admin_settings.png",
      "img/studio/18_order_success.png",
    ],
    githubUrl: "https://github.com/RaizelHub/clothing-store",
    featured: true,
    summary:
      "A clothing storefront and merchant dashboard covering catalog browsing, checkout, inventory, and order management.",
  },
  {
    id: "vocara",
    slug: "vocara",
    emoji: "🎤",
    title: "Vocara — Interview Practice",
    category: "Mobile",
    role: "Full-Stack Developer",
    status: "Working Prototype",
    badge: "React Native / Expo / Groq AI",
    description:
      "A React Native interview preparation prototype with voice recording, transcription, job-specific questions, and structured feedback through Supabase and Groq.",
    longDescription:
      "A React Native and Expo prototype for recording spoken interview answers, preparing for specific jobs, and reviewing structured feedback. Supabase handles identity, private audio, and session data; Groq processes transcription and evaluation.",
    problem:
      "Interview candidates and non-native English speakers lack accessible, affordable, real-time coaching tools. Traditional interview prep relies on expensive human coaches, static books, or generic ChatGPT prompts that lack voice recording, personalized feedback, and realistic job-specific simulations.",
    solution:
      "VOCARA combines voice recording, Groq AI transcription, structured answer feedback, job-specific interview prep flows, and resume analysis into one cohesive mobile app — backed by Supabase for secure data and RevenueCat for premium subscription management — delivering an always-available AI coach in the user's pocket.",
    technologies: [
      "React Native",
      "TypeScript",
      "Expo",
      "Supabase",
      "PostgreSQL",
      "Groq AI",
      "Expo Audio",
      "Expo Router",
      "RevenueCat",
    ],
    features: [
      "Record spoken answers and review transcripts and per-answer feedback.",
      "Generate interview questions from a saved job description.",
      "Review session results and practice history.",
      "Analyze resumes through a dedicated preparation workflow.",
      "Supabase authentication and private audio storage.",
      "Server-side transcription and evaluation with retry limits and request ownership checks.",
      "RevenueCat entitlement integration for feature access.",
    ],

    architecture:
      "React Native / Expo Router → Supabase Auth, private Storage and PostgreSQL → Edge Functions → Groq transcription and evaluation. Expo Audio handles device recording; RevenueCat manages subscription entitlements.",
    technicalDecisions:
      "Provider credentials stay in server-side Edge Functions. Interview sessions retain their question and evaluation context so later job edits do not change previous feedback. Separate recording, upload, transcription, and evaluation states make failures recoverable.",
    challenges:
      "Recording and AI processing can be interrupted by permissions, navigation, connectivity, or provider failures. The implementation separates these states, checks request ownership, and uses bounded retries and versioned feedback.",
    lessonsLearned:
      "A useful voice workflow needs clear permission handling, cancellation, and recovery as well as a successful recording path. Device behavior and hosted integrations need their own acceptance tests.",
    currentLimitations:
      "Working prototype, not publicly released in app stores. Recording requires a compatible device build and configured backend services. AI and subscription flows depend on external service configuration.",
    accessNote:
      "Source and application screenshots are available for review. No public live demo is listed.",
    results:
      "Built a mobile prototype with voice interview practice, role-specific preparation, and feedback review. The repository includes implementation and test instructions; no public app-store release is claimed.",
    process:
      "Designed Supabase PostgreSQL schema with RLS policies → Implemented Supabase Edge Functions for Groq AI transcription and resume analysis → Built React Native voice recording pipeline with Expo AV → Integrated RevenueCat subscription paywall → Developed job-specific interview prep flows → Engineered progress tracking dashboard → Polished premium mobile UI with dark mode and animations.",
    image: "img/optimized/vocara1 (1).webp",
    images: [
      "img/optimized/vocara1 (1).webp",
      "img/optimized/vocara1 (2).webp",
      "img/optimized/vocara1 (3).webp",
      "img/optimized/vocara1 (4).webp",
      "img/optimized/vocara1 (5).webp",
      "img/optimized/vocara1 (6).webp",
    ],
    githubUrl: "https://github.com/RaizelHub/vocara",
    featured: true,
    summary:
      "Practice spoken interview answers, prepare for a specific role, and review transcription and structured feedback.",
  },
  {
    id: "subora",
    slug: "subora",
    emoji: "💳",
    title: "Subora — Subscription & Expense Management App",
    category: "Mobile",
    role: "Full-Stack Mobile Developer",
    status: "In Development",
    badge: "React Native / Gmail API / Supabase",
    accessNote:
      "Engineered locally. Live cloud deployment and Google OAuth verification on hold due to developer account and cloud hosting budget constraints.",
    description:
      "A React Native mobile app that automatically discovers subscriptions from Gmail, tracks recurring payments, organizes expenses, manages budgets, and monitors upcoming charges from one unified dashboard.",
    longDescription:
      "Subora is a cross-platform mobile subscription and expense management app built with React Native, Expo, and TypeScript. The app connects to users' Gmail accounts via Google OAuth and runs a serverless subscription-detection pipeline through Supabase Edge Functions to automatically surface recurring payment emails. Users can review detected subscriptions, approve or dismiss them, manually add cash expenses, set budgets per category, and receive renewal reminders — all within a unified dashboard backed by PostgreSQL with per-user Row Level Security. Premium features are gated behind a RevenueCat subscription paywall. The development focus is on the full Gmail OAuth integration, a robust duplicate prevention system, a structured subscription approval workflow, and a real-time synchronized frontend/backend data model.",
    problem:
      "People routinely forget which subscriptions they are paying for, miss renewal dates, and have no clear view of how much recurring spending accumulates across different services and accounts. Manually tracking this across bank statements and inboxes is fragmented and error-prone.",
    solution:
      "Subora centralizes subscriptions and expenses into one React Native app: a Gmail OAuth integration detects recurring payment emails automatically, a structured review-and-approve workflow lets users confirm detected subscriptions, duplicate detection prevents redundant entries, expense categorization organizes spend, and dashboard analytics surface upcoming charges and budget utilization — backed entirely by Supabase PostgreSQL with RLS-enforced per-user data isolation.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Supabase Edge Functions",
      "Gmail API",
      "Google OAuth",
      "RevenueCat",
      "React Navigation",
      "AsyncStorage",
    ],
    features: [
      "Gmail OAuth integration: securely connects user Gmail accounts and runs a Supabase Edge Function pipeline to scan inbox for subscription-related emails using pattern matching and heuristics.",
      "Subscription detection & review workflow: detected subscriptions surface in a pending review queue — users approve, edit details, or dismiss each entry before it enters the active tracker.",
      "Duplicate prevention engine: cross-references detected subscriptions against existing records by merchant name, billing amount, and cycle frequency to block redundant entries.",
      "Subscription tracker: full CRUD for recurring bills with billing cycle, amount, category, renewal date, and per-subscription notification settings.",
      "Upcoming renewal reminders: push notifications and dashboard alerts surface subscriptions renewing within the next 7 days.",
      "Expense tracking: manual cash and card expense logging with category tagging, merchant notes, and date attribution.",
      "Budget management: per-category budget caps with real-time utilization bars and over-budget alerts.",
      "Multiple accounts: users can connect multiple Gmail accounts and financial accounts, with spending aggregated across all sources.",
      "RevenueCat subscription paywall: free tier with core tracking; premium tier unlocks Gmail detection, multiple accounts, and advanced analytics.",
      "Spending insights dashboard: visual breakdowns of monthly spend by category, subscription cost trends, and upcoming charge calendar.",
    ],
    whatWorks: [
      "Gmail OAuth connection flow with secure token storage and refresh handling.",
      "Supabase Edge Function subscription-detection pipeline scanning Gmail for recurring payment patterns.",
      "Duplicate detection cross-referencing by merchant, amount, and billing cycle.",
      "Subscription review and approval workflow with pending/active/dismissed states.",
      "Manual expense logging with category tagging and budget tracking.",
      "RevenueCat paywall with premium feature gating.",
      "PostgreSQL RLS-enforced per-user data isolation across all tables.",
    ],
    architecture:
      "React Native (Expo) Client → Google OAuth (Gmail API Token) → Supabase Auth (RLS) → Supabase PostgreSQL | Supabase Edge Functions (Gmail Scan / Duplicate Check / Subscription Detection) → RevenueCat SDK → Premium Paywall Entitlement Layer",
    technicalDecisions:
      "Delegated Gmail scanning to Supabase Edge Functions to keep Gmail API tokens server-side, preventing credential exposure on the mobile client. Implemented a structured review-queue pattern (pending → approved / dismissed) rather than auto-adding detected subscriptions, to give users full control and reduce false-positive noise. Chose RevenueCat for subscription paywall management to abstract Google Play billing complexity and deliver reliable cross-platform entitlement checks.",
    challenges: [
      {
        challenge:
          "Preventing duplicate subscriptions when Gmail detection runs repeatedly or users manually add a service already detected.",
        approach:
          "Built a deduplication service that compares incoming subscriptions against existing records on three dimensions: normalized merchant name (fuzzy match), billing amount (±5% tolerance), and billing cycle. Matches above a confidence threshold are flagged and surfaced to the user for disambiguation rather than silently dropped.",
        result:
          "Near-zero duplicate entries in the active subscription list, with transparent conflict resolution visible to the user.",
      },
      {
        challenge:
          "Securely handling Google OAuth tokens for Gmail API access without exposing credentials client-side.",
        approach:
          "OAuth authorization code flow is completed on the client; the resulting token is immediately forwarded to a Supabase Edge Function which stores the refresh token server-side in an encrypted Supabase secret. All Gmail API calls originate from the Edge Function — the client never touches the token directly.",
        result:
          "Gmail credentials are fully server-isolated; the client only holds a short-lived Supabase session JWT.",
      },
      {
        challenge:
          "Keeping frontend subscription and expense state synchronized with backend changes triggered by Edge Functions.",
        approach:
          "Implemented Supabase Realtime subscriptions on the pending-subscriptions and expenses tables so the mobile client receives live push updates when the detection pipeline completes, without manual polling.",
        result:
          "UI reflects detected subscriptions within seconds of Edge Function completion, with no polling overhead.",
      },
    ],
    lessonsLearned:
      "Building a reliable subscription detection system requires treating the Gmail scan as an async background pipeline with explicit state machines (pending / approved / dismissed) rather than fire-and-forget insertion. Duplicate prevention is not a simple equality check — fuzzy matching with user-facing disambiguation produces far better UX than silent deduplication.",
    currentLimitations:
      "Public cloud deployment on hold due to developer account and cloud hosting budget constraints. Core Gmail sync logic, Supabase Edge Functions, and duplicate detection algorithms are fully developed and tested locally.",
    results:
      "Built a complete subscription and expense management mobile app with Gmail OAuth integration, a serverless detection pipeline, duplicate prevention, a structured approval workflow, budget tracking, and a RevenueCat premium paywall — delivering a unified financial awareness tool for mobile users.",
    process:
      "Designed PostgreSQL schema with RLS policies for subscriptions, expenses, and accounts → Implemented Google OAuth flow and Gmail API token isolation in Supabase Edge Functions → Built subscription-detection pipeline with pattern matching and duplicate prevention → Developed subscription review/approval workflow UI → Integrated RevenueCat paywall → Built expense logging, budget management, and spending insights dashboard → Connected Supabase Realtime for live state sync.",
    image: "img/subora1 (1).jpg",
    images: [
      "img/subora1 (1).jpg",
      "img/subora1 (2).jpg",
      "img/subora1 (3).jpg",
    ],
    githubUrl: "https://github.com/RaizelHub",
    featured: true,
  },
  {
    id: "careeros",
    slug: "careeros",
    emoji: "💼",
    title: "CareerOS — Local-First Windows Career Operating System",
    category: "Desktop",
    role: "Lead Software Architect & Full-Stack Desktop Engineer",
    status: "Working Prototype",
    badge: "Tauri 2 / SQLite / Groq AI",
    description:
      "A privacy-centric, desktop career management engine powered by Tauri 2, React 19, SQLite, and Context-Aware Groq Llama-3.3 AI.",
    longDescription:
      "CareerOS is a privacy-first, desktop application built with Tauri 2, React 19, TypeScript, and SQLite. Designed to replace disconnected job search spreadsheets and online AI tools, CareerOS unifies job application CRM tracking (with an interactive 11-stage Kanban drag-and-drop board), local PDF/DOCX resume text extraction, STAR-methodology mock interview coaching, and context-aware Groq AI conversation trees—all while keeping 100% of user data stored locally on the user's PC.",
    problem:
      "Job seekers traditionally juggle disconnected tools—spreadsheets for job tracking, external web tools for resume formatting, generic ChatGPT windows for interview prep, and text files for skill gaps. This workflow causes severe data re-entry friction, context-blind AI interactions, and privacy risks when uploading raw resume files to third-party cloud tools.",
    solution:
      "CareerOS unifies career management into one connected desktop operating system: connected domain workflows (skill gaps populate Learning Goals, Offer/Hired status records Timeline milestones), context-aware AI assistant with explicit record attachment chips ([ Job ], [ Resume ]), and 100% local processing where all application records and document extractions remain inside a local SQLite database (careeros.db) on the user's PC.",
    technologies: [
      "Tauri 2",
      "Rust",
      "React 19",
      "TypeScript",
      "Vite",
      "SQLite",
      "@tauri-apps/plugin-sql",
      "Tauri Stronghold",
      "Groq Llama-3.3 70B",
      "HTML5 Drag & Drop",
      "Vanilla CSS",
    ],
    features: [
      "Interactive 11-stage Kanban drag-and-drop application board with native HTML5 drag events & instant database error rollback.",
      "Zero-cloud local PDF & DOCX resume text extraction via client-side ArrayBuffer text stream decoding & word/document.xml parsing.",
      "Context-aware Groq Llama-3.3 70B AI conversation trees featuring explicit record attachment chips ([Job], [Resume]).",
      "Prompt injection defense with explicit XML security boundaries (<career_context_data>) & schema validation (aiSchemaValidator).",
      "Encrypted API key storage using Tauri Stronghold AES-256-GCM encrypted native desktop vault.",
      "Lightweight typed event bus (dataEventBus.ts) for cross-module live SQLite data invalidation without global state bloat.",
      "PRAGMA user_version database migrations & ErrorBoundary UI recovery with 1-click JSON backup export.",
      "STAR-methodology mock interview coaching engine with connected Learning Goals & Career Timeline tracking.",
    ],
    whatWorks: [
      "App initializes local SQLite database in under 50ms with sub-9s frontend Vite build times.",
      "100% local document text extraction from raw PDF and DOCX files without cloud parsing APIs.",
      "AES-256-GCM encrypted API key storage in native desktop vault via Tauri Stronghold.",
      "11-stage Kanban application board with HTML5 drag-and-drop and database rollback.",
      "Context-aware AI chat with XML security boundaries and strict schema validation.",
    ],
    architecture:
      "Tauri 2 Desktop Shell (Rust IPC / Win32) → React 19 Frontend UI (Typed Event Bus) → SQLite Database (careeros.db via @tauri-apps/plugin-sql) & Tauri Stronghold Vault ↔ Groq Llama-3.3 70B API (Context Resolver & XML Security Boundaries)",
    technicalDecisions:
      "Integrated Tauri Stronghold for AES-256-GCM encrypted native key vault storage to prevent API key exposure in localStorage or React state. Designed a typed event bus (dataEventBus) for reactive SQLite cache invalidation across Dashboard, Timeline, and Job Tracker modules without Redux bloat. Built local ArrayBuffer stream decoding for PDF/DOCX files to guarantee 100% offline document parsing.",
    challenges:
      "Preventing prompt injection attacks from malicious job descriptions and decoding raw binary document streams locally. Solved by constructing contextResolverService.ts to enforce XML tags (<career_context_data>) with character limits (3,000 for Jobs, 6,000 for Resumes), and developing resumeTextExtractor.ts to decompress DOCX zip containers in memory and decode PDF Tj/TJ operators offline.",
    lessonsLearned:
      "Combining native Win32/Tauri desktop capabilities with offline-first SQLite databases and context-aware LLMs creates ultra-responsive, privacy-preserving desktop software that outpaces traditional web-based tools.",
    currentLimitations:
      "Local-first desktop application built for Windows desktop operating systems.",
    results:
      "Delivered a high-performance desktop career operating system with sub-50ms SQLite startup, 0 unhandled render crashes, sub-9s build times, and zero third-party cloud data leakage for user profile and resume data.",
    process:
      "Architected Tauri 2 Rust desktop shell & SQLite migration scripts -> Developed resumeTextExtractor for client-side ArrayBuffer PDF/DOCX parsing -> Integrated Tauri Stronghold for AES-256-GCM API key encryption -> Implemented dataEventBus typed event bus -> Built 11-stage Kanban drag-and-drop application board -> Engineered Groq AI contextResolverService with XML security boundaries.",
    image: "img/Os.png",
    images: ["img/Os.png", "img/os1.png", "img/os2.png"],
    githubUrl: "https://github.com/RaizelHub/careeros",
    featured: true,
  },
  {
    id: "restaurant-ai-ops",
    slug: "restaurant-ai-ops",
    emoji: "🍽️",
    title: "Restaurant AI Ops — Enterprise AI & Real-Time Alerting Platform",
    category: "Web",
    role: "Full-Stack Developer & AI Systems Architect",
    status: "Working Prototype",
    badge: "Enterprise AI & Alerting",
    description:
      "An event-driven restaurant operations management platform built with React 19, Supabase Edge Functions (Deno), AI Feedback Analysis (Gemini/OpenAI), and WhatsApp Business Cloud API integrations.",
    longDescription:
      "Restaurant AI Ops is an enterprise-grade, event-driven restaurant operations platform built to monitor kitchen delay thresholds in real time, analyze customer review sentiment using AI (Gemini / OpenAI), and automatically dispatch escalation alerts via Meta WhatsApp Business Cloud API. Built with React 19, TypeScript, Tailwind CSS v4, and Supabase Edge Functions (Deno), the system incorporates strict PostgreSQL Row Level Security policies (6 migration scripts), transactional & freeform messaging with HMAC-SHA256 signature verification, exponential retry logic, and a switchable mock mode for zero-cost sandbox testing.",
    problem:
      "Restaurant chains often suffer from communication delays between kitchen preparation bottlenecks and store management, leading to unhandled order SLA breaches, poor customer sentiment, and fragmented operational oversight.",
    solution:
      "Engineered an automated serverless operational pipeline connecting kitchen order status monitoring to Deno Edge Functions, Google Gemini & OpenAI for sentiment categorization, and Meta WhatsApp Cloud API for instant escalation alerts with strict PostgreSQL RLS multi-tenant security.",
    technologies: [
      "React 19",
      "TypeScript",
      "Supabase",
      "Deno Edge Functions",
      "Tailwind CSS v4",
      "PostgreSQL",
      "Google Gemini",
      "OpenAI",
      "WhatsApp Cloud API",
      "n8n",
      "Vite",
    ],
    features: [
      "Flexible multi-provider AI sentiment analysis engine supporting Google Gemini 1.5 Pro and OpenAI in Supabase Edge Functions.",
      "Automated background order monitoring (check-delayed-orders cron) scanning active tickets against custom SLA constraints (ORDER_DELAY_THRESHOLD_MINUTES).",
      "Meta WhatsApp Business Cloud API integration with transient error handling, exponential backoff retries, and switchable mock mode.",
      "Secure webhook receiver endpoint (whatsapp-webhook) featuring HMAC-SHA256 payload signature validation and idempotency checks.",
      "Enterprise security & RBAC with 6 PostgreSQL Row Level Security migration scripts enforcing multi-tenant isolation (Admins, Managers, Staff).",
      "Comprehensive audit logging (AuditPage) for tracking critical operational actions and delivery statuses.",
      "15-page responsive single-page executive dashboard SPA built with React 19, TypeScript, Vite, Tailwind CSS v4, and Lucide React.",
      "Real-time operational feeds, interactive alert detail views, feedback sentiment hub, and team access configuration.",
    ],
    whatWorks: [
      "Real-time kitchen order SLA delay detection under 15 minutes.",
      "Automated WhatsApp escalation alert dispatching with HMAC-SHA256 payload verification.",
      "Multi-provider AI review sentiment scoring (Gemini 1.5 Pro / OpenAI).",
      "Multi-tenant data isolation & team RBAC via 6 custom PostgreSQL RLS policies.",
      "Zero-cost local sandbox testing via switchable mock WhatsApp mode.",
    ],
    architecture:
      "React 19 Executive Dashboard → Supabase PostgreSQL (RLS) ← Check Delayed Orders Cron (Deno) → WhatsApp Alert Function → Meta WhatsApp Cloud API / Webhook Handler & n8n Sync",
    technicalDecisions:
      "Built a provider-agnostic AI pipeline in Supabase Edge Functions (Deno) to prevent vendor lock-in and enable seamless fallback between Google Gemini and OpenAI. Decoupled SLA monitoring into background cron edge functions to guarantee sub-15 minute alert dispatches without client-side execution dependencies.",
    challenges:
      "Handling transient delivery failures and preventing duplicate alert dispatches while validating payload authenticity from Meta WhatsApp webhooks. Solved by implementing HMAC-SHA256 signature verification, idempotency checks, and exponential backoff retry algorithms within serverless Deno Edge Functions.",
    lessonsLearned:
      "Decoupling client state from background cron SLA monitors and multi-provider AI evaluation pipelines delivers low-latency enterprise operations with robust fallback safety.",
    currentLimitations:
      "Mock WhatsApp mode enabled by default for zero-cost sandbox testing; requires production Meta Business Cloud API configuration and phone number verification for live broadcast deployment.",
    results:
      "Created a full-stack executive operations platform featuring 15 administrative views, automated order delay detection under 15 minutes, and zero-downtime message delivery with built-in mock testing capabilities.",
    process:
      "Designed multi-tenant PostgreSQL database schemas with strict RLS policies (001-006 migrations) -> Implemented Deno Edge Functions for order monitoring & WhatsApp alerts -> Integrated Gemini & OpenAI AI feedback sentiment pipeline -> Built 15-page React 19 executive dashboard with Tailwind CSS v4.",
    image: "img/restaurantdahboard.png",
    images: ["img/restaurantdahboard.png", "img/restaurant-ai workflow.png"],
    architectureDiagramUrl: "img/restaurant-ai workflow.png",
    featured: true,
  },
  {
    id: "collabcanvas",
    slug: "collabcanvas",
    emoji: "🎨",
    title: "CollabCanvas — Whiteboard & Pages",
    category: "Web",
    role: "Full-Stack Developer",
    status: "Working Prototype",
    badge: "Real-Time System",
    description:
      "A creative workspace combining a tldraw whiteboard with a Tiptap-based document editor for research proposals, thesis manuscripts, and technical writing.",
    longDescription:
      "A creative workspace with separate Whiteboard and Pages editors. Whiteboard uses tldraw; Pages uses Tiptap and Yjs. Local drafts, exports, cloud saving, and multi-user access have distinct implementation and verification requirements.",
    problem:
      "Building real-time collaborative applications requires low-latency synchronization without overwhelming traditional relational database servers, alongside strict server-enforced authorization to prevent unauthorized document mutations or WebSocket eavesdropping.",
    solution:
      "Engineered a stateful, edge-native collaboration architecture using Cloudflare Workers & Durable Objects for real-time WebSocket coordination and document persistence, paired with Supabase PostgreSQL RLS for multi-tenant permission management and Cloudflare R2 for protected media assets.",
    technologies: [
      "React",
      "TypeScript",
      "tldraw",
      "Tiptap",
      "Yjs",
      "Cloudflare Workers",
      "Durable Objects",
      "Supabase",
      "PostgreSQL",
      "Cloudflare R2",
      "IndexedDB",
      "Tailwind CSS",
      "Vitest",
      "Playwright",
    ],
    features: [
      "Whiteboard drawing, sticky notes, shapes, connectors, images, and PNG/PDF export.",
      "Pages templates for thesis, capstone, research proposal, paper, technical documentation, and blank documents.",
      "Rich-text editing with headings, tables, lists, find/replace, and a document outline.",
      "Local IndexedDB drafts, named checkpoints, and recovery backups.",
      "Author-entered references, citations, bibliography, captions, and cross-references.",
      "DOCX import/export and a separate print preview for PDF output.",
      "Cloud-mode roles, sharing, and document synchronization; integration verification is a separate step.",
    ],

    architecture:
      "React interfaces → tldraw Whiteboard / Tiptap + Yjs Pages. Whiteboard cloud state uses a Cloudflare Durable Object over WebSockets; Pages uses Supabase-backed Yjs update polling. Supabase stores identity and permissions, R2 stores assets, and IndexedDB stores local Pages drafts.",
    technicalDecisions:
      "The two editors use separate document models. Whiteboard uses a Durable Object per board for live canvas state. Pages uses Tiptap and Yjs for structured text, with browser drafts kept distinct from explicit cloud creation. Print layout is generated on demand rather than interrupting continuous writing.",
    challenges:
      "Keeping local drafts, cloud documents, and exported files distinct required explicit save and recovery paths. Whiteboard authorization is enforced server-side. Pages convergence tests cover the document model, while cross-account permissions and cloud synchronization still require integration checks.",
    lessonsLearned:
      "Editor-level tests do not prove deployment readiness. Local persistence, export behavior, and cross-account collaboration need separate validation.",
    currentLimitations:
      "Working prototype. Cloud Whiteboard collaboration requires configured Supabase and Worker services. Pages cloud permissions and concurrent editing need integration verification. Pages has no live pagination or presence cursors; DOCX import is not lossless.",
    results:
      "Implemented local Whiteboard editing and Pages document workflows, with automated coverage and recorded browser validation in the project repository. Cloud collaboration remains a separately configured and verified capability.",
    process:
      "Built the Whiteboard and Pages editors, separated local and cloud persistence, added recovery and export workflows, and documented automated coverage and remaining integration checks.",
    image: "img/collabcanvas/whiteboard.webp",
    images: [
      "img/collabcanvas/whiteboard.webp",
      "img/collabcanvas/pages.webp",
      "img/collabcanvas/collaboration.webp",
    ],
    liveUrl: "https://collab-canvas-web-beta.vercel.app/",
    githubUrl: "https://github.com/RaizelHub/collab-canvas",
    featured: true,
    summary:
      "A workspace for visual planning and structured writing, with a shared whiteboard and a dedicated document editor.",
    accessNote:
      "Public preview available. Screenshots show local editing; they do not establish live multi-user synchronization.",
  },
  {
    id: "receivables-control-center",
    slug: "receivables-control-center",
    emoji: "💰",
    title: "Receivables Control Center",
    category: "Web",
    role: "Full-Stack Developer & Automation Designer",
    status: "Working Prototype",
    description:
      "A full-stack financial operations application for managing invoices, collection cases, customer communications, payment promises, disputes, incoming payments, reconciliation, approvals, workflow failures, and audit history.",
    longDescription:
      "Receivables Control Center is a full-stack financial operations application for managing invoices, collection cases, customer communications, payment promises, disputes, incoming payments, reconciliation, approvals, workflow failures, and audit history. The application helps finance teams quickly identify overdue invoices, customer replies awaiting review, missed payment promises, unmatched payments, pending approvals, failed automated workflows, and accounts without a scheduled next action.",
    problem:
      "Receivables work is often distributed across spreadsheets, email threads, payment records, and automation tools. This makes it difficult for teams to understand what requires attention, who owns an issue, and what should happen next. The goal was to create a single operational workspace that makes outstanding work visible while preserving financial controls, permissions, and auditability.",
    solution:
      "Designed and developed the full-stack application including product and workflow design, responsive interface design, frontend architecture, backend APIs and validation, database design and access controls, payment reconciliation workflows, role-based permissions, automation and failure-handling workflows, and demo environment documentation.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "n8n",
      "pnpm",
    ],
    features: [
      "Operational dashboard surfacing invoices requiring action, overdue balances by currency, replies awaiting review, missed promises, reconciliation exceptions, approvals, and workflow failures.",
      "Invoice and collections management with balance monitoring, due dates, collection stages, assignments, and next actions.",
      "Customer communication inbox connecting messages with account and invoice context.",
      "Payment reconciliation with match-and-allocate workflows for uncertain matches and unallocated balances.",
      "Role-based approval workflows protecting sensitive operations such as payment allocations and reversals.",
      "Workflow monitoring showing automation runs, retries, failures, and dead-letter items.",
      "Organization-scoped audit trail recording important user decisions and automated events.",
      "Server-side filtering, sorting, and pagination across all data tables.",
      "Locale-aware currency formatting with multi-currency balance separation.",
      "Idempotent payment and workflow processing.",
      "Reusable operational UI components with accessible navigation, tables, dialogs, and forms.",
      "Responsive mobile navigation with horizontally scrollable data tables.",
      "Loading, empty, and recoverable error states throughout.",
    ],
    whatWorks: [
      "Organization-scoped data isolation with Supabase RLS.",
      "Role-based route and action protection.",
      "Multi-currency balances kept separate.",
      "Payment reconciliation with match and allocate flows.",
    ],
    architecture:
      "React + TypeScript frontend -> Express REST API -> PostgreSQL / Supabase RLS -> n8n automation workflows",
    technicalDecisions:
      "Used a restrained enterprise design system suited to daily finance operations. Operational clarity over decoration, compact readable data tables, one restrained primary accent color, consistent status and priority labels, prominent balances and deadlines, and currency-aware financial presentation.",
    challenges:
      "Designing permission-aware navigation and actions while maintaining responsive layouts for desktop, tablet, and mobile required careful component architecture and server-side authorization checks.",
    lessonsLearned:
      "Business-critical financial operations require backend-enforced validation even when the frontend already validates. All sensitive mutations go through approval workflows.",
    currentLimitations:
      "Currently a working prototype. Production deployment would require upstream accounting system API integrations for real invoice and payment data.",
    results:
      "Created a single operational workspace that makes outstanding receivables work visible while preserving financial controls, permissions, and auditability.",
    process:
      "Designed the product and workflow -> Built the database schema with Supabase RLS -> Developed Express REST APIs with Zod validation -> Built React frontend with TanStack Query and React Hook Form -> Integrated n8n automation workflows -> Added role-based permissions and approval flows.",
    image: "img/RCC_Dashboard.png",
    images: [
      "img/RCC_Dashboard.png",
      "img/RCC_Invoice.png",
      "img/RCC_Chat.png",
    ],
    featured: true,
  },
  {
    id: "omniflow-ai",
    slug: "omniflow-ai",
    emoji: "⚡",
    title: "OmniFlow AI",
    category: "AI",
    role: "Full-Stack Developer",
    status: "Working Prototype",
    description:
      "A lead-intake and automation system that sends website submissions through an n8n workflow, analyzes each lead using an AI model, assigns intent, priority, score, and summary information, and stores the structured result in Supabase.",
    longDescription:
      "OmniFlow AI is an automated lead intake and categorization engine designed to eliminate manual inquiry sorting. When a potential client submits a website form, the payload is immediately dispatched to an n8n webhook listener. The workflow invokes Google Gemini AI using structured JSON schema rules to evaluate commercial intent, compute a numeric lead score (1–100), assign priority (Low, Medium, High, Urgent), and generate an executive summary. The result is stored in Supabase PostgreSQL and surfaced instantly on a React dashboard.",
    problem:
      "Businesses receive raw client inquiries across multiple web forms. Manually reading each email causes delayed response times to high-intent leads and inconsistent prioritization.",
    solution:
      "Built an end-to-end automated pipeline connecting React contact forms to n8n webhooks, Gemini AI for evaluation, and Supabase for structured storage and dashboard reporting.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "n8n",
      "Supabase",
      "PostgreSQL",
      "Gemini AI",
      "Webhooks",
      "REST APIs",
    ],
    features: [
      "Lead form submission listener via HTTP Webhooks.",
      "n8n workflow pipeline executing asynchronous processing.",
      "Gemini AI intent classification (Sales, Support, Partnership, Spam).",
      "Automated numeric lead score calculation and priority badge assignment.",
      "Supabase PostgreSQL structured table storage with RLS policies.",
      "React monitoring dashboard with lead status updates.",
      "Built-in error handling and fallback routing for failed webhook dispatches.",
      "Canonical email deduplication preventing repeated lead entries.",
    ],
    whatWorks: [
      "Webhook submission ingestion from React forms.",
      "Structured Gemini AI output generation with JSON validation.",
      "Database storage of intent, score, priority, and AI summary in Supabase.",
      "Dashboard view displaying incoming leads sorted by priority.",
    ],
    architecture:
      "React Form → n8n Webhook → Validation → AI Classification → Supabase → Dashboard",
    technicalDecisions:
      "Chosen n8n to decouple workflow orchestration from the frontend UI. Implemented strict JSON schema parsing in n8n before database writes to prevent malformed LLM outputs from breaking PostgreSQL table constraints.",
    challenges:
      "Ensuring that unstructured AI text responses strictly conform to PostgreSQL column types (e.g. converting lead score string to integer, validating priority enums). Solved using strict JSON schema validation steps in n8n.",
    lessonsLearned:
      "Decoupling heavy AI evaluation into asynchronous backend workflows keeps user form submissions instant and responsive.",
    currentLimitations:
      "Currently configured with simulated website lead inputs. Email and SMS alerts for urgent leads can be connected in future iterations.",
    results:
      "Demonstrates a complete lead intake automation architecture reducing manual lead triage effort while keeping data structured.",
    process:
      "Designed Supabase tables -> Created n8n webhook workflow -> Tuned Gemini system prompts for JSON compliance -> Built React lead dashboard.",
    image: "img/AiAuto.png",
    images: ["img/AiAuto.png", "img/Workflow.png"],
    liveUrl: "https://ai-automation-lead-hazel.vercel.app/",
    githubUrl: "https://github.com/RaizelHub/OmniEcommerce-ai",
    featured: true,
  },
  {
    id: "smartpipe",
    slug: "smartpipe",
    emoji: "🔧",
    title: "Smart Pipe",
    badge: "Capstone Project",
    category: "IoT",
    role: "Full-Stack Developer",
    status: "Academic Project",
    description:
      "An IoT-based water-monitoring system that uses sensors to measure water flow, pH, and turbidity while providing leak detection, device monitoring, and pump or valve controls.",
    longDescription:
      "Smart Pipe is an IoT hardware and software capstone project designed to address water distribution monitoring. It pairs physical sensor nodes (water flow meters, pH probes, turbidity sensors) attached to ESP32 microcontrollers with real-time cloud data storage in Firebase and a web/mobile management dashboard.",
    problem:
      "Hidden pipeline leaks and unmonitored water quality variations cause severe resource loss and delays in utility maintenance.",
    solution:
      "Designed an IoT monitoring suite connecting hardware sensors on ESP32 boards to Firebase Realtime Database, triggering automated alerts when flow rate anomalies or pressure drops indicate leaks.",
    technologies: [
      "ESP32",
      "Flow Sensor",
      "pH Sensor",
      "Turbidity Sensor",
      "Firebase",
      "React",
      "Flutter",
      "MQTT Protocol",
    ],
    features: [
      "ESP32 embedded microcontroller sensor data acquisition.",
      "Flow rate anomaly comparison logic for real-time leak detection.",
      "pH level and water turbidity (cloudiness) monitoring.",
      "Firebase Realtime Database synchronization.",
      "React Web Dashboard for live metric monitoring and pump/valve control toggles.",
      "Sensor calibration routines for accurate analog readings.",
      "GSM module SMS alerts dispatched upon detected pressure loss.",
    ],
    whatWorks: [
      "Real-time flow sensor reading and pressure delta evaluation.",
      "Analog pH and turbidity sensor data streaming to Firebase.",
      "Web dashboard rendering live telemetry gauges.",
      "Manual pump and valve toggle triggers from the dashboard.",
    ],
    architecture:
      "Sensors → ESP32 → Firebase → Monitoring Dashboard → Pump and Valve Controls",
    technicalDecisions:
      "Chosen ESP32 for integrated Wi-Fi/Bluetooth capabilities and low power draw. Used MQTT protocol for minimal payload overhead during sensor telemetry transmission.",
    challenges:
      "Calibrating analog sensor voltage outputs into accurate physical measurements (L/min, pH scale, NTU turbidity). Resolved by writing calibration curves in C++ on the microcontroller.",
    lessonsLearned:
      "Hardware-software integration requires handling physical noise, signal fluctuations, and loss of network connectivity gracefully.",
    currentLimitations:
      "Operates as a physical hardware prototype built for laboratory capstone demonstration.",
    results:
      "Successfully demonstrated immediate leak detection and real-time water quality tracking across simulated pipe junction test rigs.",
    process:
      "Wrote ESP32 C++ firmware -> Configured MQTT broker -> Built Firebase syncing logic -> Developed React monitoring interface.",
    apkUrl: "file/SmatPipe.apk",
    featured: true,
  },
  {
    id: "jobradar-ai",
    slug: "jobradar-ai",
    emoji: "📡",
    title: "JobRadar AI",
    badge: "Personal single-user application",
    category: "AI",
    role: "Full-Stack Developer",
    status: "Working Prototype",
    description:
      "A personal job-discovery and application-tracking dashboard that collects remote job listings, filters them according to selected roles and experience level, analyzes relevance, removes duplicates, and helps organize applications.",
    longDescription:
      "JobRadar AI is a personal productivity tool built to streamline my remote job search. The system ingests public job board feeds and alert emails, normalizes data schema, filters out non-target or senior-only roles, passes job descriptions to Gemini AI for compatibility scoring against my actual skills, and organizes applications in a Kanban CRM dashboard.",
    problem:
      "Sifting through hundreds of job listings across multiple platforms manually is time-consuming, repetitive, and often results in applying to positions outside target experience levels.",
    solution:
      "Engineered a personal single-user dashboard that automates collection, excludes senior/unrelated listings, scores job relevance using AI, and tracks application stages.",
    technologies: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Express",
      "Node.js",
      "n8n",
      "Gemini AI",
      "Tailwind CSS",
    ],
    features: [
      "Automated collection of remote job listings from public APIs.",
      "Remote-role and target-experience filtering.",
      "AI relevance classification and compatibility scoring.",
      "Senior-role and irrelevant keyword exclusion rules.",
      "Duplicate listing detection using canonical URL hashing.",
      "Application tracking pipeline (Saved -> Applied -> Interviewing -> Offer).",
      "Telegram alerts for high-compatibility matches.",
    ],
    whatWorks: [
      "Multi-source job listing aggregation.",
      "Automatic exclusion of senior/principal roles based on keyword rules.",
      "AI compatibility scoring and matched/missing skill analysis.",
      "Application CRM dashboard for tracking status.",
    ],
    architecture:
      "Public Job APIs & Ingest → Express Proxy / n8n → Gemini AI Scorer → Supabase Database → React CRM UI",
    technicalDecisions:
      "Used Express as a proxy server to secure API secrets away from client code. Utilized URL canonical hashing to ensure the database stays free of duplicate listings.",
    challenges:
      "Handling variations in job description formats across platforms. Addressed by building a normalization parser prior to AI scoring.",
    lessonsLearned:
      "Building tools for personal use provides immediate feedback on usability, rate limiting, and data accuracy.",
    currentLimitations:
      "Designed specifically as a personal single-user application rather than a public SaaS platform.",
    results:
      "Built a reliable automated job search dashboard that saves hours of manual searching and keeps application statuses organized.",
    process:
      "Structured database schema in Supabase -> Built Express API proxy -> Designed n8n ingestion workflow -> Built React Kanban dashboard.",
    image: "img/Jobs.png",
    images: [
      "img/Jobs.png",
      "img/High-Match Email Notification.png",
      "img/JobRadar AI — AI Job Matcher.png",
      "img/JobRadar AI — Remote Job Collector — Production.png",
    ],
    liveUrl: "https://job-radar-ai-frontend.vercel.app/demo",
    accessNote:
      "Personal single-user application built for individual job search organization.",
    featured: true,
  },
  {
    id: "tiktok-shop-automation",
    slug: "tiktok-shop-automation",
    emoji: "🛒",
    title: "TikTok Shop Order Automation",
    category: "AI",
    role: "Full-Stack Developer",
    status: "Working Prototype",
    description:
      "An n8n workflow system that processes e-commerce order webhooks, validates incoming data, manages inventory updates, and sends Telegram alerts.",
    longDescription:
      "Part of the OmniCommerce automation framework, this project handles order processing workflows. It listens for order webhooks, verifies external order IDs to prevent duplicate processing, updates Supabase product inventory, and notifies business operators via Telegram.",
    problem:
      "Manual processing of incoming social-commerce orders leads to delays in inventory sync and duplicate order entries.",
    solution:
      "Engineered automated n8n workflows with built-in deduplication branches, Supabase inventory checks, and real-time Telegram notifications.",
    technologies: [
      "n8n",
      "Supabase",
      "PostgreSQL",
      "Telegram Bot API",
      "Webhooks",
      "JavaScript",
    ],
    features: [
      "Order webhook ingestion and payload validation.",
      "Duplicate order protection using external order ID lookup.",
      "Supabase inventory count auto-deduction.",
      "Telegram operator alert dispatch with order details.",
    ],
    whatWorks: [
      "Webhook order reception.",
      "Database lookup & deduplication.",
      "Telegram notification dispatch.",
    ],
    architecture:
      "Incoming Webhook → Validation → New Order Branch → Supabase Record → Telegram Notification",
    technicalDecisions:
      "Implemented unique key database checks in n8n prior to running supplier processing.",
    challenges:
      "Preventing duplicate executions when webhooks retry. Solved using database uniqueness constraints.",
    lessonsLearned: "Robust webhook handlers must always be idempotent.",
    currentLimitations:
      "Uses simulated order webhooks for demonstration purposes.",
    results:
      "Demonstrated reliable automated order ingestion with operator notifications.",
    process:
      "Configured n8n webhook nodes -> Connected Supabase client -> Integrated Telegram Bot.",
    image: "img/01-Order Processing.png",
    images: ["img/01-Order Processing.png"],
    githubUrl: "https://github.com/RaizelHub/OmniEcommerce-ai",
    featured: false,
  },
  {
    id: "point-of-sale-system",
    slug: "point-of-sale-system",
    emoji: "📊",
    title: "Point of Sale (POS) & Inventory System",
    category: "Web",
    role: "Full-Stack Developer",
    status: "Academic Project",
    description:
      "A web-based Point of Sale system for retail environments featuring barcode lookup, inventory deductions, shift cash auditing, and multi-client sync via Socket.io.",
    longDescription:
      "A full-stack POS application built for academic project requirements using the MERN stack. Features an interactive checkout counter, barcode scanner integration, stock deduction triggers, shift end cash auditing, and real-time state sync across multiple cashier terminals using Socket.io and Redis.",
    problem:
      "Small retail stores lack simple digital checkout systems, leading to manual bookkeeping errors and stock miscounts.",
    solution:
      "Built a unified web dashboard with Socket.io multi-terminal syncing, automatic stock deduction, and shift audit logs.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Redis",
      "Tailwind CSS",
    ],
    features: [
      "Barcode lookup checkout register.",
      "Automatic stock level deduction on checkout.",
      "Shift sales summary and cash drawer variance reporting.",
      "Real-time multi-terminal state sync using Socket.io & Redis.",
    ],
    whatWorks: [
      "Barcode scanner item addition.",
      "Inventory decrementing in MongoDB.",
      "Multi-cashier terminal synchronization.",
    ],
    architecture:
      "React Frontend → Express API & Socket.io → Redis Adapter → MongoDB Database",
    technicalDecisions:
      "Used Redis adapter for Socket.io to allow horizontal scaling across server instances.",
    challenges:
      "Preventing race conditions when multiple cashiers check out the same product simultaneously. Resolved with atomic MongoDB updates.",
    lessonsLearned:
      "Real-time multi-client state requires server-side validation for concurrency control.",
    currentLimitations:
      "Academic project environment hosted for demonstration.",
    results:
      "Built a responsive web POS system with real-time inventory tracking.",
    process:
      "Designed MongoDB schemas -> Built Socket.io gateway -> Created React checkout UI.",
    image: "img/Posphoto.png",
    images: ["img/Posphoto.png"],
    liveUrl: "https://pos-five-flax.vercel.app/",
    githubUrl: "https://github.com/RaizelHub",
    featured: false,
  },
  {
    id: "boarding-house-finder",
    slug: "boarding-house-finder",
    emoji: "🏠",
    title: "Boarding House Finder",
    category: "Mobile",
    role: "Full-Stack Developer",
    status: "Academic Project",
    description:
      "Android application helping university students locate nearby accommodation with map pins, landlord contact information, and route directions.",
    longDescription:
      "Built natively for Android, this application simplifies accommodation search for university students. Landlords upload property photos and room availability, while students view nearby listings on Google Maps.",
    problem:
      "Students moving to new university areas struggle to find verified vacant boarding houses.",
    solution:
      "Created a native Java Android app using Google Maps API and Firebase for real-time room status updates.",
    technologies: [
      "Android Studio",
      "Java",
      "Firebase Realtime Database",
      "Google Maps API",
    ],
    features: [
      "Google Maps pin integration for accommodation locations.",
      "Filter listings by price, room type, and distance.",
      "Landlord room status management dashboard.",
    ],
    whatWorks: [
      "Interactive map marker rendering.",
      "Firebase data synchronization for active listings.",
    ],
    architecture:
      "Android Java Client → Firebase Realtime DB → Google Maps SDK",
    technicalDecisions:
      "Leveraged Firebase for instant real-time status updates when room vacancies change.",
    challenges:
      "Managing Google Maps API request budgets and map rendering performance.",
    lessonsLearned:
      "Location-based mobile apps require efficient location polling strategies.",
    currentLimitations:
      "Academic prototype tailored for local campus surroundings.",
    results:
      "Successfully demonstrated map-based boarding house search functionality.",
    process:
      "Designed XML layouts -> Connected Google Maps SDK -> Set up Firebase DB.",
    githubUrl: "https://github.com/RaizelHub",
    featured: false,
  },
  {
    id: "student-attendance-management-system",
    slug: "student-attendance-management-system",
    emoji: "🎓",
    title: "Student Attendance Management System",
    category: "Desktop",
    role: "Full-Stack Developer",
    status: "Academic Project",
    description:
      "Desktop-based attendance tracker built with C# Windows Forms and MySQL, supporting student ID card and QR code check-ins.",
    longDescription:
      "A desktop application created for academic institutional record keeping. Supports rapid student check-in via QR code scanning or manual ID entry, updates attendance logs in MySQL, and exports monthly report sheets.",
    problem:
      "Manual paper attendance tracking in classrooms is slow and susceptible to lost records.",
    solution:
      "Developed a C# desktop application connected to a local MySQL database with automatic check-in time logging.",
    technologies: ["C#", ".NET Windows Forms", "MySQL", "ZXing.Net (QR Code)"],
    features: [
      "QR code scanner input processing.",
      "Real-time student check-in log stream.",
      "MySQL database storage for student records.",
      "CSV/Excel report export utility.",
    ],
    whatWorks: [
      "Webcam QR code scanning.",
      "Database log insertion.",
      "Excel report generation.",
    ],
    architecture:
      "QR Scanner / Webcam → C# Windows Forms App → MySQL Database → Report Exporter",
    technicalDecisions:
      "Used asynchronous C# background threads to process scanner inputs without locking the desktop UI.",
    challenges:
      "Preventing UI freezes during rapid scanner inputs. Resolved using thread pooling.",
    lessonsLearned:
      "Desktop application design requires careful handling of UI thread responsiveness.",
    currentLimitations:
      "Desktop-only application built for local Windows environments.",
    results: "Processed fast student check-ins during academic testing.",
    process:
      "Designed C# UI Forms -> Built MySQL schema -> Implemented QR scanning library.",
    image: "img/studentmanagement.png",
    images: ["img/studentmanagement.png", "img/addstudent.png"],
    githubUrl: "https://github.com/RaizelHub",
    featured: false,
  },
  {
    id: "laravel-tenancy-reviewer-center",
    slug: "laravel-tenancy-reviewer-center",
    emoji: "🏢",
    title: "Multi-Tenant Reviewer Center",
    category: "SaaS",
    role: "Full-Stack Developer",
    status: "Working Prototype",
    description:
      "A multi-tenant management platform using Laravel Tenancy, allowing multiple review branches to operate independently within one system.",
    longDescription:
      "Built using Laravel and the stancl/tenancy package, this project provides database-per-tenant isolation for review centers. Each branch gets its own database schema, isolated student test records, and subdomain routing.",
    problem:
      "Operating separate server deployments for multiple company branches creates maintenance overhead and deployment complexity.",
    solution:
      "Engineered multi-tenant architecture isolating databases dynamically per subdomain request.",
    technologies: ["Laravel", "PHP", "MySQL", "Laravel Tenancy", "Bootstrap"],
    features: [
      "Tenant isolation per subdomain.",
      "Automatic schema migration hooks per branch database.",
      "Role-based access control (Admin, Instructor, Student).",
    ],
    whatWorks: [
      "Subdomain tenant identification.",
      "Isolated database connection switching.",
    ],
    architecture:
      "Subdomain Request → Laravel Tenancy Middleware → Specific Tenant MySQL DB → Tenant Views",
    technicalDecisions:
      "Chosen multi-database tenancy for complete data isolation compliance.",
    challenges:
      "Managing schema migrations across multiple tenant databases cleanly.",
    lessonsLearned:
      "Multi-tenancy requires strict middleware enforcement to prevent data leakage.",
    currentLimitations:
      "Working prototype requiring production domain wildcard DNS configuration.",
    results: "Demonstrated single-codebase multi-tenant branch management.",
    process:
      "Configured Laravel Tenancy package -> Built migration pipelines -> Created tenant management UI.",
    image: "img/Tenancy.png",
    images: ["img/Tenancy.png"],
    githubUrl: "https://github.com/RaizelHub",
    featured: false,
  },
  {
    id: "codementorbot",
    slug: "codementorbot",
    emoji: "🤖",
    title: "CodeMentorBot — AI Telegram Assistant",
    category: "AI",
    role: "Full-Stack Developer",
    status: "Working Prototype",
    description:
      "A Telegram bot running a local Ollama model to track developer coding progress, award streak achievements, and answer coding questions.",
    longDescription:
      "A developer productivity bot connected to a local Ollama LLM instance. It gamifies daily coding habits by tracking user hours, suggesting coding challenges, and reviewing syntax.",
    problem:
      "Self-taught students lose motivation without consistent tracking or immediate answers to coding syntax questions.",
    solution:
      "Wrote a Python Telegram bot connected to SQLite and a local Ollama model for free, non-subscription AI responses.",
    technologies: ["Python", "Telegram Bot API", "SQLite", "Ollama (Llama 3)"],
    features: [
      "Telegram AI chat interface for code syntax questions.",
      "Daily streak tracker backed by SQLite.",
      "Zero external API cost utilizing local Ollama LLM.",
    ],
    whatWorks: [
      "Telegram message handling.",
      "Ollama local inference integration.",
      "SQLite progress logging.",
    ],
    architecture:
      "User Telegram Message → Python Bot Service → Local Ollama LLM → SQLite DB",
    technicalDecisions:
      "Used local Ollama models to ensure response generation without per-token subscription API costs.",
    challenges:
      "Managing inference speed on CPU hardware. Resolved by tuning system prompt length.",
    lessonsLearned:
      "Local open-weight LLMs provide cost-effective solutions for personal automation assistants.",
    currentLimitations:
      "Requires host machine to run the Ollama background daemon.",
    results: "Deployed a cost-free personal Telegram developer mentor bot.",
    process:
      "Wrote python-telegram-bot logic -> Configured SQLite schema -> Integrated Ollama HTTP endpoints.",
    githubUrl: "https://github.com/RaizelHub",
    featured: false,
  },
];
