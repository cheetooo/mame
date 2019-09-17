import React,{useEffect} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

function Setting(props){
    const {
        channel
    } = props
    useEffect(()=>{
        console.log(channel)
    },[])
    return(
        <div>
            Setting
            <Link to="/">jump</Link>
        </div>
    )
}
const mapStateToProps = state =>({
    channel: state.getIn(['audio', 'appIndexChannel']).toJS()
})

export default connect(mapStateToProps)(Setting)