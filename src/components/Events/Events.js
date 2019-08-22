import React, { PureComponent } from 'react';
import { WebView } from 'react-native';
import {
  Container, Button, Icon, Header, Left, Body, Right, Title,
} from 'native-base';
import styles from './Events.style';

class Events extends PureComponent {
  state = {
    canGoBack: false,
  };

  webview = null;

  goBack = () => {
    this.webview.goBack();
  };

  render() {
    const { canGoBack } = this.state;
    return (
      <Container>
        <Header style={ styles.header }>
          <Left style={ styles.headerSection }>
            <Button
              transparent
              disabled={ !canGoBack }
              onPress={ this.goBack }
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={ styles.headerSection }>
            <Title style={ styles.title }>Events</Title>
          </Body>
          <Right style={ styles.headerSection } />
        </Header>
        <WebView
          source={ { uri: 'https://calendars.uark.edu/EventList.aspx?fromdate=12%2f2%2f2018&todate=12%2f2%2f2018&display=Day&view=DateTime' } }
          ref={ ref => (this.webview = ref) }
          onNavigationStateChange={ navState => {
            this.setState({ canGoBack: navState.canGoBack });
          } }
        />
      </Container>
    );
  }
}

export default Events;

