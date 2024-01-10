<script setup lang="ts">
import svgBase64 from "./defaultMap";
import {base64toSVG} from "../utils/SvgUtils";

const leSvg = base64toSVG(svgBase64);
</script>

<template>
  <div style="width: 100vw; height: 100vh;" v-html="leSvg"></div>
</template>