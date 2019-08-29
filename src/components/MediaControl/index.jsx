import React, {useContext} from 'react'
import {RootContext} from '../../index';

const MediaControl = (props) =>{
    const [data,dispatch] = useContext(RootContext)
    const next=()=>{
        dispatch({type:'toggle'})
    }
    return(
        <>
        {
            console.log(props,data)
        }
        {
            props.children
        }
        </>     
    )
}

export default MediaControl