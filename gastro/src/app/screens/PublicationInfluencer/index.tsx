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
import { useRouter } from 'expo-router';

export default function PublicationInfluencer() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={() => router.back()}
        >
          <AntDesign
            name="left"
            size={20}
            color={Colors.orange.orangeStandard}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Publicação</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.postImage}
            source={{
              uri: 'https://lirp.cdn-website.com/33406c6e/dms3rep/multi/opt/pizzaria-1920w.jpg',
            }}
          />
        </View>

        <Text style={styles.description}>
          A pizzaria napolitana é especializada em trazer a autêntica experiência italiana aos amantes da boa pizza. Com massas leves e fermentação natural, suas pizzas são assadas em f
          orno a lenha em altíssimas temperaturas, resultando em bordas infladas e sabor levemente defumado. Ingredientes frescos, como molho de tomate San Marzano, mozzarella de b
          úfala e manjericão, garantem o equilíbrio perfeito entre 
          simplicidade e sabor.
    
        </Text>

        <View style={styles.restauranteRow}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHziDArbpect3kgH--Ytr-W5hXyfw6W7IXRQ&s',
            }}
            style={styles.restaurantImage}
          />
          <View style={styles.nameAndTagsColumn}>
            <TouchableOpacity onPress={() => router.push('../restaurantProfile')}>
              <Text style={styles.restaurantName}>Marques Pizzaria</Text>
            </TouchableOpacity>
            <View style={styles.tagsRow}>
              <Text style={styles.tag}>Restaurante</Text>
              <Text style={styles.tag}>Pizzaria</Text>
            </View>
          </View>
        </View>
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
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  sideButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fdd9bc',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  headerTitle: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.orange.orangeStandard,
    zIndex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1 / 1.2,
    resizeMode: 'cover',
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.black,
    lineHeight: 20,
    marginBottom: 24,
  },
  restauranteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  nameAndTagsColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.orange.orangeStandard,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tag: {
    backgroundColor: '#E0E0E0',
    color: '#666',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 13,
  },
});
