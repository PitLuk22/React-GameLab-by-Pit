import React, { useEffect } from 'react'
import { loadAllGames, getGameDetails } from '../../actions';
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
		dispatch(loadAllGames())
	}, [])
	const { popular, upcoming, newGames } = useSelector(state => state.games)
	const game = useSelector(state => state.details.game)

	// if gameDetails should be shown after refresh 
	if (!Object.keys(game).length && pathID) {
		dispatch(getGameDetails(pathID))
		document.body.style.overflow = 'hidden';
	}
	if (!pathID) {
		document.body.style.overflow = 'auto';
	}

	return (
		<>
			<Nav />
			<S.Main >
				<Aside />
				<S.Content>
					{Object.keys(game).length && pathID ? <GameDetails /> : null}
					<GameList games={popular} title={'Popular games in 2020'} />
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