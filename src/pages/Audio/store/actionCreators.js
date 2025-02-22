import * as types from './types'
import { fromJS } from 'immutable'
import {getNextSong,getIndexChannel} from '../../../api/index'

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
export const changeSong = (type) => {
    return (dispatch, getState) => {
        let data = getState().toJS().audio.currentChannel.id
        // console.log(getState().toJS().audio.currentChannel.id)
        getNextSong(data).then(res => {
            let randomNumber = Math.floor(Math.random(0,1)*res.song.length)
            type == types.NEXT_SONG
            ?dispatch(nextSong(res.song[randomNumber]))
            :dispatch(removeSong(res.song[randomNumber]))
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

// 设置所有频道
const getChannels = (data) => ({
    type: types.GET_CHANNELS,
    data
})

export const setMHZ = (data) => ({
    type: types.SET_MHZ,
    data
})

export const setChannel = (data) =>({
    type: types.SET_CHANNEL,
    data
})

// 获取所有频道
export const getAppIndexChannel = () =>{
    return (dispatch,getState) =>{
        getIndexChannel().then(res=>{
            const allChannel = res.groups.concat(res.genre_groups)
            console.log(allChannel)
            dispatch(getChannels(allChannel))
            if(!getState().toJS().audio.currentChannel.id){
                dispatch(setChannel(res.groups[0].chls[1]))
            }
        })
    }
}
export const updateSettingVolume = () =>({
    type: types.UPDATE_SETTING_VALUE
})