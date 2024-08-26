// server/api/quotes.js
import puppeteer from 'puppeteer';
import { getQuery } from 'h3';
export default defineEventHandler(async (event) => {

 //novellbin

  // try {
  //   const browser = await puppeteer.launch({ headless: true });
  //   const page = await browser.newPage();
  //   await page.goto('https://novelbjn.novelupdates.net/book/martial-god-asura-novel/chapter-1', { waitUntil: 'domcontentloaded' });

  //   const novel = await page.evaluate(() => {
  //     const chapTitle = document.querySelector('.chr-title')?.innerText || 'No chapter title';
  //     const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
  //     const novelText = document.querySelector('.chr-c')?.innerText || 'No content';
  //     const novelName = document.querySelector('.novel-title')?.innerText || 'No title';
      
  //     return { chapTitle, novelName, novelText, nextChap };
  //   });
    
  //   console.log(novel);
  //   await browser.close();
  //   return novel;
  // } catch (error) {
  //   console.error('Puppeteer failed:', error);
  //   return { error: 'Failed to scrape data' };
  // }
  const { url } = getQuery(event);

  if (!url) {
    return { error: 'No URL provided' };
  }

  //novell full

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const novel = await page.evaluate(() => {
      const chapTitle = document.querySelector('.chapter-title')?.innerText || 'No chapter title';
      const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
      const novelText = document.querySelector('.chapter-c')?.innerText || 'No content';
      const novelName = document.querySelector('.truyen-title')?.innerText || 'No title';
      
      return { chapTitle, novelName, novelText, nextChap };
    });
    
    console.log(novel);
    await browser.close();
    return novel;
  } catch (error) {
    console.error('Puppeteer failed:', error);
    return { error: 'Failed to scrape data' };
  }




  // try {
  //   const browser = await puppeteer.launch({ headless: true });
  //   const page = await browser.newPage();
  //   await page.goto('https://novelfull.net/martial-god-asura/chapter-2-beauty-elder.html', { waitUntil: 'domcontentloaded' });

  //   const novel = await page.evaluate(() => {
  //     const chapTitle = document.querySelector('.chapter-title')?.innerText || 'No chapter title';
  //     const nextChap = document.querySelector('.btn-group #next_chap')?.innerText || 'No next chapter link';
  //     const novelText = document.querySelector('.chapter-c')?.innerText || 'No content';
  //     const novelName = document.querySelector('.truyen-title')?.innerText || 'No title';
      
  //     return { chapTitle, novelName, novelText, nextChap };
  //   });
    
  //   console.log(novel);
  //   await browser.close();
  //   return novel;
  // } catch (error) {
  //   console.error('Puppeteer failed:', error);
  //   return { error: 'Failed to scrape data' };
  // }
  
});

// https://novelbjn.novelupdates.net/book/martial-god-asura-novel/chapter-1

// import puppeteer from 'puppeteer';

// export default defineEventHandler(async (event) => {
//   const { url } = getQuery(event);

//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'domcontentloaded' });

//     const novel = await page.evaluate(() => {
//       const chapTitle = document.querySelector('.chapter-title')?.innerText || 'No chapter title';
//       const novelText = document.querySelector('.chapter-c')?.innerText || 'No content';
//       const novelName = document.querySelector('.truyen-title')?.innerText || 'No title';

//       return { chapTitle, novelName, novelText };
//     });

//     await browser.close();
//     return novel;
//   } catch (error) {
//     console.error('Puppeteer failed:', error);
//     return { error: 'Failed to scrape data' };
//   }
// });
