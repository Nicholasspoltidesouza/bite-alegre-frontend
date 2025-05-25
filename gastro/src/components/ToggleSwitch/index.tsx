'use client';

import Colors from '@/src/constants/Colors';
import React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  type ViewStyle,
  type StyleProp,
} from 'react-native';

interface ToggleSwitchProps {
  isEnabled?: boolean;
  onToggle?: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isEnabled = false,
  onToggle,
  activeColor = Colors.orange.orangeStandard,
  inactiveColor = '#E3E1E1',
  style,
  disabled = false,
}) => {
  const [isActive, setIsActive] = useState(isEnabled);
  const [animatedValue] = useState(new Animated.Value(isEnabled ? 1 : 0));

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isActive;
    setIsActive(newValue);

    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (onToggle) {
      onToggle(newValue);
    }
  };

  useEffect(() => {
    if (isEnabled !== isActive) {
      setIsActive(isEnabled);
      Animated.timing(animatedValue, {
        toValue: isEnabled ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isEnabled]);

  const backgroundColorAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const translateXAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleToggle}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <Animated.View
        style={[
          styles.background,
          {
            backgroundColor: backgroundColorAnimation,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ translateX: translateXAnimation }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 26,
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    justifyContent: 'center',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
  },
});

export default ToggleSwitch;
