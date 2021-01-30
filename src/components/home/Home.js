import React, { useEffect, useState } from 'react'
import { loadAllGames, getGameDetails, isLoadingAllGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import GameList from '../pages';
import Aside from '../aside';
import GameDetails from '../gameDetails';
import Nav from '../nav';
import { Route, useLocation } from 'react-router-dom';
import Spinner from '../spinner';
//Styles
import styled from 'styled-components';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

const Home = () => {

	const [searchRequest, setSearchRequest] = useState('');

	const location = useLocation();
	const arrFromLocation = location.pathname.split('/');
	const pathId = +arrFromLocation[arrFromLocation.length - 1];
	const currentSection = arrFromLocation[1] === 'game' ? null : arrFromLocation[1];


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



	const { games: { popular, upcoming, newGames, searched, loading }, details: { game } } = useSelector(state => state)

	return (
		<>
			<Nav setSearchRequest={setSearchRequest} />
			<S.Main >
				<Aside />
				<S.Content>
					{loading
						? <Spinner color='rgba(255,255,255, .4)' />
						: <AnimateSharedLayout type='crossfade'>

							<AnimatePresence>
								{pathId && <GameDetails id={pathId} />}
							</AnimatePresence>
							<Route exact path='/'>
								<div>Start page</div>
							</Route>
							<Route path='/searched/'>
								{searched.length ? <GameList games={searched} title={`Searched:`} searchedName={searchRequest} /> : <div>Nothing has been found</div>}
							</Route>
							<Route path='/popular/'>
								{popular.length ? <GameList games={popular} title={'Popular games in 2020'} /> : null}
							</Route>
							<Route path='/upcoming/'>
								{upcoming.length ? <GameList games={upcoming} title={'Upcoming games'} /> : null}
							</Route>
							<Route path='/newGames/'>
								{newGames.length ? <GameList games={newGames} title={'New games'} /> : null}
							</Route>


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
	flex: 1;
	padding: 0 2rem 0 2rem;
`;