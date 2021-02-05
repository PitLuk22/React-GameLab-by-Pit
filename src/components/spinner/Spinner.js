import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Spinner = ({ pos, color, size }) => {
	return (
		<S.Spinner pos={pos} color={color} size={size}>
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
	position: ${props => props.pos};
	width: 100%;
	height: ${props => props.size === 'big' ? '180px' : '50px'};
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 4;
	.spinner {
		width:${props => props.size === 'big' ? '200px' : '30px'};
		height: ${props => props.size === 'big' ? '200px' : '30px'};
		display: inline - block;
		overflow: hidden;
		background: rgba(NaN, NaN, NaN, 0);
	}
	.circle div {
	position: absolute;
	width: ${props => props.size === 'big' ? '60px' : '20px'};
	height: ${props => props.size === 'big' ? '60px' : '20px'};
	border: ${props => props.size === 'big' ? '10px' : '5px'} solid ${props => props.color};
	border-top-color: transparent;
	border-radius: 50%;
	}
	.circle div {
	animation: ${animation} 1s linear infinite;
	top: ${props => props.size === 'big' ? '100px' : '50%'} ;
	left: ${props => props.size === 'big' ? '100px' : '50%'} ;
	}
	.circle {
	width: 100%;
	height: 100%;
	position: relative;
	transform: translateZ(0) scale(1);
	backface-visibility: hidden;
	transform-origin: 0 0;
	top: 50%;
	/* left: 50%; */
	transform: translateY(-50%);
	}
	.circle div { 
		box-sizing: content-box; 
	}	
`;

// PropTypes 
Spinner.propTypes = {
	pos: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.string
}
Spinner.defaultProps = {
	size: 'big'
}