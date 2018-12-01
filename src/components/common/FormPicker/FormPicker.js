import React from 'react';
import { Platform } from 'react-native';
import {
  Picker, Icon, Header, Left, Button, Text, Body, Right, Item,
} from 'native-base';
import styles from './FormPicker.style';
// component for picker forms in planner form
const FormPicker = ({
  placeholder,
  selectedValue,
  onValueChange,
  items,
}) => (
  // render an item picker
  <Item picker>
    <Picker
      iosIcon={ <Icon name='ios-arrow-down' color='darkred' style={ styles.icon } /> }
      placeholder={ placeholder }
      selectedValue={ selectedValue() }
      onValueChange={ value => onValueChange(value) }
      renderHeader={ backPress => (
        <Header style={ styles.pickerHeader }>
          <Left style={ { flex: 1 } }>
            <Button transparent onPress={ backPress } style={ { flexDirection: 'row' } }>
              <Icon name='ios-arrow-down' color='white' />
              <Text style={ { fontSize: 15 } }>Close</Text>
            </Button>
          </Left>
          <Body style={ { flex: 1 } }>
            <Text numberOfLines={ 1 } style={ styles.titleText } adjustsFontSizeToFit>
              { placeholder }
            </Text>
          </Body>
          <Right style={ { flex: 1 } } />
        </Header>
      ) }
    >
      { androidRenderPlaceholder() }
      {
      items.map((value, index) => (
        <Picker.Item
          label={ value }
          value={ value }
          // require a key to be used, so make it the index
          key={ index } // eslint-disable-line react/no-array-index-key
        />
      ))
    }
    </Picker>
  </Item>
);

const androidRenderPlaceholder = () => {
  if (Platform.OS === 'android') {
    return <Picker.Item label='Select Item' value='' />
  }
  return null;
};

// export the component
export default FormPicker;
