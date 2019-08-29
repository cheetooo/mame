import { combineReducers } from 'redux-immutable';
import { reducer as mainReducer } from '../pages/Main/store/index';
// import { reducer as settingReducer } from '../pages/Setting/store/index';

export default combineReducers({
    main: mainReducer,
    // setting: settingReducer
})