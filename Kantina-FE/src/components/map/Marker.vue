<script setup lang="ts">
defineProps<{
    x: string;
    y: string;
    id: number;
}>();
</script>
<template>
    <div style="width: 20px; height: 20px; background-color: red; position: absolute;"></div>
</template>
<style scoped>
div {
    top: v-bind('y');
    left: v-bind('x');

}
</style>