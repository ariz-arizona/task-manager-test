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
        clearLocalStorage(){
            localStorage.removeItem('projects')
            localStorage.removeItem('todos')
            this.fetch()
        },
        local(type: 'projects' | 'todos', error = false) {
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
        async fetch(error = false) {
            this.status = 'loading'
            await new Promise(f => setTimeout(f, 1500));

            const query: todoQuery = {}
            if (error) query.error = 'test error'

            let localProjects = this.local('projects', error)
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

            let localTodos = this.local('todos')
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

            localStorage.setItem('todos', JSON.stringify(this.todos))
            localStorage.setItem('projects', JSON.stringify(this.projects))
        }
    }
})