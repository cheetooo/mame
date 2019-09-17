import axios from 'axios'

export const baseURL = 'https://api.douban.com/v2/fm/';

const axiosInstance = axios.create({
    baseURL : baseURL
})

axiosInstance.interceptors.request.use(
    req => {
        /* 
            console.log(req)
        */
        if(req.method == 'get'){
            /*
                在请求url上拼接_ts字段
            */
            return Object.assign({}, req, {url:`${req.url}&_ts=${Date.parse(new Date()) / 1000}`})
        }
        /* 
            todo
        */
        if(req.method == 'post'){
            return req 
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