import drop from 'lodash/drop';
import dropRight from 'lodash/dropRight';

const INITIAL_AUDIO_STATE = {
    IS_PLAYING: false,
    VOLUME: 10,
    AUDIO_NAME: "",
    AUDIO_COVER: "",
    SINGER_NAME: "",
    HZ_NAME: "",
    PLAY_HISTORY: [{name:"321",css:"#fff"},{name:"123",css:"#b5b5b5"},{name:"1234",css:"#f5f5f5"}]
}
let new_list = []
function audio_state_reducer(state, action) {
    console.log(state)
    switch (action.type) {
        case 'toggle':
            return Object.assign({}, state, {
                IS_PLAYING: !state.IS_PLAYING
            });
        case 'stop':
            return Object.assign({}, state, {IS_PLAYING: false});
        case 'play':
            return Object.assign({}, state, {IS_PLAYING: true});
        case 'change_song':
            new_list = drop(state.PLAY_HISTORY).concat(action.AUDIO_INFO);
            return Object.assign({}, state, {
                PLAY_HISTORY: new_list,
                AUDIO_NAME: action.audio_name,
                AUDIO_COVER: action.audio_cover,
                SINGER_NAME: action.singer_name,
                HZ_NAME: action.Hz_name
            })
        case 'remove_song':
            new_list = dropRight(state.PLAY_HISTORY).concat(action.AUDIO_INFO);
            return Object.assign({}, state, {
                PLAY_HISTORY: new_list,
                AUDIO_NAME: action.audio_name,
                AUDIO_COVER: action.audio_cover,
                SINGER_NAME: action.singer_name,
                HZ_NAME: action.Hz_name
            })
        default:
            return state
    }
}

export {INITIAL_AUDIO_STATE, audio_state_reducer}