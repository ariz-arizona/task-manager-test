import type { TodoStatus } from "~/types/api"

type TodoItem = {
    id: number | null,
    project_id: number,
    title: string,
    content: string,
    status: TodoStatus
}
type ProjectItem = {
    id: number,
    name: string,
    todos_count?: number | { pending: number, success: number, error: number }
}
interface TodoState {
    projects: ProjectItem[],
    todos: TodoItem[],
    status: 'idle' | 'loading' | 'error' | 'success',
    error: string | null
}

type todoQuery = {
    error?: string
}
export const useTodoStore = defineStore('todoStore', {
    state: (): TodoState => ({
        projects: [],
        todos: [],
        status: 'idle',
        error: null
    }),
    actions: {
        async deleteItem(data: TodoItem) {
            await new Promise(f => setTimeout(f, 1500));
            const itemId = this.todos.findIndex(el => el.project_id === data.project_id && el.id === data.id)
            if (itemId !== -1) {
                this.todos.splice(itemId, 1)
                this.updateLocal()
                return true
            }
            return false
        },
        async updateItem(data: TodoItem) {
            await new Promise(f => setTimeout(f, 1500));
            const itemId = this.todos.findIndex(el => el.project_id === data.project_id && el.id === data.id)
            if (itemId !== -1) {
                this.todos.splice(itemId, 1, data)
                this.updateLocal()
                return true
            }
            return false
        },
        async createItem(data: TodoItem) {
            await new Promise(f => setTimeout(f, 1500));
            const id = Math.max(...this.todos.map(el => el.id ?? 0))
            data.id = id + 1
            this.todos.push(data)
        },
        clearLocalStorage() {
            localStorage.removeItem('projects')
            localStorage.removeItem('todos')
            this.fetch()
        },
        getlocal(type: 'projects' | 'todos', error = false) {
            let localResponse = null
            try {
                const lp = localStorage.getItem(type)
                let localData = null
                if (lp) localData = JSON.parse(lp)
                if (localData) localResponse = { status: 'success', data: localData }
                if (localData && error) localResponse = { status: 'error', error: 'Local error' }
            } catch (error) { }
            return localResponse
        },
        updateLocal() {
            localStorage.setItem('todos', JSON.stringify(this.todos))
            localStorage.setItem('projects', JSON.stringify(this.projects))
        },
        async fetch(error = false) {
            this.status = 'loading'
            await new Promise(f => setTimeout(f, 1500));

            const query: todoQuery = {}
            if (error) query.error = 'test error'

            let localProjects = this.getlocal('projects', error)
            const projects = localProjects || await $fetch('/api/projects', { query })

            if (projects?.status === 'success') {
                this.projects = projects.data
                this.status = 'success'
                this.error = null
            } else if (projects?.status === 'error') {
                this.projects = []
                this.status = 'error'
                this.error = projects.error || 'ERR'
            }

            let localTodos = this.getlocal('todos')
            const todos = localTodos || await $fetch('/api/todos')

            if (todos?.status === 'success') {
                this.todos = todos?.data

                this.projects = this.projects.map(el => {
                    const projectTodos = this.todos.filter(item => item.project_id === el.id)
                    const count = projectTodos.length
                    const categoriesCount = { error: 0, success: 0, pending: 0 }
                    for (const key in categoriesCount) {
                        categoriesCount[key as keyof typeof categoriesCount] = projectTodos.filter(item => item.status === key).length
                    }
                    el.todos_count = Math.random() > 0.5 ? categoriesCount : count
                    return el
                })
            }

            this.updateLocal()
        }
    }
})