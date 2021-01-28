import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = () => {
	return (
		<S.Spinner>
			<div className="spinner">
				<div className="ldio-1u0s2wy7zxz">
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
	.ldio-1u0s2wy7zxz div {
	position: absolute;
	width: 60px;
	height: 60px;
	border: 10px solid rgba(0, 0, 0, 0.7020967741935484);
	border-top-color: transparent;
	border-radius: 50%;
	}
	.ldio-1u0s2wy7zxz div {
	animation: ${animation} 1s linear infinite;
	top: 100px;
	left: 100px
	}
	.ldio-1u0s2wy7zxz {
	width: 100%;
	height: 100%;
	position: relative;
	transform: translateZ(0) scale(1);
	backface-visibility: hidden;
	transform-origin: 0 0;
	}
	.ldio-1u0s2wy7zxz div { 
		box-sizing: content-box; 
	}	
`;
