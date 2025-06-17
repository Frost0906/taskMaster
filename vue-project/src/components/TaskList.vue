<template>
    <home-page/>
    <van-list>
        <van-cell-group v-for="task in filteredTasks" :key="task.id">
            <van-checkbox shape="square" label-disabled v-model="task.completed"/>
            <van-cell :title="task.title" @click="router.push(`/task/${task.id}`)">
                <template #right-icon>
                    <van-tag plain round type="danger" style="margin-right: 8px;" v-if="task.priority === 'high'">高</van-tag>
                    <van-tag plain round type="warning" style="margin-right: 8px;" v-if="task.priority === 'medium'">中</van-tag>
                    <van-tag plain round type="primary" style="margin-right: 8px;" v-if="task.priority === 'low'">低</van-tag>
                    <van-tag plain round type="success" style="margin-right: 8px;" v-if="task.completed">已完成</van-tag>
                </template>
            </van-cell>
        </van-cell-group>
    </van-list>
</template>

<script setup>
import {computed, ref} from 'vue';
import { useRouter} from 'vue-router';
import { useTaskStore } from '@/store/task.js';
import HomePage from "@/views/HomePage.vue";

const router = useRouter();
const taskStore = useTaskStore();

const filteredTasks = computed(() => {
    return taskStore.tasks.filter(task => {
        switch (router.currentRoute.value.path) {
            case '/today':
                return new Date(task.dueDate).toDateString() === new Date().toDateString();
            case '/todo':
                return !task.completed;
            case '/highPriority':
                return task.priority === 'high';
            case '/completed':
                return task.completed;
            default:
                return true;
        }
    }).sort((a, b) => {
        // 排序：未完成优先，高优先级优先，截止日期近的优先
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }

        const priorityOrder = { high: 1, medium: 2, low: 3 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }

        if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }

        return b.id - a.id;
    });
});
</script>

<style scoped>

</style>