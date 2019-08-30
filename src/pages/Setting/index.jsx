import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {playStatus,playListNextSong,removeSong} from '../Main/store/actionCreators';

function Setting(props){
    // const [state,
    //     dispatch] = useContext(RootContext)
    const {
        changePlayListDispatch
    } = props
    return(
        <div>
            Setting
            <Link to="/">jump</Link>
            <div onClick={()=>changePlayListDispatch()}
        >321</div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) =>{
    return {
        changePlayListDispatch(){
            dispatch(playListNextSong())
        }
    }
}
export default connect(null, mapDispatchToProps)(Setting)