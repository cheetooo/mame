import React, { useRef, useState, useEffect,useMemo,useCallback } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'

import * as types from './store/types'
import { togglePlaying, changeSong, toggleLikeStatus, changeVolume, getAppIndexChannel, updateSettingVolume } from './store/actionCreators'
import { Control, NormalControl, MiniControl, ProgressBar } from './style';
import { formatTime } from '../../utils/index'

import Draggable from 'react-draggable'
import db from '../../db'
// import {bindActionCreators} from 'redux'

const controlMap = [
    {
        backgroundImage: `url(${currentSong.like
            ? require('../../images/like.png')
            : require('../../images/unlike.png')})`, 
        func: toggleLikeStatusDispatch
    }, {
        backgroundImage: `url(${playing
            ? require('../../images/stop.png')
            : require('../../images/play.png')})`,
        func: togglePlayingDispatch
    }, {
        backgroundImage: `url(${require('../../images/next.png')})`,
        func: changeSongDispatch,
        type: types.NEXT_SONG
    }, {
        backgroundImage: `url(${require('../../images/trash.png')})`,
        func: changeSongDispatch,
        type: types.REMOVE_SONG
    }
]

const Audio = (props) => { 
    const {
        playing, // 当前播放状态
        allChannel, // 所有频道
        currentChannel, // 当前MHz
        /*
        * 当前歌曲信息
        * @isLike 是否为红心歌曲
        * @albumName 专辑名称
        * @ArtistName 歌手名字
        * @CoverUrl 封面地址
        */
        currentSong,
        volume, // 当前音量

        togglePlayingDispatch, // 切换当前播放状态
        changeSongDispatch, // 下一曲
        toggleLikeStatusDispatch, // 喜欢当前歌曲
        changeVolumeDispatch, // 调整音量
        getAppIndexChannelDispatch, // 获取所有频道
        updateSettingVolumeDispatch
    } = props;
    const { match, location, history } = props;
    /** 
     * useState 性能优化
    */
    const [currentPlayTime, setCurrentPlayTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volumeProgress, setVolumeProgress] = useState(0)

    const audioRef = useRef(null);
    const volumeContainerRef = useRef(null);
    const volumeBarRef = useRef(null);
    /** 
     * 这里使用了 useMemo ，虽然对其理解可能还没到位，或者这种写法是错的
     * 但是其实一种尝试
     * 原来的写法没有真正的理解 Hooks 的定义
     * props 变化，函数内所有的语句都会执行一次
     * 导致 const progress 多次执行，浪费性能
     * useMemo 类似 useEffect 的原理， 仅在【】内值变化时触发
     * 可能上述表达不准确， 关于 Hooks 还有很多要学习的地方， 也在 coding 的过程中发现许多问题
     * 1、useMemo 和 useEffect 相似的地方
     * 2、useCallback 和 useMemo 的异同
     * 3、react v16的生命周期在 Hooks 中具象为什么
     * 4、useEffect 【】发生变化时前后两次的比较是深比较还是浅比较
    */
    const progress = useMemo(() => currentPlayTime / duration * 100 + '%',[currentPlayTime, duration])
    // const [progress,setProgress]= useState(0)
    // useEffect(() => {
    //     setProgress(currentPlayTime / duration * 100 + '%')
    //     console.log(progress)
    // },[currentPlayTime, duration])
    useEffect(() => {
        getAppIndexChannelDispatch()
        // window.addEventListener('beforeunload',updateSettingVolumeDispatch)
        window.addEventListener('beforeunload', (e)=>{db.set('app_setting.volume', audioRef.current.volume).write()})
        /**
         * 关于退出时音量保存的具体实现
         * 第一时间反映的是 main 向 renderer 发送事件，renderer只做监听
         * 但是尝试了监听 main 的 before-quit 和 will-quit 两个事件都不成功
         * 想到了 electron 退出时触发事件顺序问题 ，如果 renderer 已经在 before-quit 和 will-quit 前被销毁， 则无论如何都监听不到 main 所发出的事件
         * 官方文档对于退出时操作的实现是绑定在了 window.beforeunload 上 https://electronjs.org/docs/api/browser-window?#%E4%BA%8B%E4%BB%B6%EF%BC%9A-close
         */
    }, [])
    useEffect(() => {
        setVolumeProgress(volume * volumeContainerRef.current.clientWidth);
        // console.log(volumeProgress)
        audioRef.current.volume = volume;
    }, [volume])
    // useEffect(() => {
    //     // setCurrentPlayTime(0)
    //     // console.log(window)
    // }, [currentSong.aid]) // 使用 aid 歌曲唯一id作为依赖，currentSong为对象，useEffect使用Object.is()进行比较。即使对象没有变化但其为引用类型故故每次都会触发该Hook
    useEffect(() => {
        playing ? audioRef.current.play()
            : audioRef.current.pause();
    }, [playing, currentSong.aid])
    useEffect(() => {
        if (currentChannel.id) {
            changeSongDispatch(types.NEXT_SONG)
        }
    }, [currentChannel.id])
    const miniPlayerSpring = useSpring({
        transform: `translateY(${location.pathname == '/'
            ? 300
            : 0}px)`
    })
    const normalPlayerSpring = useSpring({
        transform: `translateX(${location.pathname == '/'
            ? 0
            : 150}px)`
    })
    const handleAudioReady = () => {
        // if(playing){
        //     audioRef.current.play()
        // }
        setDuration(audioRef.current.duration) // 获取音频时长
    }
    const handleAudioPlaying = () => {
        setCurrentPlayTime(audioRef.current.currentTime)
    }
    const handleAudioEnd = () => {
        changeSongDispatch(types.NEXT_SONG)
    }
    const handleMouseDown = (e) => {
        // setTouch(true)
        // console.log(e)
        // setStartX(e.clientX)
    }
    const handleMouseMove = (e) => {
        // console.log(e)
        let { left } = volumeBarRef.current.getBoundingClientRect()
        let vv = (e.clientX - left) / volumeContainerRef.current.clientWidth;
        if (vv <= 0) {
            left = 0
            // e.preventDefault();
            return;
        }
        vv = vv > 1 ? 1 : vv < 0 ? 0 : vv
        changeVolumeDispatch(vv)
    }
    const handleMouseUp = () => {
        //  setTouch(false)
    }
    const handleMouseClick = (e) => {
        // console.log(e)
    }
    const renderMiniPlayer = () => {
        return (
            <MiniControl style={miniPlayerSpring}>
                    <div className="control-bar">
                        {controlMap.map((item, index) => <div
                            key={index}
                            onClick=
                            {() => item.func(item.type)}
                            style={{
                                backgroundImage: item.backgroundImage
                            }}></div>)
                        }
                    </div>
                    <ProgressBar>
                        <div style={{
                            width: progress
                        }}></div>
                    </ProgressBar>
            </MiniControl>
        )
    }
    const renderNormalPlayer = () => {
        return (
            <NormalControl style={normalPlayerSpring}>
            <div>{progress}</div>
                <Link to="/Mine">mine</Link>
                <Link to="/List">list</Link>
                <div className="control-bar">
                    {controlMap.map((item, index) => <div
                        key={index}
                        onClick=
                        {() => item.func(item.type)}
                        style={{
                            backgroundImage: item.backgroundImage
                        }}></div>)
                    }
                </div>
                <Link to="/MHz">{currentChannel.name} MHz</Link>
                <p style={{ WebkitAppRegion: 'drag' }}>{currentSong.title}</p>
                <p>{currentSong.artist}</p>
                <p>{formatTime(duration)}</p>
                <ProgressBar>
                    <div style={{
                        width: progress
                    }}></div>
                </ProgressBar>

                {/* <div 
                    ref={volumeBarRef}
                    className="volume-bar" 
                    style={{margin:'0 10px',height:'5px',background:'#b5b5b5',marginTop:'10px',borderRadius:'5px',overflow:'hidden'}}>
                    <div 
                        onClick={(e)=>handleMouseClick(e)}
                        onMouseDown={(e)=>handleMouseDown(e.nativeEvent)}
                        onMouseMove={(e)=>handleMouseMove(e.nativeEvent)}
                        onMouseUp={(e)=>handleMouseUp(e.nativeEvent)}
                        // onMouseOut={(e)=>handleMouseUp(e.nativeEvent)}
                        className="volume-progress" 
                        style={{width:`${volume*100}%`,height:'5px',background:'#c0ffb3',position:"relative"}}>
                        <div 
                            
                            className="volume-button" 
                            style={{height:'5px',cursor:'pointer',width:'5px',borderRadius:'100%',background:'#445c3c',position:'absolute',right:0,top:0}}
                        ></div>
                    </div>
                </div> */}
                <div
                    className="barContainer"
                    ref={volumeContainerRef}
                    onClick={(e)=>handleMouseMove(e)}
                    style={{
                        height: '5px',
                        background: '#ebebeb',
                        borderRadius:'5px',
                        margin: '20px 10px 0'
                    }}
                >
                    <div
                        ref={volumeBarRef}
                        className="bar"
                        style={{
                            backgroundColor: '#d9f7be',
                            borderRadius:'5px',
                            height: '5px',
                            width: `${volumeProgress}px`,
                        }}
                    >
                        <Draggable
                            axis="x"
                            handle=".handle"
                            position={{ x: volumeProgress, y: 0 }}
                            // grid={[25, 25]}
                            // scale={1}
                            onStart={(e) => { handleMouseDown(e) }}
                            onDrag={(e) => { handleMouseMove(e) }}
                            onStop={(e) => { handleMouseUp(e) }}
                        ><div className="handle" style={{ height: '5px', width: '10px'}}></div>
                        </Draggable>
                    </div>
                </div>
            </NormalControl>
        )
    }

    return (
        <Control>
            {renderNormalPlayer()}
            {renderMiniPlayer()}
            <audio
                src={currentSong.url}
                ref={audioRef} 
                // onPause={}}  
                // onError={}} 
                onCanPlay={handleAudioReady} 
                // onSeeking={}} 
                // onVolumeChange={}} 
                onTimeUpdate={handleAudioPlaying}
                onEnded={handleAudioEnd}
            ></audio>
        </Control>
    )
}

