import todos from '../../data/todos.json'
import { ApiResponse } from './api'

export default defineEventHandler((event): ApiResponse => {
    const q = getQuery(event)

    if (q.hasOwnProperty('error')) {
        return {
            status: 'error',
            error: `ERR: ${q.error}`
        }
    }

    return {
        status: 'success',
        data: todos
    }
})