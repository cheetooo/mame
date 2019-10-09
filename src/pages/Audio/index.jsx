import React, { useRef, useState, useEffect } from 'react'
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

    const [currentPlayTime, setCurrentPlayTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volumeProgress, serVolumeProgress] = useState(0)
    const audioRef = useRef(null);
    const volumeContainerRef = useRef(null);
    const volumeBarRef = useRef(null);
    // const volumeBarRef = useRef(null);

    let progress = currentPlayTime / duration * 100 + '%';

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
        // console.log(volume)
        serVolumeProgress(volume * volumeContainerRef.current.clientWidth);
        // console.log(volumeProgress)
        audioRef.current.volume = volume;
    }, [volume])

    useEffect(() => {
        // setCurrentPlayTime(0)
        // console.log(window)
    }, [currentSong.aid]) // 使用 aid 歌曲唯一id作为依赖，currentSong为对象，引用类型故每次都会触发该Hook

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

    const _audioReady = () => {
        // if(playing){
        //     audioRef.current.play()
        // }
        setDuration(audioRef.current.duration) // 获取音频时长
    }

    const _audioPlaying = () => {
        setCurrentPlayTime(audioRef.current.currentTime)
    }

    const _audioEnd = () => {
        changeSongDispatch(types.NEXT_SONG)
    }

    const _mouseDown = (e) => {
        // setTouch(true)
        // console.log(e)
        // setStartX(e.clientX)

    }
    const _mouseMove = (e) => {
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
    const _mouseUp = () => {
        //  setTouch(false)
    }
    const _mouseClick = (e) => {
        // console.log(e)
    }
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
    const miniPlayer = () => {
        return (
            <MiniControl style={miniPlayerSpring}>
                <Link to="/">
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
                </Link>
            </MiniControl>
        )
    }

    const normalPlayer = () => {
        return (
            <NormalControl style={normalPlayerSpring}>
                <Link to="/MHz">jump</Link>
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
                        onClick={(e)=>_mouseClick(e)}
                        onMouseDown={(e)=>_mouseDown(e.nativeEvent)}
                        onMouseMove={(e)=>_mouseMove(e.nativeEvent)}
                        onMouseUp={(e)=>_mouseUp(e.nativeEvent)}
                        // onMouseOut={(e)=>_mouseUp(e.nativeEvent)}
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
                    onClick={(e)=>_mouseMove(e)}
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
                            onStart={(e) => { _mouseDown(e) }}
                            onDrag={(e) => { _mouseMove(e) }}
                            onStop={(e) => { _mouseUp(e) }}
                        ><div className="handle" style={{ height: '5px', width: '10px'}}></div>
                        </Draggable>
                    </div>
                </div>
            </NormalControl>
        )
    }

    return (
        <Control>
            {normalPlayer()}
            {miniPlayer()}
            <audio
                src={currentSong.url}
                ref={audioRef} // onPause={}}  // onError={}} 
                onCanPlay={_audioReady} // onSeeking={}} // onVolumeChange={}} 
                onTimeUpdate={_audioPlaying}
                onEnded={_audioEnd}
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
