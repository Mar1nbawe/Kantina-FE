<script setup lang="ts">
import Map from '../components/map';
import { useMapStore } from '../stores/MapStore';
import { mockTables } from '../mocks/tables';
import base64 from '../components/defaultMap';
import { api } from '@/services/api';
import { useMeStore } from '@/stores/MeStore';
import { router } from '@/main';

const {loadPoints, loadMapFromBase64, getSelectedDate, setSelectedDate} = useMapStore();
const {setMe} = useMeStore();

const onDateChange = (event: Event) => {
  console.log((event.target as HTMLInputElement).value);
  setSelectedDate(new Date((event.target as HTMLInputElement).value));
}

const onClick = async () => {
  const dateFormat: string = `${getSelectedDate().getFullYear()}-${getSelectedDate().getMonth()}-${getSelectedDate().getDate()}_${getSelectedDate().getHours()}:${getSelectedDate().getMinutes()}:${getSelectedDate().getSeconds()}`
  const response = await api.get(`/tables/${dateFormat}`);
  if (response.status === 200) {
    loadPoints(response.data.map((reservation: any) => ({...reservation, startAt: new Date(reservation.startAt), endAt: new Date(reservation.endAt)})));
  }
}

const setNowTikTak = () => {
  setSelectedDate(new Date());
}

const response = await api.get('/me');
if (response.status === 401) {
  router.push("/");
}
else {
  setMe(response.data);
}
loadMapFromBase64(base64);
</script>

<template>
  <main>
    <h1>This is only a demo, it's now your duty to carry the legacy!</h1>
    <input type="date" @change="onDateChange" v-bind="getSelectedDate()"/>
    <button @click="setNowTikTak">Set Now Tik Tak!</button>
    <button @click="onClick">Show Reservations</button>
    <Map />
  </main>
</template>
