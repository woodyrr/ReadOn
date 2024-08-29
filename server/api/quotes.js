import puppeteerCore from 'puppeteer-core'; // Note: use puppeteer-core
import puppeteer from 'puppeteer'; 
import { getQuery } from 'h3';
import chromium from '@sparticuz/chromium';
// import edgeChromium from 'chrome-aws-lambda'
// const chromiumPath = process.env.CHROMIUM_PATH || 'C:/Program Files/Chromium/Application/chrome.exe';


export default defineEventHandler(async (event) => {

  let executablePath;
    if (process.env.VERCEL_ENV === "production") {
        executablePath = await chromium.executablePath();
    } else {
    executablePath = process.env.CHROMIUM_PATH || 'C:/Program Files/Chromium/Application/chrome.exe';
    }

  
  const { url } = getQuery(event);
  console.log("Received URL:", url);  // Log the URL received
  if (!url) {
    return { error: 'No URL provided' };
  }
// press space tab to bring book back up.

// if (process.env.VERCEL_ENV === "production") {
//   const executablePath = await chromium.executablePath();
  
  if (url.includes('https://novelfull.net/')) {
    try {
        const browser = await puppeteer.launch({
          // args: chromium.args,
          args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--deterministic-fetch',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            // '--single-process',
        ],
          defaultViewport: chromium.defaultViewport,
          executablePath,
          headless: chromium.headless,
        });
        const page = await browser.newPage();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
        // await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 }); // 10 seconds
        await page.waitForSelector('body');
        const novel = await page.evaluate(() => {
            const chapTitle = document.querySelector('.chapter-title')?.innerText || 'No chapter title';
            const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
            const novelText = document.querySelector('.chapter-c')?.innerText || 'No content';
            const novelName = document.querySelector('.truyen-title')?.innerText || 'No title';
            return { chapTitle, novelName, novelText, nextChap };
        });
            await browser.close();
              // console.log(novel);
            return novel;
            } 
    catch (error) {
        console.error('Puppeteer failed:', error);
        return { error: 'Failed to scrape data' };
    }
  }
  else if (url.includes('https://novelbjn.novelupdates.net/')) {
    
      try {
        // Launch a browser using Puppeteer
        const browser = await puppeteer.launch({
          // args: chromium.args,
          args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--deterministic-fetch',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
            // '--single-process',
        ],
            defaultViewport: chromium.defaultViewport,
            executablePath,
            headless: chromium.headless,
        });
        const page = await browser.newPage();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
        // await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 }); // 10 seconds
        await page.waitForSelector('body');
        const novel = await page.evaluate(() => {
          const chapTitle = document.querySelector('.chr-title')?.innerText || 'No chapter title';
          const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
          const novelText = document.querySelector('.chr-c')?.innerText || 'No content';
          const novelName = document.querySelector('.novel-title')?.innerText || 'No title';
          
          return { chapTitle, novelName, novelText, nextChap };
        });
        
        await browser.close();
        // console.log(novel);
        return novel;
      } catch (error) {
        console.error('Puppeteer failed:', error);
        return { error: 'Failed to scrape data' };
      }
    }
});