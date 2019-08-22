import React, { PureComponent } from 'react';
import { WebView } from 'react-native';
import {
  Container, Button, Icon, Header, Left, Body, Right, Title,
} from 'native-base';
import styles from './News.style';

class News extends PureComponent {
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
          <Body style={ { flex: 1 } }>
            <Title style={ styles.title }>News</Title>
          </Body>
          <Right style={ styles.headerSection } />
        </Header>
        <WebView
          source={ { uri: 'https://news.uark.edu' } }
          ref={ ref => (this.webview = ref) }
          onNavigationStateChange={ navState => {
            this.setState({ canGoBack: navState.canGoBack });
          } }
        />
      </Container>
    );
  }
}

export default News;
