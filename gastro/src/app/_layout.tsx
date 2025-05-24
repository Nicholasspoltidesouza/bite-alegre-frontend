import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { router, Tabs, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable } from 'react-native';
import { NavBarIcon } from '../components/NavBarItem/index';
import RouletteFilterModal from '../components/RouletteFilterModal';
import RouletteVibeModal from '../components/RouletteVibeModal';
import Colors from '../constants/Colors';
import { AuthProvider } from '../contexts/authContext';
import RouletteBudgetModal from '../components/RouletteBudgetModal';
import RouletteRestaurantModal from '../components/RouletteRestaurantModal';

export default function RootLayout() {
  const pathname = usePathname();
  const hiddenRoutes = [
    '/screens/SignupUser',
    '/screens/SignupRestaurant',
    '/screens/SignupInterestsScreen',
    // '/screens/RouletteFilterModal',
    '/screens/Roulette'
  ];
  const shouldHideTabBar = hiddenRoutes.includes(pathname);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showRouletteModal, setShowRouletteModal] = useState(false);
  const [showVibeModal, setShowVibeModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.orange.orangeStandard,
          tabBarInactiveTintColor: Colors.orange.orangeStandard,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            display: shouldHideTabBar ? 'none' : 'flex',
            height: 66,
            backgroundColor: 'white',
            borderTopWidth: 1.5,
            borderColor: Colors.orange.orangeStandard,
          },
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={{ color: 'transparent' }} />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
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
            )
          }}
        />
        <Tabs.Screen
          name="screens/Search/index"
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
          name="screens/Roulette/index"
          options={{
            tabBarShowLabel: false,
            tabBarButton: () => (
              <Pressable
                onPress={() => setShowRouletteModal(true)}
              >
                <Image
                  source={require('../../assets/images/icon-roleta.png')}
                  style={{ width: 60, height: 60 }}
                />
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="screens/Community/index"
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
          name="screens/Profile/index"
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
          name="screens/SignupInterestsScreen/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
        <Tabs.Screen
          name="screens/restaurantProfile/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
        <Tabs.Screen
          name="screens/SignupRestaurant/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
        <Tabs.Screen
          name="screens/SignupUser/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
        <Tabs.Screen
          name="screens/CreateReview/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
        <Tabs.Screen
          name="screens/FilterScreen/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
        <Tabs.Screen
          name="screens/Feed/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
        <Tabs.Screen
          name="screens/AddMedia/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
        {/* <Tabs.Screen
          name="screens/RouletteFilterModal/index"
          options={{ href: null, tabBarShowLabel: false }}
        /> */}
        <Tabs.Screen
          name="screens/PublicationInfluencer/index"
          options={{ href: null, tabBarShowLabel: false }}
        />
      </Tabs>

      <RouletteFilterModal
        visible={showRouletteModal}
        onClose={() => setShowRouletteModal(false)}
        onVibeRequest={() => {
          setShowRouletteModal(false);
          setShowVibeModal(true);
        }}
      />

      <RouletteVibeModal
        visible={showVibeModal}
        onClose={() => setShowVibeModal(false)}
        onSelect={(selected) => {
          console.log('Vibe selecionada:', selected);
          setShowVibeModal(false);
          setShowBudgetModal(true);
        }}
      />

      <RouletteBudgetModal
        visible={showBudgetModal}
        onClose={() => setShowBudgetModal(false)}
        onSelect={(selected) => {
          console.log('Orçamento selecionado:', selected);
          setShowBudgetModal(false);
          setShowRestaurantModal(true);
          router.push('/screens/Roulette');
        }}
      />
    </AuthProvider>
  );
}
