<script setup lang="ts">
const todos = useTodoStore()
const route = useRoute()
onMounted(async () => {
    await todos.fetch(!!route.query.page_error)
})
</script>
<template>
    <a-row align="middle" style="min-height: 200px;" v-if="todos.status === 'loading'">
        <a-col span="24" style="text-align: center;">
            <a-spin />
        </a-col>
    </a-row>
    <a-row v-else-if="todos.status === 'error'">
        <a-col span="24">
            <a-alert type="error" :message="todos.error" />
        </a-col>
    </a-row>
    <a-row :gutter="24" v-else>
        <a-col :span="8" v-for="item in todos.projects">
            <a-card :title="`# ${item.id}`">
                <template #extra>
                    <NuxtLink :to="`/project/${item.id}`">Подробнее</NuxtLink>
                </template>
                {{ item.name }}
            </a-card>
        </a-col>
    </a-row>
</template>