import React from 'react';
import {
  Picker, Icon, Header, Left, Button, Text, Body, Right, Item,
} from 'native-base';
import styles from './FormPicker.style';

const FormPicker = ({
  placeholder,
  selectedValue,
  onValueChange,
  items,
}) => (
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
      {
      items.map((value, index) => (
        <Picker.Item
          label={ value }
          value={ value }
          key={ index } // eslint-disable-line react/no-array-index-key
        />
      ))
    }
    </Picker>
  </Item>
);

export default FormPicker;
