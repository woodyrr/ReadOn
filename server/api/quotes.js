// // server/api/quotes.js
// import puppeteer from 'puppeteer';
// // import playwright from 'playwright'
// import { getQuery } from 'h3';
// export default defineEventHandler(async (event) => {

//   const { url } = getQuery(event);

//   if (!url) {
//     return { error: 'No URL provided' };
//   }

//   //novell full
// if(url.includes('https://novelfull.net/')){

//   try {
//     const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
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
//     return novel;
//   } catch (error) {
//     console.error('Puppeteer failed:', error);
//     return { error: 'Failed to scrape data' };
//   }
// }


// else if(url.includes('https://novelbjn.novelupdates.net/')){
//   try {
//     const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'domcontentloaded' });


//     const novel = await page.evaluate(() => {
//           const chapTitle = document.querySelector('.chr-title')?.innerText || 'No chapter title';
//           const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
//           const novelText = document.querySelector('.chr-c')?.innerText || 'No content';
//           const novelName = document.querySelector('.novel-title')?.innerText || 'No title';
      
//       return { chapTitle, novelName, novelText, nextChap };
//     });
    
//     console.log(novel);
//     await browser.close();
//     return novel;
//   } catch (error) {
//     console.error('Puppeteer failed:', error);
//     return { error: 'Failed to scrape data' };
//   }

// }

// });

import { chromium } from 'playwright'; // Change to Playwright import
import { getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);

  if (!url) {
    return { error: 'No URL provided' };
  }

if(url.includes('https://novelfull.net/')){  
  
  try {
    // Launch a browser using Playwright
    const browser = await chromium.launch({ headless: true });
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
    return novel;
  } catch (error) {
    console.error('Playwright failed:', error);
    return { error: 'Failed to scrape data' };
  }
}

else if(url.includes('https://novelbjn.novelupdates.net/')){

  try {
    // Launch a browser using Playwright
    const browser = await chromium.launch({ headless: true });
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
    return novel;
  } catch (error) {
    console.error('Playwright failed:', error);
    return { error: 'Failed to scrape data' };
  }
}

});
