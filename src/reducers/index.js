import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import gameDetailsReducer from './gameDetailsReducer';
import instantSearchReducer from './instantSearchReducer';
const reducers = combineReducers({
	games: gamesReducer,
	details: gameDetailsReducer,
	instantSearch: instantSearchReducer
})

export default reducers;