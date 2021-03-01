import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner';
// Router
import { useLocation } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../actions';
// Style
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';


const ButtonMoreGames = ({ games }) => {

	const [isShowMoreGames, setIsShowMoreGames] = useState(false);
	const dispatch = useDispatch();
	const nextUrl = useSelector(state => state.games.nextUrl);

	const location = useLocation();
	const arrFromLocation = location.pathname.split('/');
	const currentSection = arrFromLocation[1];

	const showMoreGames = async () => {
		setIsShowMoreGames(true)
		await dispatch(fetchGames(currentSection, nextUrl))
		setIsShowMoreGames(false)
	}

	return (
		<>
			{games.length % 10 === 0 && <S.Btn onClick={showMoreGames}>
				{isShowMoreGames
					? <Spinner pos='static' color='rgba(255,255,255, .4)' size='small' />
					: <div className='btn__inner'>
						<span>Show more games</span>
						<FontAwesomeIcon icon={faArrowDown} size='2x' />
					</div>
				}
			</S.Btn>}
		</>
	)
}

export default ButtonMoreGames;

const S = {};
S.Btn = styled.button`
	position: relative;
	min-width: 250px;
	min-height: 65px;
	display: block;
	margin: 4rem auto 0 auto;
	background-color: #202020;
	border-radius: .8rem;
	font-size: 1.2rem;
	border: none;
	color: #fff;
	transition: all .2s ease;
	box-shadow: 0 0 5px 5px rgba(0,0,0, .1);
	overflow: hidden;
	cursor: pointer;
	.btn__inner {
		position: absolute;
		min-width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		top: 110%;
		left: 50%;
		transform: translate(-50%,-50%);
		transition: all .2s ease;
		span {
			display: block;
			margin-bottom: 2.5rem;
		}
	}
	&:hover {
		.btn__inner {
			top: 0%;
		}
	}
`;

// PropTypes 
ButtonMoreGames.propTypes = {
	games: PropTypes.array
}