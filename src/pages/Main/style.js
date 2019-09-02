import styled from 'styled-components'
import { animated } from 'react-spring'

export const MainDiv = styled.div`
	margin: 0;
	position: relative;
	height: 100vh;
	width: 100vw
`
export const MainMusicList = styled.div`
	position: relative;
	height: 100vh;
	width: 50vw;
	bottom: 0;
	left: 0;
`
export const MainMusicListItem = styled(animated.div)`
	position: absolute;
	overflow: hidden;
	will-change: transform, height, opacity;
	width: 150px;
	height: 150px;
	transform-origin: 0 200px;
	transition: all;
	border-radius: 5px;
	box-shadow: 2px 2px 5px 1px rgba(61, 61, 61, 0.5);
`
export const Control = styled.div`
	position: absolute;
	top: 0;
	right: 0;
`
export const ControlItem = styled.div`
	height: 30px;
	width: 30px;
	background-origin: center;
	background-position: center;
	background-repeat: no-repeat;
	background-size: auto;
	float: left;
`