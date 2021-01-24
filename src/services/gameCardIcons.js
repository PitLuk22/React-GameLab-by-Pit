import { faMobileAlt, faGlobe, faDesktop, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faXbox, faPlaystation, faLinux, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';

const platformIcons = (platforms) => {
	return [...new Set(platforms.map(item => setPlatformIcon(item.platform.slug)))];
}
const setPlatformIcon = (name) => {
	if (name.includes('xbox')) {
		return faXbox;
	} else if (name.includes('playstation')) {
		return faPlaystation;
	} else if (name.includes('pc')) {
		return faDesktop;
	} else if (name.includes('nintendo')) {
		return faGamepad;
	} else if (name.includes('linux')) {
		return faLinux;
	} else if (name.includes('macos')) {
		return faApple;
	} else if (name.includes('web')) {
		return faGlobe;
	} else if (name.includes('ios')) {
		return faMobileAlt;
	} else if (name.includes('android')) {
		return faAndroid;
	}
}

export default platformIcons;