import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';

export default function PublicationInfluencer() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign
            name="left"
            size={20}
            color={Colors.orange.orangeStandard}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Publicação</Text>
        <View />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          style={styles.postImage}
          source={{
            uri: 'https://lirp.cdn-website.com/33406c6e/dms3rep/multi/opt/pizzaria-1920w.jpg',
          }}
        />

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  backButton: {
    backgroundColor: '#fdd9bc',
    padding: 10,
    borderRadius: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange.orangeStandard,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1 / 1.2,
    borderRadius: 12,
    resizeMode: 'cover',
    overflow: 'hidden',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#222',
    lineHeight: 20,
    marginBottom: 24,
  },
});
