import React from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { isLoadingGameDetails, getGameDetails } from '../../actions';
import { useDispatch } from 'react-redux';
// Image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import platformIcons from '../../services/gameCardIcons';
import notFoundImg from '../../img/notFound.jpg';
import resizeImage from '../../services/resizeImage';
// Animation
import { motion } from 'framer-motion';

const searchedGame = ({ id, name, background_image, platforms }) => {

	const dispatch = useDispatch();
	const history = useHistory();

	const searchHandler = (id) => {
		history.push(`game/${id}`)
		dispatch(isLoadingGameDetails())
		dispatch(getGameDetails(id))
	}

	return (
		<S.GameLink
			layoutId={`search ${id}`}
			onClick={() => searchHandler(id)} >
			<motion.img
				layoutId={`search image ${id}`}
				src={background_image ? resizeImage(background_image, 200) : resizeImage(notFoundImg, 420)}
				alt={name} />
			<div className='descr'>
				{platforms && <motion.div layoutId={`search platforms ${id}`} className="platforms">
					{platformIcons(platforms).map((item, index) => <FontAwesomeIcon key={index} icon={item} />)}
				</motion.div>}
				<motion.div layoutId={`search title ${id}`} className="name">{name}</motion.div>
			</div>
		</S.GameLink>
	)
}

export default searchedGame;

const S = {};
S.GameLink = styled(motion.div)`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 1.5rem;
	text-decoration: none;
	cursor: pointer;
	&:last-child {
		padding-bottom: 0;
	}
	img {
		width: 50px;
		height: 50px;
		margin-right: 1rem;
		object-fit: cover;
		border-radius: .4rem;
	}
	.descr {
		height: 50px;
		display: flex;
		flex-direction: column;	
		justify-content: space-around;
		color: #fff;
		.platforms {
			svg {
				margin-right: .3rem;
			}
		}
	}
`;