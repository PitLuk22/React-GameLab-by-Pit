import React, { useEffect, useState } from 'react';
import { isLoadingGames, getSearchedGames, instantSearchGames, isLoadingInstantSearch } from '../../actions';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SearchedGame from '../searchedGame';
import Spinner from '../spinner';
//Redux
import { useSelector, useDispatch } from 'react-redux';
// Style
import styled from 'styled-components';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ isShowSuggestions, setIsShowSuggestions }) => {

	const [inputText, setInputText] = useState('');

	const history = useHistory();

	const { searchedGames, loading } = useSelector(state => state.instantSearch);
	const dispatch = useDispatch();

	useEffect(() => {
		if (inputText) {
			setIsShowSuggestions(true);
			dispatch(isLoadingInstantSearch());
			dispatch(instantSearchGames(inputText));
		} else {
			setIsShowSuggestions(false);
		}
	}, [inputText])

	const searchHandler = (e) => {
		setInputText(e.target.value)
	}
	const sendRequest = (e) => {
		e.preventDefault();
		if (inputText) {
			history.push(`/searched/${inputText}/`);
			dispatch(isLoadingGames());
			dispatch(getSearchedGames(inputText));
		}
	}

	// TODO: 1) закрытие предложений только при нажатии вне предложений, либо при самостоятельном очищении ИНПУТА
	//		2) При перезагрузке на выбранной игре сделать правильное поведение 

	return (
		<S.Navigation>
			<h1>Pit's GameLab</h1>
			<S.SearchWrapper data-search>
				<S.Form onSubmit={sendRequest} novalidate autocomplete="off">
					<div className="input__area">
						<S.Input data-search value={inputText} onInput={searchHandler} type="text" name="search" placeholder='Search games' autocomplete="off" />
						<FontAwesomeIcon icon={faSearch} size='sm' />
					</div>
					<S.Btn name="search" >Search</S.Btn>
				</S.Form>
				{searchedGames.length && isShowSuggestions ? <S.Suggestions>
					{loading
						? <Spinner pos='static' color='rgba(255,255,255, .4)' />
						: searchedGames.map(game => {
							return <SearchedGame key={uuidv4()} {...game} />
						})}
				</S.Suggestions> : null}
			</S.SearchWrapper>
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
S.SearchWrapper = styled.div`
	position: relative;
	width: 60%;
`;

S.Suggestions = styled.div`
	position: absolute;
	top: 3.5rem;
	left: 0;
	width: 100%;
	background-color: #0e0e0e;
	border-radius: .8rem;
	padding: 1.5rem; 
	z-index: 4;
`;
S.Form = styled.form`
	display: flex;
	width: 100%;
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