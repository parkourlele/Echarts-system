import request from '@/utils/request.js'

export const getVisualization = () => {
    return request({
        url: import.meta.env.VITE_APP_BASE_API + '/visualization'
    })
}