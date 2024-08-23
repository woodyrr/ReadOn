<template>
  <div class="bg-gray-100 min-h-screen flex flex-col gap-5">
    <header class="text-center font-bold text-[25px] border py-3 border-gray-300 bg-green-200">ReadOn</header>
    <div class="px-[6%] flex gap-2">
      
      <linkInput />
      <PlayText />
    </div>
    
  </div>
</template>

<!-- Caching
Store API call results to retrieve them faster when the same request is made again. This reduces the need for the server to process and send the same data multiple times.  -->

<script setup>
  import { ref, onMounted } from 'vue';

// console.log(runtimeConfig.apiSecret)

// import fs from "fs";
// import path from "path";
// import OpenAI from "openai";

// const openai = new OpenAI();

// const speechFile = path.resolve("./speech.mp3");

// async function main() {
//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: "Today is a wonderful day to build something people love!",
//   });
//   console.log(speechFile);
//   const buffer = Buffer.from(await mp3.arrayBuffer());
//   await fs.promises.writeFile(speechFile, buffer);
// }
// main();
</script>


<!-- <template>
  <div>
    <h1>Scraped Quote</h1>
    <div v-if="quote">
      <p>"{{ quote.novelName }}"</p>
      <p>- {{ quote.chapTitle }}</p>
      <p>- {{ quote.novelText }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const quote = ref(null);


onMounted(async () => {
  try {
    const response = await fetch('/api/quotes');
    console.log(response)
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      if (!data || Object.keys(data).length === 0) {
        console.error('Received an empty JSON response.');
      } else {
        quote.value = data;
      }
    } else {
      const text = await response.text();
      console.error('Received non-JSON response:', text);
    }
    console.log(quote.value)
  } catch (error) {
    console.error('Failed to fetch quote:', error);
  }
});

</script>

<style scoped>
h1 {
  text-align: center;
}
p {
  font-size: 20px;
  text-align: center;
}
</style> -->



