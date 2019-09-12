import styled from 'styled-components'
import {animated} from 'react-spring'

export const Control = styled(animated.div)`
    position: fixed;
    overflow: hidden;
    z-index: 10;
`
export const MiniControl = styled(animated.div)`
    position: fixed;
    bottom: 10px;
    left: 10px;
    height:30px;
    width:280px;
    box-sizing:border-box;
    padding: 0 10px;
    border-radius: 5px;
    box-shadow: 0 0 7px rgba(0,0,0,08);
    .control-bar{
        display: flex;
        justify-content:space-around;
        align-items:center;
        height:28px;
            div{
            height: 20px;
            width: 20px;
            background-origin: center;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
        }
    } 

`

export const NormalControl = styled(animated.div)`
    position:fixed;
    right:0;
    top:0;
    width:50vw;
    .control-bar{
        display: flex;
            div{
            height: 30px;
            width: 30px;
            background-origin: center;
            background-position: center;
            background-repeat: no-repeat;
            background-size: auto;
        }
    }  
`
export const ProgressBar = styled.div `
    box-sizing:border-box;
    margin: 0 10px;
    ${'' /* width:100%; */}
    height:2px;
    background:#d9f7be;
    border-radius:1px;
    position:relative;
    div{
        height:2px;
        background:#73d13d;
        width:0;
        ${ ''/* border-radius:100%; */}
        position:absolute;
        left:0;
        top:0; 
    }
`
