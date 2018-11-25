import React, { Component } from 'react';
import {
  Container,
  H3,
  Text,
  Button,
  Content,
} from 'native-base';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/AuthActions';
import { LoadingModal } from '../common/LoadingModal/LoadingModal';

export class HomeScreen extends Component {
  render() {
    const { userLoggedOut, loading, navigation } = this.props;
    return (
      <Container style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
        <LoadingModal visible={ loading } loadingLabel='Logging out...' />
        <Content>
          <H3>HomeScreen</H3>
          <Button primary onPress={ () => userLoggedOut() }><Text>Log Out</Text></Button>
          <Button
            primary
            // onPress={ () => navigation.navigate('CourseHistoryScreen') }
          >
            <Text>Planner</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => (
  ({
    userLoggedOut: () => dispatch(logoutUser()),
  })
);

const mapStateToProps = state => {
  const { loading } = state.auth;

  return { loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
