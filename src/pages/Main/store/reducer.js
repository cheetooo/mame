import * as types from './types'
import { fromJS } from 'immutable';

const initState = fromJS({
    playing: false,
    playList:[{title:'1'},{title:'2'},{title:'3'}]
})

export default (state = initState,action) =>{
    switch(action.type){
        case types.PLAY_STATUS:
            return state.set('playing',!state.get('playing'));
        case types.NEXT_SONG:
            return state.set('playList',fromJS(state.get('playList').shift().push(action.data)));
        case types.REMOVE_SONG:
            return state.set('playList',fromJS(state.get('playList').pop().push(action.data)))
        default:
            return state;
    }
}