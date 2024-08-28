// import playwright from 'playwright';

// (async () => {
//     for (const browserType of ['chromium', 'firefox', 'webkit']) {
//       const browser = await playwright[browserType].launch();
//       const context = await browser.newContext();
//       const page = await context.newPage();
//       console.log("I work")
//       await page.goto("https://amazon.com");
//       await page.screenshot({path: `nodejs_${browserType}.png`, fullPage: true});
//       await page.waitForTimeout(1000);
//       await browser.close();
//     };
//    })();


import test from "node:test";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// Optional: If you'd like to use the new headless mode. "shell" is the default.
// NOTE: Because we build the shell binary, this option does not work.
//       However, this option will stay so when we migrate to full chromium it will work.
chromium.setHeadlessMode = true;

// Optional: If you'd like to disable webgl, true is the default.
chromium.setGraphicsMode = false;

// Optional: Load any fonts you need. Open Sans is included by default in AWS Lambda instances
await chromium.font(
  "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
);

test("Check the page title of example.com", async (t) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: 'C:/Program Files/Chromium/Application',
    ignoreDefaultArgs: ['--disable-extensions'],
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://novelbjn.novelupdates.net/book/martial-god-asura-novel/chapter-4");
  const pageTitle = await page.title();
  await browser.close();

  assert.strictEqual(pageTitle, "Example Domain");
});
test()