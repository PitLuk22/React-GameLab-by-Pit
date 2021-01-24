import React, { useEffect } from 'react'
import { loadAllGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import GameList from '../pages';
import Aside from '../aside';
import GameDetails from '../gameDetails';
import Nav from '../nav';

import styled from 'styled-components';

const Home = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadAllGames())
	}, [])
	const { popular, upcoming, newGames } = useSelector(state => state.games)
	const game = useSelector(state => state.details.game)

	// canceling scroll
	document.body.style.overflow = Object.keys(game).length ? 'hidden' : 'auto';
	return (
		<>
			<Nav game={game} />
			<S.Main >
				<Aside game={game} />
				<S.Content>
					{Object.keys(game).length ? <GameDetails /> : null}
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