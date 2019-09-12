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

export const getNextSong = (channel = 153) => {
    let url = `${audioBasePath}${Object.entries(Object.assign({
        }, commonParams, {channel:channel}))
        .reduce((pre, [k, v]) => {
            return pre + k + '=' + v + '&'},'')}`;
        return axiosInstance.get(url)
    }

    export const getIndexChannel = () => {
        let url = `app_index_channels?`
    }