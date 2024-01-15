<script setup lang="ts">
import Marker from './Marker.vue';
const props = defineProps<{
    points: any;
}>();

console.log(props.points);
</script>
<template>
    <div style="width: 100%; height: 100%; position: absolute; z-index: 2;">
        <Marker v-for="point of points" :x="`${point.x}px`" :y="`${point.y}px`" :slots="point.slots" :id="point.id" v-bind:reservations="point.reservations"/>
    </div>
</template>