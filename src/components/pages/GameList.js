import React from 'react';
import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Game from '../game';

import styled from 'styled-components';
import { fadeIn } from '../../animations';

const GameList = ({ searchedName, games, title }) => {

	const styledContainer = {
		paddingTop: '2rem'
	}

	return (
		<motion.div>
			<S.Title variants={fadeIn} initial="hidden" animate='show' exit='exit'>
				<span>{title}</span>
				{searchedName && <span>{searchedName}</span>}
			</S.Title>
			<ResponsiveMasonry
				as={motion.div}
				columnsCountBreakPoints={{ 350: 1, 600: 1, 800: 2, 1000: 3, 1300: 4 }}
				style={styledContainer}>
				<Masonry gutter='1.5rem'>
					{games.map(game => {
						return <Game key={game.id} {...game} />
					})}
				</Masonry>
			</ResponsiveMasonry>
		</motion.div>
	)
}
export default GameList;

const S = {};
S.Title = styled(motion.h2)`
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		color: #fff;
		border-bottom: 4px solid #ffb907;
		margin-right: 2rem;
		text-align: center;
		text-transform: capitalize;
		&:nth-child(2) {
			border-bottom: none;
			word-wrap: break-word;
			
		}
	}
`;

