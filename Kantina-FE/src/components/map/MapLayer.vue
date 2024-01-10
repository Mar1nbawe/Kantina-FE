<script setup lang="ts">
defineProps<{svgMap: string}>()
</script>

<template>
  <div style="width: 100%; height: 100%; position: absolute;" v-html="svgMap"></div>
</template>