import React from 'react';
import Home from '../home';
import { Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Route path={'/'} component={Home} />
		</div>
	);
}

export default App;


