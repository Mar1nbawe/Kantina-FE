<script setup lang="ts">
import { RouterView } from 'vue-router'
import { router } from '@/router/index'
import { useMapStore } from './stores/MapStore';
import { mockTables } from './mocks/tables';
import base64 from './components/defaultMap';

const {loadPoints, loadMapFromBase64} = useMapStore();

loadPoints(mockTables);
loadMapFromBase64(base64);
</script>

<template>
  
 <div class="h-screen w-screen bg-[#ebfffc]">
  <nav class="p-2 mt-0 w-full bg-green-600">
    <div class="container mx-auto flex flex-wrap items-center">
      <div class="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
        <a href="#" class="text-white no-underline hover:text-white hover:no-underline">Logo</a>
      </div>
      <div class="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
        <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
         <!--  <RouterLink to="/" class="inline-block py-2 px-4 text-white no-underline">Home</RouterLink>
          <RouterLink to="/map" class="inline-block py-2 px-4 text-white no-underline">Map</RouterLink> -->
        </ul>
      </div>
    </div>
  </nav>
  <Suspense>
  <RouterView/>
</Suspense>
  </div>

</template>

<style>

</style>