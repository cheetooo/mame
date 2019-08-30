import React, {useEffect, useState, useRef,useMemo} from 'react'
import {useTransition, interpolate, animated} from 'react-spring'
import {connect} from 'react-redux'
import './style.scss'
import {Link} from 'react-router-dom'
import {playStatus,playListNextSong,removeSong} from './store/actionCreators';

import {getNextSong} from '../../api'

        

const Main = (props) => {
    let height = 0
    const audioRef = useRef(null)

    const {
        playing,
        playList
    } = props

    const {
        togglePlayingDispatch,
        changePlayListDispatch,
        removeSongDispatch
    } = props

    let transitions = useTransition(playList.map((data, i) => ({
        ...data,
        x: i == 2
            ? -10
            : 5 * i - 10,
        y: (height += 50),
        rot: -20 + 10 *i
    })), d => d.title, {
        from: {
            opacity: 0,
            rot: 10
        },
        leave: {
            opacity: 0,
            rot: -30
        },
        enter: ({x, y, rot}) => ({x, y, rot, opacity: 1}),
        update: ({x, y, rot}) => ({x, y, rot}),
        config: {
            mass: 5,
            tension: 500,
            friction: 100
        }
    })

    function change() {
        changePlayListDispatch()
    }

    function Delete() {
        removeSongDispatch({title:'32131',picture:''})
    }

    function like() {

    }
    const play = () => {
        togglePlayingDispatch()
        
        console.log(playing)
    }
    
    return (
        <div className="main">
            <div className="main_music-list">
                {transitions.map(({
                    item,
                    props: {
                        x,
                        y,
                        rot,
                        ...rest
                    },
                    key
                }, index) => (
                    <animated.div
                        key={key}
                        className="main_music-list-item"
                        style={{
                        background: item.picture
                            ? `url(${item.picture})`
                            : '#fff',
                        backgroundSize: 'cover',
                        zIndex: index + 1,
                        transform: interpolate([
                            x, y, rot
                        ], (x, y, rot) => `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`),
                        ...rest
                    }}
                        onClick={() => change()}></animated.div>
                ))}
            </div>
            <div 
                className="control"
            >
                <div
                    style={{
                    backgroundImage: `url(${require('../../images/like.png')})`
                }}
                    onClick={() => like()}></div>
                <div
                    style={{
                    backgroundImage: `url(${require('../../images/next.png')})`
                }}
                    onClick={() => change()}></div>
                <div
                    style={{
                    backgroundImage: `url(${require('../../images/trash.png')})`
                }}
                    onClick={() => Delete()}></div>
                <div
                    style={{
                    backgroundImage: `url(${playing
                        ? require('../../images/stop.png')
                        : require('../../images/play.png')})`
                }}
                    onClick={() => play()}></div>
                <div><Link to="/setting">jump</Link></div>
            </div>
            {/* <audio ref={audioRef} className="audio" src={currentSong.url}></audio> */}
        </div>
    )
}
const mapStateToProps = (state) => ({
    playing: state.getIn(['main', 'playing']),
    playList: state.getIn(['main', 'playList']).toJS()
})

const mapDispatchToProps = (dispatch) =>{
    return {
        togglePlayingDispatch(){
            dispatch(playStatus());
        },
        changePlayListDispatch(){
            // console.log(playListNextSong())
            dispatch(playListNextSong())
        },
        removeSongDispatch(data){
            console.log(removeSong)
            dispatch(removeSong(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main))