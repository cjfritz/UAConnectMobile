import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
} from 'native-base';
import styles from './QuickLink.style';
// component that renders the quicklinks on the homescreen
const QuickLink = ({
  onPress, children, color, iconName,
}) => (
  // generate the button for the homescreen
  <TouchableOpacity onPress={ onPress } style={ { ...styles.Touch, backgroundColor: color } }>
    <Icon name={ iconName } style={ styles.Icon } size={ 100 } />
    <Text>
      { children }
    </Text>
  </TouchableOpacity>
);
// export the quicklink to be used
export default QuickLink;

