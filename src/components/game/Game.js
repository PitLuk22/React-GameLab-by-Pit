import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getGameDetails, isLoadingGameDetails } from '../../actions';
import { setGameCartDate } from '../../services/gameCardDate';
import platformIcons from '../../services/gameCardIcons';
import metacriticColor from '../../services/gameMetascore';
import { useLocation, useHistory } from 'react-router-dom';
import Spinner from '../spinner';
import resizeImage from '../../services/resizeImage';
// Images
import notFoundImg from '../../img/notFound.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
// Animation 
import { motion, useAnimation } from 'framer-motion';
import { fadeIn, gameCardAnimation } from '../../animations';
// Modal Youtube
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video';

const Game = ({ id, name, background_image, platforms, metacritic, released, genres, ratings_count, clip }) => {

	const controls = useAnimation()

	const [isOpen, setOpen] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef(null);

	const location = useLocation();
	const history = useHistory();

	const { loading } = useSelector(state => state.details);
	const dispatch = useDispatch();

	// Play or pasuse video when hover
	useEffect(() => {
		if (videoRef.current) {
			isPlaying ? videoRef.current.play() : videoRef.current.pause();
		}
	}, [isPlaying])

	// Set overflow for body
	useEffect(() => {
		if (location.pathname === '/') {
			document.body.style.overflow = 'auto'
		} else {
			document.body.style.overflow = 'hidden'
		}
	}, [location])

	// Get selected game 
	const gameDetailsHandler = (id) => {
		history.push(`/game/${id}`);
		dispatch(isLoadingGameDetails());
		dispatch(getGameDetails(id))
	}

	// Set loader if it necessary 
	const checkLoadingItem = (location, loading) => {
		return +location.pathname.split('/')[2] === id && loading;
	}

	// Create and show video component
	const showVideo = () => {
		controls.start('show')
		setIsPlaying(true)
	}

	// Hide video component
	const hideVideo = () => {
		controls.start('hidden')
		setIsPlaying(false)
	}

	return (
		<>
			<S.Game layoutId={id}>
				{clip && clip.video && <ModalVideo
					channel='youtube'
					autoplay
					isOpen={isOpen}
					videoId={clip.video}
					onClose={() => setOpen(false)} />}
				<S.Media
					onMouseEnter={showVideo}
					onMouseLeave={hideVideo}>
					{checkLoadingItem(location, loading) && <Spinner color='rgba(0, 0, 0, 0.7)' />}
					{clip && <motion.div
						variants={gameCardAnimation}
						animate={controls}
						className='video__block'>
						<video
							loop
							muted="muted"
							className='video'
							ref={videoRef}
							src={clip.clip} />
						<motion.button variants={fadeIn} className='video__btn' onClick={() => setOpen(true)}>
							<FontAwesomeIcon icon={faYoutube} size='1x' />
							Play full video
						</motion.button>
					</motion.div>}
					<motion.img
						layoutId={`image ${id}`}
						src={background_image ? resizeImage(background_image, 640) : resizeImage(notFoundImg, 640)}
						alt={name}>
					</motion.img>
					{clip && <S.isPlayable className='play-icon'>
						<FontAwesomeIcon icon={faPlay} size='1x' />
					</S.isPlayable>}
				</S.Media>

				<div className="descr">

					<S.LineDetails>
						<motion.div layoutId={`platforms ${id}`} className="platforms">
							{platformIcons(platforms).map((item, index) => <FontAwesomeIcon key={index} icon={item} />)}
						</motion.div>
						<motion.div
							layoutId={`stars ${id}`}
							className="metacritic"
							style={metacriticColor(metacritic)}>{metacritic}</motion.div>
					</S.LineDetails>
					<motion.a
						layoutId={`title ${id}`}
						onClick={() => gameDetailsHandler(id)}
						className="descr__name">
						{name}
					</motion.a>

				</div>
				<S.ExtraList>
					<ul className='descr__list'>
						<li>
							<div className='grey'>Release data: </div>
							{released ? <div dangerouslySetInnerHTML={{ __html: setGameCartDate(released) }}></div>
								: <div>--/--/--</div>}
						</li>
						<li>
							<div className='grey'>Genres:</div>
							{genres.length ? <div className='genre'>
								{genres.map(genre => genre.name).join(', ')}
							</div> : <div>-</div>}
						</li>
						<li>
							<div className='grey'>Ratings count: </div>
							<div>{ratings_count}</div>
						</li>
						<li>
							<S.Link className='descr__btn' onClick={() => gameDetailsHandler(id)}>
								<span>Show more details</span>
								<FontAwesomeIcon icon={faChevronRight} size='sm' />
							</S.Link>
						</li>
					</ul>
				</S.ExtraList>
			</S.Game>
		</>
	)
}

