import React, { useEffect, useState } from 'react'
import { trendingGames, getGameDetails, isLoadingGames, getSearchedGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import GameList from '../pages';
import Aside from '../aside';
import GameDetails from '../gameDetails';
import Nav from '../nav';
import { Switch, Route, useLocation } from 'react-router-dom';
import Spinner from '../spinner';
import getCertainAction from '../../services/getActionAfterReload';
//Styles
import styled from 'styled-components';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

const Home = () => {

	const location = useLocation();
	const arrFromLocation = location.pathname.split('/');
	const currentSection = arrFromLocation[1];
	const pathId = +arrFromLocation[arrFromLocation.length - 1];

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(isLoadingGames());

		// get current game section 
		if (location.pathname === '/' || currentSection === 'game') {
			dispatch(trendingGames());
		}
		else if (location.pathname.includes('searched')) {
			const searchedName = location.pathname.split('/')[2];
			dispatch(getSearchedGames(searchedName));
		} else {
			dispatch(getCertainAction(currentSection))
		}

		// if gameDetails should be shown after refresh 
		if (game.platforms.length === 0 && pathId !== 0) {
			dispatch(getGameDetails(pathId))
		}
	}, [])

	const {
		games: {
			trending,
			allTime,
			popular,
			upcoming,
			newGames,
			last30days,
			thisWeek,
			nextWeek,
			searched,
			genre,
			loading
		},
		details: {
			game
		}
	} = useSelector(state => state)

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
							<Switch>
								<Route path='/searched/'>
									{searched.length
										? <GameList games={searched} title={`Searched:`} searchedName={location.pathname.split('/')[2]} />
										: <div>Nothing has been found</div>}
								</Route>
								<Route exact strict path={['/', '/game/:id']}>
									{trending.length ? <GameList games={trending} title={'The best of new'} /> : null}
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
								<Route path='/last30days/'>
									{last30days.length ? <GameList games={last30days} title={'Last 30 days'} /> : null}
								</Route>
								<Route path='/thisWeek/'>
									{thisWeek.length ? <GameList games={thisWeek} title={'This week'} /> : null}
								</Route>
								<Route path='/nextWeek/'>
									{nextWeek.length ? <GameList games={nextWeek} title={'Next week'} /> : null}
								</Route>
								<Route path='/allTime/'>
									{allTime.length ? <GameList games={allTime} title={'All time top'} /> : null}
								</Route>
								<Route path={['/action/', '/adventure/', '/shooter/', '/sports/', '/role-playing-games-rpg/', '/racing/', '/indie/', '/strategy/']}>
									{genre.length ? <GameList games={genre} title={currentSection} /> : null}
								</Route>
							</Switch>
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