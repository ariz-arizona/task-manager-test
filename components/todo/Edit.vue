<script setup lang="ts">
import type { TodoStatus } from '~/types/api';

const todos = useTodoStore()
const route = useRoute()

const projectId = parseInt(Array.isArray(route.params.project_id) ? route.params.project_id[0] : route.params.project_id)
const todoId = parseInt(Array.isArray(route.params.todo_id) ? route.params.todo_id[0] : route.params.todo_id)

const isEdit = ref<boolean>(false)

interface FormState {
    title: string | undefined;
    content: string | undefined;
    status: TodoStatus | undefined;
}
const formState = reactive<FormState>({
    title: '',
    content: '',
    status: 'pending',
});

const thisTodo = computed(() => {
    const item = todos.todos.find(el => el.project_id === projectId && el.id === todoId)
    formState.title = item?.title
    formState.content = item?.content
    formState.status = item?.status
    return item
})

const isFormChanged = computed(() => {
    const pairs = []
    if (!thisTodo.value) {
        return true
    }
    for (const key in formState) {
        pairs.push([
            formState[key as keyof typeof formState],
            thisTodo.value[key as keyof typeof formState]
        ])
    }
    return pairs.every((el) => el[0] === el[1])
})

const formLoading = ref<boolean>(false)

const onFormFinish = async (f: FormState) => {
    if (thisTodo.value) {
        formLoading.value = true
        const data = Object.assign(thisTodo.value, f)
        await todos.updateItem(data)
        formLoading.value = false
    }
}

const deleteTodo = async () => {
    if (thisTodo.value) {
        formLoading.value = true
        await todos.deleteItem(thisTodo.value)
        navigateTo(`/project/${projectId}`)
    }
}

</script>

<template>
    <a-form :model="formState" :disabled="!thisTodo || formLoading" @finish="onFormFinish" :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }">
        <a-form-item label="Название" name="title" :rules="{ required: true }">
            <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item label="Содержание" name="content" :rules="{ required: true }">
            <a-textarea v-model:value="formState.content" />
        </a-form-item>
        <a-form-item label="Статус" name="status">
            <a-select :options="['pending', 'success', 'error'].map(el => { return { label: el, value: el } })"
                v-model:value="formState.status" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-space>
                <a-button type="primary" html-type="submit" :disabled="isFormChanged">Сохранить</a-button>
                <a-button @click="deleteTodo">Удалить</a-button>
            </a-space>
        </a-form-item>
    </a-form>
</template>