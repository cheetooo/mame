import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
// import {playStatus,playListNextSong,removeSong} from '../Main/store/actionCreators';

function Setting(props){
    const {
        channel,
        // changePlayListDispatch
    } = props
    useEffect(()=>{
        console.log(channel)
    },[])
    return(
        <div>
            Setting
            <Link to="/">jump</Link>
            {/* <div onClick={()=>changePlayListDispatch()}
        >321</div> */}
        </div>
    )
}
const mapStateToProps = state =>({
    channel: state.getIn(['audio', 'appIndexChannel']).toJS()
})

// const mapDispatchToProps = (dispatch) =>{
//     return {
//         changePlayListDispatch(){
//             dispatch(playListNextSong())
//         }
//     }
// }
export default connect(mapStateToProps)(Setting)