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

    const getSelectedDate = () => {
        return selectedDate.value;
    }

    const isAdminMode = () => {
        return adminMode.value;
    }

    const getPoints = () => {
        return points.value
    }

    const getMap = () => {
        return map.value
    }

    const setSelectedDate = (value: Date) => {
        selectedDate.value = value;
    }

    return {getPoints, getMap, loadPoints, loadMapFromBase64, isAdminMode, startAdminMode, stopAdminMode, getSelectedDate, setSelectedDate}
})