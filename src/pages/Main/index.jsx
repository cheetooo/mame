import React, {useEffect, useState, useRef} from 'react'
import {useTransition, interpolate, animated} from 'react-spring'
import {connect} from 'react-redux'
import axios from 'axios'
import './style.scss'
import {Link} from 'react-router-dom'
import {playStatus,changePlayList} from './store/action';
import drop from 'lodash/drop'
const baseUrl = 'https://api.douban.com/v2/fm/playlist?app_name=radio_android&apikey=02f7751a5506' +
        '6bcb08e65f4eff134361&user_accept_play_third_party=0&client=s:mobile%7Cv:5.0.1%7C' +
        'y:android+9%7Cf:654%7Cm:Xiaomi%7Cd:a57dd2f934f5911582ac34b2256c265287c62377%7Ce:' +
        'xiaomi_mi_9&udid=a57dd2f934f5911582ac34b2256c265287c62377&version=654&push_devic' +
        'e_id=8654eb9b2854da9684f9a62a8b2505dd57074b70&audio_patch_version=4&format=null&' +
        'kbps=128&pb=128&from=&pt=0.0&channel=-10&type=n&sid=';

        

const Main = (props) => {
    let height = 0
    const audioRef = useRef(null)

    const {
        playing,
        playList
    } = props

    const {
        togglePlayingDispatch,
        changePlayListDispatch
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
        console.log(playList)
        axios.get(baseUrl).then(
            res=>{
                changePlayListDispatch(drop(playList).concat(res.data.song[0]))

            }
        )
    }

    function Delete() {
        
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
        changePlayListDispatch(data){
            dispatch(changePlayList(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)