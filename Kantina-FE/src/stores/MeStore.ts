import { defineStore } from "pinia";
import { ref } from "vue";

export const useMeStore = defineStore('me', () => {

    const id = ref<number | null>(null);
    const name = ref<string | null>(null);
    const type = ref<'admin' | 'user' | null>(null);
    const points = ref<number | null>(null);
    const reservations = ref<any>(null);

    const setId = (value: number) => {
        id.value = value;
    }

    const setMe = (data: any) => {
        console.log(data);
        if (data && data != null) {
            console.log(data);
            id.value = data.id;
            name.value = data.name;
            type.value = data.type;
            points.value = data.points;
            reservations.value = data.reservations;
        }
    }

    const erase = () => {
        id.value = null;
        name.value = null;
        type.value = null;
        points.value = null;
        reservations.value = null;
    }

    return {id, name, type, points, reservations, setMe, erase, setId};
});