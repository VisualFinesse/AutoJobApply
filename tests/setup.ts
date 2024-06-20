import { chromium as chromiumExtra } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';


// Add the stealth plugin to Playwright
chromiumExtra.use(stealth());

// Export the modified chromium instance
export const chromium = chromiumExtra;
