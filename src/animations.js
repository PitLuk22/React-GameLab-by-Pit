export const gameCardAnimation = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { staggerChildren: 1 } },
}

export const fadeUp = {
	hidden: { opacity: .5, y: 1000 },
	show: { opacity: 1, y: 0, transition: { duration: 1 } },
}

export const fadeIn = {
	hidden: { opacity: 0, y: 1000 },
	show: {
		opacity: 1, y: 0, transition: { duration: .5 }
	},
	exit: { opacity: 0, y: 1000 }
}
