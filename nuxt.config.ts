// https://nuxt.com/docs/api/configuration/nuxt-config
// import type { ServerMiddleware } from '@nuxt/types';

// const corsMiddleware: ServerMiddleware = {
//   path: '/api',
//   handler: '~/server/middleware/cors.ts'
// };
// "build": "NITRO_PRESET=vercel-edge nuxt build",
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/icon"],
  // hooks: {
  //   'render:setupMiddleware'(app) {
  //     app.use(corsMiddleware.path, corsMiddleware.handler);
  //   }
  // },
  // chromium-min v^127.0.0
  // puppeteer-core v^23.2.0
  // "puppeteer": "^23.1.0"
  //"engines": {
  //   "node": "^14"
  // },
  build: {
    transpile: [
      'puppeteer-core',
      '@sparticuz/chromium',
    ],
  },
  runtimeConfig: {
    
    // apiSecret:"123",
    public: {
      speechApi: process.env.UNREAL_SPEECH_API_KEY,
    }
    
  },
  
})