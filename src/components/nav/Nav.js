import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
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

const Nav = ({ toggle, setToggle, isShowSuggestions, setIsShowSuggestions }) => {

	const [inputText, setInputText] = useState('');
	const [isShowMore, setIsShowMore] = useState(false);

	const history = useHistory();

	const { count, searchedGames, loading } = useSelector(state => state.instantSearch);
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
			setIsShowSuggestions(false)
		}
	}

	const searchedItems = isShowMore ? searchedGames : searchedGames.filter((_, i) => i < 5);

	return (
		<S.Navigation>
			<h1>Pit's GameLab</h1>
			<S.SearchWrapper data-search>
				<S.Form onSubmit={sendRequest} novalidate autocomplete="off">
					<div className="input__area">
						<S.Input data-search value={inputText} onInput={searchHandler} type="text" name="search" placeholder='Search 500 601 games' autocomplete="off" />
						<FontAwesomeIcon icon={faSearch} size='sm' />
					</div>
					<S.Btn name="search" >Search</S.Btn>
				</S.Form>
				{searchedGames.length && isShowSuggestions
					? <S.Suggestions>
						{loading
							? <Spinner pos='static' color='rgba(255,255,255, .4)' />
							: <>
								<div className='title'>Games <span>{count}</span></div>

								{searchedItems.map(game => {
									return <SearchedGame key={uuidv4()} {...game} />
								})}

								{!isShowMore &&
									<div className='show-more' onClick={() => setIsShowMore(!isShowMore)}>
										<span>Show more results</span>
									</div>}
							</>}
					</S.Suggestions> : null}
			</S.SearchWrapper>
			<S.Toggle>
				<div>Dispaly options:</div>
				<div className='options-tabs'>
					<span onClick={() => setToggle('small')}>
						<svg fill={toggle === 'small' ? '#bababa' : '#313131'} viewBox="0 0 24 24"><path d="m6 0h-5c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1h5c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1z" /><path d="m6 8.5h-5c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1h5c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1z" /><path d="m15.5 14.5v-5c0-.552-.448-1-1-1h-5c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1h5c.552 0 1-.448 1-1z" /><path d="m15.5 6v-5c0-.552-.448-1-1-1h-5c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1h5c.552 0 1-.448 1-1z" /><path d="m23 0h-5c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1h5c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1z" /><path d="m18 15.5h5c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1h-5c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1z" /><path d="m18 24h5c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1h-5c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1z" /><path d="m0 18v5c0 .552.448 1 1 1h5c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1h-5c-.552 0-1 .448-1 1z" /><path d="m8.5 18v5c0 .552.448 1 1 1h5c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1h-5c-.552 0-1 .448-1 1z" /></svg>
					</span>
					<span onClick={() => setToggle('large')}>
						<svg fill={toggle === 'large' ? '#bababa' : '#313131'} viewBox="0 0 24 24"><path d="m0 23c0 .552.448 1 1 1h22c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1h-22c-.552 0-1 .448-1 1z" /><path d="m23 0h-22c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1h22c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1z" /><path d="m1 15.5h22c.552 0 1-.448 1-1v-5c0-.552-.448-1-1-1h-22c-.552 0-1 .448-1 1v5c0 .552.448 1 1 1z" /></svg>
					</span>
				</div>
			</S.Toggle>
		</S.Navigation>
	)
}

export default memo(Nav);

const S = {};

S.Toggle = styled.div`
	padding: 0 1rem;
	font-size: .9rem;
	color: grey;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	.options-tabs {
		display: flex;
		width: 100px;
	}
	span {
		margin-left: 1rem;
		cursor:pointer;
		&:hover svg {
			fill :#797979;
		}
		svg {
			transition: all .3s ease;
			width: 100%;
		}
	}
`;
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
	width: 50%;
`;

S.Suggestions = styled.div`
	position: absolute;
	top: 3.5rem;
	left: 0;
	width: 100%;
	background-color: #0e0e0e;
	border-radius: .8rem;
	padding: 1.5rem; 
	color: #fff;
	box-shadow: 0px 5px 13px rgba(0,0,0, .5);
	z-index: 7;
	.title {
		font-size: 1.2rem;
		border-bottom: 1px solid #a4a4a4;
		padding-bottom: .5rem;
		font-weight: bold;
		span {
			color: #a4a4a4;
			font-weight: 200;
		}
	}
	.show-more {
		font-size: 1rem;
		color: #8e8e8e;
		border-top: 1px solid #a4a4a4;
		padding-top: 1rem;
		span {
			transition: color .3s ease;
			text-decoration: underline;
			cursor: pointer;
			&:hover {
				color:#464646 ;
			}
		}
	}
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

// PropTypes

Nav.propTypes = {
	toggle: PropTypes.string.isRequired,
	setToggle: PropTypes.func.isRequired,
	isShowSuggestions: PropTypes.bool.isRequired,
	setIsShowSuggestions: PropTypes.func.isRequired
}