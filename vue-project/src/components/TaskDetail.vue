<template>
    <div>
        <TaskDialog :initialData="currentTask" @close="$router.go(-1)" @submit="handleSubmit"/>
        <van-button v-if="!isNewTask" type="danger" @click="deleteTask">删除</van-button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../store/index.js';
import TaskDialog from "./TaskDialog.vue";

const router = useRouter();
const tasksStore = useTaskStore();

const currentTask = computed(() => {
    if (isNewTask.value) return null;
    return tasksStore.tasks.find(
        task => task.id === parseInt(router.currentRoute.value.params.taskId)
    );
});

const deleteTask = () => {
    tasksStore.deleteTask(currentTask.value.id);
    router.go(-1);
};

// [修改处] 判断是否是新任务模式
const isNewTask = computed(() => {
    return router.currentRoute.value.params.taskId === 'new';
});


// [修改处] 处理表单提交
const handleSubmit = (taskData) => {
    if (isNewTask.value) {
        // 添加任务
        tasksStore.addTask({
            ...taskData
        });
    } else {
        // 更新任务（保持不变）
        tasksStore.updateTask({
            ...taskData,
            id: currentTask.value.id,
        });
    }
    router.go(-1);
};
</script>