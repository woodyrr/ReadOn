<script setup>
import {ref, onMounted} from "vue"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
let isLoading = ref(false)
let isPlaying = ref(false)
// console.log(import.meta.env.VITE_NUXT_OPENAI_API_KEY)
// const togglePlaying = () => {
//   isPlaying.value = !isPlaying.value;
// };
// console.log(isPlaying.value)

// const userInput = ref('');

const userInput = ref('');
const audioUrl = ref('');
const quote = ref(null);


// const fetchQuote = async () => {
//   try {
//     // const response = await fetch('/api/quotes');
//     isLoading = true ;
//     const response = await fetch('/api/quotes', {
//       params: { url: userInput.value },
//     });
//     console.log(response)
//     // Check if the response is JSON
//     const contentType = response.headers.get('content-type');
//     if (contentType && contentType.indexOf('application/json') !== -1) {
//       const data = await response.json();
//       if (!data || Object.keys(data).length === 0) {
//         console.error('Received an empty JSON response.');
//       } else {
//         quote.value = data;
//       }
//     } else {
//       const text = await response.text();
//       console.error('Received non-JSON response:', text);
//     }
//     console.log(quote.value)
//   } catch (error) {
//     console.error('Failed to fetch quote:', error);
//   }
// };

//need to save mp3.files

const fetchQuote = async () => {
  try {
    // console.log('User input URL:', userInput.value); // Debugging line
    const response = await fetch(`/api/quotes?url=${encodeURIComponent(userInput.value)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.error) {
      console.error(data.error);
    } else {
      quote.value = data;
    }
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};



let ttsData = ref('')

// async function generateSpeech() {
//   try {
//     isLoading = true
//     if (fetchQuote) {

//       const response = await fetch('/api/speech', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           text: `${quote.novelText}`,
//           voiceId: 'Scarlett',
//           bitrate: '192k',
//           speed: 0,
//           pitch: 1.0,
//         }),
//       });

//       const data = await response.json();
//       ttsData.value = data.status;
//       isPlaying.value = !isPlaying.value;
//       if (ttsData.value && ttsData.value.AudioBuffer) {
//         audioUrl.value = URL.createObjectURL(ttsData);
//         const audioContext = new (window.AudioContext || window.AudioContext)();
//         const source = audioContext.createBufferSource();
//         audioContext.decodeAudioData(ttsData.value.AudioBuffer, (buffer) => {
//           source.buffer = buffer;
//           source.connect(audioContext.destination);
//           source.start(0);
//         });
//       }
//     }else {
//       console.error('Failed to fetch the quote or the quote is empty.');
//     }

//   } catch (error) {
//     console.error('Error generating TTS:', error);
//     isLoading = false;
//   }
// }


// const isLoading = ref(false);
// const ttsData = ref(null);
// const isPlaying = ref(false);
// const audioUrl = ref(null);

async function generateSpeech() {
  try {
    isLoading.value = true;

    if (quote.value && quote.value.novelText) {
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `${quote.value.novelText}`, // Ensure `quote.value.novelText` is correctly accessed
          voiceId: 'Scarlett',
          bitrate: '192k',
          speed: 0,
          pitch: 1.0,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      ttsData.value = data.status;
      isPlaying.value = !isPlaying.value;

      // Checking if the synthesis task completed and contains the OutputUri (audio file URL)
      if (ttsData.value && ttsData.value.OutputUri) {
        audioUrl.value = ttsData.value.OutputUri[0];
        
        // Play the audio
        const audio = new Audio(audioUrl.value);
        audio.play().catch(error => {
          console.error('Audio playback failed:', error);
        });

      } else {
        throw new Error('Failed to generate TTS audio.');
      }
    } else {
      console.error('Failed to fetch the quote or the quote is empty.');
    }

  } catch (error) {
    console.error('Error generating TTS:', error);
  } finally {
    isLoading.value = false;
  }
}

// // const text = ref('');
// const audioUrl = ref('');

// const convertTextToSpeech = async () => {
//   try {
//     const response = await $fetch('/api/tts', {
//       params: { text: userInput.value },
//       responseType: 'blob'
//     });

//     // Create a URL for the audio file to play it in the browser
//     audioUrl.value = URL.createObjectURL(response);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };
</script>

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

<template>
  <Input v-model="userInput" class="border border-gray-300 ring-0 outline-none outline-0 focus-visible:ring-green-300" type="text" placeholder="Enter/paste novel link here" />
  <Dialog>
    <DialogTrigger as-child>
      <Button @click="fetchQuote" variant="outline" class="bg-black/80 active:bg-black text-white font-semibold" >
        ReadOn
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[80%] md:max-w-[75%] xl:max-w-[50%] h-[96%] sm:h-[90%] ">
      <DialogHeader class="text-center flex flex-col">
        <DialogTitle class="text-center md:text-xl">ReadOn</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <div class="scroll-container max-h-[80%] 2xl:max-h-[90%]" >
        <div class="novel-text">
          <div v-if="quote">
            <p>{{ quote.novelText }}</p>
          </div>
          <div v-if="isLoading">
            <p class="flex gap-1 text-center items-center text-xl" ><svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>Loading...</p>
          </div>

        </div>
      </div>
        <!-- <textArea /> -->
      
      <DialogFooter class="flex flex-row gap-1">
        <!-- <VoiceText /> -->
        <audio v-if="audioUrl" :src="audioUrl" controls autoplay></audio>
        <Button class="bg-green-300 hover:bg-green-200 w-[50%] sm:w-auto" @click=" generateSpeech" >
            <div class="flex gap-1 text-black items-center" v-if="isPlaying">
                <div>pause</div>
                <Icon name="uil:pause"  style="color: black" />
                <p v-if="isLoading" class="flex gap-1 text-center items-center text-xl" ><svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>Loading...</p>
            </div>
            <div class="flex gap-1 text-black items-center" v-else>
                <div>play</div>
                <Icon name="uil:play"  style="color: black" />
                <p v-if="isLoading" class="flex gap-1 text-center items-center text-xl" ><svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>Loading...</p>
            </div>
        </Button>
        
        
      </DialogFooter>
      <!-- <section class="flex gap-1">
        <Button class="bg-green-300 hover:bg-green-200" @click="togglePlaying" >
            <div class="flex gap-1 text-black items-center" v-if="isPlaying">
                <div>pause</div>
                <Icon name="uil:pause"  style="color: black" />
            </div>
            <div class="flex gap-1 text-black items-center" v-else>
                <div>play</div>
                <Icon name="uil:play"  style="color: black" />
            </div>
        </Button>
        <VoiceText />
        
      </section> -->
    </DialogContent>
  </Dialog>
</template>

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
