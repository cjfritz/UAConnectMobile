import React from 'react';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './components/LoginScreen/LoginScreen';
import Home from './components/HomeScreen/HomeScreen';
import CourseScreen from './components/CourseScreen/CourseScreen';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import News from './components/News/News';
import Events from './components/Events/Events';

const MainStack = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarlabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-home' color={ tintColor } size={ 24 } />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarlabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-person' color={ tintColor } size={ 24 } />
      )
    }
  },
  Class: {
    screen: CourseScreen,
    navigationOptions: {
      tabBarlabel: 'course',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-bookmarks' color={ tintColor } size={ 24 } />
      )
    }
  },
  News: {
    screen: News,
    navigationOptions: {
      tabBarlabel: 'News',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='md-paper' color={ tintColor } size={ 24 } />
      ),
    },
  },
  Event: {
    screen: Events,
    navigationOptions: {
      tabBarlabel: 'Events',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-calendar' color={ tintColor } size={ 24 } />
      ),
    },
  },
},
{
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: 'darkred',
    },
  },
});

const RootStack = createSwitchNavigator(
  {
    MainStack,
    Login,
  },
  {
    initialRouteName: 'Login',
  },
);

export default RootStack;