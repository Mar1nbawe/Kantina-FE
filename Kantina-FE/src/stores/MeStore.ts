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

    const getName = () => {
        return name.value;
    }

    const getData = () => {
        return {
            name: name.value,
            type: type.value,
            points: points.value,
            reservations: reservations.value,
            id: id.value
        }
    }

    const getId = () => {
        return id.value;
    }

    const getType = () => {
        return type.value;
    }

    const getPoints = () => {
        return points.value;
    }
    const getReservations = () => {
        return reservations.value;
    }

    const setMe = (data: any) => {
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

    return {getData, getId, getName, getType, getPoints, getReservations, setMe, erase, setId};
});