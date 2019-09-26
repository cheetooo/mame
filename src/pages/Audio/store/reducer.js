import * as types from './types'
import { fromJS } from 'immutable'
import db from '../../../db'

const initState = fromJS({
    playing: false,
    playList: [],
    currentChannel:{},
    currentSong: {},
    volume: db.get('app_setting.volume').write(),
    appIndexChannel:{
        genre_groups: [],
        groups: []
    }
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
        case 'SET_CHANNEL':
            // console.log(action.data)
            return state.set('currentChannel', action.data);
        case types.GET_CHANNELS:
            return state.set('appIndexChannel',fromJS(action.data))
        case types.UPDATE_SETTING_VALUE:
            db.set('app_setting.volume', state.get('volume')).write();
            return state
        default:
            return state
    }
}