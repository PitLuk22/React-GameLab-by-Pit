import {
	popularGames,
	upcomingGames,
	newGames,
	allTimeGames,
	last30daysGames,
	thisWeekGames,
	nextWeekGames,
	genreGames
} from '../actions';

const getCertainAction = (path) => {
	switch (path) {
		case 'popular':
			return popularGames();
		case 'upcoming':
			return upcomingGames();
		case 'newGames':
			return newGames();
		case 'allTime':
			return allTimeGames();
		case 'last30days':
			return last30daysGames();
		case 'thisWeek':
			return thisWeekGames();
		case 'nextWeek':
			return nextWeekGames();
		case 'thisWeek':
			return thisWeekGames();
		case 'action':
			return genreGames(path);
		case 'adventure':
			return genreGames(path);
		case 'strategy':
			return genreGames(path);
		case 'sports':
			return genreGames(path);
		case 'racing':
			return genreGames(path);
		case 'indie':
			return genreGames(path);
		case 'shooter':
			return genreGames(path);
		case 'role-playing-games-rpg':
			return genreGames(path);
	}
}

export default getCertainAction;