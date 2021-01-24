
export const setGameCartDate = (date) => {
	const arr = date.split('-');
	return `<span class='month'>${defineMonth(arr[1])}</span> ${arr[2]}, ${arr[0]}`;
}

const defineMonth = (month) => {
	switch (month) {
		case '01':
			return 'Jan';
		case '02':
			return 'Feb';
		case '03':
			return 'Mar';
		case '04':
			return 'Apr';
		case '05':
			return 'May';
		case '06':
			return 'June';
		case '07':
			return 'July';
		case '08':
			return 'Aug';
		case '09':
			return 'Sep';
		case '10':
			return 'Oct';
		case '11':
			return 'Nov';
		case '12':
			return 'Dec';
		default:
			break;
	}
}