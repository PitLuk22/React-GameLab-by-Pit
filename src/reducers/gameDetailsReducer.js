const initialState = {
	game: { platforms: [] },
	screenshots: { results: [] },
	loading: true
}

const gameDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_DETAILS':
			return {
				...state,
				game: action.payload.game,
				screenshots: action.payload.screenshots,
				loading: false
			};
		case 'DELETE_DETAILS':
			return {
				...initialState
			}
		case 'LOADING':
			return {
				...state,
				loading: true
			}
		default:
			return { ...state }
	}
}

export default gameDetailsReducer;