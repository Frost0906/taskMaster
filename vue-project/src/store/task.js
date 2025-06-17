import { defineStore } from 'pinia';
import { ref } from 'vue';
// import {
//     addTask, deleteTask,
//     filterTasks,
//     getAllTasks,
//     initDatabase,
//     scheduleLocalNotification,
//     updateTask
// } from "@/cordova/plugins.js";

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([
        {
            id: 1,
            title: '完成项目报告',
            description: '编写并提交季度项目报告',
            priority: 'high',
            dueDate: '2025-6-14',
            completed: false,
        },
        {
            id: 2,
            title: '购买办公用品',
            description: '采购新的键盘和鼠标',
            priority: 'medium',
            dueDate: '2025-6-12',
            completed: false,
        },
        {
            id: 3,
            title: '团队会议',
            description: '每周一次的团队同步会议',
            priority: 'low',
            dueDate: '2025-6-20',
            completed: true,
        },
        {
            id: 4,
            title: '汇报',
            description: '',
            priority: 'high',
            dueDate: '2025-6-17',
            completed: false,
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
    // const dbInitialized = ref(false);
    //
    // const initialize = async () => {
    //     try {
    //         await initDatabase();
    //         dbInitialized.value = true;
    //         await fetchAllTasks();
    //     } catch (error) {
    //         console.error('数据库初始化失败:', error);
    //     }
    // };
    //
    // const fetchAllTasks = async () => {
    //     if (!dbInitialized.value) throw new Error('数据库尚未初始化');
    //     try {
    //         tasks.value = await getAllTasks();
    //     } catch (error) {
    //         console.error('获取任务列表失败:', error);
    //     }
    // };
    //
    // const createTask = async (task) => {
    //     if (!dbInitialized.value) throw new Error('数据库尚未初始化');
    //     try {
    //         const taskId = await addTask(task);
    //         tasks.value.push({
    //             ...task,
    //             id: taskId,
    //             completed: false,
    //             remind: false,
    //         });
    //         if (task.remind && task.dueDate) {
    //             await scheduleLocalNotification(new Date(task.dueDate), task.title);
    //         }
    //     } catch (error) {
    //         console.error('创建任务失败:', error);
    //     }
    // };
    //
    // const editTask = async (updatedTask) => {
    //     if (!dbInitialized.value) throw new Error('数据库尚未初始化');
    //     try {
    //         const success = await updateTask(updatedTask);
    //         if (success) {
    //             const index = tasks.value.findIndex(task => task.id === updatedTask.id);
    //             if (index !== -1) {
    //                 tasks.value[index] = updatedTask;
    //             }
    //         }
    //         if (updatedTask.remind && updatedTask.dueDate) {
    //             await scheduleLocalNotification(new Date(updatedTask.dueDate), updatedTask.title);
    //         }
    //     } catch (error) {
    //         console.error('更新任务失败:', error);
    //     }
    // };
    //
    // const removeTask = async (id) => {
    //     if (!dbInitialized.value) throw new Error('数据库尚未初始化');
    //     try {
    //         const success = await deleteTask(id);
    //         if (success) {
    //             tasks.value = tasks.value.filter(task => task.id !== id);
    //         }
    //     } catch (error) {
    //         console.error('删除任务失败:', error);
    //     }
    // };
    //
    // const filterAndFetchTasks = async (filterType) => {
    //     if (!dbInitialized.value) throw new Error('数据库尚未初始化');
    //     try {
    //         tasks.value = await filterTasks(filterType);
    //     } catch (error) {
    //         console.error('筛选任务失败:', error);
    //     }
    // };
    //
    // onMounted(() => {
    //     initialize();
    // });
    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        // dbInitialized,
        // initialize,
        // fetchAllTasks,
        // createTask,
        // editTask,
        // removeTask,
        // filterAndFetchTasks,
    };
});