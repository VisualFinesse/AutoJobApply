const fs = require('fs');
const { chromium } = require('./tests/setup');
const { expect } = require('@playwright/test');

const startingUrl = 'https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/';

// Define the type for captured actions
type CapturedAction = {
  url: string;
  actions: string[];
};

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const visitedPages = new Set<string>();
  const capturedActions: CapturedAction[] = [];

  // Function to explore pages recursively
  async function explorePage(url: string, depth = 0) {
    if (visitedPages.has(url) || depth > 10) return; // Limit depth to avoid infinite recursion
    visitedPages.add(url);
    await page.goto(url);
    await capturePageActions(page, url); // Custom function to capture interactions and assertions

    // Extract links or perform actions on the page
    const links = await page.$$eval('a', anchors => anchors.map(a => a.href));

    for (const link of links) {
      await explorePage(link, depth + 1); // Recursive exploration
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

  // Start exploring from a given URL
  await explorePage(startingUrl);

  // Export generated tests
  const testsDirectory = './generated-tests';
  if (!fs.existsSync(testsDirectory)) {
    fs.mkdirSync(testsDirectory);
  }

  // Write generated tests to file
  fs.writeFileSync(`${testsDirectory}/generated-test.js`, generateTestScript());

  await browser.close();

  // Function to generate Playwright test script based on captured actions and assertions
  function generateTestScript() {
    let script = `
      const { test, expect } = require('@playwright/test');
    `;

    for (const { url, actions } of capturedActions) {
      script += `
        test('Test for ${url}', async ({ page }) => {
          await page.goto('${url}');
          ${actions.join('\n          ')}
        });
      `;
    }

    return script;
  }
})();
