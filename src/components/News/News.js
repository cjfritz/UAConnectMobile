import React, { Component } from 'react'; 
import { WebView } from 'react-native';
import { Button, View } from 'native-base';

class News extends Component {
  render() {
    return (
      <WebView
        source={ { uri: 'https://news.uark.edu' } }
        style={ { marginTop: 20 } }
      />
    );
  }
}

export default News;
