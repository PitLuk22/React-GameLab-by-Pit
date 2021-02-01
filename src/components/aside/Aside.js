import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
	popularGames,
	upcomingGames,
	newGames,
	allTimeGames,
	last30daysGames,
	thisWeekGames,
	nextWeekGames,
	isLoadingGames,
	deleteSearched,
	trendingGames,
	genreGames
} from '../../actions';
import { Link, useLocation, useHistory } from 'react-router-dom';
// Style
import styled from 'styled-components';
// Images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faMeteor, faChartLine, faTrophy, faStar, faFastForward, faCrown, faHome, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import action from '../../img/action.png';
import strategy from '../../img/strategy.png';
import shooter from '../../img/shooter.png';
import rpg from '../../img/rpg.png';
import sports from '../../img/sports.png';
import adventure from '../../img/adventure.png';
import racing from '../../img/racing.png';
import indie from '../../img/indie.png';

const Aside = () => {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	const [isShowGenres, setIsShowGenres] = useState(false);
	const [genres, setGenres] = useState([
		{
			genre: 'action',
			img: action
		},
		{
			genre: 'shooter',
			img: shooter
		},
		{
			genre: 'strategy',
			img: strategy
		},
		{
			genre: 'adventure',
			img: adventure
		},
		{
			genre: 'racing',
			img: racing
		},
		{
			genre: 'RPG',
			extraPath: 'role-playing-games-rpg',
			img: rpg
		},
		{
			genre: 'sports',
			img: sports
		},
		{
			genre: 'indie',
			img: indie
		}
	])

	const numberOfGenres = () => {
		const currentGenresArr = isShowGenres ? genres : genres.filter((item, i) => i < 4);
		return currentGenresArr;
	}

	const setActiveClass = (section) => {
		const path = location.pathname.split('/')[1];
		return section === path ? 'active' : '';
	}

	const dispatchHandler = (action) => {
		dispatch(isLoadingGames())
		if (typeof action === 'string') {
			dispatch(genreGames(action))
		} else {
			dispatch(action)
		}
	}

	const deleteSearchedGames = () => {
		dispatch(deleteSearched())
		history.push('/');
		dispatch(isLoadingGames());
		dispatch(trendingGames());
	}

	return (
		<S.Aside>

			<S.Menu>
				<S.Links>
					<li>
						<S.Link to={`/`}
							className={setActiveClass('')}
							onClick={deleteSearchedGames}>
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
							onClick={() => dispatchHandler(popularGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faTrophy} size='sm' />
							</span>
							<span className='label'>Popular</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/allTime/`}
							className={setActiveClass('allTime')}
							onClick={() => dispatchHandler(allTimeGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faCrown} size='sm' />
							</span>
							<span className='label'>All time top</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/newGames/`}
							className={setActiveClass('newGames')}
							onClick={() => dispatchHandler(newGames())}>
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
							onClick={() => dispatchHandler(upcomingGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faMeteor} size='sm' />
							</span>
							<span className='label'>Upcoming</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/last30days/`}
							className={setActiveClass('last30days')}
							onClick={() => dispatchHandler(last30daysGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faStar} size='sm' />
							</span>
							<span className='label'>Last 30 days</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/thisWeek/`}
							className={setActiveClass('thisWeek')}
							onClick={() => dispatchHandler(thisWeekGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faFire} size='sm' />
							</span>
							<span className='label'>This week</span>
						</S.Link>
					</li>
					<li>
						<S.Link to={`/nextWeek/`}
							className={setActiveClass('nextWeek')}
							onClick={() => dispatchHandler(nextWeekGames())}>
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
					{numberOfGenres().map(({ genre, extraPath, img }) => {
						return (
							<li key={uuidv4()}>
								<S.Link to={`/${extraPath || genre}/`}
									className={`genres ${setActiveClass(extraPath || genre)}`}
									onClick={() => dispatchHandler(extraPath || genre)}>
									<span className='icon'>
										<img src={img} alt={genre} />
									</span>
									<span className='label genre'>{genre}</span>
								</S.Link>
							</li>
						)
					})}
					<li>
						<S.Link onClick={() => setIsShowGenres(!isShowGenres)}>
							<span className='icon'>
								<FontAwesomeIcon icon={isShowGenres ? faArrowUp : faArrowDown} size='sm' />
							</span>
							<span className='label label-grey'>{isShowGenres ? 'Hide' : 'Show all'}</span>
						</S.Link>
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