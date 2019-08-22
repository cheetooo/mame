import React, {useState, useEffect, useCallback, useRef,useReducer} from 'react'
import {useTransition, useSpring, interpolate, animated} from 'react-spring'
import drop from 'lodash/drop'
import dropRight from 'lodash/dropRight'
import {reducer,INITIAL_STATE} from '../../reducer/index'
import './style.scss'
var Mock = require('mockjs')

const init_state = INITIAL_STATE

const Main = () => {
    // let data = []
    const ref = useRef([])
    // const [rows,set] = useState(data)
    // const [i,setI] = useState(0)
    let height = 0
    let x = 80
    const [rows,dispatch] = useReducer(reducer,init_state)
    // useEffect(()=>{
    //    var tem =  Mock.mock({
    //         "data|3":[
    //             {
    //             "name": '@word',
    //             "css": "@color"
    //             }
    //         ]
    //     }).data
    //     set(tem)
    // },[])
    console.log(rows)
    let transitions = useTransition(rows.audio_state_reducer.PLAY_HISTORY.map((data, i) => ({
        ...data,
        x: i == 2 ? -10 : 5 * i - 10,
        y: (height += 50),
        rot: -20 + 10 *i
    })), d => d.name, {
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
    const change = () => {
        let temp = Mock.mock({
            "name": '@word',
            'css': '@color'
        });
        dispatch({type:'change_song',AUDIO_INFO:temp})
        dispatch({type:'update'})
    }
    // const reset = useCallback(() => {
    //     let temp = rows
    //     ref
    //         .current
    //         .map(clearTimeout)
    //     ref.current = []
    //     set([])
    //     ref
    //         .current
    //         .push(setTimeout(() => set(temp), 2000))
    // }, [])

    // const Delete = () =>{
    //     let tem = rows;
    //     tem = dropRight(tem);
    //     tem = tem.concat(Mock.mock({
    //         "name": '@word',
    //         'css': '@color'
    //     }));  
    //     // setI(i == 2
    //     //     ? 0
    //     //     : i + 1);
    //     set(tem)
    // }
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
                        background: item.css,
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
            <div>
                <button onClick={() => change()}>下一个</button>
                {/* <button onClick={() => Delete()}>删除</button> */}
                {/* <button onClick={() => reset()}>隐藏</button> */}
            </div> 
        </div>
    )
}
export default Main