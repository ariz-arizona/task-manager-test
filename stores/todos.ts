interface todoState {
    projects: {
        id: number,
        name: string,
        todos_count?: number | { pending: number, success: number, error: number }
    }[],
    todos: {
        id: number,
        project_id: number,
        title: string,
        content: string,
        status: 'pending' | 'success' | 'error'
    }[],
    status: 'idle' | 'loading' | 'error' | 'success',
    error: string | null
}

type todoQuery = {
    error?: string
}
export const useTodoStore = defineStore('todoStore', {
    state: (): todoState => ({
        projects: [],
        todos: [],
        status: 'idle',
        error: null
    }),
    actions: {
        async fetch(error = false) {
            this.status = 'loading'
            await new Promise(f => setTimeout(f, 1500));

            const query: todoQuery = {}
            if (error) query.error = 'test error'
            const projects = await $fetch('/api/projects', { query })

            if (projects.status === 'success') {
                this.projects = projects.data
                this.status = 'success'
                this.error = null
            } else if (projects.status === 'error') {
                this.projects = []
                this.status = 'error'
                this.error = projects.error
            }

            const todos = await $fetch('/api/todos')
            if (todos.status === 'success') {
                this.todos = todos.data

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
        }
    }
})