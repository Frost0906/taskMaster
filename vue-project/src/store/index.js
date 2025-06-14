import {defineStore} from 'pinia';

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [
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
        ]
    }),
    actions: {
        addTask(task) {
            this.tasks.push(task);
        },
        updateTask(updatedTask) {
            const taskIndex = this.tasks.findIndex(t => t.id === updatedTask.id);
            if (taskIndex !== -1) {
                this.tasks.splice(taskIndex, 1, updatedTask);
            }
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        },
        completeTask(id) {
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed;
            }
        },
    },

});