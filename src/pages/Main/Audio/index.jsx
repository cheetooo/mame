import React, {useRef, useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {Control,ProgressBar} from './style';
import {togglePlaying, changeSong, toggleLikeStatus, changeVolume} from './store/actionCreators'
import {formatTime} from '../../../utils/index'
import * as types from './store/types'
const Audio = (props) => {
    const {
        playing, // 当前播放状态
        currentMHz, // 当前MHz
        currentSong, // 当前歌曲信息
        /*
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
    } = props;

    const audioRef = useRef(null);
    const [currentPlayTime, setCurrentPlayTime] = useState(0);
    const [duration, setDuration] = useState(0);
    let progress = currentPlayTime / duration * 100 +'%';
    
    useEffect(()=>{
        // setCurrentPlayTime(0)
    },[currentSong.aid]) // 使用 aid 歌曲唯一id作为依赖，currentSong为对象，引用类型故每次都会触发该Hook

    useEffect(()=>{
        playing ? audioRef.current.play() : audioRef.current.pause();
    },[playing])

    const _audioReady = () => {
        setDuration(audioRef.current.duration) // 获取音频时长
    }
    const _audioPlaying = ()=> {
        setCurrentPlayTime(audioRef.current.currentTime)
    }
    const miniPlayer = () => {
        return (
            <div></div>
        )
    }

    const normalPlayer = () => {
        return (
            <Control>
                <div
                    onClick={() => toggleLikeStatusDispatch()}
                    style={{
                    backgroundImage: `url(${currentSong.like
                        ?require('../../../images/like.png')
                        :require('../../../images/unlike.png')})`
                }}></div>
                <div
                    onClick={() => togglePlayingDispatch()}
                    style={{
                        backgroundImage: `url(${playing
                        ? require('../../../images/stop.png')
                        : require('../../../images/play.png')})`
                }}></div>
                <div
                    onClick={() => changeSongDispatch(types.NEXT_SONG)}
                    style={{
                    backgroundImage: `url(${require('../../../images/next.png')})`
                }}></div>
                <div
                    onClick={() => changeSongDispatch(types.REMOVE_SONG)}
                    style={{
                    backgroundImage: `url(${require('../../../images/trash.png')})`
                }}></div>
                <p>{currentSong.title}</p>
                <p>{currentSong.artist}</p>
                <p>{formatTime(duration)}</p>
                <ProgressBar>
                    <div style={{width:progress}}></div>
                </ProgressBar>
            </Control>
        )
    }

    return (
        <div>
            {normalPlayer()}
            
            <audio
                src={currentSong.url}
                ref={audioRef}
                // onPause={}
                // onEnded={}
                // onError={}
                onCanPlay={_audioReady}
                // onSeeking={}
                // onVolumeChange={}
                onTimeUpdate={_audioPlaying}
            ></audio>
        </div>
    )
}
const mapStateToProps = state => ({
    playing: state.getIn(['audio', 'playing']),
    currentMHz: state.getIn(['audio', 'currentMHz']),
    currentSong: state.getIn(['audio', 'currentSong']).toJS(),
    currentVolume: state.getIn(['audio', 'currentVolume'])
});

const mapDispatchToProps = dispatch => ({
    togglePlayingDispatch: () => dispatch(togglePlaying()),
    changeSongDispatch: (type) => dispatch(changeSong(type)),
    toggleLikeStatusDispatch: (type) => dispatch(toggleLikeStatus(type)),
    changeVolumeDispatch: () => dispatch(changeVolume())
})

export default connect(mapStateToProps, mapDispatchToProps)(Audio)
