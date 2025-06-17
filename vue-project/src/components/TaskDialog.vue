<template>
    <van-nav-bar
        title="任务详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft">
        <template #right>
            <van-icon name="description" size="18" />
        </template>
    </van-nav-bar>
    <van-form>
        <van-cell-group inset>
            <van-field
                v-model="task.title"
                name="title"
                type="text"
                label="标题"
                placeholder="标题"
                :rules="[{ required: true, message: '请填写标题' }]"
            />
            <van-field
                v-model="task.description"
                type="textarea"
                name="description"
                label="描述"
                placeholder="描述"
            />
            <van-field
                v-model="displayPriority"
                is-link
                readonly
                label="优先级"
                placeholder="选择优先级"
                @click="showPicker = true"
            />
            <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
                <van-picker
                    :model-value="pickerValue"
                    :columns="priorityField"
                    @cancel="showPicker = false"
                    @confirm="onConfirmPriority"
                />
            </van-popup>
            <van-field
                v-model="task.dueDate"
                is-link
                readonly
                name="calendar"
                label="截止时间"
                placeholder="点击选择日期"
                @click="showCalendar = true"
            />
            <van-calendar v-model:show="showCalendar" @confirm="onConfirmDate" />
            <van-field name="switch" label="开启提醒">
                <template #input>
                    <van-switch v-model="task.remind" />
                </template>
            </van-field>
            <van-field name="checkbox" label="已完成">
                <template #input>
                    <van-checkbox v-model="task.completed" shape="square" />
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button block type="primary" @click="submitForm">完成</van-button>
            <van-button v-if="!isNewTask" block type="danger" @click="deleteTask">删除</van-button>
        </div>
    </van-form>

</template>

<script setup>
import {ref, watchEffect, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useTaskStore} from "@/store/task.js";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";

const onClickLeft = () => history.back();

const task = ref({
    id: '',
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    completed: false,
    remind: false,
    subtasks: []
})

const showCalendar = ref(false);
const onConfirmDate = (date) => {
    task.value.dueDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    showCalendar.value = false;
};

const displayPriority = computed(() => {
    const map = {
        high: '高',
        medium: '中',
        low: '低'
    };
    return map[task.value.priority] || task.value.priority;
});

const priorityField = [
    { text: '高', value: 'high' },
    { text: '中', value: 'medium' },
    { text: '低', value: 'low' },
];
const showPicker = ref(false);
const pickerValue = ref([]);
const onConfirmPriority = ({ selectedOptions }) => {
    showPicker.value = false;
    const selectedValue = selectedOptions[0]?.value;
    if (selectedValue) {
        task.value.priority = selectedValue;
        pickerValue.value = [selectedOptions[0]?.text];
    }
};

const route = useRoute();
const router = useRouter();
const tasksStore = useTaskStore();
const isNewTask = ref(false);

// 检查是否是新建任务
if (route.params.taskId === 'new') {
    isNewTask.value = true;
}

// 获取当前任务并填充表单
watchEffect(() => {
    // 新建任务 - 重置表单
    if (isNewTask.value) {
        task.value = {
            id: '',
            title: '',
            description: '',
            priority: '',
            dueDate: '',
            completed: '',
            remind: '',
            subtasks: []
        };
        return;
    }

    // 获取任务ID并验证
    const taskId = Number(route.params.taskId);
    if (!taskId || isNaN(taskId)) {
        return;
    }

    // 从store中查找任务
    const currentTask = tasksStore.tasks.find(task => task.id === taskId);

    // 找到任务 - 填充表单
    if (currentTask) {
        // 使用深拷贝避免直接修改store数据
        task.value = JSON.parse(JSON.stringify(currentTask));
    } else {
        // 未找到任务 - 重置表单
        console.warn(`Task with ID ${taskId} not found`);
        task.value = {
            id: '',
            title: '',
            description: '',
            priority: '',
            dueDate: '',
            completed: '',
            remind: '',
            subtasks: []
        };
    }
});

// 提交表单的方法
function submitForm() {
    if (!task.value.title) {
        showFailToast('请输入任务标题');
        return;
    }
    if (isNewTask.value) {
        tasksStore.addTask({
            ...task.value,
            id: Date.now()
        });
        showSuccessToast('添加任务成功');
    } else {
        tasksStore.updateTask(task.value);
        showSuccessToast('修改任务成功');
    }
    router.push('/all');
}

function deleteTask() {
    showConfirmDialog({
        message:
            '您确认要删除吗?',
    })
        .then(() => {
            tasksStore.deleteTask(task.value.id);
            showSuccessToast('删除任务成功');
        })
        .catch(() => {
        });
    router.push('/all');
}
</script>

<style scoped>
</style>