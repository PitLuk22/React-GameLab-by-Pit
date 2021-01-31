import {
	popularGames,
	upcomingGames,
	newGames,
	allTimeGames,
	last30daysGames,
	thisWeekGames,
	nextWeekGames,
} from '../actions';

const getCertainAction = (path) => {
	switch (path) {
		case 'popular':
			return popularGames();
		case 'upcoming':
			return upcomingGames();
		case 'newGames':
			return newGames();
		case 'allTimeGames':
			return allTimeGames();
		case 'last30daysGames':
			return last30daysGames();
		case 'thisWeekGames':
			return thisWeekGames();
		case 'nextWeekGames':
			return nextWeekGames();
		case 'thisWeekGames':
			return thisWeekGames();
	}
}

export default getCertainAction;