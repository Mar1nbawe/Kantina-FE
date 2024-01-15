import { defineStore } from "pinia";
import { ref } from "vue";

interface Reservation {
  userId: number;
  startAt: Date;
  endAt: Date;
}

export const useMarkerStore = defineStore('marker', () => {
  const x = ref<string>("");
  const y = ref<string>("");
  const id = ref<number>(0);
  const slots = ref<number>(0);
  const reservations = ref<Reservation[]>([]);
  const chosen = ref<boolean>(false);

  function getData() {
    return {
      x: x.value,
      y: y.value,
      id: id.value,
      slots: slots.value,
      reservations: reservations.value
    }
  }

  function saveData(data: any) {
    x.value = data.x;
    y.value = data.y;
    id.value = data.id;
    slots.value = data.slots;
    reservations.value = data.reservations;
    chosen.value = true;
  }

  function getChoose(){
    return chosen.value;
  }

  return { x, y, id, slots,  chosen, reservations, getData, saveData, getChoose };
});