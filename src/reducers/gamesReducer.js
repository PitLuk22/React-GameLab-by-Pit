const initState = {
	trending: [],
	allTime: [],
	popular: [],
	newGames: [],
	upcoming: [],
	nextWeek: [],
	thisWeek: [],
	searched: [],
	genre: [],
	nextUrl: '',
	loading: false,
}

const gamesReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_TRENDING_GAMES':
			return {
				...state,
				trending: [...state.trending, ...action.payload.games],
				nextUrl: action.payload.nextUrl,
				loading: false
			};
		case 'FETCH_ALLTIME_GAMES':
			return {
				...state,
				allTime: [...state.allTime, ...action.payload.games],
				nextUrl: action.payload.nextUrl,
				loading: false
			};
		case 'FETCH_POPULAR_GAMES':
			return {
				...state,
				popular: [...state.popular, ...action.payload.games],
				nextUrl: action.payload.nextUrl,
				loading: false
			};
		case 'FETCH_UPCOMING_GAMES':
			return {
				...state,
				upcoming: [...state.upcoming, ...action.payload.games],
				nextUrl: action.payload.nextUrl,
				loading: false
			};
		case 'FETCH_NEW_GAMES':
			return {
				...state,
				newGames: [...state.newGames, ...action.payload.games],
				nextUrl: action.payload.nextUrl,
				loading: false
			};
		case 'FETCH_NEXT_WEEK_GAMES':
			return {
				...state,
				nextWeek: [...state.nextWeek, ...action.payload.games],
				nextUrl: action.payload.nextUrl,
				loading: false
			};
		case 'FETCH_THIS_WEEK_GAMES':
			return {
				...state,
				thisWeek: [...state.thisWeek, ...action.payload.games],
				nextUrl: action.payload.nextUrl,
				loading: false
			};
		case 'FETCH_GENRE_GAMES':
			return {
				...state,
				genre: [...state.genre, ...action.payload.games],
				nextUrl: action.payload.nextUrl,
				loading: false
			};
		case 'FETCH_SEARCH_GAMES':
			return {
				...state,
				searched: [...state.searched, ...action.payload.searchedGames],
				nextUrl: action.payload.nextUrl,
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