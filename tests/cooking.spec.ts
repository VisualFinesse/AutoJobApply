import { test, expect } from '@playwright/test';
import { chromiumWithStealth as chromium } from '../setup';
import fs from 'fs';
import path from 'path';

type CapturedAction = {
  url: string;
  actions: string[];
};

const visitedPages = new Set<string>();
const capturedActions: CapturedAction[] = [];

// Function to explore pages recursively
async function explorePage(page: any, url: string, baseUrl: string) {
  if (visitedPages.size >= 1000 || visitedPages.has(url)) return;
  visitedPages.add(url);
  await page.goto(url);
  await capturePageActions(page, url);

  // Extract links or perform actions on the page
  const links = await page.$$eval('a', (anchors: HTMLAnchorElement[]) => anchors.map(a => a.href));

  // Explore links
  for (const link of links) {
    if (link.startsWith(baseUrl) && !visitedPages.has(link)) {
      await explorePage(page, link, baseUrl);
      const newPage = await page.context().newPage();
      await explorePage(newPage, link, baseUrl);
      await newPage.close();
    }
  }

  // Click buttons and check for new routes/endpoints
  const buttons = await page.$$('button');
  for (const button of buttons) {
    try {
      await button.click();
      await page.waitForLoadState('networkidle'); // Wait for network to be idle or timeout after 7 seconds
      const newUrl = page.url();
      if (newUrl.startsWith(baseUrl) && !visitedPages.has(newUrl)) {
        const newPage = await page.context().newPage();
        await explorePage(newPage, newUrl, baseUrl);
        await newPage.close();
      }
    } catch (e) {
      console.log(`Failed to click button: ${(e as Error).message}`);
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
      console.log(`Failed to click button: ${(e as Error).message}`);
    }
  }

  const selects = await page.$$('select');
  for (const select of selects) {
    try {
      await select.selectOption({ index: 0 });
      actions.push(`await page.selectOption('select', { index: 0 }); // Select first option`);
    } catch (e) {
      console.log(`Failed to select option: ${(e as Error).message}`);
    }
  }

  // Capture assertions dynamically
  const pageTitle = await page.title();
  actions.push(`const pageTitle = await page.title();`);
  actions.push(`expect(pageTitle).toContain('${pageTitle}'); // Check page title`);

  const isElementVisible = await page.isVisible('.important-element');
  if (isElementVisible) {
    actions.push(`const isElementVisible = await page.isVisible('.important-element');`);
    actions.push(`expect(isElementVisible).toBeTruthy(); // Check element visibility`);
  }

  // Store captured actions for the URL
  capturedActions.push({ url, actions });
}

// Function to generate Playwright test script based on captured actions and assertions
function generateTestScript(baseUrl: string) {
  let script = `
import { test, expect } from '@playwright/test';

  `;

  for (const { url, actions } of capturedActions) {
    const title = url === baseUrl ? new URL(baseUrl).hostname : path.basename(url);
    script += `
test('Test for ${title}', async ({ page }) => {
  await page.goto('${url}');
  ${actions.join('\n  ')}
});
    `;
  }

  return script;
}

// Playwright test suite
const baseUrl = 'https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io';
test.describe('Dynamic Page Explorer', () => {
  test('Explore pages and generate tests', async ({ page }) => {
    await explorePage(page, baseUrl, baseUrl);

    // Export generated tests
    const testsDirectory = './generated-tests';
    if (!fs.existsSync(testsDirectory)) {
      fs.mkdirSync(testsDirectory);
    }

    // Write generated tests to file
    fs.writeFileSync(`${testsDirectory}/generated-test.ts`, generateTestScript(baseUrl));
  });
});
