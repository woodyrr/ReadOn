// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/icon"],
  // runtimeConfig: {
  //   public: {
  //     secret:process.env.OPENAI_API_KEY
  //   }
  // },
  // env: {
  //   myVariable: process.env.NUXT_ENV_MY_VAR
  // },
  runtimeConfig: {
    
    // apiSecret:"123",
    public: {
      speechApi: process.env.UNREAL_SPEECH_API_KEY,
    }
    
  },
  
})