import React, {useState, useEffect, useCallback, useContext, useRef} from 'react'
import {useTransition, useSpring, interpolate, animated} from 'react-spring'
import {RootContext} from '../../index'
import axios from 'axios'
// import {GetSong} from '../../hooks/hooks'
import './style.scss'
// var Mock = require('mockjs')
const baseUrl = 'https://api.douban.com/v2/fm/playlist?app_name=radio_android&apikey=02f7751a55066bcb08e65f4eff134361&user_accept_play_third_party=0&client=s:mobile%7Cv:5.0.1%7Cy:android+9%7Cf:654%7Cm:Xiaomi%7Cd:a57dd2f934f5911582ac34b2256c265287c62377%7Ce:xiaomi_mi_9&udid=a57dd2f934f5911582ac34b2256c265287c62377&version=654&push_device_id=8654eb9b2854da9684f9a62a8b2505dd57074b70&audio_patch_version=4&format=null&kbps=128&pb=128&from=&pt=0.0&channel=-10&type=n&sid=';

const Main = () => {
    let height = 0
    const [state, dispatch] = useContext(RootContext)
    const playHistory = state.audio_state_reducer.PLAY_HISTORY;
    const currentSong = state.audio_state_reducer.CURRENT_SONG;
    // console.log(currentSong)
    // let audio
    const audioRef = useRef(null)
    useEffect(()=>{
        // audio = document.getElementsByClassName('audio')[0];
        audioRef.current.addEventListener("canplay",()=>{
            console.log('canplay')
            audioRef.current.play()
        })
        audioRef.current.addEventListener("ended",()=>{
            axios(Object.assign({method: 'Get', url: `${baseUrl}`})).then(res => {
                console.log(res.data.song[0].release);
                dispatch({type:'play'})
                dispatch({type:'change_song',audio_info:res.data.song[0]})
            })
            audioRef.current.play()
        })
        // audio.addEventListener("stop",()=>{
        //     console.log("stop")
        // })
        // audio.addEventListener("play",()=>{
        //     console.log('play')
        // })
        console.log(audioRef)
    
    },[])

    let transitions = useTransition(state.audio_state_reducer.PLAY_HISTORY.map((data, i) => ({
        ...data,
        x: i == 2 ? -10 : 5 * i - 10,
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
        enter: ({x,y, rot}) => ({x,y, rot, opacity: 1}),
        update: ({x,y, rot}) => ({x,y, rot}),
        config: {
            mass: 5,
            tension: 500,
            friction: 100
        }
    })

    function change(){
        axios(Object.assign({method: 'Get', url: `${baseUrl}`})).then(res => {
            console.log(res.data.song[0].release);
            dispatch({type:'play'})
            dispatch({type:'change_song',audio_info:res.data.song[0]})
        })
    }

    function Delete(){
        axios(Object.assign({method: 'Get', url: `${baseUrl}`})).then(res => {
            console.log(res.data.song[0].release);
            dispatch({type:'play'})
            dispatch({type:'remove_song',audio_info:res.data.song[0]})
        })
    }

    function like(){

    }
    const play=()=>{
        // let audio = document.getElementsByClassName('audio')[0];
        dispatch({type:'toggle'})
        console.log(audioRef)
        audioRef.current.play()
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
                        background: `url(${item.picture})`,
                        backgroundSize:'cover',
                        zIndex: index + 1,
                        transform: interpolate([
                            x,y, rot
                        ], (x,y, rot) => `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`),
                        ...rest
                    }} 
                    onClick={() => change()}></animated.div>
                ))}
            </div>
            <div className="control">
                <button onClick={() => like()}>喜欢</button>
                <button onClick={() => change()}>下一个</button>
                <button onClick={() => Delete()}>删除</button>
                <button onClick={() => play()}>{state.audio_state_reducer.IS_PLAYING.toString()}</button>
                {/* <button onClick={() => reset()}>隐藏</button> */}
            </div> 
            <audio ref={audioRef} className="audio" style={{display:'none'}} src={currentSong.url}></audio>
        </div>
    )
}
export default Main