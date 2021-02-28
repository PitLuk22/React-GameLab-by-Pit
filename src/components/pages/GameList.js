import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Game from '../game';
import Spinner from '../spinner';
import { useLocation } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../actions';
// Style
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const GameList = ({ toggle, searchedName, games, title, loading }) => {

	const btn = useRef(null);
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

	const grid = toggle === 'small' ? { 600: 1, 768: 2, 1000: 3, 1300: 4 } : { 350: 1 };

	return (
		<S.Section toggle={toggle}>
			<S.Title >
				<h2 className='title'>{title}</h2>
				{searchedName && <h4 className='title-searched'>{searchedName}</h4>}
			</S.Title>
			{loading
				? <Spinner pos='static' color='rgba(255,255,255, .4)' />
				: games.length ? <ResponsiveMasonry
					as={motion.div}
					className='games-grid'
					columnsCountBreakPoints={grid}>
					<Masonry
						gutter='1.5rem'>
						{games.map(game => {
							return <Game key={game.id} toggle={toggle} {...game} />
						})}
					</Masonry>
					{games.length % 10 === 0 && <S.Btn ref={btn} onClick={showMoreGames}>
						{isShowMoreGames
							? <Spinner pos='static' color='rgba(255,255,255, .4)' size='small' />
							: <div className='btn__inner'>
								<span>Show more games</span>
								<FontAwesomeIcon icon={faArrowDown} size='2x' />
							</div>}
					</S.Btn>}
				</ResponsiveMasonry> : <S.NotFound>Sorry but we couldn't find the game you need <span role='img' aria-label='sad'>😢</span></S.NotFound>
			}
		</S.Section>
	)
}

export default GameList;

const S = {};
S.Btn = styled.button`
	position: relative;
	min-width: 250px;
	min-height: 82px;
	display: block;
	margin: 4rem auto 0 auto;
	padding: .8rem;
	background-color: #202020;
	border-radius: .8rem;
	font-size: 1.2rem;
	border: none;
	color: #fff;
	transition: all .3s ease;
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
		transition: all .3s ease;
		span {
			display: block;
			margin-bottom: 4rem;
		}
	}
	&:hover {
		.btn__inner {
			top: 0%;
		}
	}
`;
S.Section = styled.div`
	margin-bottom: 5rem;
	.games-grid {
		padding: ${props => props.toggle === 'small' ? '2rem 3rem 2rem 2rem' : '2rem 15rem'};
		@media(max-width: 1200px) {
			padding: ${props => props.toggle === 'small' ? '2rem 3rem 2rem 2rem' : '2rem 7rem'};
		}
		@media(max-width: 992px) {
			padding: ${props => props.toggle === 'small' ? '2rem' : '2rem 3rem'};
		}
	}
`;
S.Title = styled(motion.div)`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 2rem;
	.title, .searched-title {
		color: #fff;
		border-bottom: 4px solid #ffb907;
		text-align: center;
		text-transform: capitalize;
	}
	.title-searched {
		border-bottom: none;
		text-transform: capitalize;
		word-wrap: break-word;
		margin-left: 1rem;
	}
	@media(max-width: 768px) {
		flex-direction: column;
		text-align: center;
		.title {
			padding: .5rem;
		}
		
	}
`;
S.NotFound = styled.div`
	font-family: 'Audiowide', cursive;
	text-align: center;
	margin-top: 3rem;
	font-size: 2rem;
`;

// PropTypes 

GameList.propTypes = {
	toggle: PropTypes.string,
	searchedName: PropTypes.string,
	games: PropTypes.array,
	title: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
}