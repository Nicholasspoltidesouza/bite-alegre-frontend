import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RoulletFilterModal from '@/src/components/RoulletFilterModal';

const RoulletScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Bem-vindo à roleta!</Text>
      <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />

      <RoulletFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoulletScreen;
