const initialState = {
	gameId: '',
	shortClip: '',
	shortClipLoading: false
}

const getGameShortClip = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_SHORT_GAME_CLIP':
			return {
				...state,
				gameId: action.payload.id,
				shortClip: action.payload.clip,
				shortClipLoading: false
			}
		case 'SHORT_GAME_CLIP_LOADING':
			return {
				...state,
				shortClipLoading: true
			}
		default:
			return { ...state };
	}
}

export default getGameShortClip;