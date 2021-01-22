import React from 'react'
import styled from 'styled-components';

const Nav = () => {
	return (
		<S.Navigation>
			<h1>Pit's GameLab</h1>
		</S.Navigation>
	)
}

export default Nav;

const S = {};
S.Navigation = styled.div`
	width: 100%;
	height: 80px;
	background-color: #FFAD32;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #000;
`;