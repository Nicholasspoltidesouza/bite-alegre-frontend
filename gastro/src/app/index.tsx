import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTextInput from '../components/TextFieldCadastroUsuario'; // Ensure this path is correct

const TextInputExample: React.FC = () => {
  const [name, setName] = useState<string>('');

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Nome"
        style={styles.customInput} // Optional: Add custom styles here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#FFFFFF', // White background
  },
  customInput: {
    // Optional: Add custom styles for this specific screen
    // For example, you can add margin, change the background color, etc.
    marginBottom: 16,
  },
});

export default TextInputExample;