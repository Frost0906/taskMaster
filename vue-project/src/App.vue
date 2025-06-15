<template>
    <div id="app">
        <van-config-provider v-model:theme="settingsStore.theme"></van-config-provider>
        <van-nav-bar title="任务管理大师" />
        <router-view></router-view>
        <van-tabbar v-model="activeTab">
            <van-tabbar-item icon="home-o" to="/homePage">首页</van-tabbar-item>
            <van-tabbar-item icon="star-o" to="/support">点个赞吧</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/settings">设置</van-tabbar-item>
        </van-tabbar>
    </div>
    <van-button
        type="primary"
        icon="plus"
        class="add-task-btn"
        @click="addTask"
    />
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useSettingsStore} from "@/store/settings.js";

const settingsStore = useSettingsStore();
const activeTab = ref(0);
const router = useRouter();

// Sync active tab with route changes
router.afterEach((to) => {
    switch (to.path) {
        case '/all':
            activeTab.value = 0;
            break;
        case '/support':
            activeTab.value = 1;
            break;
        case '/settings':
            activeTab.value = 2;
            break;
        default:
            activeTab.value = 0;
    }
});

const addTask = () => {
    router.push('task/new');
};

</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.add-task-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(58, 122, 254, 0.3);
}
</style>