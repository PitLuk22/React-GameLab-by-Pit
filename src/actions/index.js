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
	genreGamesUrl
} from '../services';

const fetchGames = (path, nextUrl) => async (dispatch) => {

	const res = getServiceUrl(path);
	const gamesData = nextUrl
		? await axios.get(nextUrl)
		: await axios.get(res.url);

	dispatch({
		type: res.type,
		payload: {
			games: gamesData.data.results,
			nextUrl: gamesData.data.next
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

const instantSearchGames = (gameName) => async (dispatch) => {
	const searchedGamesData = await axios.get(searchGamesUrl(gameName));

	dispatch({
		type: 'INSTANT_SEARCH_GAMES',
		payload: {
			searchedGames: searchedGamesData.data.results,
			count: searchedGamesData.data.count
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
const isLoadingInstantSearch = () => {
	return {
		type: 'INSTANT_SEARCH_LOADING'
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
		default:
			return;
	}
}

export {
	fetchGames,
	getGameDetails,
	isLoadingGameDetails,
	isLoadingGames,
	isLoadingInstantSearch,
	getSearchedGames,
	instantSearchGames,
	deleteSearched,
};