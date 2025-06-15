import {createRouter, createWebHistory} from 'vue-router';
import SettingsView from "@/views/SettingsView.vue";
import TaskList from "@/components/TaskList.vue";
import TaskDialog from "@/components/TaskDialog.vue";
import Support from "@/views/Support.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/homePage', component: TaskList},
        {path: '/settings', component: SettingsView},
        {path: '/support', component: Support},
        {path: '/task/:taskId', component: TaskDialog},
        {path: '/all', component: TaskList},
        {path: '/today', component: TaskList},
        {path: '/todo', component: TaskList},
        {path: '/highPriority', component: TaskList},
        {path: '/completed', component: TaskList},
    ]
});

export default router;