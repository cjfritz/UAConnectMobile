import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Modal from 'react-native-root-modal';
import { H3 } from 'native-base';
import styles from './LoadingModal.style';
// this component renders the loading modal based on the visible prop passed to it
export const LoadingModal = ({ visible, loadingLabel }) => visible && (
  <Modal style={ styles.modalStyle } visible={ visible }>
    <View style={ styles.container }>
      <ActivityIndicator color='white' size='large' />
      <H3 style={ styles.text }>{ loadingLabel }</H3>
    </View>
  </Modal>
);
