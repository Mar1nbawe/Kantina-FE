<script setup lang="ts">
import Map from '../components/map'
import { useMapStore } from '../stores/MapStore'
import { mockTables } from '../mocks/tables'
import base64 from '../components/defaultMap'
import { api } from '@/services/api'
import { useMeStore } from '@/stores/MeStore'
import { router } from '@/main'

import { ref } from 'vue'
import ReservationTable from '@/components/ReservationTable.vue'
import { useMarkerStore } from '@/stores/MarkerStore'

const { loadPoints, loadMapFromBase64, getSelectedDate, setSelectedDate } = useMapStore()
const { setMe } = useMeStore()


const markerStore = useMarkerStore()
const markerdata = markerStore.getData();

const onDateChange = (event: Event) => {
  console.log((event.target as HTMLInputElement).value)
  setSelectedDate(new Date((event.target as HTMLInputElement).value))
}


const axiosstatus = ref<number | null>(null);
const getConfirm = async (id: number, reservstatus: String) => {
  let path = '/reservations/'
  switch(reservstatus)
  {
    case 'confirm':
      path += 'confirm/'+id
      break;
    case 'cancel':
      path += 'cancel/'+id
      break;
  }
  

  const response = await api.get(path)
  if (response.status === 200) {
    console.log("success")
  } else {
    axiosstatus.value = response.status
  }
}

const postConfirm = async (userId: number | null, tableId: number, startAt: Date) => {
  console.log(userId, tableId, startAt)
  const path = '/reservations/make'
  const response = await api.post(path, {user_id: userId, table_id: tableId, start_at: startAt, end_at: new Date()})
  if (response.status === 200) {
    console.log("success")
  } else {
    axiosstatus.value = response.status
  }
}



const choosecurrentmarker = markerStore.chosen.valueOf()

console.log(choosecurrentmarker)

const currentreservationid = ref<number>(0);
const currentreservationname = ref<string>("");
const confirming = ref(false)

function markerReservationOpen (ReservationID: number){
  currentreservationid.value = ReservationID;
  

}

function confirmReservationOpen (ReservationID: number){
  currentreservationid.value = ReservationID;
  confirming.value = true

}

const onClick = async () => {
  const dateFormat: string = `${getSelectedDate().getFullYear()}-${getSelectedDate().getMonth()}-${getSelectedDate().getDate()}_${getSelectedDate().getHours()}:${getSelectedDate().getMinutes()}:${getSelectedDate().getSeconds()}`
  const response = await api.get(`/tables/${dateFormat}`)
  if (response.status === 200) {
    console.log(response.data)
    loadPoints(
      response.data.map((reservation: any) => ({
        ...reservation,
        startAt: new Date(reservation.startAt),
        endAt: new Date(reservation.endAt)
      }))
    )
  }
}
onClick()
const setNowTikTak = () => {
  setSelectedDate(new Date())
}

const response = await api.get('/me')
if (response.status === 401) {
  router.push('/')
} else {
  setMe(response.data)
  console.log(response.data)
}
loadMapFromBase64(base64)

</script>

<template>
  <!-- <h1>This is only a demo, it's now your duty to carry the legacy!</h1>
    <input type="date" @change="onDateChange" v-bind="getSelectedDate()"/>
    <button @click="setNowTikTak">Set Now Tik Tak!</button>
    <button @click="onClick">Show Reservations</button> -->

    <!-- Admin Card -->
  <div class="w-auto h-[95%] flex flex-row bg-[#84c1b8]">
    <div class="w-[33%] h-[100%] bg-[#d4eef4] align-middle flex justify-center items-center">
      <ReservationTable :back="confirming" v-if="useMeStore().getType() == 'admin' && choosecurrentmarker.valueOf() == false">
        <template #front>
          <div
           
            class="w-[95%] h-[45%] justify-center items-center bg-[#ebfffc]"
          >
            <div
              v-for="reservation in useMeStore().getReservations()"
              :key="reservation.id"
              class="p-2 justify-center items-center"
            >
              <div
                class="bg-[#d5f8f2] border-[#b9e3d9] rounded-md w-[95%] h-[100%] p-2 m-2 flex flex-row justify-between items-center"
              >
                <div>
                  <span class="font-bold">Table {{ reservation.tableId }}</span>
                  <span class="ml-5 font-semibold"> {{ reservation.status }}</span>
                  <br />
                  {{ reservation.startDate }}
                </div>
                <div
                  class="bg-[#8ee1cc] m-2 w-min pl-2 pr-2 h-min justify-center"
                  @click="confirmReservationOpen(reservation.id)"
                >
                  Edit
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #back>
          <div class="w-[95%] h-[45%] justify-between items-center bg-[#ebfffc] flex flex-col">
            <div class=" flex flex-col">
            <div class="font-semibold"> Table {{ currentreservationid }}</div>
          <br>
          <div class="font-semibold"> {{useMeStore().getName()}}</div>
        </div>  
          <div class="flex flex-row p-5">
            <div  class="bg-[#8ee1cc] m-2 w-min pl-2 pr-2 h-min justify-center"
           @click="getConfirm(currentreservationid.valueOf(), 'confirm')">Confirm</div>
          <div class="bg-[#dd8d8d] m-2 w-min pl-2 pr-2 h-min justify-center"
          @click="getConfirm(currentreservationid.valueOf(), 'cancel')">Cancel</div>
          </div>
        </div>
        </template>
      </ReservationTable>

      <!-- User Card -->
      <ReservationTable :back="markerStore.chosen" v-if="useMeStore().getType() == 'user'">
        <template #front>
          <div
           
            class="w-[95%] h-[45%] justify-center items-center bg-[#ebfffc]"
          >
            <div
              v-for="reservation in useMeStore().getReservations()"
              :key="reservation.id"
              class="p-2 justify-center items-center"
            >
              <div
                class="bg-[#d5f8f2] border-[#b9e3d9] rounded-md w-[95%] h-[100%] p-2 m-2 flex flex-row justify-between items-center"
              >
                <div>
                  <span class="font-bold">Table {{ reservation.id }}</span>
                  <span class="ml-5 font-semibold"> {{ reservation.status }}</span>
                  <br />
                  {{ reservation.startDate }}
                </div>
                <div
                  class="bg-[#8ee1cc] m-2 w-min pl-2 pr-2 h-min justify-center"
                  @click="markerReservationOpen(markerStore.id)"
                >
                  Edit
                </div> 
              </div>
            </div>
          </div>
        </template>

        <template #back>
          <div class="w-[95%] h-[45%] justify-between items-center bg-[#ebfffc] flex flex-col">
            <div class=" flex flex-col">
            <div class="font-semibold"> Table {{ markerStore.id }}</div>
          <br>
          <div class="font-semibold"> {{useMeStore().getName()}}</div>
          <br>
          <input type="date" @change="onDateChange" v-bind="getSelectedDate()"/>
          <br>
          <button @click="setNowTikTak">Set Now Tik Tak!</button>
        </div>  
          <div class="flex flex-row p-5">
            <div  class="bg-[#8ee1cc] m-2 w-min pl-2 pr-2 h-min justify-center"
           @click="postConfirm(useMeStore().getId(), markerStore.id, getSelectedDate() )">Confirm</div>
          <div class="bg-[#dd8d8d] m-2 w-min pl-2 pr-2 h-min justify-center"
          @click="markerStore.chosen = false">Cancel</div>
          </div>
        </div>
        </template>
      </ReservationTable>
    </div>
    <Map />
  </div>
</template>
