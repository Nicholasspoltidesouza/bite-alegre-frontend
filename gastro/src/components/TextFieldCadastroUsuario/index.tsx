import Colors from '@/src/constants/Colors';
import React, { useState } from 'react';
import {
  DimensionValue,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';

interface CustomTextInputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: StyleProp<TextStyle>;
  validation?: (text: string) => string | null;
  width?: DimensionValue;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  validation,
  width,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChangeText = (text: string) => {
    if (validation) {
      const validationError = validation(text);
      setError(validationError);
    }
    onChangeText(text);
  };

  return (
    <>
      {error && (
        <Text
          style={{
            color: Colors.red,
            fontSize: 12,
            textAlign: 'left',
            marginBottom: 2,
            marginLeft: 24,
            fontFamily: 'Poppins-Regular',
          }}
        >
          {error}
        </Text>
      )}
      <TextInput
        style={[
          {
            paddingLeft: 24,
            paddingRight: 16,
            color: Colors.orange.orangeStandard,
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            letterSpacing: 0,
            borderWidth: error ? 2 : 0,
            borderColor: error ? 'red' : 'transparent',
          },
          style,
        ]}
        onChangeText={handleChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.orange.orangeStandard}
        returnKeyType="search"
        {...props}
      />
    </>
  );
};

export default CustomTextInput;
