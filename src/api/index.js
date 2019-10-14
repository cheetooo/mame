import {axiosInstance} from './config';
import * as audioAction from '../pages/Main/store/actionCreators';

const audioBasePath = 'playlist?';
const userBasePath = '';
const settingBasePath = '';

const commonParams = {
    /*
       name: _ts
       value: Number
       note: 当前时间戳
    */
    apikey: '02646d3fb69a52ff072d47bf23cef8fd',
    app_name: 'radio_iphone',
    audio_patch_version: 4,
    douban_udid: '1491105ce5e7de78e4368eebd066d5be88587ff1',
    formats: 'aac',
    kbps: 128,
    pt: '0.0',
    type: 'n',
    udid: 'ec567320821a9b4c3653f4327e103a07e9929a5a',
    user_accept_play_third_party: 0,
    version: 131
}

/*
    @params channel Number 频道
    @params type String 类型

    下一曲（切换MHz后，点击下一曲）
    加入到不喜欢
    标记红心
    取消红心      

*/
export const getNextSong = (channel) => {
    let url = `${audioBasePath}${Object.entries(Object.assign({
        }, commonParams, {channel:channel}))
        .reduce((pre, [k, v]) => {
            return pre + k + '=' + v + '&'},'')}`;
        return axiosInstance.get(url)
    }

/*
    @params void
    获取所有MHz
*/
export const getIndexChannel = () => {
    let url = `app_index_channels?${Object.entries(commonParams).reduce((pre,[k, v])=>{
        return pre + k + '=' + v +'&'}, '')}`;
    return axiosInstance.get(url)
}

/** 
 * @params void
 * 获取所有歌单
*/

export const getSongList = () => {
    let url = ``
}

/** 
 * @params void
 * 获取歌单中的一首歌曲
*/
export const getCurrentSong = () => {
    let url = ``
}

/** 
 * @params void
 * 
*/

