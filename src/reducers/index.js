import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';

const reducers = combineReducers({
	games: gamesReducer
})

export default reducers;