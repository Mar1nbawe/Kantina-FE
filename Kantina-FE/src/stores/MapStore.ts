import { base64toSVG } from "@/utils/SvgUtils";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore('mapData', () => {
    const points = ref<any>([]);
    const map = ref<string>("");

    const loadPoints = (value: any) => {
        points.value = value;
    }

    const loadMapFromBase64 = (value: string) => {
        map.value = base64toSVG(value);
    }

    return {points, map, loadPoints, loadMapFromBase64}
})