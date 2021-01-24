const initialState = {
	game: {},
	screenshots: {}
}

const gameDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_DETAILS':
			return {
				...state,
				game: action.payload.game,
				screenshots: action.payload.screenshots
			};
		case 'DELETE_DETAILS':
			return {
				...initialState
			}
		default:
			return { ...state }
	}
}

export default gameDetailsReducer;