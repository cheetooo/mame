import styled from 'styled-components'
import { animated } from 'react-spring'

export const MainDiv = styled.div`
	position: relative;
	height: 100%;
	width: 100%
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
	background-size: cover;
	background-color: #fff;
	box-shadow: 2px 2px 5px 1px rgba(61, 61, 61, 0.5);
`