const mapStateToProps = state => ({
    playing: state.getIn(['audio', 'playing']),
    currentChannel: state.getIn(['audio', 'currentChannel']),
    currentSong: state
        .getIn(['audio', 'currentSong'])
        .toJS(),
    volume: state.getIn(['audio', 'volume']),
    allChannel: state.getIn(['audio', 'appIndexChannel']).toJS()
});

const mapDispatchToProps = dispatch => ({
    togglePlayingDispatch: () => dispatch(togglePlaying()),
    changeSongDispatch: (type) => dispatch(changeSong(type)),
    toggleLikeStatusDispatch: (type) => dispatch(toggleLikeStatus(type)),
    changeVolumeDispatch: (value) => dispatch(changeVolume(value)),
    getAppIndexChannelDispatch: () => dispatch(getAppIndexChannel()),
    updateSettingVolumeDispatch:() => dispatch(updateSettingVolume())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Audio))

/**
 *  使用 bindActionCreators 替换 mapDispatchToProps
 *  详见 https://medium.com/@kristenleach24/how-and-when-to-use-bindactioncreators-afe1f2d5f819
 */

// export default connect(mapStateToProps, 
//     dispatch => bindActionCreators({
//         togglePlayingDispatch:togglePlaying,
//         nextSongDispatch:changeSong.bind(null, types.NEXT_SONG),
//         removeSongDispatch:changeSong.bind(null, types.REMOVE_SONG),
//         likeStatusDispatch:toggleLikeStatus.bind(null,),
//         unlikeStatusDispatch:toggleLikeStatus.bind(null),
//         changeVolumeDispatch:changeVolume,
//         getAppIndexChannelDispatch:getAppIndexChannel
//     },dispatch))(withRouter(Audio))
