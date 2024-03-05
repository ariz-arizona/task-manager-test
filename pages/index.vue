<script setup lang="ts">
import variables from 'assets/variables.module.scss'
const todos = useTodoStore()
const route = useRoute()

watch(() => route.query.page_error, () => {
    todos.fetch(!!route.query.page_error)
})
</script>

<template>
    <div>
        <ProjectLoader v-if="todos.status === 'loading'" />
        <ProjectError v-else-if="todos.status === 'error'" :msg="todos.error || 'ERR'" />
        <a-row :gutter="[24, 24]" v-else-if="todos.projects.length">
            <a-col span="24">
                <a-alert type="info" message="Это главная страница - просто список проектов" />
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" v-for="item in  todos.projects ">
                <a-card>
                    <template #title>
                        <NuxtLink :to="`/project/${item.id}`">#{{ item.id }} {{ item.name }}</NuxtLink>
                    </template>
                    <a-space direction="vertical">
                        {{ item.name }}
                        <ul v-if="typeof item.todos_count === 'object'">
                            <li>
                                <a-typography>
                                    pending <a-badge :count="item.todos_count.pending" :color="variables.colorGray"
                                        title="pending" />
                                </a-typography>
                            </li>
                            <li>
                                <a-typography>
                                    error <a-badge :count="item.todos_count.error" :color="variables.colorError"
                                        title="error" />
                                </a-typography>
                            </li>
                            <li>
                                <a-typography>
                                    success <a-badge :count="item.todos_count.success" :color="variables.colorPrimary"
                                        title="success" />
                                </a-typography>
                            </li>
                        </ul>
                        <a-typography v-else>
                            всего задач <a-badge :count="item.todos_count" :color="variables.colorPrimary"
                                title="all todos" />
                        </a-typography>
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