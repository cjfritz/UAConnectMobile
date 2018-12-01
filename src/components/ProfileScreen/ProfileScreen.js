import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'react-native-elements';
import {
  View,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Item,
  Input,
  Label,
  Button,
  Content,
  Col,
  Container,
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { profileUpdate, profileSave, profileFetch } from '../../actions/ProfileActions';
import styles from './ProfileScreen.style';
import backgroundImage from '../../assets/images/ua_logo.png';
import defaultProfile from '../../assets/images/default_profile.jpg';
import { LoadingModal } from '../common/LoadingModal/LoadingModal';

export class ProfileScreen extends Component {
  componentWillMount() {
    const { fetchProfile } = this.props;
    fetchProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchProfile, isFocused } = this.props;
    if (nextProps.isFocused && !isFocused) {
      fetchProfile();
    }
  }

  renderHeader = () => {
    const {
      name,
      address,
      phone,
      standing,
      expectedGraduation,
      saveProfile,
    } = this.props;
    return (
      <View style={ styles.headerContainer }>
        <ImageBackground
          style={ styles.headerBackgroundImage }
          blurRadius={ 10 }
          source={ backgroundImage }
        >
          <View style={ styles.headerColumn }>
            <Image
              style={ styles.userImage }
              source={ defaultProfile }
            />
            <Text style={ styles.userNameText }>{ name }</Text>
            <View style={ styles.userAddressRow }>
              <Col>
                <View>
                  <Icon
                    name='place'
                    underlayColor='transparent'
                    iconStyle={ styles.placeIcon }
                  />
                </View>
                <View style={ styles.userCityRow }>
                  <Text style={ styles.userCityText }>
                    { address }
                  </Text>
                </View>
                <Button
                  style={ styles.saveButton }
                  onPress={ () => saveProfile({
                    name,
                    address,
                    phone,
                    standing,
                    expectedGraduation,
                  }) }
                >
                  <Text>
                    Save Changes
                  </Text>
                </Button>
              </Col>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderItem = (prop, propName, title) => {
    const { updateProfile } = this.props;
    return (
      <Item floatingLabel>
        <Label>{ title }</Label>
        <Input
          keyboardType={ propName === 'phone' ? 'phone-pad' : 'default' }
          onChangeText={ text => updateProfile({ prop: propName, value: text }) }
          value={ prop }
        />
      </Item>
    );
  };

  render() {
    const {
      name,
      address,
      phone,
      standing,
      expectedGraduation,
      loading,
      fetchProfile,
    } = this.props;
    return (
      <Container>
        <NavigationEvents
          onWillFocus={ () => {
            fetchProfile();
          } }
        />
        <Content style={ styles.scroll }>
          <LoadingModal visible={ loading } loadingLabel='Loading...' />
          <View style={ styles.container }>
            <Card containerStyle={ styles.cardContainer }>
              { this.renderHeader() }
            </Card>
            <Card>
              { this.renderItem(name, 'name', 'Name') }
            </Card>
            <Card>
              { this.renderItem(address, 'address', 'Address') }
            </Card>
            <Card>
              { this.renderItem(phone, 'phone', 'Phone') }
            </Card>
            <Card>
              { this.renderItem(standing, 'standing', 'Standing') }
            </Card>
            <Card style={ { marginBottom: '5%' } }>
              { this.renderItem(expectedGraduation, 'expectedGraduation', 'Expected Graduation') }
            </Card>

          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {
    name,
    address,
    phone,
    standing,
    expectedGraduation,
    loading,
  } = state.profile;
  return {
    name,
    address,
    phone,
    standing,
    expectedGraduation,
    loading,
  };
};

const mapDispatchToProps = dispatch => (
  ({
    updateProfile: ({ prop, value }) => dispatch(profileUpdate({ prop, value })),
    saveProfile: ({
      name,
      address,
      phone,
      standing,
      expectedGraduation,
    }) => dispatch(profileSave({
      name,
      address,
      phone,
      standing,
      expectedGraduation,
    })),
    fetchProfile: () => dispatch(profileFetch()),
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
