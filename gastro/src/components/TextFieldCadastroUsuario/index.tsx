import React from 'react';
import { TextInput, StyleProp, TextInputProps, ViewStyle, TextStyle } from 'react-native';

// Define the props type for the CustomTextInput component
interface CustomTextInputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle | TextStyle>; // Allow both ViewStyle and TextStyle for customization
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
          width: 327, // From Group 21, Filtro, Rectangle 3
          height: 50, // From Group 21, Filtro, Rectangle 3
          borderRadius: 20, // From Rectangle 3
          backgroundColor: '#FFB37040', // #FFB370 with 25% opacity (from Rectangle 3)
          paddingHorizontal: 16, // Kept from your original code to match the visual design
          paddingVertical: 0, // Adjusted to center the text vertically (text height is 24px, input height is 50px)
          fontSize: 16, // From Nome
          lineHeight: 24, // From Nome
          color: '#FF914B', // Entered text color (as per your previous request)
          fontFamily: 'Poppins-Regular', // From Nome (requires linking the Poppins font)
          fontStyle: 'normal', // From Nome
          fontWeight: '400', // From Nome
          textAlign: 'left' as const, // Aligned to the left as per the image
        },
        style, // Allow custom styles to override or extend the default styles
      ]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="#FF914B" // Placeholder color from the spec (Nome)
      {...props} // Pass any additional TextInput props
    />
  );
};

export default CustomTextInput;