import React, {useEffect, useState, useRef,useMemo} from 'react'
import {useTransition, interpolate, animated} from 'react-spring'
import {connect} from 'react-redux'
import {MainDiv, MainMusicList, MainMusicListItem} from './style.js'
import {Link} from 'react-router-dom'
import {playStatus,playListNextSong,removeSong} from './store/actionCreators';
import Audio from './Audio/index'

const Main = (props) => {
    let height = 0;
    const {
        playList
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
    return (
        <MainDiv>
            <MainMusicList>
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
                    <MainMusicListItem
                        key={key}
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
                    }}></MainMusicListItem>
                ))}
            </MainMusicList>
            <Audio/>
        </MainDiv>
    )
}
const mapStateToProps = (state) => ({
    playing: state.getIn(['audio', 'playing']),
    playList: state.getIn(['audio', 'playList']).toJS()
})

// const mapDispatchToProps = (dispatch) =>({
//         togglePlayingDispatch: () => dispatch(playStatus()),
//         changePlayListDispatch: () => dispatch(playListNextSong()),
//         removeSongDispatch: (data) => dispatch(removeSong(data))
// })
export default connect(mapStateToProps)(React.memo(Main))