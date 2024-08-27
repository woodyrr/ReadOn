// import { chromium } from 'playwright'; // Change to Playwright import
// import { getQuery } from 'h3';

// export default defineEventHandler(async (event) => {
//   const { url } = getQuery(event);
//   console.log("Received URL:", url);  // Log the URL received
//   if (!url) {
//     return { error: 'No URL provided' };
//   }

// if(url.includes('https://novelfull.net/')){  
  
//   try {
//     // Launch a browser using Playwright
//     const browser = await chromium.launch({ headless: true, args:[
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       '--disable-dev-shm-usage',
//       '--disable-accelerated-2d-canvas',
//       '--no-zygote',
//       '--single-process'] 
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
//     console.log(novel)
//     return novel;
    
//   } catch (error) {
//     console.error('Playwright failed:', error);
//     return { error: 'Failed to scrape data' };
//   }
// }

// else if(url.includes('https://novelbjn.novelupdates.net/')){

//   try {
//     // Launch a browser using Playwright
//     const browser = await chromium.launch({ headless: true });
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
//     return novel;
//   } catch (error) {
//     console.error('Playwright failed:', error);
//     return { error: 'Failed to scrape data' };
//   }
// }

// });

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
import playwright from 'playwright-aws-lambda';
import { getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);
  console.log("Received URL:", url);  // Log the received URL

  if (!url) {
    console.log("No URL provided");
    return { error: 'No URL provided' };
  }

  if (url.includes('https://novelfull.net/')) {  
    console.log("Processing Novelfull URL");
    try {
      const browser = await playwright.launchChromium({ headless: true, args:[
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        ]
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
      console.log("Fetched Novel Data:", novel);  // Log the fetched data
      return novel;
      
    } catch (error) {
      console.error('Playwright failed:', error);
      return { error: 'Failed to scrape data' };
    }
  }

  else if (url.includes('https://novelbjn.novelupdates.net/')) {
    console.log("Processing NovelBJN URL");
    try {
      const browser = await playwright.launchChromium({ headless: true, args:[
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        ] 
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
      console.log("Fetched NovelBJN Data:", novel);  // Log the fetched data
      return novel;
    } catch (error) {
      console.error('Playwright failed:', error);
      return { error: 'Failed to scrape data' };
    }
  }

});
