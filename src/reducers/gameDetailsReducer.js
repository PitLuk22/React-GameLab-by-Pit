const initialState = {
	game: {},
	screenshots: {},
	loading: false
}

const gameDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_DETAILS':
			return {
				...state,
				game: action.payload.game,
				screenshots: action.payload.screenshots,
				loading: action.payload.loading
			};
		case 'DELETE_DETAILS':
			return {
				...initialState
			}
		case 'LOADING':
			return {
				...state,
				loading: action.payload.loading
			}
		default:
			return { ...state }
	}
}

export default gameDetailsReducer;