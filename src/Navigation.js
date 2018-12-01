import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './components/LoginScreen/LoginScreen';
import Home from './components/HomeScreen/HomeScreen';
import Planner from './components/PlannerScreen/PlannerScreen';
import PlannerCreateComponent from './components/PlannerCreate/PlannerCreate';
import PlannerEditComponent from './components/PlannerEdit/PlannerEdit';
import News from './components/News/News';
import Events from './components/Events/Events';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';

// navigator for course planner screen
const PlannerStack = createStackNavigator(
  {
    Planner,
    PlannerCreateComponent,
    PlannerEditComponent,
  },
  {
    initialRouteName: 'Planner',
    headerTintColor: 'white',
  }
);
// navigator for the bottom tabs
const MainStack = createBottomTabNavigator({
  // home tab navigator to home screen
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarlabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-home' color={ tintColor } size={ 24 } />
      ),
    },
  },
  // planner tab navigator to planner screen
  Planner: {
    screen: PlannerStack,
    navigationOptions: {
      tabBarlabel: 'Planner',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-bookmarks' color={ tintColor } size={ 24 } />
      ),
    },
  },
  // profile tab navigator to profile screen
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarlabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-person' color={ tintColor } size={ 24 } />
      ),
    },
  },
  // news tab navigator to news screen
  News: {
    screen: News,
    navigationOptions: {
      tabBarlabel: 'News',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='md-paper' color={ tintColor } size={ 24 } />
      ),
    },
  },
  // events tab navigator to events screen
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
  // initial route set to home for tab navigator
  // provide styling for bottom nav bar
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: 'darkred',
    },
  },
});
// master navigator for the app, between loginscreen and homescreen
export default createSwitchNavigator(
  {
    MainStack,
    Login,
  },
  {
    // app initially set to start at login screen
    initialRouteName: 'Login',
  },
);
