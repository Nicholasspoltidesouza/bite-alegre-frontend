import { Tabs, usePathname } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable } from 'react-native';
import { NavBarIcon } from "../components/NavBarItem/index";
import React, { useEffect, useState } from "react";
import * as Font from 'expo-font';

export default function RootLayout() {

  const pathname = usePathname();
  const hiddenRoutes = ['/screens/SignupUser', '/screens/SignupRestaurant','/screens/SignupInterestsScreen'];
  const shouldHideTabBar = hiddenRoutes.includes(pathname);

  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    Font.loadAsync({
      'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#FF914B', 
      tabBarInactiveTintColor: '#FF914B',
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        display: shouldHideTabBar ? 'none' : 'flex',
        height: 66,
        backgroundColor: 'white',
        borderTopWidth: 1.5,
        borderColor: '#FF914B',
      },
      tabBarButton: (props) => <Pressable {...props} android_ripple={{ color: 'transparent' }} />
    }}>
    <Tabs.Screen
      name="index"
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused })  => (
            <NavBarIcon
            color={color}
            size={size}
            focused={focused}
            children={
              <MaterialIcons
                name="home"
                size={40}
                color={color}
                style={{ height: 40, width: 40 }}
              />
            }
          />
          )
      }}
    />
    <Tabs.Screen
      name="screens/Search/index"
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused })  => (
          <NavBarIcon
            color={color}
            size={size}
            focused={focused}
            children={
              <MaterialIcons
                name="search"
                size={40}
                color={color}
                style={{ height: 40, width: 40 }}
              />
            }
        />
        )
      }}
    />
    <Tabs.Screen
      name="screens/Roullete/index"
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused })  => (
          <NavBarIcon
            color={color}
            size={size}
            focused={focused}
            iconType="roleta"
            children={
              <Image source={require('../../assets/images/icon-roleta.png')} style={{ width: 55, height: 55 }} />
            }
          />
        )
      }}
    />
    <Tabs.Screen
      name="screens/Community/index"
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused })  => (
          <NavBarIcon
            color={color}
            size={size}
            focused={focused}
            children={
              <MaterialIcons
                name="groups"
                size={45}
                color={color}
                style={{ height: 45, width: 45 }}
              />
            }
        />
      )
    }}
    />
    <Tabs.Screen
      name="screens/Profile/index"
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused })  => (
          <NavBarIcon
            color={color}
            size={size}
            focused={focused}
            children={
              <MaterialIcons
                name="person"
                size={40}
                color={color}
                style={{ height: 40, width: 40 }}
              />
            }
        />
        )
      }}
    />
    <Tabs.Screen name="screens/SignupInterestsScreen/index" options={{ href: null, tabBarShowLabel: false }} />    
    <Tabs.Screen name="screens/restaurantProfile/index" options={{ href: null, tabBarShowLabel: false }} />
    <Tabs.Screen name="screens/SignupRestaurant/index" options={{ href: null, tabBarShowLabel: false }} />
    <Tabs.Screen name="screens/SignupUser/index" options={{ href: null, tabBarShowLabel: false }} />
    <Tabs.Screen name="screens/CreateReview/index" options={{ href: null, tabBarShowLabel: false }} />
  </Tabs>
  )
} 