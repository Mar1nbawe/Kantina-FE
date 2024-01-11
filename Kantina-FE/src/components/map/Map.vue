<script setup lang="ts">
import MarkerLayer from './MarkerLayer.vue';
import MapLayer from './MapLayer.vue';
import { useMapStore } from '@/stores/MapStore';

const {points, map} = useMapStore();
</script>
<template>
    <!-- To adjust Width & Height when the case -->
    <div id="map" style="width: 1000px; height: 900px; position: relative;">
        <MarkerLayer :points="points" />
        <MapLayer :svgMap="map" />
    </div>
</template>