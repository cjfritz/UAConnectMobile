import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Button,
  H1,
} from 'native-base';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import styles from './LoginScreen.style';
import { LoadingModal } from '../common/LoadingModal/LoadingModal';
import imageLogo from '../../assets/images/ua_logo.png';

export class LoginScreen extends Component {
  render() {
    const {
      email,
      password,
      onEmailChange,
      onPasswordChange,
      loading,
      onLoginUser,
    } = this.props;

    return (
      <Container style={ styles.container }>
        <LoadingModal visible={ loading } loadingLabel='Logging in...' />
        <Image style={ styles.logo } source={ imageLogo } resizeMode='contain' />
        <View style={ { backgroundColor: 'transparent' } }>
          <Form>
            <Item style={ styles.item } floatingLabel>
              <Label style={ { color: 'white' } }>Email</Label>
              <Input
                keyboardType='email-address'
                style={ styles.input }
                onChangeText={ text => onEmailChange(text) }
                value={ email }
              />
            </Item>
          </Form>

          <Form>
            <Item style={ styles.item } floatingLabel>
              <Label style={ { color: 'white' } }>Password</Label>
              <Input
                style={ styles.input }
                secureTextEntry
                onChangeText={ text => onPasswordChange(text) }
                value={ password }
              />
            </Item>
          </Form>
          <Button
            style={ styles.loginButton }
            block
            onPress={ () => onLoginUser(email, password) }
          >
            <H1 style={ styles.text }>Sign In</H1>
          </Button>
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => (
  ({
    onEmailChange: text => dispatch(emailChanged(text)),
    onPasswordChange: text => dispatch(passwordChanged(text)),
    onLoginUser: (email, password) => dispatch(loginUser({ email, password })),
  })
);

const mapStateToProps = state => {
  const {
    email,
    password,
    loading,
  } = state.auth;

  return {
    email,
    password,
    loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
