<script setup lang="ts">
import { ribbonColor } from '~/components/RibbonColor';
const todos = useTodoStore()
const route = useRoute()

const projectId = parseInt(Array.isArray(route.params.project_id) ? route.params.project_id[0] : route.params.project_id)
const todosProject = computed(() => {
    return todos.todos.filter(el => el.project_id === projectId)
})

const isEdit = ref<boolean>(false)

const info = 'Это страница проекта. Вы можете создать новую задачу или перейти в редактирование задачи.'
</script>

<template>
    <ProjectLoader v-if="todos.status === 'loading'" />
    <ProjectError v-else-if="todos.status === 'error'" :msg="todos.error || 'ERR'" />
    <ProjectError v-else-if="!todos.projects.find(el => el.id === projectId)" msg="Такой проект не найден" />
    <a-row :gutter="[24, 24]" v-else>
        <a-col span="24">
            <a-breadcrumb>
                <a-breadcrumb-item>
                    <NuxtLink to="/">Главная</NuxtLink>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    {{ todos.projects.find(el => el.id === projectId)?.name }}
                </a-breadcrumb-item>
            </a-breadcrumb>
        </a-col>
        <a-col span="24" level="1">
            <a-typography-title>
                {{ todos.projects.find(el => el.id === projectId)?.name }}
            </a-typography-title>
            <a-alert type="info" :message="info" />
        </a-col>
        <a-col span="24" v-if="!todosProject.length">
            <a-alert message="Задач в этом проекте не найдено" />
        </a-col>
        <a-col span="12" v-for="item in todosProject">
            <a-badge-ribbon :text="item.status" :color="ribbonColor[item.status]">
                <a-card :title="`#${item.id} ${item.title}`">
                    <a-space direction="vertical">
                        {{ item.content }}
                        <NuxtLink :to="`/project/${projectId}/${item.id}`">
                            <a-button>
                                Редактировать
                            </a-button>
                        </NuxtLink>
                    </a-space>
                </a-card>
            </a-badge-ribbon>
        </a-col>
        <a-col span="24">
            <a-card>
                <template #title>
                    <a-typography-title :level="5">
                        Добавить todo
                        <a-switch v-model:checked="isEdit" />
                    </a-typography-title>
                </template>
                <TodoEdit :project-id="projectId" v-if="isEdit" />
            </a-card>
        </a-col>
    </a-row>
</template>