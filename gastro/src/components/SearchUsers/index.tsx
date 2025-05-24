import Colors from '@/src/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SearchUsersProps {
  name: string;
  nickname: string;
  profilePhoto: string;
  useId: string;
  influencer : boolean;
}

const SearchUsers: React.FC<SearchUsersProps> = ({
  name,
  nickname,
  profilePhoto,
  useId,
  influencer,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>{
        if(influencer) {
          router.push
          ({
            pathname: '/screens/Influencer/InfluencerProfile',
            params: {
              userId: useId,
            },
          })
      }
        else {
          router.push
          ({
            pathname: '/screens/Profile',
            params: {
              userId: useId,
            },
          })
        }
    }
  }
    >
      <View style={styles.imageContainer}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.image} />
        ) : (
          <View style={styles.placeholderPhoto}>
            <MaterialIcons name="image" size={32} color="#888" />
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nickname}>@{nickname}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 6,
    marginHorizontal: 12,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    width: 86,
    height: 86,
    borderRadius: 20,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  image: {
    width: 86,
    height: 86,
    borderRadius: 65,
  },
  placeholderPhoto: {
    width: 86,
    height: 86,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.orange.orangeStandard,
    marginBottom: 4,
  },
  nickname: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
});

export default SearchUsers;
