<script setup lang="ts">
import variables from 'assets/variables.module.scss'
const todos = useTodoStore()
const route = useRoute()

const todosFetch = () => todos.fetch(!!route.query.page_error)
watch(() => route.fullPath, () => { todosFetch() })
</script>

<template>
    <ProjectLoader v-if="todos.status === 'loading'" />
    <ProjectError v-else-if="todos.status === 'error'" :msg="todos.error || 'ERR'" />
    <a-row :gutter="24" v-else-if="todos.projects.length">
        <a-col :xs="24" :sm="12" :md="8" v-for="item in  todos.projects ">
            <a-card :title="`# ${item.id}`">
                <template #extra>
                    <NuxtLink :to="`/project/${item.id}`">Подробнее</NuxtLink>
                </template>
                <a-space direction="vertical">
                    {{ item.name }}
                    <a-space v-if="typeof item.todos_count === 'object'">
                        <a-badge :count="item.todos_count.pending" :color="variables.colorGray" />
                        <a-badge :count="item.todos_count.error" :color="variables.colorError" />
                        <a-badge :count="item.todos_count.success" :color="variables.colorInfo" />
                    </a-space>
                    <a-badge v-else :count="item.todos_count" :color="variables.colorInfo" />
                </a-space>
            </a-card>
        </a-col>
    </a-row>
</template>