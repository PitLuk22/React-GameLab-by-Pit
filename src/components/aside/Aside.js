import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
	fetchGames,
	isLoadingGames,
} from '../../actions';
import { Link, useLocation } from 'react-router-dom';
// Style
import styled from 'styled-components';
// Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faMeteor, faChartLine, faTrophy, faFastForward, faCrown, faHome, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import action from '../../img/action.png';
import strategy from '../../img/strategy.png';
import shooter from '../../img/shooter.png';
import rpg from '../../img/rpg.png';
import sports from '../../img/sports.png';
import adventure from '../../img/adventure.png';
import racing from '../../img/racing.png';
import indie from '../../img/indie.png';

const Aside = ({ games, toggleAside }) => {
	const location = useLocation();
	const dispatch = useDispatch();

	const [isShowGenres, setIsShowGenres] = useState(false);
	const genres = [
		{
			genre: 'action',
			path: 'action',
			img: action
		},
		{
			genre: 'shooter',
			path: 'shooter',
			img: shooter
		},
		{
			genre: 'strategy',
			path: 'strategy',
			img: strategy
		},
		{
			genre: 'adventure',
			path: 'adventure',
			img: adventure
		},
		{
			genre: 'racing',
			path: 'racing',
			img: racing
		},
		{
			genre: 'RPG',
			path: 'role-playing-games-rpg',
			img: rpg
		},
		{
			genre: 'sports',
			path: 'sports',
			img: sports
		},
		{
			genre: 'indie',
			path: 'indie',
			img: indie
		}
	];

	// Show or Hide genres
	const numberOfGenres = () => {
		const currentGenresArr = isShowGenres ? genres : genres.filter((item, i) => i < 4);
		return currentGenresArr;
	}

	const setActiveClass = (section) => {
		const path = location.pathname.split('/')[1];
		return section === path ? 'active' : '';
	}

	//dispatch Games sections
	const dispatchHandler = (path) => {
		if (!games[path].length) {
			dispatch(isLoadingGames())
			dispatch(fetchGames(path === 'trending' ? '' : path))
		}
	}

	// dispatch Genres
	const dispatchHandlerGenres = (path) => {
		dispatch(isLoadingGames())
		dispatch(fetchGames(path))
	}

	return (
		<S.Aside toggleAside={toggleAside}>

			<S.Menu>
				<S.Links>
					<li>
						<S.Link to={`/`}
							className={setActiveClass('')}
							onClick={() => dispatchHandler('trending')}>
							<span className='icon'>
								<FontAwesomeIcon icon={faHome} size='sm' />
							</span>
							<span className='label'>Home</span>
						</S.Link>
					</li>
				</S.Links>
			</S.Menu>

			<S.Menu>
				<span className='title'>Top games</span>
				<S.Links>
					<li>
						<S.Link to={`/popular/`}
							className={setActiveClass('popular')}
							onClick={() => dispatchHandler('popular')}>
							<span className='icon'>
								<FontAwesomeIcon icon={faTrophy} size='sm' />
							</span>
							<span className='label'>Popular</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/allTime/`}
							className={setActiveClass('allTime')}
							onClick={() => dispatchHandler('allTime')}>
							<span className='icon'>
								<FontAwesomeIcon icon={faCrown} size='sm' />
							</span>
							<span className='label'>All time top</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/newGames/`}
							className={setActiveClass('newGames')}
							onClick={() => dispatchHandler('newGames')}>
							<span className='icon'>
								<FontAwesomeIcon icon={faChartLine} size='sm' />
							</span>
							<span className='label'>New games</span>
						</S.Link>
					</li>
				</S.Links>
			</S.Menu>

			<S.Menu>
				<span className='title'>New Releases</span>
				<S.Links>
					<li>
						<S.Link to={`/upcoming/`}
							className={setActiveClass('upcoming')}
							onClick={() => dispatchHandler('upcoming')}>
							<span className='icon'>
								<FontAwesomeIcon icon={faMeteor} size='sm' />
							</span>
							<span className='label'>Upcoming</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/thisWeek/`}
							className={setActiveClass('thisWeek')}
							onClick={() => dispatchHandler('thisWeek')}>
							<span className='icon'>
								<FontAwesomeIcon icon={faFire} size='sm' />
							</span>
							<span className='label'>This week</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/nextWeek/`}
							className={setActiveClass('nextWeek')}
							onClick={() => dispatchHandler('nextWeek')}>
							<span className='icon'>
								<FontAwesomeIcon icon={faFastForward} size='sm' />
							</span>
							<span className='label'>Next week</span>
						</S.Link>
					</li>
				</S.Links>
			</S.Menu>

			<S.Menu>
				<span className='title'>Genres</span>
				<S.Links>
					{numberOfGenres().map(({ genre, path, img }) => {
						return (
							<li key={uuidv4()}>
								<S.Link to={`/${path}/`}
									className={`genres ${setActiveClass(path)}`}
									onClick={() => dispatchHandlerGenres(path)}>
									<span className='icon'>
										<img src={img} alt={genre} />
									</span>
									<span className='label genre'>{genre}</span>
								</S.Link>
							</li>
						)
					})}
					<li>
						<S.ShowMore onClick={() => setIsShowGenres(!isShowGenres)}>
							<span className='icon'>
								<FontAwesomeIcon icon={isShowGenres ? faArrowUp : faArrowDown} size='sm' />
							</span>
							<span className='label label-grey'>{isShowGenres ? 'Hide' : 'Show all'}</span>
						</S.ShowMore>
					</li>
				</S.Links>
			</S.Menu>

		</S.Aside>
	)
}

export default Aside;

const S = {};
S.Aside = styled.aside`
	width: 15rem;
	height: 100vh;
	padding: 2rem 0 0 3rem;
	transition: all .3s ease;
	@media(max-width: 576px) {
		position: fixed;
		transform: ${props => props.toggleAside ? 'translateX(0)' : 'translateX(-100%)'};
		z-index: 100;
		overflow-y: scroll;
		top: 0;
	}
`;
S.Menu = styled.div`
	margin-bottom: 2rem;
	.title {
		display: block;
		font-size: 1.4rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}
`;
S.Links = styled.ul`
	font-size: 1.5rem;
	li {
		margin-bottom: .8rem;
		list-style-type: none;
		
		&:hover .icon {
			background-color: #fff;
			color: #2D2D2D;
		}
		.active .icon{
			background-color: #fff;
			color: #2D2D2D;
		}
		.genres.active {
			.label {
				padding-bottom: .1rem;
				border-bottom: 2px solid #FFAD32;
			}
		}
	}
`;
S.Link = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	text-decoration: none;
	color: #fff;
	outline: none;
	.icon {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #202020;
		border-radius: .4rem;
		margin-right: 1rem;
		width: 2.3rem;
		height: 2.3rem;
		transition: all .15s ease;
		img {
			width: 100%;
			height: auto;
		}
	}
	.label {
		font-size: 1.1rem;
		font-weight:400;
		&-grey {
			color: #676767;
		}
	}
	.genre {
		text-transform: capitalize;
	}
`;
S.ShowMore = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	text-decoration: none;
	color: #fff;
	outline: none;
	.icon {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #202020;
		border-radius: .4rem;
		margin-right: 1rem;
		width: 2.3rem;
		height: 2.3rem;
		transition: all .15s ease;
		img {
			width: 100%;
			height: auto;
		}
	}
	.label {
		font-size: 1.1rem;
		font-weight:400;
		&-grey {
			color: #676767;
		}
	}
	.genre {
		text-transform: capitalize;
	}
`;

// PropTypes

Aside.propTypes = {
	games: PropTypes.object
}