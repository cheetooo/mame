import {combineReducers} from 'redux-immutable';
// import { reducer as mainReducer } from '../pages/Main/store/index';
import audioReducer from '../pages/Audio/store/reducer';

export default combineReducers({
    // main: mainReducer,
    audio: audioReducer
    // setting: settingReducer
})