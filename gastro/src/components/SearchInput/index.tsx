import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomTextInput from '../TextFieldCadastroUsuario';
import Colors from '@/src/constants/Colors';

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

  const handleFilterPress = () => {
    router.push({ pathname: '/screens/FilterScreen' });
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="search"
        size={iconSize}
        color={Colors.orange.orangeStandard}
        style={styles.leftIcon}
      />
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
      <TouchableOpacity
        onPress={handleFilterPress}
        style={styles.rightIconContainer}
      >
        <MaterialIcons
          name="tune"
          size={iconSize}
          color={Colors.orange.orangeStandard}
          style={styles.rightIcon}
        />
      </TouchableOpacity>
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
    color: Colors.black,
  },
  leftIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  rightIcon: {
    zIndex: 1,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
    padding: 10,
    marginRight: -10,
  },
});

export default SearchInput;
