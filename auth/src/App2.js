import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { Header, Button } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB2Un9838mPWzedh-_QzxairltE4aY0StE',
      authDomain: 'auth-rn-redux-course.firebaseapp.com',
      databaseURL: 'https://auth-rn-redux-course.firebaseio.com',
      projectId: 'auth-rn-redux-course',
      storageBucket: 'auth-rn-redux-course.appspot.com',
      messagingSenderId: '345423091013'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <ActivityIndicator size="small" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default App;
