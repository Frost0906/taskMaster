<template>
    <van-nav-bar title="标题" />
    <van-form @submit="onSubmit">
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
                v-model="task.priority"
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
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

</template>

<script setup>
import {ref} from 'vue';

const task = ref({
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

const priorityField = [
    { text: '高', value: '高' },
    { text: '中', value: '中' },
    { text: '低', value: '低' },
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

// [修改处] 定义事件发射器
const emit = defineEmits(['close', 'submit']);

const props = defineProps({
    initialData: Object
});

// [修改处] 表单提交处理
const onSubmit = () => {
    emit('submit', task.value);  // 发射submit事件
};
</script>

<style scoped>
</style>