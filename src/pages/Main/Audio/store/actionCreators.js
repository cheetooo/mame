import * as types from './types'
import { fromJS } from 'immutable'
import {getNextSong} from '../../../../api/index'

// 下一曲
const nextSong = (data) =>({
    type: types.NEXT_SONG,
    data
})

// 标记为不喜欢
const removeSong = (data) => ({
    type: types.REMOVE_SONG,
    data
})

// 标记为红心
const likeSong = () => ({
    type: types.LIKE_SONG
})

// 取消红心
const unlikeSong = () => ({
    type: types.UNLIKE_SONG
})

// 切换播放状态
export const togglePlaying = () => ({
    type: types.PLAYING
})

// 改变播放列表
export const changeSong = (type, data) => {
    return (dispatch) => {
        //@params data | 请求参数
        getNextSong().then(res => {
            type == types.NEXT_SONG
            ?dispatch(nextSong(res.song[0]))
            :dispatch(removeSong(res.song[0]))
        }).catch(err => {
            console.log(err)
        })
    }
}

// 切换红心状态
export const toggleLikeStatus = (type) => {
    return (dispatch) => {
        if(type == types.LIKE_SONG){
            dispatch(likeSong)
        }else{
            dispatch(unlikeSong)
        }
    }
}

// 改变播放音量
export const changeVolume = (data) => ({
    type: types.CHANGE_VOLUME,
    data
})