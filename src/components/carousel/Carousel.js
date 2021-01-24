import React, { useState, useRef } from 'react'
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

const Carousel = ({ game, screenshots }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const vidos = useRef(null);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	SwiperCore.use([Navigation, Pagination, Thumbs]);

	const onVideoHandler = () => {
		if (isPlaying) {
			setIsPlaying(false)
			vidos.current.pause();
		} else {
			setIsPlaying(true)
			vidos.current.play();
		}
	}

	const video = (
		<SwiperSlide className='video-slide' key={1232131} >
			<S.PlayerIcon className='player-icon' icon={isPlaying ? faPauseCircle : faPlayCircle} size={'4x'} />
			<video
				className='video'
				ref={vidos}
				onEnded={() => setIsPlaying(false)}
				onClick={() => onVideoHandler()}
				width={'100%'}
				src={game.clip.clip} />
		</SwiperSlide>);
	// Images
	const images = screenshots.map(img => <SwiperSlide key={img.id}><img width={'100%'} src={img.image} alt={`screenshot ${img.id}`} /></SwiperSlide>)
	const thumbs = screenshots.map((img, i) => <SwiperSlide key={i}><img width={'100%'} src={img.image} alt={`screenshot ${img.id}-${'small'}`} /></SwiperSlide>);

	return (
		<S.Slider isPlaying={isPlaying}>
			<Swiper
				id='slider'
				thumbs={{ swiper: thumbsSwiper }}
				spaceBetween={100}
				slidesPerView={1}
				mousewheel={true}
				navigation
				pagination={{ clickable: true }}>
				{[video, ...images]}
			</Swiper>
			<Swiper
				id='thumbs'
				spaceBetween={5}
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
	pointer-events: none;
`;
S.Slider = styled.div`
	#slider{
		width: 80%;
		border-top-left-radius:1rem;
		border-top-right-radius: 1rem;
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
		.swiper-slide {
			height: 60%;
		}
	}
	#thumbs {
		width: 80%;
		border-bottom-left-radius:1rem;
		border-bottom-right-radius: 1rem;
	}
`;