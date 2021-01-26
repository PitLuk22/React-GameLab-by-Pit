const resizeImage = (image, size) => {
	return image.match(/media\/screenshots/)
		? image.replace(/media\/screenshots/, `media/resize/${size}/-/screenshots`)
		: image.replace(/media\/games/, `media/resize/${size}/-/games`)
}

export default resizeImage;