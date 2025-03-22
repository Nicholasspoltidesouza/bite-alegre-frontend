import React from 'react';
import { TextInput, StyleProp, TextInputProps, ViewStyle, TextStyle } from 'react-native';

interface CustomTextInputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle | TextStyle>; 
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[
        {
          width: 327, 
          height: 50, 
          borderRadius: 20, 
          backgroundColor: '#FFB37040', // #FFB370 with 25% opacity 
          paddingHorizontal: 16, 
          paddingVertical: 0, 
          fontSize: 16,
          lineHeight: 24, 
          color: '#FF914B',
          fontFamily: 'Poppins-Regular', 
          fontStyle: 'normal', 
          fontWeight: '400', 
          textAlign: 'left' as const, 
        },
        style, 
      ]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#FF914B" 
      {...props} 
    />
  );
};

export default CustomTextInput;