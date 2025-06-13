import Colors from '@/src/constants/Colors';
import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type: 'orange' | 'white';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: 132,
          height: 50,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: disabled
            ? Colors.orange.orangeMedium + '80'
            : type === 'orange'
              ? Colors.orange.orangeStandard
              : Colors.white,
          borderWidth: type === 'white' ? 2 : 0,
          borderColor:
            type === 'white' ? Colors.orange.orangeStandard : 'transparent',
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            fontWeight: '700',
            color:
              type === 'orange' ? Colors.white : Colors.orange.orangeStandard,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
