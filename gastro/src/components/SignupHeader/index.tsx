import Colors from '@/src/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProfileIcon = "person" | "store";

interface SignupHeaderProps {
  urlProfilePhoto?: string;
  onBack?: () => void;
  onPhotoPress?: () => void;
  userType: string | null;
  setUserType: (value: string) => void;
  profileIcon: ProfileIcon;
}

const SignupHeader = ({ urlProfilePhoto, onBack, onPhotoPress, userType, setUserType, profileIcon }: SignupHeaderProps) => {

  return (
    <SafeAreaView>
      <View style={styles.banner}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color= {Colors.white} />
        </TouchableOpacity>
        <View style={styles.userTypeContainer}>
          <Text style={styles.userTypeText}>
            {userType}
          </Text>
        </View>
        <View style={styles.photoContainer}>
          <Text style={styles.title}>ESCOLHA SUA FOTO</Text>
          <TouchableOpacity style={styles.profileContainer} onPress={onPhotoPress}>
            {urlProfilePhoto ? (
              <Image source={{ uri: urlProfilePhoto }} style={styles.profileImage} />
            ) : (
              <MaterialIcons name={profileIcon} size={30} color="rgba(255,255,255,0.85)" />
            )}
            <View style={styles.cameraIcon}>
              <MaterialIcons name="photo-camera" size={20} color= {Colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 190,
    backgroundColor: Colors.orange.orangeStandard,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 57,
    left: 30,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 100,
    padding: 10,
  },
  userTypeText: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginTop: 24,
  },
  userTypeContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    top: 40,
    marginBottom: 20
  },
  title: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '500',
    marginTop: 10,
  },
  profileContainer: {
    width: 56,
    height: 56,
    borderRadius: 35,
    backgroundColor: Colors.orange.orangeMedium,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderRadius: 6,
    padding: 2,
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 15,
  },
});

export default SignupHeader;
