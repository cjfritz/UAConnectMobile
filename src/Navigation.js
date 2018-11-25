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
  Planner: {
    screen: PlannerStack,
    navigationOptions: {
      tabBarlabel: 'Planner',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-home' color={ tintColor } size={ 24 } />
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

export default createSwitchNavigator(
  {
    MainStack,
    Login,
  },
  {
    initialRouteName: 'Login',
  },
);
