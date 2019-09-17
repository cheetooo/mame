import React, {useRef, useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom';
import {useSpring, animated} from 'react-spring'

import * as types from './store/types'
import {togglePlaying, changeSong, toggleLikeStatus, changeVolume, getAppIndexChannel} from './store/actionCreators'
import {Control, NormalControl, MiniControl, ProgressBar} from './style';
import {formatTime} from '../../utils/index'

const Audio = (props) => {
    const {
        playing, // 当前播放状态
        allChannel, // 所有频道
        currentChannel, // 当前MHz
        currentSong,    /*
                        当前歌曲信息
                        @isLike 是否为红心歌曲
                        @albumName 专辑名称
                        @ArtistName 歌手名字
                        @CoverUrl 封面地址
                        */
        currentVolume, // 当前音量

        togglePlayingDispatch, // 切换当前播放状态
        changeSongDispatch, // 下一曲
        toggleLikeStatusDispatch, // 喜欢当前歌曲
        changeVolumeDispatch, // 调整音量
        getAppIndexChannelDispatch, // 获取所有频道
    } = props;
    const {match, location, history} = props;

    const [currentPlayTime, setCurrentPlayTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    let progress = currentPlayTime / duration * 100 + '%';
    
    useEffect(()=>{
        getAppIndexChannelDispatch()
    },[])

    useEffect(() => {
        // setCurrentPlayTime(0)
    }, [currentSong.aid]) // 使用 aid 歌曲唯一id作为依赖，currentSong为对象，引用类型故每次都会触发该Hook

    useEffect(() => {
        playing ? audioRef.current.play()
                : audioRef.current.pause();
    }, [playing])

    useEffect(()=>{
        if(currentChannel.id){
            changeSongDispatch(types.NEXT_SONG)
        }
    },[currentChannel.id])

    const _audioReady = () => {
        setDuration(audioRef.current.duration) // 获取音频时长
    }
    const _audioPlaying = () => {
        setCurrentPlayTime(audioRef.current.currentTime)
    }
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
                        {()=>item.func(item.type)}
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
                        {()=>item.func(item.type)}
                        style={{
                        backgroundImage: item.backgroundImage
                    }}></div>)
}
                </div>
                <Link to="/MHz">{currentChannel.name} MHz</Link>
                <p>{currentSong.title}</p>
                <p>{currentSong.artist}</p>
                <p>{formatTime(duration)}</p>
                <ProgressBar>
                    <div style={{
                        width: progress
                    }}></div>
                </ProgressBar>
            </NormalControl>
        )
    }

    return (
        <Control>
            {normalPlayer()}
            {miniPlayer()}
            <audio 
                src={currentSong.url} 
                ref={audioRef} // onPause={}} // onEnded={}} // onError={}} 
                onCanPlay={_audioReady} // onSeeking={}} // onVolumeChange={}} 
                onTimeUpdate={_audioPlaying}
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
    currentVolume: state.getIn(['audio', 'currentVolume']),
    allChannel:state.getIn(['audio', 'appIndexChannel']).toJS()
});

const mapDispatchToProps = dispatch => ({
    togglePlayingDispatch: () => dispatch(togglePlaying()),
    changeSongDispatch: (type) => dispatch(changeSong(type)),
    toggleLikeStatusDispatch: (type) => dispatch(toggleLikeStatus(type)),
    changeVolumeDispatch: () => dispatch(changeVolume()),
    getAppIndexChannelDispatch: () => dispatch(getAppIndexChannel())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Audio))
