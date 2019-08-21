import React, {useState, useEffect, useCallback, useRef} from 'react'
import {useTransition, useSpring, interpolate, animated} from 'react-spring'
import drop from 'lodash/drop'
import dropRight from 'lodash/dropRight'
import './style.scss'
var Mock = require('mockjs')

const Main = () => {
    let data = []
    useEffect(()=>{
       var tem =  Mock.mock({
            "data|3":[
                {
                "name": '@word',
                "css": "@color"
                }
            ]
        }).data
        set(tem)
    },[])

    const ref = useRef([])
    const [rows,
        set] = useState(data)
    const [i,
        setI] = useState(0)

    let height = 0
    let x = 80
    let transitions = useTransition(rows.map((data, i) => ({
        ...data,
        x: 40 * i - 80,
        y: (height += 100) - 250,
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
    const next = () => {
        let tem = rows.concat(Mock.mock({
            "name": '@word',
            'css': '@color'
        }));
        tem = drop(tem);
        setI(i == 4
            ? 0
            : i + 1);
        set(tem)
    }
    const reset = useCallback(() => {
        let temp = rows
        ref
            .current
            .map(clearTimeout)
        ref.current = []
        set([])
        ref
            .current
            .push(setTimeout(() => set(temp), 2000))
    }, [])

    const Delete = () =>{
        let tem = rows;
        tem = dropRight(tem);
        tem = tem.concat(Mock.mock({
            "name": '@word',
            'css': '@color'
        }));  
        setI(i == 2
            ? 0
            : i + 1);
        set(tem)
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
                        background: item.css,
                        backgroundSize:'cover',
                        zIndex: index + 1,
                        transform: interpolate([
                            x,y, rot
                        ], (x,y, rot) => `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`),
                        ...rest
                    }}></animated.div>
                ))}
            </div>
            <button onClick={() => next()}>下一个</button>
            <button onClick={() => Delete()}>删除</button>
            <button onClick={() => reset()}>隐藏</button>
        </div>
    )
}
export default Main