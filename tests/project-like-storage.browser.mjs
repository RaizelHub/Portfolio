import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

// Reuse an existing Playwright installation; see docs/MONDAY_RELIABILITY.md.
const modulePath = process.env.PORTFOLIO_PLAYWRIGHT_PATH;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:5184';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
let checks = 0;
try {
  for (const width of [375, 1440]) {
    for (const saved of ['null', '[]', '"invalid"', '{broken', '{"collabcanvas":"false"}', '{"collabcanvas":true}']) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      try {
        // Do not write to real analytics or project-like services during tests.
        await context.route('**/*', route => {
          if (new URL(route.request().url()).origin === new URL(base).origin) return route.continue();
          return route.fulfill({ status: 200, contentType: 'application/json', body: '1' });
        });
        await context.addInitScript(value => {
          sessionStorage.setItem('portfolio_visit_recorded', '1');
          if (!sessionStorage.getItem('storage-fixture-seeded')) {
            localStorage.setItem('portfolio_user_liked_slugs_v1', value);
            localStorage.setItem('portfolio_project_like_counts_v1', value);
            sessionStorage.setItem('storage-fixture-seeded', '1');
          }
        }, saved);
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`${base}/projects/collabcanvas`);
        await page.getByRole('heading', { name: 'CollabCanvas — Whiteboard & Pages', exact: true }).waitFor();
        assert.equal(await page.getByText('Something went wrong. Try refreshing the page.').count(), 0);
        const appreciate = page.getByRole('button', { name: 'Appreciate CollabCanvas', exact: true });
        const previouslyLiked = saved === '{"collabcanvas":true}';
        assert.equal(await appreciate.isDisabled(), previouslyLiked);
        assert.equal(await appreciate.getAttribute('aria-pressed'), String(previouslyLiked));
        if (!previouslyLiked) {
          await appreciate.focus();
          await page.keyboard.press('Enter');
          await page.getByText('Liked on this device', { exact: true }).waitFor();
          await page.reload();
          await page.getByText('Liked on this device', { exact: true }).waitFor();
          assert.equal(await appreciate.isDisabled(), true);
        }
        await page.getByRole('link', { name: 'All projects', exact: true }).first().click();
        await page.waitForURL(`${base}/projects`);
        assert.equal(errors.length, 0, errors.join('\n'));
        console.log(`PASS ${width}px saved=${saved}: renders, preserves or saves like, reloads, navigates`);
        checks++;
      } finally { await context.close(); }
    }
  }
  console.log(`${checks} browser regression scenarios passed`);
} finally { await browser.close(); }
