import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getGameDetails, isLoading } from '../../actions';
import { setGameCartDate } from '../../services/gameCardDate';
import platformIcons from '../../services/gameCardIcons';
import metacriticColor from '../../services/gameMetascore';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../spinner';
import resizeImage from '../../services/resizeImage';

// Images
import notFoundImg from '../../img/notFound.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// Animation 
import { motion } from 'framer-motion';
import { fadeUp } from '../../animations';


const Game = ({ id, name, background_image, platforms, metacritic, released, genres, ratings_count, clip }) => {

	const [video, setVideo] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef(null);

	const location = useLocation()
	const { loading } = useSelector(state => state.details);
	const dispatch = useDispatch();

	useEffect(() => {
		if (videoRef.current) {
			isPlaying ? videoRef.current.play() : videoRef.current.pause();
		}
	}, [isPlaying])


	const gameDetailsHandler = (id) => {
		dispatch(isLoading());
		dispatch(getGameDetails(id))
		document.body.style.overflow = 'hidden';
	}

	const checkLoadingItem = (location, loading) => {
		return +location.pathname.split('/')[2] === id && loading;
	}

	const showVideo = () => {

		setVideo(<video
			loop
			muted="muted"
			className='video'
			ref={videoRef}
			src={clip.clip} />)
		setIsPlaying(true)
	}
	const hideVideo = () => {

		setVideo(null);
		setIsPlaying(false)
	}

	return (
		<S.Game variants={fadeUp} initial="hidden" animate='show'>
			<S.Media onMouseEnter={() => showVideo()} onMouseLeave={() => hideVideo()}>
				{checkLoadingItem(location, loading) && <Spinner />}
				<motion.div
					className='video-block'
					whileHover={{ opacity: 1, transition: { duration: .3, ease: 'linear' } }}>
					{video}
				</motion.div>
				<img src={resizeImage(background_image, 640) || resizeImage(notFoundImg, 640)} alt={name} />
			</S.Media>

			<div className="descr">

				<S.LineDetails>
					<div className="platforms">
						{platformIcons(platforms).map((item, index) => <FontAwesomeIcon key={index} icon={item} />)}
					</div>
					<div className="metacritic" style={metacriticColor(metacritic)}>{metacritic}</div>
				</S.LineDetails>
				<Link to={`/game/${id}`} onClick={() => gameDetailsHandler(id)}
					className="descr__name">{name}</Link>

			</div>
			<S.ExtraList>
				<ul className='descr__list'>
					<li>
						<div className='grey'>Release data: </div>
						<div dangerouslySetInnerHTML={{ __html: setGameCartDate(released) }}></div>
					</li>
					<li>
						<div className='grey'>Genres:</div>
						<div className='genre'>
							{genres.map(genre => genre.name).join(', ')}
						</div>
					</li>
					<li>
						<div className='grey'>Ratings count: </div>
						<div>{ratings_count}</div>
					</li>
					<li>
						<S.Link to={`/game/${id}`} className='descr__btn' onClick={() => gameDetailsHandler(id)}>
							<span>Show more details</span>
							<FontAwesomeIcon icon={faChevronRight} size='sm' />
						</S.Link>
					</li>
				</ul>
			</S.ExtraList>
		</S.Game>
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
	transition: all .15s ease;
	&:hover {
		transform: scale(1.03);
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
`;

S.Media = styled.div`
	position: relative;
	width: 100%;
	height: 180px;
	.video-block {
		position: absolute;
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
		transition: all 1s ease;
		opacity: 0;
	}
	img{
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
		height: 0;
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
S.Link = styled(Link)`
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