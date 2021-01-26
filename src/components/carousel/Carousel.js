import React, { useState, useRef, useEffect } from 'react'
// Slider
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const Carousel = ({ game, screenshots }) => {

	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	SwiperCore.use([Navigation, Pagination, Thumbs]);

	useEffect(() => {
		isPlaying ? videoRef.current.play() : videoRef.current.pause();
	}, [isPlaying])

	const onVideoHandler = () => {
		if (isPlaying) {
			setIsPlaying(false)
		} else {
			setIsPlaying(true)
		}
	}

	const fullscreen = () => {
		if (videoRef.current.mozRequestFullScreen) {
			videoRef.current.mozRequestFullScreen();
		} else if (videoRef.current.webkitRequestFullScreen) {
			videoRef.current.webkitRequestFullScreen();
		}
		setIsPlaying(true)
	}

	const video = (
		<SwiperSlide className='video-slide' key={uuidv4}>
			<S.PlayerIcon onClick={() => onVideoHandler()} className='player-icon' icon={isPlaying ? faPauseCircle : faPlayCircle} size='4x' />
			<S.FullScreen onClick={() => fullscreen()}>
				<FontAwesomeIcon icon={faExpand} size='1x' />
				Fullscreen
			</S.FullScreen>
			<video
				loop
				className='video'
				ref={videoRef}
				onEnded={() => setIsPlaying(false)}
				onClick={() => onVideoHandler()}
				width={'100%'}
				src={game.clip.clip} />
		</SwiperSlide>
	);
	// Images
	const images = screenshots
		.filter(img => img.width / img.height > 1.6 && img.width / img.height < 1.8)
		.map(img => <SwiperSlide key={img.id}><img width={'100%'} src={img.image} alt={`screenshot ${img.id}`} /></SwiperSlide>)
	const thumbs = screenshots
		.filter(img => img.width / img.height > 1.6 && img.width / img.height < 1.8)
		.map((img, i) => <SwiperSlide key={i}><img width={'100%'} src={img.image} alt={`screenshot ${img.id}-${'small'}`} /></SwiperSlide>);

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
				onActiveIndexChange={({ activeIndex }) => activeIndex !== 0 && setIsPlaying(false)}>
				{[video, ...images]}
			</Swiper>
			<Swiper
				id='thumbs'
				autoHeight={true}
				spaceBetween={15}
				slidesPerView={3}
				onSwiper={setThumbsSwiper}>
				{thumbs}
			</Swiper>
		</S.Slider>
	)
}

export default Carousel;

const S = {};
S.PlayerIcon = styled(FontAwesomeIcon)`
	position: absolute;
	top: 50%;
	left:50%;
	transform: translate(-50%,-50%);
	transition: all .3s ease;
	color: rgba(0,0,0, .6);
	cursor: pointer;
	&:hover {
		color: #ffffff;
		/* color: #FFAD32; */
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
		.video-slide {
			position: relative;
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
	}
`;