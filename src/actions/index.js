import axios from 'axios';
import {
	trendingGamesUrl,
	popularGamesUrl,
	upcomingGamesUrl,
	newGamesUrl,
	allTimeUrl,
	thisWeekUrl,
	nextWeekUrl,
	gameDetailsUrl,
	gameScreenshotsUrl,
	searchGamesUrl,
	previousMonthUrl,
	genreGamesUrl
} from '../services';

const fetchGames = (path) => async (dispatch) => {

	const res = getServiceUrl(path);
	console.log(res);
	const gamesData = await axios.get(res.url);

	dispatch({
		type: res.type,
		payload: {
			games: gamesData.data.results
		}
	})
}
// const allTimeGames = () => async (dispatch) => {

// 	const gamesData = await axios.get(allTimeUrl());

// 	dispatch({
// 		type: 'FETCH_ALL_GAMES',
// 		payload: {
// 			games: gamesData.data.results
// 		}
// 	})
// }
// const popularGames = () => async (dispatch) => {

// 	const gamesData = await axios.get(popularGamesUrl());

// 	dispatch({
// 		type: 'FETCH_POPULAR_GAMES',
// 		payload: {
// 			games: gamesData.data.results
// 		}
// 	})
// }
// const upcomingGames = () => async (dispatch) => {

// 	const gamesData = await axios.get(upcomingGamesUrl());

// 	dispatch({
// 		type: 'FETCH_UPCOMING_GAMES',
// 		payload: {
// 			games: gamesData.data.results
// 		}
// 	})
// }
// const newGames = () => async (dispatch) => {

// 	const gamesData = await axios.get(newGamesUrl());

// 	dispatch({
// 		type: 'FETCH_NEW_GAMES',
// 		payload: {
// 			games: gamesData.data.results
// 		}
// 	})
// }

// const thisWeekGames = () => async (dispatch) => {

// 	const gamesData = await axios.get(thisWeekUrl());

// 	dispatch({
// 		type: 'FETCH_THIS_WEEK_GAMES',
// 		payload: {
// 			games: gamesData.data.results
// 		}
// 	})
// }
// const nextWeekGames = () => async (dispatch) => {

// 	const gamesData = await axios.get(nextWeekUrl());

// 	dispatch({
// 		type: 'FETCH_NEXT_WEEK_GAMES',
// 		payload: {
// 			games: gamesData.data.results
// 		}
// 	})
// }
// const last30daysGames = () => async (dispatch) => {

// 	const gamesData = await axios.get(previousMonthUrl());

// 	dispatch({
// 		type: 'FETCH_LAST_30_DAYS_GAMES',
// 		payload: {
// 			games: gamesData.data.results
// 		}
// 	})
// }
// const genreGames = (genre) => async (dispatch) => {

// 	const gamesData = await axios.get(genreGamesUrl(genre));

// 	dispatch({
// 		type: 'FETCH_GENRE_GAMES',
// 		payload: {
// 			games: gamesData.data.results
// 		}
// 	})
// }

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

const getServiceUrl = (path) => {

	switch (path) {
		case '':
			return {
				type: 'FETCH_TRENDING_GAMES',
				url: trendingGamesUrl()
			}
		case 'popular':
			return {
				type: 'FETCH_POPULAR_GAMES',
				url: popularGamesUrl()
			}
		case 'upcoming':
			return {
				type: 'FETCH_UPCOMING_GAMES',
				url: upcomingGamesUrl()
			}
		case 'newGames':
			return {
				type: 'FETCH_NEW_GAMES',
				url: newGamesUrl()
			};
		case 'allTime':
			return {
				type: 'FETCH_ALLTIME_GAMES',
				url: allTimeUrl()
			};
		case 'last30days':
			return {
				type: 'FETCH_LAST_30_DAYS_GAMES',
				url: previousMonthUrl()
			}
		case 'nextWeek':
			return {
				type: 'FETCH_NEXT_WEEK_GAMES',
				url: nextWeekUrl()
			}
		case 'thisWeek':
			return {
				type: 'FETCH_THIS_WEEK_GAMES',
				url: thisWeekUrl()
			}
		case 'action':
			return {
				type: 'FETCH_GENRE_GAMES',
				url: genreGamesUrl(path)
			}
		case 'adventure':
			return {
				type: 'FETCH_GENRE_GAMES',
				url: genreGamesUrl(path)
			}
		case 'strategy':
			return {
				type: 'FETCH_GENRE_GAMES',
				url: genreGamesUrl(path)
			}
		case 'sports':
			return {
				type: 'FETCH_GENRE_GAMES',
				url: genreGamesUrl(path)
			}
		case 'racing':
			return {
				type: 'FETCH_GENRE_GAMES',
				url: genreGamesUrl(path)
			}
		case 'indie':
			return {
				type: 'FETCH_GENRE_GAMES',
				url: genreGamesUrl(path)
			}
		case 'shooter':
			return {
				type: 'FETCH_GENRE_GAMES',
				url: genreGamesUrl(path)
			}
		case 'role-playing-games-rpg':
			return {
				type: 'FETCH_GENRE_GAMES',
				url: genreGamesUrl(path)
			}
	}
}

export {
	fetchGames,
	// trendingGames,
	// allTimeGames,
	getGameDetails,
	isLoadingGameDetails,
	isLoadingGames,
	getSearchedGames,
	deleteSearched,
	// last30daysGames,
	// nextWeekGames,
	// thisWeekGames,
	// newGames,
	// upcomingGames,
	// popularGames,
	// genreGames
};