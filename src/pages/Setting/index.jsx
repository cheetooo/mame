import React,{useContext} from 'react'
import {Link} from 'react-router-dom';
// import {RootContext} from '../../index'
import axios from 'axios'
const baseUrl = 'https://api.douban.com/v2/fm/playlist?app_name=radio_android&apikey=02f7751a5506' +
        '6bcb08e65f4eff134361&user_accept_play_third_party=0&client=s:mobile%7Cv:5.0.1%7C' +
        'y:android+9%7Cf:654%7Cm:Xiaomi%7Cd:a57dd2f934f5911582ac34b2256c265287c62377%7Ce:' +
        'xiaomi_mi_9&udid=a57dd2f934f5911582ac34b2256c265287c62377&version=654&push_devic' +
        'e_id=8654eb9b2854da9684f9a62a8b2505dd57074b70&audio_patch_version=4&format=null&' +
        'kbps=128&pb=128&from=&pt=0.0&channel=-10&type=n&sid=';
function Setting(){
    // const [state,
    //     dispatch] = useContext(RootContext)
    return(
        <div>
            {/* Setting
            <Link to="/">jump</Link>
            <div onClick={()=>{axios(Object.assign({method: 'Get', url: `${baseUrl}`})).then(res => {
            dispatch({type: 'change_song', audio_info: res.data.song[0]})
        })}}>321</div> */}
        </div>
    )
}
export default Setting