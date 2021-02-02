const initialState = {
	searchedGames: [],
	loading: false
}

const instantSearchReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INSTANT_SEARCH_GAMES':
			return {
				...state,
				searchedGames: action.payload.searchedGames,
				loading: false
			}
		case 'INSTANT_SEARCH_LOADING':
			return {
				...state,
				loading: true
			}
		default:
			return state;
	}
}

export default instantSearchReducer;