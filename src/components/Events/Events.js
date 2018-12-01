import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import {
  Container, Button, Icon,
} from 'native-base';
import styles from './Events.style';
// constant reference to the webview to control it
const WEBREF = 'web_ref';
// component that shows the events webview
class Events extends Component {
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

  // function to render the webview
  render() {
    // desconstruct app state
    const { canGoBack } = this.state;
    return (
      <Container>
        <View style={ styles.headerView }>
          <Button style={ styles.backButton } transparent disabled={ !canGoBack } onPress={ () => this.goBack() }>
            <Icon name='arrow-back' />
          </Button>
        </View>
        <WebView
          source={ { uri: 'https://registrar.uark.edu/academic-dates/academic-semester-calendar/index.php' } }
          ref={ WEBREF }
          onNavigationStateChange={ navState => {
            this.setState({ canGoBack: navState.canGoBack });
          } }
        />
      </Container>
    );
  }
}
// export the events screen
export default Events;

