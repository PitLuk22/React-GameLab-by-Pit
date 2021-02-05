import { faMobileAlt, faGlobe, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faXbox, faPlaystation, faLinux, faApple, faAndroid, faSteam } from '@fortawesome/free-brands-svg-icons';

const platformIcons = (platforms) => {
	return [...new Set(platforms.map(item => setPlatformIcon(item.platform.slug)))];
}
const setPlatformIcon = (name) => {
	if (name.includes('xbox')) {
		return faXbox;
	} else if (name.includes('playstation') || name.includes('ps-vita')) {
		return faPlaystation;
	} else if (name.includes('pc')) {
		return faSteam;
	} else if (name.includes('nintendo') || name.includes('dreamcast') || name.includes('wii') || name.includes('gamecube')) {
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
	} else {
		return;
	}
}

export default platformIcons;