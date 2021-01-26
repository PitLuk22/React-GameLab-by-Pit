import React from 'react'
import styled from 'styled-components';

const Nav = ({ game }) => {
	return (
		<S.Navigation blur={game}>
			<form>
				<S.Input type="text" name="search" placeholder='Search games' />
				<S.Btn name="search" >Search</S.Btn>
			</form>
		</S.Navigation>
	)
}

export default Nav;

const S = {};
S.Navigation = styled.div`
	position: relative;
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #FFAD32;
	padding: 0 2rem 0 13rem;
	margin: 1rem 0;
	filter: ${props => props.blur.name ? 'blur(10px)' : 'blur(0px)'};
	form {
		display: flex;
		margin-left: auto;
		width: 60%;
	}
`;
S.Input = styled.input`
	padding: .5rem 2rem;
	background-color: #414141 ;
	width: 40%;
	border: none;
	border-radius: 30px;
	outline: none;
	margin-right: 2rem;
	margin-left: auto;
	font-size: 1rem;
	box-shadow: 0 0 5px 5px rgba(0,0,0, .2);
	transition: all .3s ease;
	&:focus {
		background-color: #bababa;
		width: 100%;
	}
	&:hover {
		background-color: #bababa;
	}
`;
S.Btn = styled.button`
	padding: .5rem 1rem;
	font-size: 1rem;
	background-color: #313131;
	color: #fff;
	border: none;
	outline: none;
	border-radius: .5rem;
	cursor: pointer;
	box-shadow: 0 0 5px 5px rgba(0,0,0, .2);
	&:hover {
		color: #fad860;
	}
`;