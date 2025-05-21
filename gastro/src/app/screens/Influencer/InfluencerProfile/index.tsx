import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Header from '@/src/components/Header';
import Colors from '@/src/constants/Colors';
import InfluencerPageSession from '@/src/components/InfluencerPageSession';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthContext } from '@/src/contexts/authContext';
import { Publications } from '@/src/components/Publications';
import { ImageItem } from '@/src/@types/DTO';

const images: ImageItem[] = [
    { id: '1', uri: 'https://i.pinimg.com/736x/3a/1f/7a/3a1f7a2f270bf6399b734092e9dc4fd5.jpg' },
    { id: '2', uri: 'https://i.pinimg.com/736x/55/7c/19/557c198eaf016b0d72787d34306011ab.jpg' },
    { id: '3', uri: 'https://i.pinimg.com/736x/8f/87/bd/8f87bd41ecf97811cf3cbf955fa841b6.jpg' },
    { id: '4', uri: 'https://i.pinimg.com/736x/e7/f9/29/e7f929707c5648e800de74437a47583f.jpg' },
    { id: '5', uri: 'https://i.pinimg.com/736x/0b/e4/7a/0be47ad5d2427db37badb02293b14fde.jpg' },
    { id: '6', uri: 'https://i.pinimg.com/736x/11/9d/89/119d896e809dbb513e74a82eac654c62.jpg' }
]

export default function InfluencerProfile() {
  const { user } = useAuthContext(); 
  const [ sameUser, setSameUser] = useState(false);
  const [ isLoading, setIsLoading] = useState(true);
  const { userId, isInfluencer } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<'grid' | 'reviews' | 'checkins' | 'user'>('grid');

  const handleAddPress = () => {
    router.push({ pathname: '/screens/AddMedia' });
  };

  useEffect(() => {
    //user-1 vai ser user!.id que vem do AuthContext
    setSameUser(userId === 'user-2');
    setIsLoading(false);
  }, [userId]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color={Colors.orange.orangeStandard}
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }

  function renderComponent() {
    switch (selectedTab) {
      case 'grid':
        return <Publications images={images} />;
      case 'reviews':
        return <View><Text>Reviews Section</Text></View>;
      case 'checkins':
        return <View><Text>Checkins Section</Text></View>;
      case 'user':
        return <View><Text>User Info</Text></View>;
      default:
        return null;
    }
}

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          isProfile={true}
          name={'Manu'}
          nickName={'manu'}
          userView={!sameUser}
        />
        <InfluencerPageSession userView={!sameUser} onTabSelect={setSelectedTab} selectedTab={selectedTab}/>
        {renderComponent()}
      </ScrollView>     
      <TouchableOpacity style={styles.fab} onPress={handleAddPress}>
        <AntDesign name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.orange.orangeStandard,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});