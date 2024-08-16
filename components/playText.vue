<script setup lang="ts">
import {ref} from "vue"
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

let isPlaying = ref(false)
// let isPlaying = isPlayings.value
const togglePlaying = () => {
  isPlaying.value = !isPlaying.value;
};
console.log(isPlaying.value)
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="bg-black/80 active:bg-black text-white font-semibold" >
        ReadOn
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[80%] md:max-w-[75%] xl:max-w-[50%] h-[90%] ">
      <DialogHeader class="text-center flex flex-col">
        <DialogTitle class="text-center md:text-xl">ReadOn</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <!-- <div class="grid gap-4 w-full"> -->
        <!-- <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div> -->
        <textArea />
      <!-- </div> -->
      <DialogFooter class="flex flex-row gap-1">
        <VoiceText />
        <Button class="bg-green-300 hover:bg-green-200 w-[50%] sm:w-auto" @click="togglePlaying" >
            <div class="flex gap-1 text-black items-center" v-if="isPlaying">
                <div>pause</div>
                <Icon name="uil:pause"  style="color: black" />
            </div>
            <div class="flex gap-1 text-black items-center" v-else>
                <div>play</div>
                <Icon name="uil:play"  style="color: black" />
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