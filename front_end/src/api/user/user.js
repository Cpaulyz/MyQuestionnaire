import axios from 'axios'

const api = {
    userPre: '/api/user'
}

export function registerAPI(data) {
    return axios({
        url: `${api.userPre}/register`,
        method: 'POST',
        data
    })
}

export function loginAPI(data) {
    return axios({
        url: `${api.userPre}/login`,
        method: 'POST',
        data
    })
}
