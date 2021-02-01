const initState = {
	trending: [],
	allTime: [],
	popular: [],
	newGames: [],
	upcoming: [],
	nextWeek: [],
	thisWeek: [],
	last30days: [],
	searched: [],
	genre: [],
	loading: false
}

const gamesReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_TRENDING_GAMES':
			return {
				...state,
				trending: action.payload.games,
				loading: false
			};
		case 'FETCH_ALL_GAMES':
			return {
				...state,
				allTime: action.payload.games,
				loading: false
			};
		case 'FETCH_POPULAR_GAMES':
			return {
				...state,
				popular: action.payload.games,
				loading: false
			};
		case 'FETCH_UPCOMING_GAMES':
			return {
				...state,
				upcoming: action.payload.games,
				loading: false
			};
		case 'FETCH_NEW_GAMES':
			return {
				...state,
				newGames: action.payload.games,
				loading: false
			};
		case 'FETCH_NEXT_WEEK_GAMES':
			return {
				...state,
				nextWeek: action.payload.games,
				loading: false
			};
		case 'FETCH_THIS_WEEK_GAMES':
			return {
				...state,
				thisWeek: action.payload.games,
				loading: false
			};
		case 'FETCH_LAST_30_DAYS_GAMES':
			return {
				...state,
				last30days: action.payload.games,
				loading: false
			};
		case 'FETCH_GENRE_GAMES':
			return {
				...state,
				genre: action.payload.games,
				loading: false
			};
		case 'FETCH_SEARCH_GAMES':
			return {
				...state,
				searched: action.payload.searchedGames,
				loading: false
			}
		case 'FETCH_GAMES_LOADING':
			return {
				...state,
				loading: true
			}
		case 'DELETE_SEARCH':
			return {
				...state,
				searched: []
			}
		default:
			return { ...state }
	}
}

export default gamesReducer;