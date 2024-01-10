<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Map from './components/map';
import { useMapStore } from './stores/MapStore';
import { mockTables } from './mocks/tables';
import base64 from './components/defaultMap';

const {loadPoints, loadMapFromBase64} = useMapStore();

loadPoints(mockTables);
loadMapFromBase64(base64);
</script>

<template>
  <Map />
</template>
