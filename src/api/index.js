import {axiosInstance} from './config';
import * as audioAction from '../pages/Main/store/actionCreators';

const audioBaseParams = 'playlist?';
const userBaseParams = '';
const settingBaseParams = '';

const commonParams = {
    apikey:'02646d3fb69a52ff072d47bf23cef8fd',
    app_name:'radio_iphone',
    audio_patch_version:4,
    channel:152,
    douban_udid:'1491105ce5e7de78e4368eebd066d5be88587ff1',
    formats:'aac',
    kbps:128,
    pt:'0.0',
    type:'n',
    udid:'ec567320821a9b4c3653f4327e103a07e9929a5a',
    user_accept_play_third_party:0,
    version:131
    }

export const getNextSong = () => {
    let url = `${audioBaseParams}${Object
        .entries(commonParams)
        .reduce((pre, [k, v]) => {
            return pre + k + '=' + v + '&'},'')}`;
    return axiosInstance.get(url)
        }