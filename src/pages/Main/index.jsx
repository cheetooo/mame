import React, {useEffect, useState, useRef, useMemo} from 'react'
import {useTransition, interpolate} from 'react-spring'
import {connect} from 'react-redux'
import {MainDiv, MainMusicList, MainMusicListItem} from './style.js'
import {Link} from 'react-router-dom'
import {fetchAllChannels,setChannel} from './store/actionCreators';


const Main = (props) => {
    let height = 0;
    const { playList, allChannel, fetchAllChannelsDispatch, setChannelDispatch } = props
    let transitions = useTransition(playList.map((data, i) => ({
        ...data,
        x: i == 2
            ? -10
            : 5 * i - 10,
        y: (height += 50),
        rot: -20 + 10 * i
    })), d => d.title, {
        from: {
            opacity: 0,
            rot: 10
        },
        leave: {
            opacity: 0,
            rot: -30
        },
        enter: ({x, y, rot}) => ({x, y, rot, opacity: 1,}),
        update: ({x, y, rot}) => ({x, y, rot}),
        config: {
            mass: 5,
            tension: 500,
            friction: 100
        }
    })    
    return (
        <MainDiv>
                {transitions.map(({
                    item,
                    key,
                    props: {
                        x,
                        y,
                        rot,
                        ...rest
                    }  
                }, index) => {
                    console.log(item,key,{...rest})
                    return <MainMusicListItem
                        key={key + item.title}
                        style={{
                        backgroundImage: item.picture
                            ? `url(${item.picture})`
                            : '#fff',
                        zIndex: index + 1,
                        transform: interpolate([
                            x, y, rot
                        ], (x, y, rot) => `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`),
                        ...rest
                    }}
                    ></MainMusicListItem>}
                )}           
        </MainDiv>
    )
}
const mapStateToProps = (state) => ({
    playing: state.getIn(['audio', 'playing']),
    playList: state.getIn(['audio', 'playList']).toJS(),
    allChannel:state.getIn(['audio', 'appIndexChannel']).toJS()
})

const mapDispatchToProps = (dispatch) =>({
    fetchAllChannelsDispatch: () => dispatch(fetchAllChannels()),
    setChannelDispatch: (data) => dispatch(setChannel(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main))