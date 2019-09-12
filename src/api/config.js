import axios from 'axios'

export const baseURL = 'https://api.douban.com/v2/fm/';

const axiosInstance = axios.create({
    baseURL : baseURL
})

axiosInstance.interceptors.request.use(
    req => {
        console.log(req)
        if(req.method == 'get'){
            return Object.assign({}, req, {url:`${req.url}&_ts=${Date.parse(new Date()) / 1000}`})
        }
        if(req.method == 'post'){
            return req // todo
        }
        return req     
    },
    err => console.log('Network Error, Reason:' + err) 
)

axiosInstance.interceptors.response.use(
    res=>res.data,
    err=>{
        console.log('Network Error, Reason:' + err)
    }
)

export {
    axiosInstance
}