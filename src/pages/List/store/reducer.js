import * as types from './types';
import { fromJS } from 'immutable';

const initState = fromJS({
    musicList:[]
})

export default (state = initState, action) => {
    switch (action.type) {
        case types.SET_SONG_LIST:
                return state.set('musicList', action.data)
        default:
            break;
    }
}