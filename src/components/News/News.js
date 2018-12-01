import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import {
  Container, Button, Icon,
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import styles from './News.style';

const WEBREF = 'web_ref';

class News extends Component {
  constructor() {
    super();
    this.state = {
      canGoBack: false,
    };
  }

  // go back to previous page in webview
  goBack = () => {
    // use the ref to go back
    // eslint-disable-next-line react/no-string-refs
    this.refs[WEBREF].goBack();
  };

  render() {
    const { canGoBack } = this.state;
    return (
      <Container>
        <View style={ styles.headerView }>
          <Button style={ styles.backButton } transparent disabled={ !canGoBack } onPress={ () => this.goBack() }>
            <Icon name='arrow-back' />
          </Button>
        </View>
        <WebView
          source={ { uri: 'https://news.uark.edu' } }
          ref={ WEBREF }
          onNavigationStateChange={ navState => {
            this.setState({ canGoBack: navState.canGoBack });
            console.log(`canGoBack: ${canGoBack}`);
          } }
        />
        <NavigationEvents
          onWillBlur={ () => {
            console.log('popping news screen');
            this.setState(previousState => (
              { key: previousState.key + 1 }
            ));
            // this.props.navigation.pop();
          } }
        />
      </Container>
    );
  }
}

export default News;
