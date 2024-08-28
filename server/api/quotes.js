import puppeteerCore from 'puppeteer-core'; // Note: use puppeteer-core
import puppeteer from 'puppeteer'; 
import { getQuery } from 'h3';
import chromium from '@sparticuz/chromium';
// import edgeChromium from 'chrome-aws-lambda'
// const chromiumPath = process.env.CHROMIUM_PATH || 'C:/Program Files/Chromium/Application/chrome.exe';
export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);
  console.log("Received URL:", url);  // Log the URL received
  if (!url) {
    return { error: 'No URL provided' };
  }
// press space tab to bring book back up.

if (process.env.VERCEL_ENV === "production") {
  const executablePath = await chromium.executablePath();
  
  if (url.includes('https://novelfull.net/')) {
    try {
        const browser = await puppeteerCore.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath,
          headless: chromium.headless,
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

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
        const browser = await puppeteerCore.launch({
          args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath,
            headless: chromium.headless,
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  
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
    
}
else {
  const executablePath = process.env.CHROMIUM_PATH || 'C:/Program Files/Chromium/Application/chrome.exe';
  
  if (url.includes('https://novelfull.net/')) {
    try {
        const browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath,
          headless: false,
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });

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
    const executablePath = process.env.CHROMIUM_PATH || 'C:/Program Files/Chromium/Application/chrome.exe';
      try {
        // Launch a browser using Puppeteer
        const browser = await puppeteer.launch({
          args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath,
            headless: chromium.headless,
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });
  
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
    
}

// else if (url.includes('https://novelbjn.novelupdates.net/')) {
//   const executablePath = process.env.CHROMIUM_PATH || 'C:/Program Files/Chromium/Application/chrome.exe';
//     try {
//       // Launch a browser using Puppeteer
//       const browser = await puppeteerCore.launch({
//         args: chromium.args,
//           defaultViewport: chromium.defaultViewport,
//           executablePath,
//           headless: chromium.headless,
//       });
//       const page = await browser.newPage();
//       await page.goto(url, { waitUntil: 'domcontentloaded' });

//       const novel = await page.evaluate(() => {
//         const chapTitle = document.querySelector('.chr-title')?.innerText || 'No chapter title';
//         const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
//         const novelText = document.querySelector('.chr-c')?.innerText || 'No content';
//         const novelName = document.querySelector('.novel-title')?.innerText || 'No title';
        
//         return { chapTitle, novelName, novelText, nextChap };
//       });
      
//       await browser.close();
//       // console.log(novel);
//       return novel;
//     } catch (error) {
//       console.error('Puppeteer failed:', error);
//       return { error: 'Failed to scrape data' };
//     }
//   }


  // if (url.includes('https://novelfull.net/')) {
  //   try {
  //     // Launch a browser using Puppeteer
  //     const browser = await puppeteer.launch({
  //       // executablePath: chromiumPath, // Path to Chromium
  //       headless: "new",
  //       args: ["--no-sandbox", `--disable-gpu`, `--disable-dev-shm-usage`],
  //       ignoreDefaultArgs: ['--disable-extensions'],
  //     });
  //     const page = await browser.newPage();
  //     await page.goto(url, { waitUntil: 'domcontentloaded' });

  //     const novel = await page.evaluate(() => {
  //       const chapTitle = document.querySelector('.chapter-title')?.innerText || 'No chapter title';
  //       const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
  //       const novelText = document.querySelector('.chapter-c')?.innerText || 'No content';
  //       const novelName = document.querySelector('.truyen-title')?.innerText || 'No title';
        
  //       return { chapTitle, novelName, novelText, nextChap };
  //     });
      
  //     await browser.close();
  //     // console.log(novel);
  //     return novel;
      
  //   } catch (error) {
  //     console.error('Puppeteer failed:', error);
  //     return { error: 'Failed to scrape data' };
  //   }
  // } else if (url.includes('https://novelbjn.novelupdates.net/')) {
  //   try {
  //     // Launch a browser using Puppeteer
  //     const browser = await puppeteer.launch({
  //       // executablePath: chromiumPath, // Path to Chromium
  //       headless: "new",
  //       args: ["--no-sandbox", `--disable-gpu`, `--disable-dev-shm-usage`],
  //       ignoreDefaultArgs: ['--disable-extensions'],
  //     });
  //     const page = await browser.newPage();
  //     await page.goto(url, { waitUntil: 'domcontentloaded' });

  //     const novel = await page.evaluate(() => {
  //       const chapTitle = document.querySelector('.chr-title')?.innerText || 'No chapter title';
  //       const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
  //       const novelText = document.querySelector('.chr-c')?.innerText || 'No content';
  //       const novelName = document.querySelector('.novel-title')?.innerText || 'No title';
        
  //       return { chapTitle, novelName, novelText, nextChap };
  //     });
      
  //     await browser.close();
  //     // console.log(novel);
  //     return novel;
  //   } catch (error) {
  //     console.error('Puppeteer failed:', error);
  //     return { error: 'Failed to scrape data' };
  //   }
  // }


});

// import chromium  from 'playwright-aws-lambda';

// import { chromium } from 'playwright';
// import { getQuery } from 'h3';

// export default defineEventHandler(async (event) => {
//   const { url } = getQuery(event);
//   console.log("Received URL:", url);  // Log the received URL

//   if (!url) {
//     console.log("No URL provided");
//     return { error: 'No URL provided' };
//   }

//   if (url.includes('https://novelfull.net/')) {  
//     console.log("Processing Novelfull URL");
//     try {
//       const browser = await chromium.launch({ headless: true, args:[
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-dev-shm-usage',
//         '--disable-accelerated-2d-canvas',
//         '--no-zygote',
//         '--single-process'], executablePath: '/path/to/chrome' 
//       });
//       const page = await browser.newPage();
//       await page.goto(url, { waitUntil: 'domcontentloaded' });

//       const novel = await page.evaluate(() => {
//         const chapTitle = document.querySelector('.chapter-title')?.innerText || 'No chapter title';
//         const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
//         const novelText = document.querySelector('.chapter-c')?.innerText || 'No content';
//         const novelName = document.querySelector('.truyen-title')?.innerText || 'No title';
        
//         return { chapTitle, novelName, novelText, nextChap };
//       });

//       await browser.close();
//       console.log("Fetched Novel Data:", novel);  // Log the fetched data
//       return novel;
      
//     } catch (error) {
//       console.error('Playwright failed:', error);
//       return { error: 'Failed to scrape data' };
//     }
//   }

//   else if (url.includes('https://novelbjn.novelupdates.net/')) {
//     console.log("Processing NovelBJN URL");
//     try {
//       const browser = await chromium.launch({ headless: true });
//       const page = await browser.newPage();
//       await page.goto(url, { waitUntil: 'domcontentloaded' });

//       const novel = await page.evaluate(() => {
//         const chapTitle = document.querySelector('.chr-title')?.innerText || 'No chapter title';
//         const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
//         const novelText = document.querySelector('.chr-c')?.innerText || 'No content';
//         const novelName = document.querySelector('.novel-title')?.innerText || 'No title';
        
//         return { chapTitle, novelName, novelText, nextChap };
//       });

//       await browser.close();
//       console.log("Fetched NovelBJN Data:", novel);  // Log the fetched data
//       return novel;
//     } catch (error) {
//       console.error('Playwright failed:', error);
//       return { error: 'Failed to scrape data' };
//     }
//   }

// });



// import { chromium } from 'playwright';
// import playwright from 'playwright-aws-lambda';
// import { getQuery } from 'h3';

// export default defineEventHandler(async (event) => {
//   const { url } = getQuery(event);
//   console.log("Received URL:", url);  // Log the received URL

//   if (!url) {
//     console.log("No URL provided");
//     return { error: 'No URL provided' };
//   }

//   if (url.includes('https://novelfull.net/')) {  
//     console.log("Processing Novelfull URL");
//     try {
//       const browser = await playwright.launchChromium({ headless: true, args:[
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-dev-shm-usage',
//         ],ignoreDefaultArgs: ['--disable-extensions']
//       });
//       const page = await browser.newPage();
//       await page.goto(url, { waitUntil: 'domcontentloaded' });

//       const novel = await page.evaluate(() => {
//         const chapTitle = document.querySelector('.chapter-title')?.innerText || 'No chapter title';
//         const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
//         const novelText = document.querySelector('.chapter-c')?.innerText || 'No content';
//         const novelName = document.querySelector('.truyen-title')?.innerText || 'No title';
        
//         return { chapTitle, novelName, novelText, nextChap };
//       });

//       await browser.close();
//       console.log("Fetched Novel Data:", novel);  // Log the fetched data
//       return novel;
      
//     } catch (error) {
//       console.error('Playwright failed:', error);
//       return { error: 'Failed to scrape data' };
//     }
//   }

//   else if (url.includes('https://novelbjn.novelupdates.net/')) {
//     console.log("Processing NovelBJN URL");
//     try {
//       const browser = await playwright.launchChromium({ headless: true, args:[
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-dev-shm-usage',
//         ],
//         ignoreDefaultArgs: ['--disable-extensions']
//       });
//       const page = await browser.newPage();
//       await page.goto(url, { waitUntil: 'domcontentloaded' });

//       const novel = await page.evaluate(() => {
//         const chapTitle = document.querySelector('.chr-title')?.innerText || 'No chapter title';
//         const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
//         const novelText = document.querySelector('.chr-c')?.innerText || 'No content';
//         const novelName = document.querySelector('.novel-title')?.innerText || 'No title';
        
//         return { chapTitle, novelName, novelText, nextChap };
//       });

//       await browser.close();
//       console.log("Fetched NovelBJN Data:", novel);  // Log the fetched data
//       return novel;
//     } catch (error) {
//       console.error('Playwright failed:', error);
//       return { error: 'Failed to scrape data' };
//     }
//   }

// });
