<script setup lang="ts">
import type { TodoStatus } from '~/types/api';

type FormEditProps = {
    projectId: number,
    todoId: number,
}

type FormCreateProps = {
    projectId: number,
}

const props = defineProps<FormEditProps | FormCreateProps>();

const todos = useTodoStore()

const { projectId } = props
const todoId = 'todoId' in props ? props.todoId : null

interface FormState {
    title: string | undefined;
    content: string | undefined;
    status: TodoStatus
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
    formState.status = item?.status || 'pending'
    return item
})

const isFormChanged = computed(() => {
    const pairs = []
    for (const key in formState) {
        pairs.push([
            formState[key as keyof typeof formState],
            thisTodo.value ? thisTodo.value[key as keyof typeof formState] : null
        ])
    }
    return pairs.every((el) => el[0] === el[1])
})

const formLoading = ref<boolean>(false)

const onFormFinish = async (f: FormState) => {
    let type: 'update' | 'create' | null = null
    if (thisTodo.value && todoId) type = 'update'
    if (projectId || !todoId) type = 'create'
    if (type) {
        formLoading.value = true
        if (type === 'update' && thisTodo.value) {
            const data = Object.assign(thisTodo.value, f)
            await todos.updateItem(data)
        } else if (type === 'create') {
            const preDefData = { id: null, project_id: projectId, title: 'TITLE', content: 'CONTENT' }
            const data = Object.assign(preDefData, f)
            await todos.createItem(data)
        }
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

const isFormDisabled = todoId ? !thisTodo : false
</script>

<template>
    <a-form :model="formState" :disabled="isFormDisabled || formLoading" @finish="onFormFinish" :label-col="{ span: 8 }"
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