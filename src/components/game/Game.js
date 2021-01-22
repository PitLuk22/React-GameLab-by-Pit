import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getGameDetails } from '../../actions';
import { setGameCartDate } from '../../services/gameCartDate';
// Images
import notFoundImg from '../../img/notFound.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faMobileAlt, faGlobe, faDesktop, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faXbox, faPlaystation, faLinux, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';

const Game = ({ id, name, background_image, platforms, metacritic, released, genres, ratings_count }) => {

	const dispatch = useDispatch();
	const gameDetailsHandler = (id) => {
		dispatch(getGameDetails(id))
	}

	const metacriticColor = (rating) => {
		if (rating >= 80) {
			return { color: '#6dc849', border: '1px solid rgba(109,200,73,.4)' }
		} else if (rating < 80 && rating > 45) {
			return { color: '#fdca52', border: '1px solid rgba(253,202,82,.4)' }
		} else if (!rating) {
			return;
		} else {
			return { color: '#E20338', border: '1px solid #930324' }
		}
	}

	const setPlatformIcon = (name) => {
		if (name.includes('xbox')) {
			return faXbox;
		} else if (name.includes('playstation')) {
			return faPlaystation;
		} else if (name.includes('pc')) {
			return faDesktop;
		} else if (name.includes('nintendo')) {
			return faGamepad;
		} else if (name.includes('linux')) {
			return faLinux;
		} else if (name.includes('macos')) {
			return faApple;
		} else if (name.includes('web')) {
			return faGlobe;
		} else if (name.includes('ios')) {
			return faMobileAlt;
		} else if (name.includes('android')) {
			return faAndroid;
		}
	}

	const uniqPlatforms = [...new Set(platforms.map(item => setPlatformIcon(item.platform.slug)))];

	return (
		<S.Game onClick={() => gameDetailsHandler(id)}>
			<img src={background_image || notFoundImg} alt={name} />
			<div className="descr">

				<S.LineDetails>
					<div className="platforms">
						{uniqPlatforms.map((item, index) => <FontAwesomeIcon key={index} icon={item} />)}
					</div>
					<div className="metacritic" style={metacriticColor(metacritic)}>{metacritic}</div>
				</S.LineDetails>
				<h3 className="descr__name">{name}</h3>

				<S.ExtraList>
					<li>
						<div className='grey'>Release data: </div>
						<div>{setGameCartDate(released)}</div>
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
				</S.ExtraList>
				<S.Btn className='descr__btn'>
					<span>Show more details</span>
					<FontAwesomeIcon icon={faChevronRight} size='sm' />
				</S.Btn>
			</div>
		</S.Game>
	)
}

export default Game;

const S = {};
S.Game = styled.div`
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
	}
	img{
		width: 100%;
		height: 180px;
		object-fit: cover;
	}
	.descr {
		padding: .5rem 1rem;
		font-size: 1.5rem;
	}
`;

S.LineDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 0;
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

S.ExtraList = styled.ul`
	li {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0;
		font-size: 12px;
		border-bottom: 1px solid #313131;
		&:last-child {
			border-bottom: none;
		}
		.genre {
		text-align: end;
		}
		.grey {
			color: #999;
		}
	}
`;
S.Btn = styled.button`
	padding: 1rem;
	font-size:1rem;
	width: 100%;
	background-color: #313131;
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: none;
	outline: none;
	border-radius: .5rem;
	cursor: pointer;
	&:hover span{
		color: #fad860;
	}
	svg {
		color: #7d7d7d;
		font-size: 1.2rem;
	}	
`;