import { StyleSheet , View } from "react-native";
import React from 'react';

interface NavBarIconProps {
  children?: React.ReactNode;
  color: string;
  size: number;
  focused?: boolean;
  iconType?: string;
}

export function NavBarIcon({ children, focused, iconType }: NavBarIconProps) {
  const isRoulette = iconType === "roleta";

  return (
    <View style={focused ? [styles.active, isRoulette && styles.rouletteActive] : styles.not_active}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  active: {
    borderRadius: 30,
    marginTop: 25,
    height: 60,
    width: 60,
    backgroundColor: 'rgba(255, 179, 112, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  not_active: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rouletteActive: {
    borderRadius: 35,
    height: 63,
    width: 63,
  },
})