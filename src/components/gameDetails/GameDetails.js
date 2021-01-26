import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteDetails } from '../../actions';
import { useHistory } from 'react-router-dom';
// Style
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeUp } from '../../animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
// Services
import { setGameCartDate } from '../../services/gameCardDate';
import platformIcons from '../../services/gameCardIcons';
import metacriticColor from '../../services/gameMetascore';
import resizeImage from '../../services/resizeImage';
// Components
import Carousel from '../carousel';


const GameDetails = ({ pathId }) => {
	const history = useHistory();

	const dispatch = useDispatch();
	const { game, screenshots } = useSelector(state => state.details);
	const closeCardDetails = (e) => {
		if (e.target.dataset.close) {
			dispatch(deleteDetails())
			history.push('/')
			document.body.style.overflow = 'auto';
		}
	};

	// Stars
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
			<S.Overlay variants={fadeUp} initial="hidden" animate='show' exit='exit' onClick={(e) => closeCardDetails(e)} data-close>
				<S.Window background_image={resizeImage(game.background_image, 1280)} >
					<S.Wrapper>
						<div className="title">
							<h3 className="name">{game.name}</h3>
							<div className="main-details">

								<div className="paltform-icons">Available on:
										{platformIcons(game.platforms).map((item, index) => <FontAwesomeIcon key={index} icon={item} />)}
								</div>
								<S.Flex>
									<div className="stars">{getStars().map((star, i) => <FontAwesomeIcon icon={star} key={i} />)}</div>
									<div className="date" dangerouslySetInnerHTML={{ __html: setGameCartDate(game.released) }}></div>
								</S.Flex>
							</div>
						</div>

						<Carousel game={game} screenshots={screenshots} />

						<S.About >
							<h4>About</h4>
							<div dangerouslySetInnerHTML={{ __html: game.description }}></div>
						</S.About>
						<S.Info>
							{game.platforms && <div className="details-block">
								<S.Subtitle>Platforms</S.Subtitle>
								<S.Data>{game.platforms.map(item => item.platform.name).join(', ')}</S.Data>
							</div>}
							{game.rating && <div className="details-block">
								<S.Subtitle>Rating</S.Subtitle>
								<S.Data>{game.rating}</S.Data>
							</div>}
							{game.metacritic && <div className="details-block">
								<S.Subtitle>Metascore</S.Subtitle>
								<S.Data >
									<div className='metacritic' style={metacriticColor(game.metacritic)}>{game.metacritic}</div>
								</S.Data>
							</div>}
							{game.genres && <div className="details-block">
								<S.Subtitle>Genre</S.Subtitle>
								<S.Data>{game.genres.map(genre => genre.name).join(', ')}</S.Data>
							</div>}
							{game.released && <div className="details-block">
								<S.Subtitle>Released date</S.Subtitle>
								<S.Data dangerouslySetInnerHTML={{ __html: setGameCartDate(game.released) }}></S.Data>
							</div>}
							{game.developers && <div className="details-block">
								<S.Subtitle>Developer</S.Subtitle>
								<S.Data>{game.developers.map(item => item.name).join(', ')}</S.Data>
							</div>}
							{game.publishers && <div className="details-block">
								<S.Subtitle>Publisher</S.Subtitle>
								<S.Data>{game.publishers.map(item => item.name).join(', ')}</S.Data>
							</div>}
							{game.website && <div className="details-block website">
								<S.Subtitle>Website</S.Subtitle>
								<a href={game.website} target='_blank' rel="noopener noreferrer" className="website">{game.website}</a>
							</div>}
						</S.Info>
					</S.Wrapper>
				</S.Window>
			</S.Overlay >
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
	z-index: 5;
	cursor: pointer;
	box-shadow: 0px -100px 50px 50px rgba(0,0,0, .5) ;
	backdrop-filter: blur(10px);
`;
S.Flex = styled.div`
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
S.Wrapper = styled.div`
	position: relative;
	z-index: 10;
`;
S.About = styled.div`
	padding: 1rem 7rem;
	text-align: left;
`;
S.Info = styled.div`
	background-color:#151515;
	padding: 0 7rem 2rem 7rem;
	border-radius: 1rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	.details-block {
		font-size: 1rem;
		width: 33%;
		padding: 0 1rem 0 0;
		.month {
			padding: 0 .5rem 0 0;
		}
		.website {
			width: 100%;
			color: #fff;
		}
	}
`;
S.Subtitle = styled.div`
	color: #434343;
	padding: 1rem 0;
`;
S.Data = styled.div`
	font-size: 1rem;
	margin-bottom: 1rem;
	display: flex;
	justify-content: flex-start;
	.metacritic {
		padding: .2rem .5rem;
		font-size: 1rem;
		border-radius: .4rem;
		font-weight: bold;
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
		padding: 2rem 0;
		margin: 0 7rem;
		font-size: 2rem;
		.name {
			margin-bottom: 2rem;
			font-size: 2rem;
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
`;