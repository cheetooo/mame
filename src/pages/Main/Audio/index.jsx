import React, {useRef, useEffect} from 'react'
import {connect} from 'react-redux';
import {Control} from './style';
import {togglePlaying, changeSong, toggleLikeStatus, changeVolume} from './store/actionCreators'
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
        CurrentPlayTime // 当前播放时长
    } = props;

    const {
        togglePlayingDispatch, // 切换当前播放状态
        changeSongDispatch, // 下一曲
        toggleLikeStatusDispatch, // 喜欢当前歌曲
        changeVolumeDispatch, // 调整音量
        changeCurrentPlayTimeDispatch // 调整当前播放进度
    } = props;

    const audioRef = useRef(null)

    useEffect(()=>{
        playing ? audioRef.current.play() : audioRef.current.pause();
    },[playing])

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
                // onCanPlay={}
                // onSeeking={}
                // onVolumeChange={}
                // onDurationChange={}
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
