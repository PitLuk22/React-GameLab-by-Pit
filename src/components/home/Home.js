import React, { useEffect } from 'react';
import { loadAllGames } from '../../actions';
import { useDispatch } from 'react-redux';


const Home = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadAllGames())
	})

	return (
		<div>
			<h2>Home</h2>
		</div>
	)
}

export default Home;
