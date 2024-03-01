interface todoState {
    projects: {
        id: number,
        name: string
    }[],
    status: 'idle' | 'error' | 'success',
    error: string | null
}
export const useTodoStore = defineStore('todoStore', {
    state: (): todoState => ({
        projects: [],
        status: 'idle',
        error: null
    }),
    actions: {
        async fetch() {
            const projects = await $fetch('/api/projects')

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