<script setup lang="ts">
import useMapStore from "../../stores/MapStore";

const props = defineProps<{
    x: string;
    y: string;
    id: number;
    reservation: {
        userId: number;
        startDate: Date;
        endDate: Date;
    };
}>();
const {adminMode} = useMapStore();

const onClick = () => {
    console.log("I cleeck");
}

const getStatus = () => {
    // TODO: Uncomment this when it comes its time and replace yourUserId to fit the instruction.

    // if (props.reservation.userId !== yourUserId || (adminMode && props.reservation.startDate < new Date() && new Date() < props.reservation.endDate)) {
    //     return 'BUSY';
    // }

    if (adminMode && props.reservation.startDate > new Date()) {
        return 'RESERVED'
    }

    // if (!adminMode && props.reservation.userId === yourUserId) {
    //     if (props.reservation.startDate < new Date()) {
    //         return 'YOU_PENDING';
    //     }
    //     if (new Date() < props.reservation.endDate) {
    //         return 'YOU_NOW';
    //     }
    // }

    return 'AVAILABLE';
}
</script>
<template>
    <div style="width: 20px; height: 20px; background-color: red; position: absolute;" @click="onClick" />
</template>
<style scoped>
div {
    top: v-bind('props.y');
    left: v-bind('props.x');

}
</style>