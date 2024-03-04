<script setup lang="ts">
const todos = useTodoStore()
</script>

<template>
    <a-row class="header" align="middle" justify="space-between">
        <a-col span="4">
            <NuxtLink to="/">
                <Icon name="ri:todo-fill" class="header-logo" />
            </NuxtLink>
        </a-col>
        <a-col>
            <a-button @click="todos.clearLocalStorage">Очистить localstorage</a-button>
        </a-col>
    </a-row>
</template>