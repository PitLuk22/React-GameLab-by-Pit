import React from 'react'
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { isLoadingGameDetails, getGameDetails } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner';
// Image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import platformIcons from '../../services/gameCardIcons';
import notFoundImg from '../../img/notFound.jpg';
import resizeImage from '../../services/resizeImage';
// Animation
import { motion } from 'framer-motion';

const searchedGame = ({ id, name, background_image, platforms }) => {

	const { loading } = useSelector(state => state.details);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const searchHandler = (id) => {
		history.push(`game/${id}`)
		dispatch(isLoadingGameDetails())
		dispatch(getGameDetails(id))
	}

	const checkLoadingItem = (location, loading) => {
		const arr = location.pathname.split('/');
		const gameId = arr[arr.length - 1];
		return +gameId === id && loading;
	}

	return (
		<S.GameLink
			onClick={() => searchHandler(id)} >
			<motion.div className='wrapper-img'>
				{checkLoadingItem(location, loading) ? <Spinner size='small' pos='absolute' color='rgba(0, 0, 0, 0.7)' /> : null}
				<motion.img
					src={background_image ? resizeImage(background_image, 200) : resizeImage(notFoundImg, 420)} />
			</motion.div>
			<div className='descr'>
				{platforms && <motion.div className="platforms">
					{platformIcons(platforms).map((item, index) => <FontAwesomeIcon key={index} icon={item} />)}
				</motion.div>}
				<motion.div className="name">{name}</motion.div>
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
	padding: .7rem;
	border-radius: .4rem;
	text-decoration: none;
	cursor: pointer;
	&:hover {
		background-color: #1a1a1a;
	}
	&:last-child {
		padding-bottom: 0;
	}
	.wrapper-img {
		position: relative;
		margin-right: 1rem;
		img {
			width: 50px;
			height: 50px;
			object-fit: cover;
			border-radius: .4rem;
		}
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