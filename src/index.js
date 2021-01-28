import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import GlobalStyles from './components/GlobalStyles';
import { BrowserRouter as Router } from 'react-router-dom';

// For async code in redux
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<React.Fragment>
		<Provider store={store}>
			<Router>
				<GlobalStyles />
				<App />
			</Router>
		</Provider>
	</React.Fragment>,
	document.getElementById('root')
);

