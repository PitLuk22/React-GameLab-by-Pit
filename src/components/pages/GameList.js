import React from 'react';
import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Game from '../game';

import styled from 'styled-components';

const GameList = ({ games, game, title }) => {

	const styledContainer = {
		paddingTop: '2rem',
		filter: `blur(${Object.keys(game).length ? '10px' : '0px'})`
	}
	return (
		<div >
			<ResponsiveMasonry
				as={motion.div}
				columnsCountBreakPoints={{ 350: 1, 600: 1, 800: 2, 1000: 3, 1300: 4 }}
				style={styledContainer}>
				<Masonry as={motion.div} gutter='1.5rem'>
					<S.Title>{title}</S.Title>
					{games.map(game => {
						return <Game key={game.id} {...game} />
					})}
				</Masonry>
			</ResponsiveMasonry>
		</div>
	)
}
export default GameList;

const S = {};
S.Title = styled.h2`
	color: #FFAD32;
	border: 4px solid #FFAD32;
	border-radius: 30px;
`;

