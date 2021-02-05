import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Game from '../game';
import Spinner from '../spinner';

import styled from 'styled-components';

const GameList = ({ toggle, searchedName, games, title, loading }) => {

	const grid = toggle === 'small' ? { 600: 1, 768: 2, 1000: 3, 1300: 4 } : { 350: 1 };

	return (
		<S.Section toggle={toggle}>
			<S.Title >
				<h2 className='title'>{title}</h2>
				{searchedName && <h2 className='title-searched'>{searchedName}</h2>}

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
				</ResponsiveMasonry> : <S.NotFound>Sorry but we couldn't find the game you need <span role='img' aria-label='sad'>😢</span> </S.NotFound>
			}
		</S.Section>
	)
}

export default GameList;

const S = {};
S.Section = styled.div`
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
		margin-right: 1.3rem;
		text-align: center;
		text-transform: capitalize;
	}
	.title-searched {
		border-bottom: none;
		text-transform: capitalize;
		word-wrap: break-word;
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