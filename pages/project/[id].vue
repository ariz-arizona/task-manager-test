<script setup lang="ts">
import variables from 'assets/variables.module.scss'
const todos = useTodoStore()
const route = useRoute()

const todosFetch = () => {
    if (todos.status === 'idle') {
        todos.fetch(!!route.query.page_error)
    }
}
onMounted(() => { todosFetch() })
watch(() => route.fullPath, () => { todosFetch() })
const projectId = parseInt(route.params.id[0] ?? route.params.id)
const todosProject = computed(() => {
    return todos.todos.filter(el => el.project_id === projectId)
})
const ribbonColor = {
    success: variables.colorInfo,
    pending: variables.colorGray,
    error: variables.colorError
}
</script>

<template>
    <ProjectLoader v-if="todos.status === 'loading'" />
    <ProjectError v-else-if="todos.status === 'error'" :msg="todos.error || 'ERR'" />
    <ProjectError v-else-if="!todos.projects.find(el => el.id === projectId)" msg="No project" />
    <a-row v-else-if="!todosProject.length">
        <a-col span="24">
            <a-alert message="No Tasks found" />
        </a-col>
    </a-row>
    <a-row :gutter="[24, 24]" v-else>
        <a-col span="12" v-for="item in todosProject">
            <a-badge-ribbon :text="item.status" :color="ribbonColor[item.status]">
                <a-card :title="`#${item.id} ${item.title}`">
                    {{ item.content }}
                </a-card>
            </a-badge-ribbon>
        </a-col>
    </a-row>
</template>