import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import Button from '../Button';

type BaseModalProps = {
  visible: boolean;
  onClose: () => void;
};

const RoulletFilterModal = ({ visible, onClose }: BaseModalProps) => {
  return (
    <Modal 
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.textModal}>Já tem algo em mente{'\n'}ou deixe com a gente?</Text>
          <View style={styles.buttonsContainer}>
            <Button title="Mais ou menos" onPress={onClose} type="white" style={styles.button} />
            <Button title="Me surpreenda!" onPress={onClose} type="orange" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: 260,
    padding: 20,
    alignItems: 'center',
  },
  textModal: {
    fontSize: 17,
    color: '#FF914B',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
});

export default RoulletFilterModal;