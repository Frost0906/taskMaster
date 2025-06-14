<template>
    <van-cell-group title="显示设置">
        <van-cell title="主题模式">
            <template #value>
                <van-radio-group v-model="currentTheme" @change="switchTheme">
                    <van-radio v-for="opt in themeOptions" :name="opt.value">{{ opt.text }}</van-radio>
                </van-radio-group>
            </template>
        </van-cell>
    </van-cell-group>
</template>

<script setup>
const themeOptions = [
    { text: '浅色模式', value: 'light' },
    { text: '深色模式', value: 'dark' }
]

const switchTheme = (value) => {
    localStorage.setItem('theme', value)
    document.documentElement.setAttribute('data-theme', value)
}
</script>