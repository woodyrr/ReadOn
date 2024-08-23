<template>
    <div class="scroll-container max-h-[80%] 2xl:max-h-[90%]" >
      <div class="novel-text">
        <!-- Replace this text with actual content from your novels -->
        <!-- <p v-for="(paragraph, index) in novelContent" :key="index">{{ paragraph }}</p> -->
        <!-- <p v-for="(paragraph, index) in novelContent" :key="index">{{ paragraph[index] }}{{ paragraph }}</p> -->
        <div  v-if="quote">
          <p>{{ quote.novelText }}</p>
        </div>

        <div v-else>
          <p>Loading...</p>
        </div>

      </div>
    </div>
  </template>
  
<script setup>
  // Simulate some novel content (replace with real data in a real application)
  // const novelContent = [
  //   "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness...",
  //   "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse...",
  //   "In the beginning, God created the heavens and the earth. The earth was without form and void, and darkness...",
  //   "All happy families are alike; each unhappy family is unhappy in its own way...",
  //   "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife...",
  //   "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness...",
  //   "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse...",
  //   "In the beginning, God created the heavens and the earth. The earth was without form and void, and darkness...",
  //   "All happy families are alike; each unhappy family is unhappy in its own way...",
  //   "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife..."
  // ];

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
  .scroll-container {
    /* max-height: 400px;  */
    overflow-y: scroll;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: 'Georgia', serif;
  }
  
  .novel-text {
    line-height: 1.6;
    font-size: 18px;
    color: #333;
  }
  
  .novel-text p {
    margin-bottom: 1em;
  }
</style>





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
  