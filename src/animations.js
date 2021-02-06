export const gameCardAnimation = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { staggerChildren: 1 } },
}

export const fadeUp = {
	hidden: { opacity: .5, y: 1000 },
	show: { opacity: 1, y: 0, transition: { duration: 1 } },
}

export const fadeIn = {
	hidden: { opacity: .3 },
	show: {
		opacity: 1, transition: { duration: .1 }
	},
	exit: { opacity: 0 }
}
export const shiftIn = {
	hidden: { opacity: .3, x: 200, transition: { duration: .5 } },
	show: {
		opacity: 1, x: 0, transition: { duration: .5 }
	},
	exit: { opacity: 0, x: 200, transition: { duration: .5 } }
}
