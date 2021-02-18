import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
// Style
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar, faStarHalfAlt as halfStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import notFoundImg from '../../img/notFound.jpg';
import { shiftIn } from '../../animations';
// Services
import { setGameCartDate } from '../../services/gameCardDate';
import platformIcons from '../../services/gameCardIcons';
import metacriticColor from '../../services/gameMetascore';
import resizeImage from '../../services/resizeImage';
import gameStores from '../../services/gameStores';
// Components
import Carousel from '../carousel';


const GameDetails = ({ id }) => {
	const history = useHistory();
	const location = useLocation();
	const { game, screenshots, loading } = useSelector(state => state.details);

	// Set overflow for body
	useEffect(() => {
		if (location.pathname.includes('/game/')) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [location])

	// CLose gameDetails card
	const closeCardDetails = (e) => {
		if (e.target.dataset.close) {
			const arrFromLocation = history.location.pathname.split('/');
			let currentSection;
			if (arrFromLocation[1] === 'game') {
				currentSection = '/';
			} else if (arrFromLocation[1] === 'searched') {
				currentSection = `/${arrFromLocation[1]}/${arrFromLocation[2]}/`
			} else {
				currentSection = `/${arrFromLocation[1]}/`;
			}
			history.push(`${currentSection}`)
		}
	};

	// Rating stars
	const getStars = () => {
		const stars = [];
		const rating = game.rating;
		const integer = Math.floor(game.rating);
		const rest = rating % integer;

		for (let i = 1; i <= integer; i++) {
			stars.push(fullStar);
		}
		rest >= 0.5 ? stars.push(halfStar) : stars.push(emptyStar);
		while (stars.length < 5) stars.push(emptyStar);
		return stars;
	}

	return (
		<>
			{ !loading && <motion.div>
				<S.Overlay onClick={(e) => closeCardDetails(e)} data-close data-search>
					<S.CloseButton onClick={(e) => closeCardDetails(e)} data-close variants={shiftIn} initial='hidden' animate='show' exit='exit' >
						<FontAwesomeIcon icon={faTimes} size='2x' />
					</S.CloseButton>
					<S.Window
						layoutId={id}
						background_image={game.background_image ? resizeImage(game.background_image, 640) : resizeImage(notFoundImg, 640)}>
						<S.FieldForImage layoutId={`image ${id}`} />
						<S.Wrapper>
							<div className="title">
								<motion.h3 layoutId={`title ${id}`} className="name" >{game.name}</motion.h3>

								<div className="main-details">
									<motion.div layoutId={`platforms ${id}`} className="paltform-icons">Available on:
										{platformIcons(game.platforms).map((item, index) => <FontAwesomeIcon key={index} icon={item} />)}
									</motion.div>
									<S.Flex layoutId={`stars ${id}`}>
										<div className="stars">
											{getStars().map((star, i) => <FontAwesomeIcon icon={star} key={i} />)}
										</div>
										{game.released && <div className="date" dangerouslySetInnerHTML={{ __html: setGameCartDate(game.released) }}></div>}
									</S.Flex>
								</div>
							</div>

							{screenshots.length && <Carousel game={game} screenshots={screenshots} />}

							<S.WrapperInfoGame>
								{game.description_raw || game.description ?
									<S.About >
										<h4>About</h4>
										{game.description_raw ? <p>{game.description_raw}</p> : <p dangerouslySetInnerHTML={{ __html: game.description }} />}
									</S.About> : null}
								<S.Info>
									{game.platforms.length ? <div className="details-block">
										<S.Subtitle>Platforms</S.Subtitle>
										<S.Data>{game.platforms.map(item => item.platform.name).join(', ')}</S.Data>
									</div> : null}
									{game.rating !== 0 ? <div className="details-block">
										<S.Subtitle>Rating</S.Subtitle>
										<S.Data>{game.rating}</S.Data>
									</div> : null}
									{game.metacritic ? <div className="details-block">
										<S.Subtitle>Metascore</S.Subtitle>
										<S.Data >
											<div className='metacritic' style={metacriticColor(game.metacritic)}>
												{game.metacritic}
											</div>
										</S.Data>
									</div> : null}
									{game.genres.length ? <div className="details-block">
										<S.Subtitle>Genre</S.Subtitle>
										<S.Data>{game.genres.map(genre => genre.name).join(', ')}</S.Data>
									</div> : null}
									{game.released ? <div className="details-block">
										<S.Subtitle>Released date</S.Subtitle>
										<S.Data dangerouslySetInnerHTML={{ __html: setGameCartDate(game.released) }}></S.Data>
									</div> : null}
									{game.developers.length ? <div className="details-block">
										<S.Subtitle>Developer</S.Subtitle>
										<S.Data>{game.developers.map(item => item.name).join(', ')}</S.Data>
									</div> : null}
									{game.publishers.length ? <div className="details-block">
										<S.Subtitle>Publisher</S.Subtitle>
										<S.Data>{game.publishers.map(item => item.name).join(', ')}</S.Data>
									</div> : null}
									{game.website ? <div className="details-block website">
										<S.Subtitle>Website</S.Subtitle>
										<a
											href={game.website}
											target='_blank'
											rel="noopener noreferrer"
											className="website">
											{game.website}
										</a>
									</div> : null}
									{game.tags.length ? <div className="details-block details-block__tags">
										<S.Subtitle>Tags</S.Subtitle>
										<S.Data>{game.tags.map(item => item.name.slice(0, 1).toUpperCase() + item.name.slice(1)).join(', ')}</S.Data>
									</div> : null}
									{game.stores.length ? <div className="details-block details-block__tags">
										<S.Subtitle>Where to buy</S.Subtitle>
										<S.Data>
											{game.stores.map(({ url, store: { name } }, index) => {
												return (
													<S.Stores key={index} href={url} target='_blank'>
														{name}
														<span>{gameStores(name)}</span>
													</S.Stores>
												)
											})}
										</S.Data>
									</div> : null}
								</S.Info>
							</S.WrapperInfoGame>
						</S.Wrapper>
					</S.Window>
				</S.Overlay >
			</motion.div>}
		</>
	)
}

export default GameDetails;

const S = {};
S.Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	background-color: rgba(0,0,0, .5);
	padding: 2rem 0;
	overflow-y: scroll;
	z-index: 10;
	cursor: pointer;
	box-shadow: 0px -100px 50px 50px rgba(0,0,0, .5) ;
	backdrop-filter: blur(10px);
`;
S.CloseButton = styled(motion.div)`
	display: none;
	@media(max-width: 576px) {
		position: fixed;
		display: block;
		top: 20%;
		right: -14px;
		width: 4rem;
		background-color: #4d4d4d;
		z-index: 11;
		padding: .6rem 0 .6rem .5rem;
		border-radius: .8rem;
		color: black;
		font-size: 1.2rem;
		svg {
			pointer-events: none;
		}
	}
`;
S.FieldForImage = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 40rem;
`;
S.Flex = styled(motion.div)`
	display: flex;
	flex-direction: column;
	.stars {
		color: gold;
	}
	.date {
		display: flex;
		margin-top: 1rem;
		.month {
			background-color: #fff;
			display: block;
			color: black;
			border-radius: .6rem;
			padding: 0 1rem;
			margin: 0 .5rem;
		}
	}
`;
S.Wrapper = styled(motion.div)`
	position: relative;
	z-index: 10;
`;
S.About = styled.div`
	padding: 1rem 0;
	text-align: left;
	p {
		margin-bottom: 1rem;
		line-height: 2rem;
	}
`;
S.WrapperInfoGame = styled.div`
	padding: 1rem 7rem;
	@media(max-width: 1100px) {
		padding: 1rem 6rem;
		p {
			font-size: 1rem;
		}
	}
	@media(max-width: 992px) {
		padding: 1rem 4rem;		
		p {
			font-size: .8rem;	
		}
	}
	@media(max-width: 768px) {
		padding: 1rem 3rem;
	}
	@media(max-width: 576px) {
		padding: 1rem;
	}
`;
S.Info = styled.div`
	background-color:#151515;
	padding: 0 0rem 2rem 0rem;
	border-radius: 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	.details-block {
		font-size: 1rem;
		width: 200px;
		padding: 0 2rem 0 0;
		margin-bottom: 1rem;
		&__tags {
			width: 100%;
		}
		.month {
			padding: 0 .5rem 0 0;
		}
	}
	.website {
			width: 100%;
			color: #fff;
		}
	@media(max-width: 768px) {
		padding: 0;
	}
	@media(max-width: 576px) {
		.details-block {
			width: 100%;
			padding: 0 .8rem 0 0;
		}
	}
`;
S.Subtitle = styled.div`
	color: #434343;
	padding: 1rem 0;
	@media(max-width: 992px) {
		font-size: .7rem;
	}
	@media(max-width: 576px) {
		padding: .5rem 0;
	}
`;
S.Data = styled.div`
	font-size: 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	line-height: 1.7rem;
	.metacritic {
		padding: .2rem .5rem;
		font-size: 1rem;
		border-radius: .4rem;
		font-weight: bold;
	}
	@media(max-width: 992px) {
		font-size: .8rem;
		.metacritic {
			font-size: .8rem;
			padding: .1rem .2rem;
		}
	}
	@media(max-width: 576px) {
		margin-bottom: .8rem;
	}
`;
S.Window = styled(motion.div)`
	position: relative;
	background: url(${props => props.background_image}) no-repeat;
	background-size: 100% 40rem;
	width: 80%;
	min-height: 100%;
	padding: 2rem 0;
	position: absolute;
	border-radius: 1rem;
	margin-bottom: 2rem;
	overflow:hidden;
	cursor: auto;
	&::after {
		content:'';
		position: absolute;
		display: block;
		top: 25rem;
		left: 0;
		bottom:0;
		width:100%;
		background-color: #151515;
		box-shadow: 0px -50px 80px 80px #151515;
		z-index:1;
	}
	&::before {
		content:'';
		position: absolute;
		top: 0;
		left: 0;
		min-height: 90%;
		width:100%;
		background-color: rgba(0,0,0, .7);
		z-index:1;
	}
	.title {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		text-align: center;
		padding: 2rem 7rem;
		font-size: 2rem;
		.name {
			margin-bottom: 2rem;
		}
		.main-details{ 
			font-size: 1.5rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			svg {
				margin: 0 .5rem;
			}
		}
	}
	@media(max-width: 1100px) {
		.title {
			padding: 2rem 6rem;
			font-size: 1.5rem;
			.main-details {
				font-size:1rem;
			}
		}
	}
	@media(max-width: 992px) {
		padding-bottom: 0;
		.title {
			padding: 2rem 4rem;
		}
	}
	@media(max-width: 768px) {
		background-size: 100% 30rem;
		padding-bottom: 0;
		.title {
			padding: 0 3rem 2rem 3rem;
			.main-details {
				flex-direction: column;
				.paltform-icons {
					margin-bottom: 1rem;
				}
			}
		}
	}
	@media(max-width: 576px) {
		width: 90%;
		background-size: 100% 15rem;
		padding-bottom: 1rem;
		&::after {
			top: 20rem;
		}
		.title {
			padding: 1rem;
			.main-details {
				flex-direction: column;
				.paltform-icons {
					margin-bottom: 1rem;
				}
			}
		}
	}
`;
S.Stores = styled.a`
	text-decoration: none;
	width: 12rem;
	height: 2.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #262626;
	border-radius: 6px;
	transition: all .3s ease;
	color: #787878; 
	margin: 0 1rem 1rem 0;
	outline: none;
	&:hover {
		color: #000;
		background-color: #fff;
		svg {
			rect {
				stroke: #000;
			}
			g {
				opacity: 1;
			}
			path {
				fill: #000;
				opacity: 1;
			}
		}
	}
	svg {
		display: block;
		margin-left: 1rem;
		width: 1rem;
	}
`;

// PropTypes

GameDetails.propTypes = {
	id: PropTypes.number,
}