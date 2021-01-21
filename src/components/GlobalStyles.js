import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	html {
		&::-webkit-scrollbar {
			width: .5rem;
		}
		&::-webkit-scrollbar-thumb{
			background-color: darkgrey;
		}
	}
	body {
		background-color:#151515 ;
		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;
		color: #fff;
		font-family: 'Overlock', cursive;
		h1 {
			text-align: center;
			font-family: 'Audiowide', cursive;
			font-size: 2rem;
			padding: 2rem;
		}
		h2 {
			text-align: center;
			font-family: 'Audiowide', cursive;
			font-size: 2.5rem;
			padding: 1rem;
		}
		p {
			font-size: 1.2rem;
			line-height: 200%;
		}
	}
`;

export default GlobalStyles;