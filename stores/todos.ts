interface todoState {
    projects: {
        id: number,
        name: string
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
        status: 'idle',
        error: null
    }),
    actions: {
        async fetch(error = false) {
            this.status = 'loading'
            await new Promise(f => setTimeout(f, 3000));

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
        }
    }
})