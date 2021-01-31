import React from 'react';
import { useDispatch } from 'react-redux';
import {
	popularGames,
	upcomingGames,
	newGames,
	allTimeGames,
	last30daysGames,
	thisWeekGames,
	nextWeekGames,
	isLoadingGames
} from '../../actions';
import { Link, useLocation } from 'react-router-dom';
// Style
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faMeteor, faChartLine, faTrophy, faStar, faFastForward, faCrown } from '@fortawesome/free-solid-svg-icons';

const Aside = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const setActiveClass = (section) => {
		const path = location.pathname.split('/')[1];
		return section === path ? 'active' : '';
	}

	const dispatchHandler = (action) => {
		dispatch(isLoadingGames())
		dispatch(action)
	}

	return (
		<S.Aside>

			<S.Menu>
				<span className='title'>Top games</span>
				<S.Links>
					<li>
						<Link to={`/popular/`}
							className={setActiveClass('popular')}
							onClick={() => dispatchHandler(popularGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faTrophy} size='sm' />
							</span>
							<span className='label'>Popular</span>
						</Link>
					</li>
					<li>
						<Link to={`/allTime/`}
							className={setActiveClass('allTime')}
							onClick={() => dispatchHandler(allTimeGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faCrown} size='sm' />
							</span>
							<span className='label'>All time top</span>
						</Link>
					</li>
					<li>
						<Link to={`/newGames/`}
							className={setActiveClass('newGames')}
							onClick={() => dispatchHandler(newGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faChartLine} size='sm' />
							</span>
							<span className='label'>New games</span>
						</Link>
					</li>
				</S.Links>
			</S.Menu>

			<S.Menu>
				<span className='title'>New Releases</span>
				<S.Links>
					<li>
						<Link to={`/upcoming/`}
							className={setActiveClass('upcoming')}
							onClick={() => dispatchHandler(upcomingGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faMeteor} size='sm' />
							</span>
							<span className='label'>Upcoming</span>
						</Link>
					</li>
					<li>
						<Link to={`/last30days/`}
							className={setActiveClass('last30days')}
							onClick={() => dispatchHandler(last30daysGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faStar} size='sm' />
							</span>
							<span className='label'>Last 30 days</span>
						</Link>
					</li>
					<li>
						<Link to={`/thisWeek/`}
							className={setActiveClass('thisWeek')}
							onClick={() => dispatchHandler(thisWeekGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faFire} size='sm' />
							</span>
							<span className='label'>This week</span>
						</Link>
					</li>
					<li>
						<Link to={`/nextWeek/`}
							className={setActiveClass('nextWeek')}
							onClick={() => dispatchHandler(nextWeekGames())}>
							<span className='icon'>
								<FontAwesomeIcon icon={faFastForward} size='sm' />
							</span>
							<span className='label'>Next week</span>
						</Link>
					</li>
				</S.Links>
			</S.Menu>

		</S.Aside>
	)
}

export default Aside;

const S = {};
S.Aside = styled.aside`
	position: sticky;
	top: 0;
	left: 0;
	width: 15rem;
	height: 100vh;
	padding: 2rem 0 0 3rem;
`;
S.Menu = styled.div`
	margin-bottom: 2.5rem;
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
		a{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			text-decoration: none;
			color: #fff;
			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #202020;
				border-radius: .4rem;
				margin-right: 1rem;
				width: 2.3rem;
				height: 2.3rem;
				transition: all .15s ease;
			}
			.label {
				font-size: 1.1rem;
				font-weight:400;
			}
		}
		
	}
`;