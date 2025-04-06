import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable } from 'react-native';
import { NavBarIcon } from "../components/NavBarItem/index";
import React from "react";

export default function RootLayout() {

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#FF914B', 
      tabBarInactiveTintColor: '#FF914B',
      headerShown: false,
      tabBarStyle: {
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
    <Tabs.Screen name="screens/Signup-interests/index" options={{ href: null }} />
    <Tabs.Screen name="screens/SignupInterestsScreen/index" options={{ href: null }} />
    <Tabs.Screen name="screens/SignupScreen/index" options={{ href: null }} />
    <Tabs.Screen name="screens/RestaurantProfile/index" options={{ href: null }} />
  </Tabs>  
  )
} 