<script setup lang="ts">
const todos = useTodoStore()

await callOnce(todos.fetch)
</script>
<template>
    pages/index.vue file
</template>