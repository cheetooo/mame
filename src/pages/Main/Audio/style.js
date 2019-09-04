import styled from 'styled-components'

export const Control = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    div{
        height: 30px;
        width: 30px;
        background-origin: center;
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto;
        float: left;
    }
`

export const ProgressBar = styled.div`
    width:100px !important;
    height:2px !important;
    background:#d9f7be;
    border-radius:1px;
    position:relative;
    div{
        height:2px;
        background:#73d13d;
        width:0;
        ${'' /* border-radius:100%; */}
        position:absolute;
        left:0;
        top:0; 
    }
`
