import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements';

import {
  Button,
  Content,
  Container,
  H1,
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground
} from 'react-native';

import styles from './ProfileScreen.style';
import image from '../../assets/images/Screenshot from 2018-11-27 13-54-11.png';

class ProfileScreen extends Component {
  renderHeader = () => {
    return (
      <View style={ styles.headerContainer }>
        <ImageBackground
          style={ styles.headerBackgroundImage }
          blurRadius={ 10 }
          source={ {
            uri: null,
          } }
        >
          <View style={ styles.headerColumn }>
            <Image
              style={ styles.userImage }
              source={ {
                uri: null,
              } }
            />
            <Text style={ styles.userNameText }> Anjan Poudel </Text>
            <View style={ styles.userAddressRow }>
              <View>
                <Icon
                  name='place'
                  underlayColor='transparent'
                  iconStyle={ styles.placeIcon }
                />
              </View>
              <View style={ styles.userCityRow }>
                <Text style={ styles.userCityText }>
                  Nepal, Kathmandu
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderTel = () => {
    return (
      <View>
        <Text> Phone: 4564566666 </Text>
      </View>
    );
  };

  renderEmail = () => {
    return (
      <View>
        <Text> Email: ap378@uark.edu </Text>
      </View>
    );
  };

  renderMajor = () => {
    return (
      <View>
        <Text> Major: Computer Science </Text>
      </View>
    );
  };

  renderStanding = () => {
    return (
      <View>
        <Text> Standing: Junior </Text>
      </View>
    );
  };

  renderGraduation = () => {
    return (
      <View>
        <Text> Expected Graduation: May 2020 </Text>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={ styles.scroll }>
        <View style={ styles.container }>
          <Card containerStyle={ styles.cardContainer }>
            { this.renderHeader() }
          </Card>
          <Card>
            { this.renderTel() }
          </Card>
          <Card>
            { this.renderEmail() }
          </Card>
          <Card>
            { this.renderStanding() }
          </Card>
          <Card>
            { this.renderGraduation() }
          </Card>
        </View>
      </ScrollView>
    );
  }


}

export default ProfileScreen;
