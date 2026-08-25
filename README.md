# Janmark Suelto — Portfolio

React and TypeScript portfolio with project case studies, privacy-safe anonymous visitor profiles, and an optional walkable realtime collaboration studio at `/collab`.

## Local development

```bash
npm install
npm run dev
```

The standard production check is:

```bash
npm run build
```

## Supabase

Copy `.env.example` to `.env` and provide the public Supabase project URL and anonymous key.

The Collab backend is defined in:

```text
supabase/migrations/20260826000001_create_portfolio_collab.sql
```

Before publishing Collab:

1. Enable Anonymous Sign-Ins in Supabase Authentication.
2. Apply the migration with the Supabase CLI or SQL editor.
3. Keep the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables configured in the hosting platform.

The migration provides authenticated anonymous ownership, server-enforced content limits, rate limits, reporting, service-role moderation, and Realtime delivery. If the backend is not ready, the room still supports shared presence and the canvas falls back to clearly labeled device-local drafts.

