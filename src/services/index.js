const base_url = 'https://api.rawg.io/api/';

// PATHES
export const popularGamesUrl = () => {
	return `${base_url}games?dates=${lastDate},${currentDate}&ordering=-metacritic&page_size=10`;
}
export const upcomingGamesUrl = () => {
	return `${base_url}games?dates=${currentDate},${nextDate}&ordering=-added&page_size=10`
}
export const newGamesUrl = () => {
	return `${base_url}games?dates=${lastDate},${currentDate}&ordering=-released&page_size=10`
}

export const gameDetailsUrl = (gameId) => {
	return `${base_url}games/${gameId}`;
}
export const gameScreenshotsUrl = (gameId) => {
	return `${base_url}games/${gameId}/screenshots`;
}


// Day
const getCurrentDay = () => {
	const day = new Date().getDate();
	return day < 10 ? `0${day}` : day;
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