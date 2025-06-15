<template>

    <van-cell center v-model:title="settingsStore.title">
        <template #right-icon>
            <van-switch v-model="useSettingsStore.darkModeEnabled" @change="toggleTheme"/>
        </template>
    </van-cell>

</template>

<script setup>
import {useSettingsStore} from "@/store/settings.js";

const settingsStore = useSettingsStore();

const toggleTheme = () => {
    settingsStore.setTheme();
};

</script>