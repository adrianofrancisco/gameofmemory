import React, { Component } from 'react';
import Routes from './routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store';

class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Routes />
				</PersistGate>
			</Provider>
		)
	}
}

export default App;
