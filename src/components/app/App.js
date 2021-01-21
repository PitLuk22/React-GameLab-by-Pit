import React, { useEffect } from 'react';
import GameList from '../pages';
import { loadAllGames } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadAllGames())
	}, [])
	const { popular, upcoming, newGames } = useSelector(state => state.games)

	return (
		<div className="App">
			<h1>Pit's GameLab</h1>
			<GameList games={popular} title={'Popular games'} />
			<GameList games={upcoming} title={'Upcoming games'} />
			<GameList games={newGames} title={'New games'} />
		</div>
	);
}

export default App;
