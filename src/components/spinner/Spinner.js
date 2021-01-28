import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = ({ color }) => {
	return (
		<S.Spinner color={color}>
			<div className="spinner">
				<div className="circle">
					<div>
					</div>
				</div>
			</div>
		</S.Spinner>
	)
}

export default Spinner

const animation = keyframes`
0%{
	transform: translate(-50%, -50%) rotate(0deg);
}
100% {
	transform: translate(-50%, -50%) rotate(360deg);
}
`;

const S = {};
S.Spinner = styled.div`
	position: absolute;
	width: 100%;
	height: 180px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 4;
	.spinner {
		width: 200px;
		height: 200px;
		display: inline - block;
		overflow: hidden;
		background: rgba(NaN, NaN, NaN, 0);
	}
	.circle div {
	position: absolute;
	width: 60px;
	height: 60px;
	border: 10px solid ${props => props.color};
	border-top-color: transparent;
	border-radius: 50%;
	}
	.circle div {
	animation: ${animation} 1s linear infinite;
	top: 100px;
	left: 100px
	}
	.circle {
	width: 100%;
	height: 100%;
	position: relative;
	transform: translateZ(0) scale(1);
	backface-visibility: hidden;
	transform-origin: 0 0;
	}
	.circle div { 
		box-sizing: content-box; 
	}	
`;
