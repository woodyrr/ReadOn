<script setup lang="ts">
import { ref,  } from 'vue';
import { Input } from '@/components/ui/input'

// const props = defineProps<{ inputValue: string }>();
const userInput = ref('');

// // Emit the input value to the parent component when the user submits
// const handleSubmit = () => {
//   emits('input-submitted', userInput.value);
// };
</script>

<template>
  <Input v-model="userInput" class="border border-gray-300 ring-0 outline-none outline-0 focus-visible:ring-green-300" type="text" placeholder="Enter/paste novel link here" />
</template>
