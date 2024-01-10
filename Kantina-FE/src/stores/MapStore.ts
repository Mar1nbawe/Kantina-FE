import { base64toSVG } from "@/utils/SvgUtils";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore('mapData', () => {
    const points = ref<any>([]);
    const map = ref<string>("");
    const adminMode = ref<boolean>(false);
    const selectedDate = ref<Date>(new Date());

    const loadPoints = (value: any) => {
        points.value = value;
    }

    const loadMapFromBase64 = (value: string) => {
        map.value = base64toSVG(value);
    }

    const startAdminMode = () => {
        adminMode.value = true;
    }

    const stopAdminMode = () => {
        adminMode.value = false;
    }

    return {points, map, loadPoints, loadMapFromBase64, adminMode, startAdminMode, stopAdminMode, selectedDate}
})