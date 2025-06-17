<template>
    <van-nav-bar title="支持一下">
        <template #left>
            <van-icon name="good-job" size="28" />
        </template>
    </van-nav-bar>
    <van-cell title="Github开源地址" is-link url="https://github.com/Frost0906/taskMaster" />
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