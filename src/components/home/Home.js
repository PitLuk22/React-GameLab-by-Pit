import React, { useEffect, useState } from 'react'
import { getGameDetails, isLoadingGames, getSearchedGames } from '../../actions';
import { fetchGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import GameList from '../pages';
import Aside from '../aside';
import GameDetails from '../gameDetails';
import Nav from '../nav';
import { Switch, Route, useLocation } from 'react-router-dom';
//Styles
import styled from 'styled-components';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

const Home = () => {

	const [isShowSuggestions, setIsShowSuggestions] = useState(false);
	const [toggleGrid, setToggleGrid] = useState('small');
	const [toggleAside, setToggleAside] = useState(false);

	if (toggleGrid !== 'small' && window.innerWidth < 768) {
		setToggleGrid('small')
	}

	const location = useLocation();
	const arrFromLocation = location.pathname.split('/');
	const currentSection = arrFromLocation[1];
	const pathId = +arrFromLocation[arrFromLocation.length - 1];

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(isLoadingGames());

		// show current game section 
		if (currentSection === 'searched') {
			const searchedName = location.pathname.split('/')[2];
			dispatch(getSearchedGames(searchedName));
		} else if (currentSection === 'game') {
			dispatch(fetchGames(''))
		} else {
			dispatch(fetchGames(currentSection))
		}

		// if gameDetails should be shown after refresh 
		if (Object.keys(game).length === 1 && pathId !== 0) {
			dispatch(getGameDetails(pathId))
		}
	}, [])

	const { games, details: { game } } = useSelector(state => state)
	const {
		trending,
		allTime,
		popular,
		upcoming,
		newGames,
		thisWeek,
		nextWeek,
		searched,
		genre,
		loading
	} = games;

	// data-search attribute responsible for Suggestions block
	// if the block has data-search att and we click on it, we don't close Suggestion block, else we close Suggestion
	const closeSuggestions = (e) => {
		if (isShowSuggestions && !e.target.closest('[data-search]')) {
			setIsShowSuggestions(false)
		}
	}

	return (
		<div onClick={closeSuggestions}>
			<AnimateSharedLayout type='crossfade'>
				<Nav
					toggle={toggleGrid}
					setToggle={setToggleGrid}
					isShowSuggestions={isShowSuggestions}
					setIsShowSuggestions={setIsShowSuggestions}
					toggleAside={toggleAside}
					setToggleAside={setToggleAside} />
				<S.Main >
					<Aside
						games={games}
						toggleAside={toggleAside}
						setToggleAside={setToggleAside} />
					<S.Content>
						<AnimatePresence>
							{pathId && <GameDetails id={pathId} />}
						</AnimatePresence>
						<Switch>
							<Route path='/searched/'>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={searched} title={`Searched:`} searchedName={location.pathname.split('/')[2]} loading={loading} />
							</Route>
							<Route exact strict path={['/', '/game/:id']}>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={trending} title={'The best of new'} loading={loading} />
							</Route>
							<Route path='/popular/'>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={popular} title={'Popular games in 2020'} loading={loading} />
							</Route>
							<Route path='/upcoming/'>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={upcoming} title={'Upcoming games'} loading={loading} />
							</Route>
							<Route path='/newGames/'>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={newGames} title={'New games'} loading={loading} />
							</Route>
							<Route path='/thisWeek/'>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={thisWeek} title={'This week'} loading={loading} />
							</Route>
							<Route path='/nextWeek/'>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={nextWeek} title={'Next week'} loading={loading} />
							</Route>
							<Route path='/allTime/'>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={allTime} title={'All time top'} loading={loading} />
							</Route>
							<Route path={['/action/', '/adventure/', '/shooter/', '/sports/', '/role-playing-games-rpg/', '/racing/', '/indie/', '/strategy/']}>
								<GameList toggle={toggleGrid} setToggle={setToggleGrid} games={genre} title={currentSection} loading={loading} />
							</Route>
						</Switch>
					</S.Content>
				</S.Main>
			</AnimateSharedLayout>
		</div>
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
	@media(max-width: 576px) {
		margin-top: 151px;
	}
`;