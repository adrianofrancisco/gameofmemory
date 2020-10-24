import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './pages/game';
import Ranking from './pages/ranking';

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Game} />
				<Route path="/ranking" exact component={Ranking} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;