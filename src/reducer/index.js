import {INITIAL_AUDIO_STATE, audio_state_reducer} from './audio_state';
import {INITIAL_RECORD_LIST, record_list_reducer} from './record_list';

function combineReducers(reducers) { //整合reducer函数的对象的函数
    return function (state = {}, action) { //返回一个整合之后的reducer函数 ,然后传给了createStore使用
        //依次调用所有的reduce函数，并得到了状态,然后得到了许多的状态,得到n个新的子状态，封装成对象并返回 准备一个保存所有新的子状态的容器对象
        const newState = {};
        //包含所有reducers函数名的数组 然后forEach遍历所有的key
        Object
            .keys(reducers)
            .forEach(key => {
                const childState = state[key]; //状态就是总state得其中的一个子state
                newState[key] = reducers[key](childState, action); //然后得到新的子状态，赋值给对应的key的新state里面
            });
        return newState; //最后返回新的总state对象
    }
}

const reducer = combineReducers({audio_state_reducer, record_list_reducer});
const INITIAL_STATE = {
    audio_state_reducer: INITIAL_AUDIO_STATE,
    record_list_reducer: INITIAL_RECORD_LIST
}
export {reducer, INITIAL_STATE}
