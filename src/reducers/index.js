import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import gameDetailsReducer from './gameDetailsReducer';

const reducers = combineReducers({
	games: gamesReducer,
	details: gameDetailsReducer
})

export default reducers;