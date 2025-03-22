import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTextInput from '../components/TextFieldCadastroUsuario'; 

const TextInputExample: React.FC = () => {
  const [name, setName] = useState<string>('');

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Nome"
        style={styles.customInput} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
  },
  customInput: {
    marginBottom: 16,
  },
});

export default TextInputExample;