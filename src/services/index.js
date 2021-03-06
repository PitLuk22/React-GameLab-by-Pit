import moment from 'moment';

const base_url = 'https://api.rawg.io/api/';
const size = 10;
// PATHES
export const trendingGamesUrl = () => {
	return `${base_url}games/lists/main?discover=true&ordering=-relevance&page_size=${size}`
}
export const popularGamesUrl = () => {
	return `${base_url}games?dates=${lastDate},${currentDate}&ordering=-metacritic&page_size=${size}`;
}
export const upcomingGamesUrl = () => {
	return `${base_url}games?dates=${currentDate},${nextDate}&ordering=-added&page_size=${size}`;
}
export const newGamesUrl = () => {
	return `${base_url}games?dates=${lastDate},${currentDate}&ordering=-released,-metacritic&page_size=${size}`;
}
export const allTimeUrl = () => {
	return `${base_url}games?dates=1969-12-31,${currentDate}&ordering=-metacritic&page_size=${size}`;
}
export const thisWeekUrl = () => {
	return `${base_url}games?dates=${previousWeekDate},${currentDate}&ordering=-released&page_size=${size}`;
}
export const nextWeekUrl = () => {
	return `${base_url}games?dates=${currentDate},${nextWeekDate}&ordering=-released&page_size=${size}`;
}

export const genreGamesUrl = (genre) => {
	return `${base_url}games?dates=${lastDate},${currentDate}&genres=${genre}&ordering=-metacritic&page_size=${size}`;
}

export const gameDetailsUrl = (gameId) => {
	return `${base_url}games/${gameId}`;
}
export const gameScreenshotsUrl = (gameId) => {
	return `${base_url}games/${gameId}/screenshots`;
}

export const searchGamesUrl = (gameName) => {
	return `${base_url}games?search=${gameName}&page_size=${size}`;
}


// Day
const getCurrentDay = () => {
	const day = new Date().getDate();
	return day < 10 ? `0${day}` : day;
}
const getNextWeek = () => {
	const date = new Date().getTime() + 604800000;
	return moment(date).format('YYYY-MM-DD')
}
const getPreviousWeek = () => {
	const date = new Date().getTime() - 604800000;
	return moment(date).format('YYYY-MM-DD')
}
// Month
const getCurrentMonth = () => {
	const month = new Date().getMonth() + 1;
	return month < 10 ? `0${month}` : month;
}
// Year
const getCurrentYear = () => {
	const year = new Date().getFullYear();
	return year;
}
// Correct date format
const currentDate = `${getCurrentYear()}-${getCurrentMonth()}-${getCurrentDay()}`;
const lastDate = `${getCurrentYear() - 1}-${getCurrentMonth()}-${getCurrentDay()}`;
const nextDate = `${getCurrentYear() + 1}-${getCurrentMonth()}-${getCurrentDay()}`;
const previousWeekDate = getPreviousWeek();
const nextWeekDate = getNextWeek();

