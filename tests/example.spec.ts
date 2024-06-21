import { test, expect } from '@playwright/test';
import { chromium as chromiumExtra } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

// Add the stealth plugin to Playwright
chromiumExtra.use(stealth());

type CapturedAction = {
  url: string;
  actions: string[];
};

const visitedPages = new Set<string>();
const capturedActions: CapturedAction[] = [];

// Function to explore pages recursively
async function explorePage(page: any, url: string) {
  if (visitedPages.size >= 1000 || visitedPages.has(url)) return;
  visitedPages.add(url);
  await page.goto(url);
  await capturePageActions(page, url);

  // Extract links or perform actions on the page
  const links = await page.$$eval('a', anchors => anchors.map(a => a.href));
  const buttons = await page.$$('button');

  // Explore links
  for (const link of links) {
    if (!visitedPages.has(link)) {
      await explorePage(page, link);
    }
  }

  // Click buttons and check for new routes/endpoints
  for (const button of buttons) {
    try {
      await button.click();
      await page.waitForLoadState('networkidle'); // Wait for network to be idle or timeout after 7 seconds
      const newUrl = page.url();
      if (!visitedPages.has(newUrl)) {
        await explorePage(page, newUrl);
      }
    } catch (e) {
      console.log(`Failed to click button: ${e.message}`);
    }
  }
}

// Function to capture page actions and interactions
async function capturePageActions(page: any, url: string) {
  // Wait for network to be idle or timeout after 7 seconds
  await Promise.race([
    page.waitForLoadState('networkidle'),
    new Promise(resolve => setTimeout(resolve, 7000))
  ]);

  // Capture interactions dynamically
  const actions: string[] = [];
  const buttons = await page.$$('button');
  for (const button of buttons) {
    try {
      await button.click();
      actions.push(`await page.click('button'); // Click button`);
    } catch (e) {
      console.log(`Failed to click button: ${e.message}`);
    }
  }

  const selects = await page.$$('select');
  for (const select of selects) {
    try {
      await select.selectOption({ index: 0 });
      actions.push(`await page.selectOption('select', { index: 0 }); // Select first option`);
    } catch (e) {
      console.log(`Failed to select option: ${e.message}`);
    }
  }

  // Capture assertions dynamically
  const pageTitle = await page.title();
  actions.push(`const pageTitle = await page.title();`);
  actions.push(`expect(pageTitle).toContain('${pageTitle}'); // Check page title`);

  const isElementVisible = await page.isVisible('.important-element');
  actions.push(`const isElementVisible = await page.isVisible('.important-element');`);
  actions.push(`expect(isElementVisible).toBeTruthy(); // Check element visibility`);

  // Store captured actions for the URL
  capturedActions.push({ url, actions });
}

// Function to generate Playwright test script based on captured actions and assertions
function generateTestScript() {
  let script = `
    const { test, expect } = require('@playwright/test');
  `;

  for (const { url, actions } of capturedActions) {
    script += `
      test('Test for ${url}', async ({ page }) => {
        await page.goto('${url}');
        ${actions.join('\n        ')}
      });
    `;
  }

  return script;
}

// Playwright test suite
test.describe('Dynamic Page Explorer', () => {
  test('Explore pages and generate tests', async ({ page }) => {
    const startingUrl = 'https://example.com';
    await explorePage(page, startingUrl);

    // Export generated tests
    const testsDirectory = './generated-tests';
    if (!fs.existsSync(testsDirectory)) {
      fs.mkdirSync(testsDirectory);
    }

    // Write generated tests to file
    fs.writeFileSync(`${testsDirectory}/generated-test.js`, generateTestScript());
  });
});
