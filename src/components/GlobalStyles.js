import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		background-color:#151515 ;
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
		color: #fff;
		aside {
			background-color:#151515 ;
		}
		h1 {
			text-align: center;
			font-family: 'Audiowide', cursive;
			font-size: 2.5rem;
			cursor: pointer;
		}
		h2 {
			text-align: center;
			font-family: 'Audiowide', cursive;
			font-size: 2.5rem;
			padding: 1rem;
		}
		h3 {
			font-weight: bold;
		}
		h4 {
			font-family: 'Audiowide', cursive;
			font-size: 2rem;
			padding: 1rem 0;
		}
		p {
			font-size: 1.2rem;
			line-height: 200%;
		}
	}
`;

export default GlobalStyles;