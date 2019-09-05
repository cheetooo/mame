import * as types from './types'
import { fromJS } from 'immutable'

const initState = fromJS({
    playing: false,
    playList: [{title:1},{title:2},{title:3}],
    currentSong: {},
    volume: Number,
    playTime: Number
})

export default (state = initState, action) => {
    switch (action.type){
        case types.PLAYING:
            // console.log(state.merge({'playing': !state.get('playing')}))
            return state.set('playing', !state.get('playing'));
        case types.NEXT_SONG:
            return state.merge({
                'playList': fromJS(state.get('playList').shift().push(action.data)),
                'currentSong': fromJS(action.data)
            })
            // return state.set('playList', fromJS(state.get('playList').shift().push(action.data)));
        case types.REMOVE_SONG:
            return state.set('playList', fromJS(state.get('playList').pop().push(action.data)));
        case types.LIKE_SONG:
            // todo
            return state;
        case types.UNLIKE_SONG:
            // todo
            return state;
        case types.CHANGE_VOLUME:
            // todo
            return state;
        default:
            return state
    }
}