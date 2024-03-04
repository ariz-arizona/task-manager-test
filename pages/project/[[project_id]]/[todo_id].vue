<script setup lang="ts">
const todos = useTodoStore()
const route = useRoute()

const projectId = parseInt(route.params.project_id[0] ?? route.params.project_id)
const todoId = parseInt(route.params.todo_id[0] ?? route.params.todo_id)
const thisTodo = computed(() => {
    return todos.todos.filter(el => el.project_id === projectId && el.id === todoId)[0]
})
</script>

<template>
    <ProjectLoader v-if="todos.status === 'loading'" />
    <ProjectError v-else-if="todos.status === 'error'" :msg="todos.error || 'ERR'" />
    <ProjectError v-else-if="!todos.projects.find(el => el.id === projectId)" msg="Такой проект не найден" />
    <a-row v-else-if="!thisTodo">
        <a-col span="24">
            <a-alert message="Задача не найдена" />
        </a-col>
    </a-row>
    <a-row :gutter="[24, 24]" v-else>
        <a-col span="24">
            <a-card :title="thisTodo.title">
                {{ thisTodo.content }}
            </a-card>
        </a-col>
    </a-row>
</template>