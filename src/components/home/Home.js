import React, { useEffect } from 'react'
import { loadAllGames, getGameDetails, isLoadingAllGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import GameList from '../pages';
import Aside from '../aside';
import GameDetails from '../gameDetails';
import Nav from '../nav';
import { useLocation } from 'react-router-dom';
import Spinner from '../spinner';
//Styles
import styled from 'styled-components';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

const Home = () => {

	const location = useLocation();
	const pathId = +location.pathname.split('/')[2];

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(isLoadingAllGames());
		// get all kind of games
		dispatch(loadAllGames())

		// if gameDetails should be shown after refresh 
		if (game.platforms.length === 0 && pathId) {
			dispatch(getGameDetails(pathId))
		}
	}, [])

	const { games: { popular, upcoming, newGames, loading }, details: { game } } = useSelector(state => state)

	return (
		<>
			<Nav />
			<S.Main >
				<Aside />
				<S.Content>
					{loading
						? <Spinner color='rgba(255,255,255, .4)' />
						: <AnimateSharedLayout type='crossfade'>

							<AnimatePresence>
								{pathId && <GameDetails id={pathId} />}
							</AnimatePresence>
							{popular.length ? <GameList games={popular} title={'Popular games in 2020'} /> : null}
							{/* <GameList games={upcoming} title={'Upcoming games'} />
							<GameList games={newGames} title={'New games'} /> */}

						</AnimateSharedLayout>}
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