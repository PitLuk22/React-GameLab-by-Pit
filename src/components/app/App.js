import React, { useEffect } from 'react';
import GameList from '../pages';
import { loadAllGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../nav';

function App() {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadAllGames())
	}, [])
	const { popular, upcoming, newGames } = useSelector(state => state.games)

	return (
		<div className="App">
			<Nav />
			<GameList games={popular} title={'Popular games in 2020'} />
			<GameList games={upcoming} title={'Upcoming games'} />
			<GameList games={newGames} title={'New games'} />
		</div>
	);
}

export default App;
