import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getGameDetails } from '../../actions';
const Game = ({ id, name, background_image, platforms, metacritic, released, genres, ratings_count }) => {

	const dispatch = useDispatch();
	const gameDetailsHandler = (id) => {
		dispatch(getGameDetails(id))
	}

	return (
		<S.Game onClick={() => gameDetailsHandler(id)}>
			<img src={background_image} alt={name} />
			<div className="descr">

				<S.LineDetails className='descr__details'>
					<ul className="platforms">
						{platforms.map((item, index) => <li key={index}>{item.platform.name}</li>)}
					</ul>
					<div className="metacritic">{metacritic}</div>
				</S.LineDetails>
				<h3 className="descr__name">{name}</h3>

				<S.LineDetails className='descr__release descr__string'>
					<span className='grey'>Release data: </span>
					<span>{released}</span>
				</S.LineDetails>
				<hr />
				<S.LineDetails className='descr__genres descr__string'>
					<div className='grey'>Genres:</div>
					<div className='genre'>
						{genres.map(genre => genre.name).join(', ')}
					</div>
				</S.LineDetails>
				<hr />
				<S.LineDetails className='descr__count'>
					<span className='grey'>Ratings count: </span>
					<span>{ratings_count}</span>
				</S.LineDetails>
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
		min-height: 160px;
		object-fit: cover;
	}
	.descr {
		padding: .5rem 1.5rem;
		font-size: 1.2rem;
	}
`;

S.LineDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 0;
	.genre {
		text-align: end;
	}
`;