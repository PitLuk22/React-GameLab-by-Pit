import React, { useEffect, useState } from 'react'
import { trendingGames, getGameDetails, isLoadingGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import GameList from '../pages';
import Aside from '../aside';
import GameDetails from '../gameDetails';
import Nav from '../nav';
import { Route, useLocation } from 'react-router-dom';
import Spinner from '../spinner';
import getCertainAction from '../../services/getActionAfterReload';
//Styles
import styled from 'styled-components';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

const Home = () => {

	const [searchRequest, setSearchRequest] = useState('');

	const location = useLocation();
	const arrFromLocation = location.pathname.split('/');
	const currentSection = arrFromLocation[1];
	const pathId = +arrFromLocation[arrFromLocation.length - 1];

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(isLoadingGames());

		// get current game section 
		if (location.pathname === '/') {
			dispatch(trendingGames());
		} else {
			dispatch(getCertainAction(currentSection))
		}

		// if gameDetails should be shown after refresh 
		if (game.platforms.length === 0 && pathId) {
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
			loading
		},
		details: {
			game
		}
	} = useSelector(state => state)

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

							<Route path='/searched/'>
								{searched.length
									? <GameList games={searched} title={`Searched:`} searchedName={searchRequest} />
									: <div>Nothing has been found</div>}
							</Route>
							<Route exact path='/'>
								{trending.length ? <GameList games={trending} title={'New and trending'} /> : null}
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