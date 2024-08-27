import playwright from 'playwright';

(async () => {
    for (const browserType of ['chromium', 'firefox', 'webkit']) {
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      console.log("I work")
      await page.goto("https://amazon.com");
      await page.screenshot({path: `nodejs_${browserType}.png`, fullPage: true});
      await page.waitForTimeout(1000);
      await browser.close();
    };
   })();
