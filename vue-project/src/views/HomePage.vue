<template>
    <van-tabs v-model:active="activeFilter" type="card">
        <van-tab title="全部" name="all" to="/all"></van-tab>
        <van-tab title="今日" name="today" to="/today"></van-tab>
        <van-tab title="待办" name="todo" to="/todo"></van-tab>
        <van-tab title="已完成" name="completed" to="/completed"></van-tab>
        <van-tab title="高优先级" name="highPriority" to="/highPriority"></van-tab>
    </van-tabs>
</template>

<script setup>

</script>