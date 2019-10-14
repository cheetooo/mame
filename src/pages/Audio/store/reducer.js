import * as types from './types'
import { fromJS } from 'immutable'
import db from '../../../db'

const initState = fromJS({
    isLoading: false,// 是否在加载中
    playing: false,// 是否播放状态
    playList: [],// 播放列表 todo ： 最近播放的三首歌
    currentChannel: {}, // 当前频道信息
    currentMHz: 0,  // 当前MHz ID
    currentSong: {}, // 当前音乐信息
    volume: db.get('app_setting.volume').write(), //音量
    appIndexChannel: [], //应用内所有MHz
    songLists:[], // 全部歌单
    currentSongList:{}, //当前歌单
    currentSongListIndex: 0 // 当前歌单内歌曲播放下标
})

export default (state = initState, action) => {
    switch (action.type){
        case types.PLAYING:
            return state.set('playing', !state.get('playing'));
        case types.NEXT_SONG:
            if(fromJS(state.get('playList')).size == 0){
                return state.merge({
                    'playList': fromJS(state.get('playList').push({title:'temp1'},{title:'temp2'},action.data)),
                    'currentSong': fromJS(action.data)
                })
            }else{
                return state.merge({
                    'playList': fromJS(state.get('playList').shift().push(action.data)),
                    'currentSong': fromJS(action.data)
                })
            }            
            // return state.set('playList', fromJS(state.get('playList').shift().push(action.data)));
        case types.REMOVE_SONG:
            return state.merge({
                'playList': fromJS(state.get('playList').pop().push(action.data)),
                'currentSong': fromJS(action.data)
            })
        case types.LIKE_SONG:
            // todo
            return state;
        case types.UNLIKE_SONG:
            // todo
            return state;
        case types.CHANGE_VOLUME:
            // todo
            // db.set('app_setting.volume', action.data).write();
            return state.set('volume', action.data);
            // return state;
        case types.SET_CHANNEL:
            // console.log(action.data)
            return state.set('currentChannel', action.data);
        case types.GET_CHANNELS:
            return state.set('appIndexChannel',fromJS(action.data))
        case types.SET_MHZ:
            return state.set('currentMHz', action.data)
        default:
            return state
    }
}