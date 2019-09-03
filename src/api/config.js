import axios from 'axios'

export const baseURL = 'https://api.douban.com/v2/fm/';

const axiosInstance = axios.create({
    baseURL : baseURL
})

axiosInstance.interceptors.response.use(
    res=>res.data,
    err=>{
        console.log('Network Error, Reason:' + err)
    }
)

export {
    axiosInstance
}