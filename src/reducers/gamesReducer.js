const initState = {
	popular: [],
	newGames: [],
	upcoming: [],
	searched: [],
	loading: false
}

const gamesReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_GAMES':
			return {
				...state,
				popular: action.payload.popular,
				upcoming: action.payload.upcoming,
				newGames: action.payload.newGames,
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