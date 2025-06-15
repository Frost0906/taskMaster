<template>
    <div>
        <TaskDialog @close="router.go(-1)"/>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import TaskDialog from "./TaskDialog.vue";

const router = useRouter();

</script>