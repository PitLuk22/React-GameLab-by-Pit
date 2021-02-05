import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Game from '../game';
import Spinner from '../spinner';

import styled from 'styled-components';

const GameList = ({ toggle, searchedName, games, title, loading }) => {

	const styledContainer = {
		paddingTop: '2rem',
		padding: toggle === 'small' ? '2rem' : '2rem 15rem'
	}
	const grid = toggle === 'small' ? { 350: 1, 600: 1, 800: 2, 1000: 3, 1300: 4 } : { 350: 1 };

	return (
		<motion.div>
			<S.Title >
				<h2 className='title'>{title}</h2>
				{searchedName && <h2 className='title-searched'>{searchedName}</h2>}

			</S.Title>
			{loading
				? <Spinner pos='static' color='rgba(255,255,255, .4)' />
				: games.length ? <ResponsiveMasonry
					as={motion.div}
					columnsCountBreakPoints={grid}
					style={styledContainer}>
					<Masonry
						gutter='1.5rem'>
						{games.map(game => {
							return <Game key={game.id} toggle={toggle} {...game} />
						})}
					</Masonry>
				</ResponsiveMasonry> : <S.NotFound>Sorry but we couldn't find the game you need <span role='img' aria-label='sad'>😢</span> </S.NotFound>
			}
		</motion.div>
	)
}

export default GameList;

const S = {};
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