import React from 'react'
import styled from 'styled-components';

const Aside = ({ game }) => {

	return (
		<S.Aside blur={game}>
			<div className='title'>
				<h1>Pit's GameLab</h1>
			</div>
			<S.Links>
				<li>Some text</li>
				<li>Some text</li>
				<li>Some text</li>
				<li>Some text</li>
				<li>Some text</li>
			</S.Links>

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
	padding-top: 1rem;
	filter: ${props => props.blur.name ? 'blur(10px)' : 'blur(0px)'};
`;
S.Links = styled.ul`
	padding: 0 3rem;
	font-size: 1.5rem;
	li {
		padding-bottom: 1.5rem;
		list-style-type: none;
	}
`;