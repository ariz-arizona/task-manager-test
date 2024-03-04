<script setup lang="ts">
import { ribbonColor } from '~/components/RibbonColor.vue';
const todos = useTodoStore()
const route = useRoute()

const projectId = parseInt(Array.isArray(route.params.project_id) ? route.params.project_id[0] : route.params.project_id)
const todosProject = computed(() => {
    return todos.todos.filter(el => el.project_id === projectId)
})
</script>

<template>
    <ProjectLoader v-if="todos.status === 'loading'" />
    <ProjectError v-else-if="todos.status === 'error'" :msg="todos.error || 'ERR'" />
    <ProjectError v-else-if="!todos.projects.find(el => el.id === projectId)" msg="Такой проект не найден" />
    <a-row v-else-if="!todosProject.length">
        <a-col span="24">
            <a-alert message="Задач в этом проекте не найдено" />
        </a-col>
    </a-row>
    <a-row :gutter="[24, 24]" v-else>
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
            <a-form>

            </a-form>
        </a-col>
    </a-row>
</template>