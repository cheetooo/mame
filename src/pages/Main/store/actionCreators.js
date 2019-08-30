import * as types from './types'
import { fromJS } from 'immutable';
import {getNextSong} from '../../../api/index'

const changePlayList = (data) =>({
    type: types.NEXT_SONG,
    data
})

export const removeSong = (data)=>({
    type: types.REMOVE_SONG,
    data
})

export const playStatus = () =>({
    type: types.PLAY_STATUS
})

export const playListNextSong = () =>{
    return (dispatch) =>{
        getNextSong().then(data=>{
            // const action = {
            //     type: types.NEXT_SONG,
            //     data: fromJS(data.song[0])
            // }
            const action = changePlayList(data.song[0])
            dispatch(action)
        }).catch((err)=>{
            console.log(err)
        })
    }
}