import { StyleSheet , View } from "react-native";

interface NavBarIconProps {
  children?: React.ReactNode;
  color: string;
  size: number;
  focused?: boolean;  
}

export function NavBarIcon({ children, focused }: NavBarIconProps) {

  return (
    <View style={focused ? styles.active : styles.not_active}>
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
})