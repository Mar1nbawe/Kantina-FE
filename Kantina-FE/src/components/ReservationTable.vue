<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  back: { type: Boolean, required: true },
})
const flipped = ref(props.back)

watch(props, () => {
  flipped.value = props.back
})

</script>



<template>
    <div class="stack">
      <div
        class="card"

        :class="{ flipped: flipped }"
      >
        <div class="card-face">
          <slot name="front"></slot>
        </div>
        <div class="card-face back">
          <slot name="back"></slot>
        </div>
      </div>
    </div>
  </template>

<style scoped>

.stack {
  perspective: 1000px;
  width: 100%;
  height: 100%;
}

.card {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back {
  transform: rotateY(180deg);
}

.flipped {
  transform: rotateY(180deg);
}
</style>