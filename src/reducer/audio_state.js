import drop from 'lodash/drop';
import dropRight from 'lodash/dropRight';

const INITIAL_AUDIO_STATE = {
    IS_LOADING: false,
    IS_PLAYING: false,
    VOLUME: 10,
    CURRENT_TIME:Number,
    CURRENT_SONG: {},
    PLAY_HISTORY: [
        {
            title: "321",
            picture: "#fff"
        }, {
            title: "123",
            picture: "#b5b5b5"
        }, {
            title: "1234",
            picture: "#f5f5f5"
        }
    ]
}
let new_list = []
function audio_state_reducer(state = INITIAL_AUDIO_STATE, action) {
    switch (action.type) {
        case 'loading':
            return Object.assign({}, state, {IS_LOADING: true})
        case 'toggle':
            return Object.assign({}, state, {
                IS_PLAYING: !state.IS_PLAYING
            });
        case 'stop':
            return Object.assign({}, state, {
                IS_PLAYING: false,
                IS_LOADING: false
            });
        case 'play':
            return Object.assign({}, state, {
                IS_PLAYING: true,
                IS_LOADING: false
            });
        case 'change_song':
            new_list = drop(state.PLAY_HISTORY).concat(action.audio_info);
            return Object.assign({}, state, {
                PLAY_HISTORY: new_list,
                CURRENT_SONG: action.audio_info
            })
        case 'remove_song':
            new_list = dropRight(state.PLAY_HISTORY).concat(action.audio_info);
            return Object.assign({}, state, {
                PLAY_HISTORY: new_list,
                CURRENT_SONG: action.audio_info
            })
        case 'adjust_volume':
            return Object.assign({}, state, {VOLUME: action.new_volume})
        default:
            return state
    }
}

export default audio_state_reducer