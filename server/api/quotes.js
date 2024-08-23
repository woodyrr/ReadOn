// server/api/quotes.js
// "dev": "nuxt dev",
// "dev":"cross-env NODE_TLS_REJECT_UNAUTHORIZED=0 nuxt dev --https --ssl-cert localhost.pem --ssl-key localhost-key.pem",
import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {
  // try {
  //   const browser = await puppeteer.launch({ headless: true });
  //   const page = await browser.newPage();
  //   await page.goto('http://quotes.toscrape.com/', { waitUntil: 'domcontentloaded' });

  //   const quotes = await page.evaluate(() => {
  //     const quote = document.querySelector('.quote');
  //     const text = quote.querySelector('.text').innerText;
  //     const author = quote.querySelector('.author').innerText;
  //     return { text, author };
  //   });
    
  //   console.log(quotes);
  //   await browser.close();
  //   return quotes
  // } catch (error) {
  //   console.error('Puppeteer failed:', error);
  // }

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


  //noovell full


  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://novelfull.net/martial-god-asura/chapter-2-beauty-elder.html', { waitUntil: 'domcontentloaded' });

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
  
});

// https://novelbjn.novelupdates.net/book/martial-god-asura-novel/chapter-1



// const axios = require('axios');

// axios.get('https://example.com')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });