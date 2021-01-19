import axios from 'axios';
import { popularGamesUrl, uncomingGamesUrl, newGamesUrl } from '../services';

const loadAllGames = () => async (dispatch) => {

	const popularGames = await axios.get(popularGamesUrl());
	const uncomingGames = await axios.get(uncomingGamesUrl());
	const newGames = await axios.get(newGamesUrl());

	dispatch({
		type: 'FETCH_GAMES',
		payload: {
			popular: popularGames.data.results,
			uncoming: uncomingGames.data.results,
			new: newGames.data.results
		}
	})
}


export { loadAllGames };