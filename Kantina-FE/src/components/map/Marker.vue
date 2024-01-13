<script setup lang="ts">
import { useMeStore } from "@/stores/MeStore";
import {useMapStore} from "../../stores/MapStore";
import { ref } from "vue";

const props = defineProps<{
    x: string;
    y: string;
    id: number;
    slots: number;
    reservations?: {
        userId: number;
        startAt: Date;
        endAt: Date;
    }[];
}>();
const {isAdminMode, getSelectedDate} = useMapStore();
const {getId} = useMeStore();

const onClick = () => {
    console.log("Make me give you data on the left side bar from Marker.vue.");
}

const getStatus = () => {
    if (!props.reservations || (props.reservations && props.reservations.length === 0)) {
        return 'AVAILABLE';
    }

    if (props.reservations.filter((reservation) => (reservation.userId !== getId() || isAdminMode()) && new Date(reservation.startAt).getTime() < getSelectedDate().getTime() && getSelectedDate().getTime() < new Date(reservation.endAt).getTime()).length > 0) {
        return 'BUSY';
    }

    if (isAdminMode() && props.reservations.filter((reservation) => new Date(reservation.startAt).getTime() > getSelectedDate().getTime()).length > 0) {
        return 'ADMIN_PENDING'
    }

    const yourReservations = props.reservations.filter((reservation) => reservation.userId === getId());
    for (const yourReservation of yourReservations) {
        if (new Date(yourReservation.startAt).getTime() > getSelectedDate().getTime()) {
            return 'YOU_FUTURE';
        }
        if (getSelectedDate().getTime() < new Date(yourReservation.endAt).getTime()) {
            return 'YOU_NOW';
        }
    }

    return 'AVAILABLE';
}

const getColor = (status: string) => {
    switch(status) {
        case 'BUSY':
            return '#C20303';
        case 'ADMIN_PENDING':
            return '#C29803';
        case 'YOU_FUTURE':
            return '#C29803';
        case 'YOU_NOW':
            return '#008D96';
        default:
            return '#7AC203';
    }
}

const markerStatus = ref<'#C20303' | '#C29803' | '#C29803' | '#008D96' | '#7AC203'>('#7AC203');
markerStatus.value = getColor(getStatus());

</script>
<template>
    <div style="width: 20px; height: 20px; position: absolute;" @click="onClick" />
</template>
<style scoped>
div {
    top: v-bind('props.y');
    left: v-bind('props.x');
    background-color: v-bind(markerStatus);
    cursor: pointer;

}
</style>