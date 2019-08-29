import * as types from './types'
import { fromJS } from 'immutable';

export const changePlayList = (data) =>({
    type: types.NEXT_SONG,
    data:fromJS(data)
})

// export const removeSong = (data)=>({
//     type: types.REMOVE_SONG,
//     data
// })

export const playStatus = () =>({
    type: types.PLAY_STATUS
})