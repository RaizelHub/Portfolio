# Portfolio reliability audit — 9 November 2026

## Selected issue

Valid JSON with an invalid shape in saved project likes could crash a case study.
Before the fix, setting `portfolio_user_liked_slugs_v1` in localStorage to `null`
and opening `/projects/collabcanvas` displayed the error boundary instead of the
project. This was reproduced in Chrome. JSON parsing succeeded, but the result
was dereferenced as a record without runtime validation. The count cache had
the same unchecked parsing pattern.

The storage helpers now reject null, arrays, primitives, and invalid entries,
while preserving valid saved likes and nonnegative integer counts. Storage
failures remain safe. The existing exports and storage keys are preserved.
Extracting these helpers allows dependency-free tests without loading Supabase.
No design, project content, destinations, or backend behavior was changed.

## Audit evidence and limits

- Checked 16 project records: core case-study fields and referenced local assets
  were present, including gallery, architecture, and APK references.
- Visited 24 routes at 375, 768, and 1440 pixels (72 combinations). No horizontal
  overflow, broken rendered images, unlabeled buttons, or uncaught page errors
  were observed in the normal-state checks.
- Mobile drawer opening, Escape dismissal, focus restoration, and project search
  empty state worked.
- Checked 16 external destinations. Fifteen returned HTTP 200, including project
  repositories and application URLs. LinkedIn returned 999, so its availability
  requires manual verification. Messenger redirected to login.
- HTTP reachability does not establish that authenticated application workflows
  work. Browser checks stubbed external services and did not exercise live
  analytics, Supabase writes, or contact delivery. This was not a complete
  screen-reader or accessibility conformance audit.
- There was no tracked automated test suite or test command at audit start.

## Regression tests and reproduction

Run `npm test` for 12 Node tests covering invalid JSON and record shapes,
invalid entry types, valid existing data, inherited property names, unavailable
storage, and server-side execution. Tested with Node 26.5.0; the runner uses
Node's built-in TypeScript stripping. No dependencies were added.

The optional browser test requires an existing Playwright installation and
system Chrome. Start the local server in one PowerShell terminal:

```powershell
npm run dev -- --host 127.0.0.1 --port 5184
```

Then run in another terminal, pointing to an existing Playwright entry file:

```powershell
$env:PORTFOLIO_PLAYWRIGHT_PATH = 'D:/MySystems/collab-canvas/node_modules/playwright/index.mjs'
npm run test:browser
```

Alternatively, an already available `playwright` package can be resolved without
that variable. `PORTFOLIO_BASE_URL` overrides the default local server address.
The browser suite checks six storage fixtures at two widths, including keyboard
activation, accessible button state, reload persistence, navigation back to
projects, and absence of uncaught errors. External requests are intercepted to
avoid writing real likes or analytics.

## Quality checks

- Node tests: 12 passed.
- Browser regressions: all 12 scenarios passed at 375 and 1440 pixels.
- TypeScript: passed through `tsc -b` in the production build.
- Lint: no errors; two existing Fast Refresh warnings in ThemeContext.tsx and
  SoundContext.tsx remain.
- Production build: passed; Vite reported a resolver plugin timing advisory.

An initial development dependency scan also warned about a `chrome` import in
an old, ignored browser profile under portfolio-screenshots. The development
server recovered and the route checks completed. That local artifact issue
is outside this single-fix change.

All changes are left uncommitted. No deployment was performed.
