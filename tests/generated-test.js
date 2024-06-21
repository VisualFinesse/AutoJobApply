
    const { test, expect } = require('@playwright/test');
  
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Visual Finesse Inc.'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/portfolio', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/portfolio');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Portfolio'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/services', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/services');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Services'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/about', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/about');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('About'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/contact', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/contact');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Contact'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/free-stuff', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/free-stuff');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Free Stuff'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/faq', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/faq');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('FAQ'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Visual Finesse Inc.'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/photo-gallery', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/photo-gallery');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Photo Gallery'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/photo-gallery#', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/photo-gallery#');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Photo Gallery'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/video-gallery', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/video-gallery');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Video Gallery'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/web-gallery', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/web-gallery');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Web Gallery'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/web-gallery#', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/web-gallery#');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Web Gallery'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/privacy-policy', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/privacy-policy');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('Privacy Policy'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    
      test('Test for https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/services-full', async ({ page }) => {
        await page.goto('https://visual-finesse-inc-5bd58e-9a74b894a540a.webflow.io/services-full');
        const pageTitle = await page.title();
        expect(pageTitle).toContain('SERVICES-FULL'); // Check page title
        const isElementVisible = await page.isVisible('.important-element');
        expect(isElementVisible).toBeTruthy(); // Check element visibility
      });
    