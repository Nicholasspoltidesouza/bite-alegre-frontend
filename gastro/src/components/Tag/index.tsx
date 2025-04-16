import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface TagProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isSelected?: boolean; 
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right'; 
  onPress?: () => void; 
}

const Tag: React.FC<TagProps> = ({ title, style, textStyle, isSelected = false }) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handlePress = () => {
    setSelected(!selected);
  };

  return (
    <TouchableOpacity
      style={[
        {
          paddingHorizontal: 20,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: selected ? 'rgba(255, 179, 112, 0.25)' : 'rgba(227, 225, 225, 0.8)',
          minWidth: 100,
        },
        style,
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            fontWeight: '400',
            color: selected ? 'rgba(255, 145, 75, 0.8)' : 'rgba(143, 143, 143, 0.8)',
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Tag;