import { Tabs, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import Colors from '../../constants/Colors';
import { FilterResultProvider } from '../../contexts/FilterResultContext';
import { NavBarIcon } from '@/src/components/NavBarItem';

export default function RootLayout() {
  return (
    <FilterResultProvider>
      <RootLayoutContent />
    </FilterResultProvider>
  );
}

function RootLayoutContent() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.orange.orangeStandard,
          tabBarInactiveTintColor: Colors.orange.orangeStandard,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 66,
            backgroundColor: 'white',
            borderTopWidth: 1.5,
            borderColor: Colors.orange.orangeStandard,
          },
          tabBarButton: (props) => {
            const { ref, ...rest } = props;
            return (
              <Pressable
                {...rest}
                ref={ref as React.Ref<any>}
                android_ripple={{ color: 'transparent' }}
              />
            );
          },
        }}
      >
        <Tabs.Screen
          name="Feed/index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size, focused }) => (
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
            ),
          }}
        />
        <Tabs.Screen
          name="Search/index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size, focused }) => (
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
            ),
          }}
        />
        <Tabs.Screen
          name="Roulette/index"
          options={{
            tabBarShowLabel: false,
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ color, size, focused }) => (
              <NavBarIcon
                color={color}
                size={size}
                focused={focused}
                iconType="roleta"
                children={
                  <Image
                    source={require('../../../assets/images/icon-roleta.png')}
                    style={{ width: 55, height: 55 }}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Community/index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size, focused }) => (
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
            ),
          }}
        />
        <Tabs.Screen
          name="Profile/index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size, focused }) => (
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
            ),
          }}
        />
        <Tabs.Screen
          name='(screens)'
          options={{ href: null, tabBarShowLabel: false }}
        />
      </Tabs>
  );
}
