import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
// Slider
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
// Style
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
// Util
import { v4 as uuidv4 } from 'uuid';
import resizeImage from '../../services/resizeImage';

const Carousel = ({ game, screenshots }) => {

	const [isPlaying, setIsPlaying] = useState(false);
	const [player, setPlayer] = useState(null);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	SwiperCore.use([Navigation, Pagination, Thumbs]);

	useEffect(() => {
		if (player) {
			isPlaying ? player.target.playVideo() : player.target.pauseVideo();
		}
	}, [isPlaying])

	// Video and its cover
	const video = () => {
		if (game.clip && game.clip.video) {
			return (
				<SwiperSlide className='video-slide' key={1488}>
					<YouTube
						videoId={game.clip.video}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
						onEnd={() => setIsPlaying(false)}
						onReady={(event) => setPlayer(event)} />
				</SwiperSlide>
			)
		} else {
			return null;
		}
	};

	const videoCover = () => {
		if (game.clip && game.clip.video) {
			return (
				<SwiperSlide className='youtube-thumb' key={uuidv4()}>
					<FontAwesomeIcon icon={faYoutube} size='3x' color='#f00c' />
					<img width={'100%'} src={resizeImage(`https://img.youtube.com/vi/${game.clip.video}/mqdefault.jpg`, 420)} alt={`screenshot ${1}-${'small'}`} />
				</SwiperSlide>
			)
		} else {
			return null;
		}
	};

	// Images for main Slider
	const images = screenshots
		.filter(img => img.width / img.height > 1.6 && img.width / img.height < 1.8)
		.map(img => <SwiperSlide key={uuidv4()}><img width={'100%'} src={resizeImage(img.image, 1280)} alt={`screenshot ${img.id}`} /></SwiperSlide>)

	// Images for Thumbs
	const thumbs = screenshots
		.filter(img => img.width / img.height > 1.6 && img.width / img.height < 1.8)
		.map(img => <SwiperSlide key={uuidv4()}><img width={'100%'} src={resizeImage(img.image, 420)} alt={`screenshot ${img.id}-${'small'}`} /></SwiperSlide>);

	return (
		<S.Slider isPlaying={isPlaying}>
			<Swiper
				id='slider'
				autoHeight={true}
				lazy={true}
				thumbs={{ swiper: thumbsSwiper }}
				spaceBetween={100}
				slidesPerView={1}
				mousewheel={true}
				navigation
				pagination={{ clickable: true }}
				onActiveIndexChange={({ activeIndex }) => activeIndex && setIsPlaying(false)}>
				{[video(), ...images]}
			</Swiper>
			<Swiper
				id='thumbs'
				autoHeight={true}
				spaceBetween={15}
				slidesPerView={3}
				onSwiper={setThumbsSwiper}>
				{[videoCover(), ...thumbs]}
			</Swiper>
		</S.Slider>
	)
}

export default Carousel;

const S = {};
S.PlayerIcon = styled(FontAwesomeIcon)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	transition: all .3s ease;
	color: rgba(0,0,0, .6);
	cursor: pointer;
	z-index: 2;
	&:hover {
		color: #ffffff;
	}
`;
S.FullScreen = styled.div`
	position: absolute;
	top: 1rem;
	right: 1rem;
	padding: .5rem 1rem;
	background-color: rgba(0,0,0, .8);
	border-radius: 1rem;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid rgba(0,0,0, .8);
	cursor: pointer;
	z-index: 2;
	&:hover {
		border: 1px solid #fff;
	}
	svg {
		margin-right: 1rem;
	}
`;
S.Slider = styled.div`
	#slider{
		width: 80%;
		border-top-left-radius:1rem;
		border-top-right-radius: 1rem;
		margin-bottom: .7rem;
		.swiper-pagination {
			width: auto;
			left: 50%;
			transform: translateX(-50%);
		}
		.video-slide {
			position: relative;
			padding-top: 56.25%;
			iframe {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				width: 100%;
				height: 100%;
			}
			.player-icon {
				visibility: ${props => props.isPlaying ? 'hidden' : 'visible'};
			}
			&:hover .player-icon{
				visibility: visible;
			}
		}
		.swiper-button-prev, .swiper-button-next {
			color: #DBDBDB;;
		}
		.swiper-pagination-bullet {
			background: #fff;
			&-active {
				background:#FFAD32;
			}
		}
	}
	#thumbs {
		width: 80%;
		border-bottom-left-radius:1rem;
		border-bottom-right-radius: 1rem;
		.swiper-slide {
			cursor: pointer;
		}
		.youtube-thumb {
			position:relative;
			svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
`;