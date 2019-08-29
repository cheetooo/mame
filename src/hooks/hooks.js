import {useContext} from 'react'
import axios from 'axios';
import {RootContext} from '../index';

const baseUrl = '';
const userBaseParams = {};
const songBaseParams = {};
const settingBaseParams = {};



function useTest (){
    const [data,
    dispatch] = useContext(RootContext)
    console.log(axios)
    dispatch({type:'stop'})
    return data
}

export default useTest