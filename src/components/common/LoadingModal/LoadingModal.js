import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-root-modal';
import { Spinner, H3 } from 'native-base';
import styles from './LoadingModal.style';

export const LoadingModal = ({ visible, loadingLabel }) => visible && (
  <Modal style={ styles.modalStyle } visible={ visible }>
    <View style={ styles.container }>
      <Spinner style={ styles.spinner } />
      <H3 style={ styles.text }>{ loadingLabel }</H3>
    </View>
  </Modal>
);
