const initialState = {
	game: {}
}

const gameDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_DETAILS':
			return {
				...state,
				game: action.payload.game,
				screenshots: action.payload.screenshots
			};
		default:
			return { ...state }
	}
}

export default gameDetailsReducer;