import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';
import CustomTextInput from '../CustomTextInput';

interface SearchInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText, placeholder = 'Pesquisar', ...props }) => {
  const iconSize = 20;
  const spacing = 12;
  const iconPadding = iconSize + spacing;

  return (
    // solução: transformar essa view no input inteiro, pois engloba o input e os dois ícone.
    // 
    <View style={styles.container}>
      <MaterialIcons name="search" size={iconSize} color="#FF914B" style={styles.leftIcon} />

      <CustomTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        width={900}
        style={[
          styles.input,
          {
            paddingLeft: iconPadding + 12,
            paddingRight: iconPadding + 12,
          },
        ]}
        {...props}
      />

      <MaterialIcons name="tune" size={iconSize} color="#FF914B" style={styles.rightIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 179, 112, 0.25)',
    backgroundColor: "blue",
    borderRadius: 24,
    paddingHorizontal: 12,
    width: '100%',
    position: 'relative',
  },
  input: {
    flex: 1,
    color: '#000',
  },
  leftIcon: {
    position: 'absolute',
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
});

export default SearchInput;
