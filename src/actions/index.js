import axios from 'axios';
import {
	popularGamesUrl,
	upcomingGamesUrl,
	newGamesUrl,
	gameDetailsUrl,
	gameScreenshotsUrl
} from '../services';

const loadAllGames = () => async (dispatch) => {

	const popularGamesData = await axios.get(popularGamesUrl());
	const upcomingGamesData = await axios.get(upcomingGamesUrl());
	const newGamesData = await axios.get(newGamesUrl());

	dispatch({
		type: 'FETCH_GAMES',
		payload: {
			popular: popularGamesData.data.results,
			upcoming: upcomingGamesData.data.results,
			newGames: newGamesData.data.results
		}
	})
}

const getGameDetails = (id) => async (dispatch) => {

	const gameData = await axios.get(gameDetailsUrl(id));
	const screenshotsData = await axios.get(gameScreenshotsUrl(id));


	dispatch({
		type: 'GET_DETAILS',
		payload: {
			game: gameData.data,
			screenshots: screenshotsData.data.results,
		}
	})
}

const isLoadingGameDetails = () => {
	return {
		type: 'LOADING'
	}
}
const isLoadingAllGames = () => {
	return {
		type: 'FETCH_GAMES_LOADING'
	}
}

export {
	loadAllGames,
	getGameDetails,
	isLoadingGameDetails,
	isLoadingAllGames
};