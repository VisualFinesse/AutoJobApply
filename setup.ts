import { chromium } from 'playwright';
import { addExtra } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

// Add the stealth plugin to Playwright
const chromiumExtra = addExtra(chromium);
chromiumExtra.use(stealth());

// Export the modified chromium instance
export const chromiumWithStealth = chromiumExtra;
