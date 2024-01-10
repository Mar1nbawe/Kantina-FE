<script setup lang="ts">
import Marker from './Marker.vue';
defineProps<{
    points: any;
}>();
</script>
<template>
    <div style="width: 100%; height: 100%; position: absolute; z-index: 2;">
        <Marker v-for="point of points" :x="`${point.x}px`" :y="`${point.y}px`" :id="1" />
    </div>
</template>