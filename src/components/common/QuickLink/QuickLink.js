import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
} from 'native-base';
import styles from './QuickLink.style';

const QuickLink = ({ onPress, children, color, iconName }) => (
  <TouchableOpacity onPress={ onPress } style={ { ...styles.Touch, backgroundColor: color } }>
    <Icon name={ iconName } style={ styles.Icon } size={ 150 }/>
    <Text>
      { children }
    </Text>
  </TouchableOpacity>
);

export default QuickLink;

