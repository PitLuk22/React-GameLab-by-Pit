import React, { useState } from 'react'
// Slider
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import styled from 'styled-components';

const Carousel = ({ screenshots }) => {

	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	SwiperCore.use([Navigation, Pagination, Thumbs]);

	// Images
	const images = screenshots.map(img => <SwiperSlide key={img.id}><img width={'100%'} src={img.image} alt={`screenshot ${img.id}`} /></SwiperSlide>);
	// .unshift(<video src={game.clip.clip} />)
	const thumbs = screenshots.map((img, i) => <SwiperSlide key={i}><img width={'100%'} src={img.image} alt={`screenshot ${img.id}-${'small'}`} /></SwiperSlide>);

	return (
		<S.Slider>
			<Swiper
				id='slider'
				thumbs={{ swiper: thumbsSwiper }}
				spaceBetween={100}
				slidesPerView={1}
				autoplay={500}
				loop={true}
				mousewheel={true}
				navigation
				pagination={{ clickable: true }}>
				{images}
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

S.Slider = styled.div`
	#slider{
		width: 80%;
		border-top-left-radius:1rem;
		border-top-right-radius: 1rem;
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