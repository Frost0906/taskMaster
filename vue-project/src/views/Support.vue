<template>
    <van-rate
        v-model="value"
        :size="50"
        icon="smile"
        color="#ffd21e"
        void-icon="thumb-circle-o"
        void-color="#eee"
    />

</template>

<script setup>
import {ref} from "vue";

const value = ref(0);
</script>

<style scoped>

</style>