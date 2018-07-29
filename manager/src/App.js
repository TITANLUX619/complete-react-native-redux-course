import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyDgrSk1OEYo351hnWCtwjJGa5ADekzXdrI',
			authDomain: 'manager-a5b3f.firebaseapp.com',
			databaseURL: 'https://manager-a5b3f.firebaseio.com',
			projectId: 'manager-a5b3f',
			storageBucket: 'manager-a5b3f.appspot.com',
			messagingSenderId: '1005336948458'
		};
		firebase.initializeApp(config);
	}

	render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
