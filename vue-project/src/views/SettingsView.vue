<template>
    <van-nav-bar title="设置">
        <template #left>
            <van-icon name="setting" size="28" />
        </template>
    </van-nav-bar>
    <van-cell center v-model:title="settingsStore.title">
        <template #right-icon>
            <van-switch v-model="settingsStore.darkModeEnabled" @change="toggleTheme"/>
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