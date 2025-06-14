import {createRouter, createWebHistory} from 'vue-router';
import TaskDetail from "@/components/TaskDetail.vue";
import SettingsView from "@/views/SettingsView.vue";
import HomePage from "@/views/HomePage.vue";
import TaskList from "@/components/TaskList.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/homePage', component: TaskList},
        {path: '/settings', component: SettingsView},
        {path: '/task/:taskId', component: TaskDetail},
        {path: '/task/new', component: TaskDetail},
        {path: '/all', component: TaskList},
        {path: '/today', component: TaskList},
        {path: '/todo', component: TaskList},
        {path: '/highPriority', component: TaskList},
        {path: '/completed', component: TaskList},
    ]
});

export default router;