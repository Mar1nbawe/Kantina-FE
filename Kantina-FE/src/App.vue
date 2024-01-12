<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMeStore } from './stores/MeStore';
const {getName} = useMeStore();
</script>

<template>
  <nav>
        <h1>Test of {{ getName() !== null ? getName() : "Guest" }}</h1>
        <RouterLink to="/">Home</RouterLink>
  </nav>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
