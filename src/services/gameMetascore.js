const metacriticColor = (rating) => {
	if (rating >= 80) {
		return { color: '#6dc849', border: '1px solid rgba(109,200,73,.4)' }
	} else if (rating < 80 && rating > 45) {
		return { color: '#fdca52', border: '1px solid rgba(253,202,82,.4)' }
	} else if (!rating) {
		return;
	} else {
		return { color: '#E20338', border: '1px solid #930324' }
	}
}
export default metacriticColor;