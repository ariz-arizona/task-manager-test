<script setup lang="ts">
import variables from 'assets/variables.module.scss'
const todos = useTodoStore()
const route = useRoute()

watch(() => route.query.page_error, () => { 
    console.log(route.query)
    todos.fetch(!!route.query.page_error) })
</script>

<template>
    <div>
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
        <a-row v-else>
            <a-col span="24">
                <a-empty />
            </a-col>
        </a-row>
    </div>
</template>