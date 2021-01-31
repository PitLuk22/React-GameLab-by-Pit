import React, { useState } from 'react';
import { isLoadingGames, getSearchedGames, deleteSearched } from '../../actions';
import { useHistory } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
// Style
import styled from 'styled-components';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ setSearchRequest }) => {

	const [search, setSearch] = useState('');

	const history = useHistory();

	const dispatch = useDispatch();

	const searchHandler = (e) => {
		setSearch(e.target.value)
	}
	const sendRequest = (e) => {
		e.preventDefault();
		history.push('/searched/');
		dispatch(isLoadingGames());
		dispatch(getSearchedGames(search));
		setSearchRequest(search)
		setSearch('')
	}
	const deleteSearchedGames = () => {
		dispatch(deleteSearched())
		history.push('/');
	}
	return (
		<S.Navigation>
			<h1 onClick={() => deleteSearchedGames()}>Pit's GameLab</h1>
			<S.Form onSubmit={sendRequest}>
				<div className="input__area">
					<S.Input value={search} onInput={searchHandler} type="text" name="search" placeholder='Search games' />
					<FontAwesomeIcon icon={faSearch} size='sm' />
				</div>
				<S.Btn name="search" >Search</S.Btn>
			</S.Form>
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
	justify-content: space-between;
	align-items: center;
	color: #FFAD32;
	padding: 0 2rem 0 3rem;
	margin: 1rem 0;
`;
S.Form = styled.form`
	display: flex;
	width: 60%;
	border-radius: .8rem;
	overflow: hidden;
	box-shadow: 0 0 5px 5px rgba(0,0,0, .2);
	.input__area {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		svg {
			position: absolute;
			top: 50%;
			left: 1rem;
			transform: translateY(-50%);
			color: #212121;
			transition: all .3s ease;
		}
	}
`;

S.Input = styled.input`
	position: absolute;
	padding: .8rem 2rem .8rem 2.5rem;
	background-color: #414141 ;
	width: 100%;
	border: none;
	outline: none;
	font-size: 1rem;
	font-weight: 500;
	transition: all .3s ease;
	&:focus {
		background-color: #bababa;
	}
	&:focus + svg {
		color: #313131;
	}
	&:hover {
		background-color: #bababa;
	}
	&:hover + svg {
		color: #313131;
	}

`;
S.Btn = styled.button`
	padding: .8rem 1.5rem;
	font-size: 1rem;
	background-color: #313131;
	color: #fff;
	border: none;
	outline: none;
	cursor: pointer;
	font-weight: 500;
	transition: all .3s ease;
	&:hover {
		color: #313131;
		background-color: #FFAD32;
	}
`;