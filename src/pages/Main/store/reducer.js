import * as types from './types'
import { fromJS } from 'immutable';

const initState = fromJS({
    playing: false,
    playList:[{},{},{}]
})

export default (state = initState,action) =>{
    switch(action.type){
        case types.PLAY_STATUS:
            return state.set('playing',!state.playing);
        case types.NEXT_SONG:
            return state.set('playList',fromJS(action.data))
        default:
            return state;
    }
}