export default Game;

const S = {};
S.Game = styled(motion.div)`
	width: 100%;
	display: block;
	border-radius: .8rem;
	overflow: hidden;
	background-color: #202020; 
	color:#fff;
	box-shadow: 0 0 5px 5px rgba(0,0,0, .2);
	&:hover {
		overflow: visible; 
		.descr__list {
			height: auto;
		}
	}
	.descr {
		padding: .5rem 1rem 1rem 1rem;
		font-size: 1.5rem;
		&__name {
			font-weight: bold;
			text-decoration: none;
			color: #fff;
			word-wrap: break-word;
			cursor: pointer;
			transition: all .3s ease;
			&:hover {
				color: #ababab;
			}
		}
	}
	.modal-video-close-btn {
		cursor: pointer;
	}
`;

S.Media = styled(motion.div)`
	position: relative;
	width: 100%;
	height: 180px;
	overflow: hidden;
	&:hover .play-icon {
		opacity: 0;
	}
	.video__block {
		position: absolute;
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
		transition: all 1s ease;
		opacity: 0;
	}
	.video__btn {
		position: absolute;
		bottom:.5rem;
		right: .5rem;
		padding: .5rem .7rem;
		font-size: .8rem;
		border-radius: .3rem;
		background-color: rgba(0,0,0, .4);
		border: 1px solid #000;
		color: rgba(255,255,255, .9); 
		cursor: pointer;
		svg {
			margin-right: .5rem;
		}
		&:hover {
			border: 1px solid rgba(255,255,255, .7);
		}
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-top-left-radius: .8rem;
		border-top-right-radius: .8rem;
	}
	video {
		position: absolute;
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
		object-fit: cover;
		border-top-left-radius: .8rem;
		border-top-right-radius: .8rem;
	}
`;

S.isPlayable = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
	width: 2.8rem; 
	height: 2.8rem;
	border-radius: 50%;
	background-color: rgba(0,0,0, .5);
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 1;
	transition: all .5s ease;
`;

S.LineDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: .5rem 0;
	font-size: 12px;
	font-size: 1rem;
	svg {
		margin: 0 .2rem;
	}
	.metacritic {
		padding: .2rem .5rem;
		font-size: 1rem;
		border-radius: .4rem;
		font-weight: bold;
	}
`;

S.ExtraList = styled.div`
	position: relative;
	ul{
		position: absolute;
		width: 100%;
		background-color: #202020;
		padding: .5rem 1rem;
		top:-15px;
		height: 0px;
		border-bottom-left-radius: .8rem;
		border-bottom-right-radius: .8rem;
		box-shadow: 0 12px 5px 5px rgba(0,0,0, .2);
		z-index: 2;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .7rem 0;
			font-size: 12px;
			border-bottom: 1px solid #313131;
			&:last-child, &:nth-child(3){
				border-bottom: none;
			}
			.genre {
			text-align: end;
			}
			.grey {
				color: #999;
			}
		}
	}
`;
S.Link = styled(motion.a)`
	padding: .7rem 1rem;
	font-size: .9rem;
	width: 100%;
	background-color: #313131;
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: none;
	outline: none;
	border-radius: .5rem;
	text-decoration: none;
	cursor: pointer;
	&:hover span{
		color: #fad860;
	}
	svg {
		color: #7d7d7d;
		font-size: 1.2rem;
	}	
`;
