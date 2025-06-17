<template>
    <div id="app" :class="settingsStore.theme">
        <van-config-provider v-model:theme="settingsStore.theme">
            <van-nav-bar title="任务管理大师">
                <template #left>
                    <van-icon name="sign" size="30" />
                </template>
                <template #right>
                    <van-icon name="sign" size="30" />
                </template>
            </van-nav-bar>
            <router-view></router-view>
            <van-tabbar v-model="activeTab">
                <van-tabbar-item icon="home-o" to="/homePage">首页</van-tabbar-item>
                <van-tabbar-item icon="star-o" to="/support">点个赞吧</van-tabbar-item>
                <van-tabbar-item icon="setting-o" to="/settings">设置</van-tabbar-item>
            </van-tabbar>
        </van-config-provider>
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
const offset = ref({ x: 200, y: 400 });

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
/* 默认浅色模式 */
:root.light {
    --van-background-color: #ffffff; /* 页面背景色 */
}

/* 深色模式 */
:root.dark {
    --van-background-color: #1a1a1a; /* 深色背景色 */
}
body {
    background-color: var(--van-background-color); /* 继承全局背景色 */
    transition: background-color 0.3s; /* 添加过渡动画 */
}
</style>