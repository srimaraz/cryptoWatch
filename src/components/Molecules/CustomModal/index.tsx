import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';

interface CustomModalProps {
  visible: boolean;
  onRequestClose: Function;
  component: React.ReactNode;
}
const CustomModal = (props: CustomModalProps) => {
  const {
    visible,
    onRequestClose = () => {},
    component: Component = <></>,
  } = props;
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={() => onRequestClose()}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          width: '100%',
          height: '100%',
        }}>
        {Component}
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
