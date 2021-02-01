import axios from 'axios';
import {
	trendingGamesUrl,
	popularGamesUrl,
	upcomingGamesUrl,
	newGamesUrl,
	allTimeUrl,
	thisWeekUrl,
	nextWeekUrl,
	previousMonthUrl,
	gameDetailsUrl,
	gameScreenshotsUrl,
	searchGamesUrl,
	genreGamesUrl
} from '../services';

const trendingGames = () => async (dispatch) => {

	const gamesData = await axios.get(trendingGamesUrl());

	dispatch({
		type: 'FETCH_TRENDING_GAMES',
		payload: {
			games: gamesData.data.results
		}
	})
}
const allTimeGames = () => async (dispatch) => {

	const gamesData = await axios.get(allTimeUrl());

	dispatch({
		type: 'FETCH_ALL_GAMES',
		payload: {
			games: gamesData.data.results
		}
	})
}
const popularGames = () => async (dispatch) => {

	const gamesData = await axios.get(popularGamesUrl());

	dispatch({
		type: 'FETCH_POPULAR_GAMES',
		payload: {
			games: gamesData.data.results
		}
	})
}
const upcomingGames = () => async (dispatch) => {

	const gamesData = await axios.get(upcomingGamesUrl());

	dispatch({
		type: 'FETCH_UPCOMING_GAMES',
		payload: {
			games: gamesData.data.results
		}
	})
}
const newGames = () => async (dispatch) => {

	const gamesData = await axios.get(newGamesUrl());

	dispatch({
		type: 'FETCH_NEW_GAMES',
		payload: {
			games: gamesData.data.results
		}
	})
}

const thisWeekGames = () => async (dispatch) => {

	const gamesData = await axios.get(thisWeekUrl());

	dispatch({
		type: 'FETCH_THIS_WEEK_GAMES',
		payload: {
			games: gamesData.data.results
		}
	})
}
const nextWeekGames = () => async (dispatch) => {

	const gamesData = await axios.get(nextWeekUrl());

	dispatch({
		type: 'FETCH_NEXT_WEEK_GAMES',
		payload: {
			games: gamesData.data.results
		}
	})
}
const last30daysGames = () => async (dispatch) => {

	const gamesData = await axios.get(previousMonthUrl());

	dispatch({
		type: 'FETCH_LAST_30_DAYS_GAMES',
		payload: {
			games: gamesData.data.results
		}
	})
}
const genreGames = (genre) => async (dispatch) => {

	const gamesData = await axios.get(genreGamesUrl(genre));

	dispatch({
		type: 'FETCH_GENRE_GAMES',
		payload: {
			games: gamesData.data.results
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

const getSearchedGames = (gameName) => async (dispatch) => {

	const serchedGamesData = await axios.get(searchGamesUrl(gameName));

	dispatch({
		type: 'FETCH_SEARCH_GAMES',
		payload: {
			searchedGames: serchedGamesData.data.results
		}
	})
}

const deleteSearched = () => {
	return {
		type: 'DELETE_SEARCH'
	}
}

const isLoadingGameDetails = () => {
	return {
		type: 'LOADING'
	}
}
const isLoadingGames = () => {
	return {
		type: 'FETCH_GAMES_LOADING'
	}
}

export {
	trendingGames,
	allTimeGames,
	getGameDetails,
	isLoadingGameDetails,
	isLoadingGames,
	getSearchedGames,
	deleteSearched,
	last30daysGames,
	nextWeekGames,
	thisWeekGames,
	newGames,
	upcomingGames,
	popularGames,
	genreGames
};