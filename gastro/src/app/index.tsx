import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CadastroUsuario from '../screens/CadastroUsuario'; // Ajuste o caminho conforme sua estrutura

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CadastroUsuario />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
