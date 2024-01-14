<script setup lang="ts">
import Map from '../components/map';
import { useMapStore } from '../stores/MapStore';
import { mockTables } from '../mocks/tables';
import base64 from '../components/defaultMap';
import { api } from '@/services/api';
import { useMeStore } from '@/stores/MeStore';
import { router } from '@/main';

const {loadPoints, loadMapFromBase64} = useMapStore();
const {setMe} = useMeStore();

const response = await api.get('/me');
if (response.status === 401) {
  router.push("/");
}
else {
  setMe(response.data);
}

loadPoints(mockTables);
loadMapFromBase64(base64);
</script>

<template>
  <main>
    <Map />
  </main>
</template>
