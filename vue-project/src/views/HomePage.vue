<template>
    <van-tabs type="card" @click-tab="onClickTab">
        <van-tab title="全部" name="all"></van-tab>
        <van-tab title="今日" name="today"></van-tab>
        <van-tab title="待办" name="todo"></van-tab>
        <van-tab title="已完成" name="completed"></van-tab>
        <van-tab title="高优先级" name="highPriority"></van-tab>
    </van-tabs>
    <van-nav-bar title="任务列表">
        <template #left>
            <van-icon name="todo-list" size="28" />
        </template>
    </van-nav-bar>
</template>

<script setup>

import {useRouter} from "vue-router";
const router = useRouter();

const onClickTab = ({name}) => {
    router.push('/' + name);
}
</script>