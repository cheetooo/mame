import  audio_state_reducer from './audio_state';
import  record_list_reducer from './record_list';

// https://github.com/reduxjs/redux/blob/master/src/combineReducers.js
function combineReducers(reducers) {
      // 取得所有 key
  const reducerKeys = Object.keys(reducers)
  // 用來放所有 Reducer 的 state
  let objInitState = {}

  // 檢查是否都有預設的 state 值
  reducerKeys.forEach((key) => {
    // 傳入空的 type ，因為 Reducer 內會有預設 action 為回傳目前的 state
    const initState = reducers[key](undefined, { type: '' })
    if (initState === 'undefined'){
      // 沒有的話提示錯誤
      throw new Error(`${key} does not return state.`)
    }
    // 如果有預設資料的話就放進 objInitState 裡面
    objInitState[key] = initState
  })

  // combineReducer 會回傳一個和 Reducer 一樣的純函數，會接收 action 做事情
  return (state, action) => {
    if(action){
      // 將該指令分別給所有的 Reducer 執行
      reducerKeys.forEach((key) => {
        const previousState = objInitState[key]
        // 執行完後把回傳的 state 再收回保管全部 state 的 objInitState 中
        objInitState[key] = reducers[key](previousState, action)
      })
    }
    
    // 沒有給 action 或有經過處理，都回傳一個新的 objInitState
    return { ...objInitState }
  }
}

const reducers = combineReducers({audio_state_reducer, record_list_reducer});
// const INITIAL_STATE = {
//     audio_state_reducer: INITIAL_AUDIO_STATE,
//     record_list_reducer: INITIAL_RECORD_LIST
// }

export {reducers}
