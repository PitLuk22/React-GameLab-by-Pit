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
				{searchedName && <div style={{ fontSize: '1.2rem', color: '#fff', wordWrap: 'break-word' }}>{searchedName.slice(0, 1).toUpperCase() + searchedName.slice(1)}</div>}
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
	color: #FFAD32;
	border: 4px solid #FFAD32;
	border-radius: 30px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	span {
		display: block;
		margin-right: 2rem;
	}
`;

