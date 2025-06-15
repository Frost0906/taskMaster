import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([
        {
            id: 1,
            title: '完成项目报告',
            description: '编写并提交季度项目报告',
            priority: 'high',
            dueDate: '2025-6-14',
            completed: false,
            subtasks: [
                { id: 1, title: '收集数据', completed: true },
                { id: 2, title: '撰写草稿', completed: false },
                { id: 3, title: '审阅修改', completed: false },
            ],
        },
        {
            id: 2,
            title: '购买办公用品',
            description: '采购新的键盘和鼠标',
            priority: 'medium',
            dueDate: '2025-6-12',
            completed: false,
            subtasks: [],
        },
        {
            id: 3,
            title: '团队会议',
            description: '每周一次的团队同步会议',
            priority: 'low',
            dueDate: '2025-6-20',
            completed: true,
            subtasks: [],
        },
    ]);

    function addTask(task) {
        tasks.value.push(task);
    }

    function updateTask(updatedTask) {
        const taskIndex = tasks.value.findIndex(t => t.id === updatedTask.id);
        if (taskIndex !== -1) {
            tasks.value.splice(taskIndex, 1, updatedTask);
        }
    }

    function deleteTask(id) {
        tasks.value = tasks.value.filter(task => task.id !== id);
    }
    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
    };
});