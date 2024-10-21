<template>
  <div class="bg-gray-100 min-h-screen flex flex-col gap-5">
    <header class="text-center font-bold text-[25px] border py-3 border-gray-300 bg-green-200">ReadOn</header>
    <div class="px-[6%] flex gap-2">
      <PlayText />
    </div>
    
  </div>
</template>



<script setup>
  import { ref, onMounted, onBeforeMount } from 'vue';
  const runtimeConfig = useRuntimeConfig()
  // Caching
  // Store API call results to retrieve them faster when the same request is made again. This reduces the need for the server to process and send the same data multiple times. 
// console.log(runtimeConfig.ttsApi)
// async function fetchSpeech() {
//   const response = await fetch('/api/speech', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       text: 'Hello, world!',
//       voiceId: 'Scarlett',
//       bitrate: '192k',
//       speed: 0,
//       pitch: 1.0,
//     }),
//   });
  
//   const data = await response.json();
//   console.log(data);
// }
</script>

<!-- <template>
  <div class="bg-gray-100 min-h-screen flex flex-col gap-5">
    <header class="text-center font-bold text-[25px] border py-3 border-gray-300 bg-green-200">
      ReadOn
    </header>
    <div class="px-[6%] flex gap-2">
      <input v-model="input" type="text" placeholder="say anything">
      <button @click="generateSpeech" class="bg-blue-500 text-white px-4 py-2 rounded">
        Generate TTS
      </button>
      <audio :src="audio" controls/>
      <PlayText />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios"
const input = ref('')
const ttsData = ref(null);

async function generateSpeech() {
  try {
    const response = await fetch('/api/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Hello, world!',
        voiceId: 'Scarlett',
        bitrate: '192k',
        speed: 0,
        pitch: 1.0,
      }),
    });

    const data = await response.json();
    ttsData.value = data.status;

    if (ttsData.value && ttsData.value.AudioBuffer) {
      const audioContext = new (window.AudioContext || window.AudioContext)();
      const source = audioContext.createBufferSource();
      audioContext.decodeAudioData(ttsData.value.AudioBuffer, (buffer) => {
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
      });
    }
  } catch (error) {
    console.error('Error generating TTS:', error);
  }
}
</script> -->




<!-- <template>
  <div>
    <input v-model="text" placeholder="Enter text to convert to speech">
    <button @click="convertTextToSpeech">Convert to Speech</button>
    <audio v-if="audioUrl" :src="audioUrl" controls></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
const audioUrl = ref('');

const convertTextToSpeech = async () => {
  try {
    const response = await $fetch('/api/tts', {
      params: { text: text.value },
      responseType: 'blob'
    });

    // Create a URL for the audio file to play it in the browser
    audioUrl.value = URL.createObjectURL(response);
  } catch (error) {
    console.error('Error:', error);
  }
};
</script> -->






