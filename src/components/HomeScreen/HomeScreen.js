import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Container,
  H1,
  Text,
  Button,
  Content,
  View,
} from 'native-base';
import { connect } from 'react-redux';
import styles from './HomeScreen.style';
import { logoutUser } from '../../actions';
import { LoadingModal } from '../common/LoadingModal/LoadingModal';
import NotificationScreen from '../NotificationScreen/NotificationScreen';
import CourseScreen from '../CourseScreen/CourseScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

class HomeScreen extends Component {
  render() {
    const { userLoggedOut, loading } = this.props;
    return (
      <View style={styles.Container }>
        <View style={ styles.Header }>
          <Text style={ styles.uaconnect }> UAConnect </Text>
        </View>
        <View style={ styles.News }>
          <Text> Registration starts on November 29th </Text>
        </View>
        <View style={ styles.Buttons } />
      </View>
    );
  }
}

export default createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarlabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={ tintColor } size={ 24 } />
      )
    }
  },
  Notification: {
    screen: NotificationScreen,
    navigationOptions: {
      tabBarlabel: 'Notification',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-notifications" color={tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarlabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" color={tintColor} size={24} />
      )
    }
  },
  Class: {
    screen: CourseScreen,
    navigationOptions: {
      tabBarlabel: 'course',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-bookmarks" color={tintColor} size={24} />
      )
    }
  },
},
{
  initialRouteName: 'Home',
  activeTintColor: '#F44336',
  inactiveBackgroundColor: 'blue',
});
