// import * as types from './types'
// import { fromJS } from 'immutable';
// import {getIndexChannel} from '../../../api/index'
// import {changeSong} from '../../Audio/store/actionCreators'

// const setAllChannels = (data) =>({
//     type: types.FETCH_ALL_CHANNELS,
//     data
// })

// const setChannels = (data) =>({
//     type: types.SET_CHANNEL,
//     data
// })

// export const fetchAllChannels = () =>{
//     return dispatch =>{
//         getIndexChannel().then(res=>{
//             dispatch(setAllChannels(res))
//             console.log(res.groups)
//             // dispatch(setChannels(res.groups[0].chls[1]))
//         })
//     }
// }

// export const setChannel = (channel) =>{
//     return dispatch =>{
//         dispatch(setChannels(channel))
//     }
// }