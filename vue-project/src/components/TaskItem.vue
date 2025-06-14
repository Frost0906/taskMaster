<template>
    <van-cell :title="task.title" :label="task.description" clickable @click="showDetails">
        <template #icon>
            <van-icon class-prefix="my-icon" :name="priorityIcon" size="24px" style="margin-right: 8px;" />
        </template>
        <template #right-icon>
            <van-checkbox v-model="task.completed" @change="toggleCompletion"></van-checkbox>
        </template>
    </van-cell>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../store/index';

const props = defineProps({
    task: {
        type: Object,
        required: true,
    },
});

const router = useRouter();
const taskStore = useTaskStore();

function showDetails() {
    router.push({ name: 'TaskDetail', params: { taskId: props.task.id } });
}

function toggleCompletion(event) {
    taskStore.updateTask({
        id: props.task.id,
        ...props.task,
        completed: event.target.checked,
    });
}

const priorityIcon = computed(() => {
    switch (props.task.priority) {
        case 'high':
            return 'fire-o';
        case 'medium':
            return 'warning-o';
        case 'low':
            return 'passed';
        default:
            return '';
    }
});
</script>