import React from 'react';
import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Game from '../game';

const GameList = ({ games, title }) => {

	return (
		<>
			<ResponsiveMasonry
				as={motion.div}
				columnsCountBreakPoints={{ 350: 1, 500: 2, 750: 3, 900: 4, }}
				style={styledContainer}>
				<Masonry as={motion.div} gutter='1.5rem'>
					<h2>{title}</h2>
					{games.map(game => {
						return <Game key={game.id} {...game} />
					})}
				</Masonry>
			</ResponsiveMasonry>
		</>
	)
}
export default GameList;

const styledContainer = {
	padding: '2rem 5rem',
}

