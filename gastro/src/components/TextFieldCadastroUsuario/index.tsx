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
      className="py-0 text-base font-normal text-left"
      style={[
        {
          width: 327,                  // Width: 327 
          height: 50,                  // Height: 50 
          borderRadius: 20,            // Corner radius: 20 
          backgroundColor: 'rgba(255, 179, 112, 0.25)',  // #FFB370 with 25% opacity
          paddingLeft: 24,             
          paddingRight: 16,            
          color: '#FF914B',            // Text color (FF914B)
          fontFamily: 'Poppins-Regular',
          fontSize: 16,                // Font size: 16 
          letterSpacing: 0,            // Letter spacing: 0%
        },
        style,
      ]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#FF914B"   // Placeholder color FF914B with 100% opacity
      {...props}
    />
  );
};

export default CustomTextInput;