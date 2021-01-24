import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteDetails } from '../../actions';
// Style
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Services
import { setGameCartDate } from '../../services/gameCardDate';
import platformIcons from '../../services/gameCardIcons';
// Components
import Carousel from '../carousel';

const GameDetails = () => {

	// Redux
	const dispatch = useDispatch();
	const { game, screenshots } = useSelector(state => state.details);
	const closeCardDetails = (e) => e.target.dataset.close ? dispatch({ type: 'DELETE_DETAILS' }) : false;

	return (
		<S.Overlay onClick={(e) => closeCardDetails(e)} data-close>
			<S.Window
				background_image={game.background_image}
				style={{ filter: 'blur(0px)' }} >
				<S.Wrapper>
					<div className="title">
						<h3 className="name">{game.name}</h3>
						<div className="main-details">
							<div className="paltform-icons">
								{platformIcons(game.platforms).map((item, index) => <FontAwesomeIcon key={index} icon={item} />)}
							</div>
							<div className="date" dangerouslySetInnerHTML={{ __html: setGameCartDate(game.released) }}></div>
						</div>
					</div>

					<Carousel screenshots={screenshots} />
					<S.About >
						<h4>About</h4>
						<div dangerouslySetInnerHTML={{ __html: game.description }}></div>
					</S.About>
					<S.Info>
						<div className="details-block">
							<div className="platforms">
								<S.Subtitle>Platforms</S.Subtitle>
								<S.Data>{game.platforms.map(item => item.platform.name).join(', ')}</S.Data>
							</div>
							<div className="metascore">
								<S.Subtitle>Metascore</S.Subtitle>
								<S.Data>{game.rating}</S.Data>
							</div>
						</div>
						<div className="details-block">
							<div className="genre">
								<S.Subtitle>Genre</S.Subtitle>
								<S.Data>{game.genres.map(genre => genre.name).join(', ')}</S.Data>
							</div>
							<div className="release">
								<S.Subtitle>Released date</S.Subtitle>
								<S.Data dangerouslySetInnerHTML={{ __html: setGameCartDate(game.released) }}>{ }</S.Data>
							</div>
						</div>
						<div className="details-block">
							<div className="developer">
								<S.Subtitle>Developer</S.Subtitle>
								<S.Data>{game.developers.map(item => item.name).join(', ')}</S.Data>
							</div>
							<div className="publisher">
								<S.Subtitle>Publisher</S.Subtitle>
								<S.Data>{game.publishers.map(item => item.name).join(', ')}</S.Data>
							</div>
						</div>
						<div className="details-block website">
							<div>
								<S.Subtitle>Website</S.Subtitle>
								<a href={game.website} target='_blank' className="website">{game.website}</a>
							</div>
						</div>
					</S.Info>
				</S.Wrapper>
			</S.Window>
		</S.Overlay >
	)
}

export default GameDetails;

const S = {};
S.Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100vh;
	background-color: rgba(0,0,0, .5);
	padding: 2rem 10rem;
	overflow-y: scroll;
	z-index: 5;
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
	align-items: center;
	.details-block {
		font-size: 1rem;
		width: 33%;
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
	font-size: 1.2rem;
	margin-bottom: 1rem;
`;
S.Window = styled.div`
	position: relative;
	background: url(${props => props.background_image}) no-repeat;
	background-size: contain;
	width: 80%;
	min-height: 100%;
	padding: 2rem 0;
	position: absolute;
	border-radius: 1rem;
	margin-bottom: 2rem;
	overflow:hidden;
	&::after {
		content:'';
		position: absolute;
		display: block;
		top: 40rem;
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
		margin: 0 7rem 2rem 7rem;
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
			.date {
				display: flex;
				.month {
					background-color: #fff;
					display: block;
					color: black;
					border-radius: .6rem;
					padding: 0 1rem;
					margin: 0 .5rem;
				}
			}
			svg {
				margin: 0 .3rem;
			}
		}
	}
`;