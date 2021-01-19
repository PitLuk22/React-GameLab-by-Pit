const initState = {
	popular: [],
	new: [],
	uncoming: [],
	searched: [],
}

const gamesReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_GAMES':
			return {
				...state,
				popular: action.payload.popular,
				uncoming: action.payload.uncoming,
				new: action.payload.new
			};
		default:
			return { ...state }
	}
}

export default gamesReducer;