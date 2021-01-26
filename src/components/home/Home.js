import React, { useEffect } from 'react'
import { loadAllGames, getGameDetails, deleteDetails } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import GameList from '../pages';
import Aside from '../aside';
import GameDetails from '../gameDetails';
import Nav from '../nav';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

const Home = () => {

	const location = useLocation();
	const pathID = location.pathname.split('/')[2];

	const dispatch = useDispatch();

	useEffect(() => {
		// get all kind of games
		dispatch(loadAllGames())
		// responsible for pressing the back button
		if (!location.pathname.includes('game') && game.name) {
			dispatch(deleteDetails());
		}
		// if gameDetails should be shown after refresh 
		if (!Object.keys(game).length && pathID) {
			dispatch(getGameDetails(pathID))
			document.body.style.overflow = 'hidden';
		}
		if (!pathID) {
			document.body.style.overflow = 'auto';
		}
	}, [location])

	const { games: { popular, upcoming, newGames }, details: { game } } = useSelector(state => state)

	return (
		<>
			<Nav game={game} />
			<S.Main >
				<Aside game={game} />
				<S.Content>
					{Object.keys(game).length && pathID ? <GameDetails /> : null}
					<GameList games={popular} game={game} title={'Popular games in 2020'} />
					{/* <GameList games={upcoming} title={'Upcoming games'} />
						<GameList games={newGames} title={'New games'} /> */}
				</S.Content>
			</S.Main>
		</>
	)
}

export default Home;

const S = {};
S.Main = styled.main`
	display: flex;
`;
S.Content = styled.main`
	position: relative;
	flex:1;
	padding: 0 2rem 0 2rem;
`;