import React, { useEffect } from 'react';
import GameList from '../pages';
import { loadAllGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../nav';

import styled from 'styled-components';

function App() {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadAllGames())
	}, [])
	const { popular, upcoming, newGames } = useSelector(state => state.games)

	return (
		<div className="App">
			<Nav />
			<Aside>
				<div>some text</div>
				<div>some text</div>
				<div>some text</div>
				<div>some text</div>
				<div>some text</div>
			</Aside>
			<Content>
				<GameList games={popular} title={'Popular games in 2020'} />
				<GameList games={upcoming} title={'Upcoming games'} />
				<GameList games={newGames} title={'New games'} />
			</Content>
		</div>
	);
}

export default App;

const Content = styled.div`
	padding-left: 20%;
`;

const Aside = styled.aside`
	position: fixed;
	top: 0;
	left: 0;
	width: 20%;
	height: 100%;
	background-color: yellowgreen;
`;