/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Root, StyleProvider } from 'native-base';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootStack from './Navigation';
import NavigationService from './NavigationService';
import Reactotron from '../ReactotronConfig';
import reducers from './reducers';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/material';
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

export default class App extends Component {
  constructor() {
    super();
    // disable unnecessary yellowbox warnings
    YellowBox.ignoreWarnings([
      'Setting a timer',
      'Warning: Functions are not valid',
    ]);
  }

  componentDidMount() {
    // Initialize Firebase
    if (!firebase.apps.length) {
      const config = {
        apiKey: 'AIzaSyDveQD6KC3yCpfbLteFsQdpuD8nCKFiTsY',
        authDomain: 'uaconnect-mobile.firebaseapp.com',
        databaseURL: 'https://uaconnect-mobile.firebaseio.com',
        projectId: 'uaconnect-mobile',
        storageBucket: 'uaconnect-mobile.appspot.com',
        messagingSenderId: '681918160326',
      };
      firebase.initializeApp(config);
    }
  }

  render() {
    return (
      // pass in master reducer, empty initial state for store, and redux-thunk
      <Provider store={ Reactotron.createStore(reducers, {}, applyMiddleware(ReduxThunk)) }>
        <StyleProvider style={ getTheme(commonColor) }>
          <Root>
            <RootStack
              ref={ navigatorReference => {
                NavigationService.setTopLevelNavigator(navigatorReference);
              } }
            />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}
