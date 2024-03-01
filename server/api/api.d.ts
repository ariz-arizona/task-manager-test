type ApiResponseSuccess = {
    status: 'success',
    data: any[],
    error?: null
}
type ApiResponseError = {
    status: 'error',
    data?: never[],
    error: string
}
export type ApiResponse = ApiResponseSuccess | ApiResponseError