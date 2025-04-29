import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';
import CustomTextInput from '../CustomTextInput';

interface SearchInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Pesquisar',
  ...props
}) => {
  const iconSize = 20;
  const iconLeft = 15;
  const spacingBetweenIconAndText = 8;
  const paddingLeft = iconLeft + iconSize + spacingBetweenIconAndText;

  const iconRight = 15;
  const paddingRight = iconRight + iconSize + spacingBetweenIconAndText;

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={iconSize} color="#FF914B" style={styles.leftIcon} />
      <CustomTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          styles.input,
          {
            paddingLeft,
            paddingRight,
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
    backgroundColor: 'rgba(255, 179, 112, 0.25)',
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
    left: 15,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
});

export default SearchInput;
