<script setup lang="ts">
import { ribbonColor } from '~/components/RibbonColor.vue';

const todos = useTodoStore()
const route = useRoute()

const projectId = parseInt(Array.isArray(route.params.project_id) ? route.params.project_id[0] : route.params.project_id)
const todoId = parseInt(Array.isArray(route.params.todo_id) ? route.params.todo_id[0] : route.params.todo_id)

const isEdit = ref<boolean>(false)

const thisTodo = computed(() => {
    const item = todos.todos.find(el => el.project_id === projectId && el.id === todoId)
    return item
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
            <a-space direction="vertical" style="width: 100%;">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <NuxtLink :to="`/project/${projectId}`">{{ todos.projects.find(el => el.id === projectId)?.name
                            }}
                        </NuxtLink>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        Card #{{ todoId }}
                    </a-breadcrumb-item>
                </a-breadcrumb>
                <a-badge-ribbon :text="thisTodo.status" :color="ribbonColor[thisTodo.status]">
                    <a-card :title="thisTodo.title">
                        {{ thisTodo.content }}
                    </a-card>
                </a-badge-ribbon>
            </a-space>
        </a-col>
        <a-col span="24">
            <a-card>
                <template #title>
                    <a-typography-title :level="5">
                        Редактировать
                        <a-switch v-model:checked="isEdit" />
                    </a-typography-title>
                </template>
                <TodoEdit :project-id="projectId" :todo-id="todoId" v-if="isEdit" />
            </a-card>
        </a-col>
    </a-row>
</template>