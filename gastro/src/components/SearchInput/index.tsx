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
  const iconLeft = 16;
  const iconRight = 16;
  const spacing = 12;

  const dynamicPaddingLeft = iconLeft + iconSize + spacing;
  const dynamicPaddingRight = iconRight + iconSize + spacing;

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={iconSize} color="#FF914B" style={styles.leftIcon} />

      <CustomTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          paddingLeft: dynamicPaddingLeft,
          paddingRight: dynamicPaddingRight,
          marginLeft: '70%',
          marginRight: '70%',
        }}
        {...props}
      />

      <MaterialIcons name="tune" size={iconSize} color="#FF914B" style={styles.rightIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    paddingLeft: 52,
  },
  leftIcon: {
    position: 'absolute',
    justifyContent: 'space-between',
    left: '8%',
    paddingLeft: '8%',
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
});

export default SearchInput;
