import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Category from './components/Category/Category';
import Home from './components/Home/Home';

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/api/*" component={Category} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
