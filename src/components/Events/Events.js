import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Button, View } from 'native-base';

class Events extends Component {
  render() {
    return (
      <WebView
        source={ { uri: 'https://registrar.uark.edu/academic-dates/academic-semester-calendar/index.php' } }
        style={ { marginTop: 20 } }
      />
    );
  }
}

export default Events;