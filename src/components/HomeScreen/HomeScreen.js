import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  Button,
  View,
  Header,
  Right,
} from 'native-base';
import { logoutUser } from '../../actions/AuthActions';
import styles from './HomeScreen.style';
import { LoadingModal } from '../common/LoadingModal/LoadingModal';
import QuickLink from '../common/QuickLink/QuickLink';
// component to show the homescreen
export class HomeScreen extends Component {
  render() {
    // deconstruct the props from this.props
    const { userLoggedOut, loading, navigation } = this.props;
    return (
      <View style={ styles.Container }>
        <LoadingModal visible={ loading } loadingLabel='Logging out...' />
        <Header style={ styles.logout }>
          <Right style={ styles.logoutBody }>
            <Button transparent onPress={ () => userLoggedOut() }>
              <Text style={ styles.logoutText }> Log Out </Text>
            </Button>
          </Right>
        </Header>
        <View style={ styles.Header }>
          <Text style={ styles.uaconnect }> UA Connect </Text>
        </View>
        <View style={ styles.BContainer }>
          <View style={ styles.Row1 }>
            <QuickLink
              iconName='ios-person'
              color='rgba(255, 255, 255, 0.90)'
              onPress={ () => navigation.navigate('Profile') }
            >
              Profile
            </QuickLink>
            <QuickLink
              iconName='ios-bookmarks'
              color='rgba(255, 255, 255, 0.90)'
              onPress={ () => navigation.navigate('Planner') }
            >
              Course Planner
            </QuickLink>
          </View>
          <View style={ styles.Row2 }>
            <QuickLink
              iconName='ios-calendar'
              color='rgba(255, 255, 255, 0.90)'
              onPress={ () => navigation.navigate('Events') }
            >
              Events
            </QuickLink>
            <QuickLink
              iconName='md-paper'
              color='rgba(255, 255, 255, 0.90)'
              onPress={ () => navigation.navigate('News') }
            >
              News
            </QuickLink>
          </View>
        </View>
      </View>
    );
  }
}
// map the action creators to component props
const mapDispatchToProps = dispatch => (
  ({
    userLoggedOut: () => dispatch(logoutUser()),
  })
);
// map the app state to component props
const mapStateToProps = state => {
  const { loading } = state.auth;

  return { loading };
};
// export the homescreen component
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

