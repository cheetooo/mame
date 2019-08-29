import axios from 'axios'
const baseUrl = '';
const baseParams = {
    
}

function getSong(type = 'GET', params){
    let url = `${baseUrl}`
    return axios({
        method: type,
        url: url
    }).then(res => {

    })
}

function Login(){
    
}