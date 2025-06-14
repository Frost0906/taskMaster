<template>
    <home-page/>
    <van-list>
        <van-cell-group>
            <van-swipe-cell v-for="task in filteredTasks" :key="task.id" @click="$router.push(`/task/${task.id}`)">
                <van-card :desc="task.description" :title="task.title">
                    <template #tags>
                        <van-tag plain type="danger" style="margin-right: 8px;" v-if="task.priority === 'high'">高</van-tag>
                        <van-tag plain type="warning" style="margin-right: 8px;" v-if="task.priority === 'medium'">中</van-tag>
                        <van-tag plain type="primary" style="margin-right: 8px;" v-if="task.priority === 'low'">低</van-tag>
                        <van-tag plain type="success" style="margin-right: 8px;" v-if="task.completed">已完成</van-tag>
                    </template>
                </van-card>
            </van-swipe-cell>
        </van-cell-group>
    </van-list>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter} from 'vue-router';
import { useTaskStore } from '@/store/index.js';
import HomePage from "@/views/HomePage.vue";

const router = useRouter();
const taskStore = useTaskStore();

const filteredTasks = computed(() => {
    switch (router.currentRoute.value.path) {
        case '/today':
            return taskStore.tasks.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString());
        case '/todo':
            return taskStore.tasks.filter(task => !task.completed);
        case '/highPriority':
            return taskStore.tasks.filter(task => task.priority === 'high');
        case '/completed':
            return taskStore.tasks.filter(task => task.completed);
        default:
            return taskStore.tasks;
    }
});

</script>

<style scoped>

</style>