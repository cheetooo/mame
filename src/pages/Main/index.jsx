import React, {useState, useEffect, useCallback, useRef} from 'react'
import {useTransition, useSpring, interpolate, animated} from 'react-spring'
import drop from 'lodash/drop'
import dropRight from 'lodash/dropRight'
import './style.css'
const Main = () => {
    const data = [
    {
        name: 'Rare Wind',
        css: '#000'
    }, 
    {
        name: 'Saint Petersburg',
        css: '#000'
    }, 
    {
        name: 'Deep Blue',
        css: '#000'
    }
]
const data2 = [
    {
        name: 'Near Moon',
        css: '#000'
    }, {
        name: 'Wild Apple',
        css: '#000'
    }, {
        name: 'Ladoga Bottom',
        css: '#000'
    },{
        name: 'W3ild Apple',
        css: '#000'
    }, {
        name: 'Lado2ga Bottom',
        css: '#000'
    }
]
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
        let tem = rows.concat(data2[i]);
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
        tem = tem.concat(data2[i]);  
        setI(i == 2
            ? 0
            : i + 1);
        set(tem)
    }
    return (
        <div>
            <div className="list">
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
                        className="card"
                        style={{
                        zIndex: index + 1,
                        transform: interpolate([
                            x,y, rot
                        ], (x,y, rot) => `translate3d(${x}px,${y}px,0) rotate(${rot}deg)`),
                        ...rest
                    }}>
                        <div className="cell">
                            <div
                                className="details"
                                style={{
                                background: item.css,
                                backgroundSize:'contain'
                            }}/>
                        </div>
                    </animated.div>
                ))}
            </div>
            <button style={{marginLeft:'280px'}} onClick={() => next()}>下一个</button>
            <button onClick={() => Delete()}>删除</button>
            <button onClick={() => reset()}>隐藏</button>
        </div>
    )
}
export default Main