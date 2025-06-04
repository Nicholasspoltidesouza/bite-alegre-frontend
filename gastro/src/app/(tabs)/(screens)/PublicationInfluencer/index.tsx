import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { usePublicationApi } from '@/src/hooks/usePublicationApi';
import { PublicationDTO } from '@/src/@types/DTO';

export default function PublicationInfluencer() {
  const router = useRouter();
  const { publicationId } = useLocalSearchParams<{ publicationId: string }>();
  const { getPublicationById, loading } = usePublicationApi();
  const [publication, setPublication] = useState<PublicationDTO | null>(null);

  useEffect(() => {
    if (typeof publicationId === 'string') {
      getPublicationById(publicationId).then((data) => {
        if (data) {
          setPublication(data);
        }
      });
    }
  }, [publicationId]);

  if (loading || !publication) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.orange.orangeStandard} />
      </View>
    );
  }

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
          <Image style={styles.postImage} source={{ uri: publication.url }} />
        </View>

        <Text style={styles.description}>{publication.description}</Text>

      
        <View style={styles.restauranteRow}>
          <Image
            source={{ uri: publication.restaurant_photo}}
            style={styles.restaurantImage}
          />
          <View style={styles.nameAndTagsColumn}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/restaurantProfile',
                  params: { restaurantId: publication.restaurant_id },
                })
              }
            >
              <Text style={styles.restaurantName}>
                {publication.restaurant_name}
              </Text>
            </TouchableOpacity>

    
            <View style={styles.tagsRow}>
              {publication.restaurant_tags?.map((tag) => (
                <Text key={tag.id} style={styles.tag}>
                  {tag.name}
                </Text>
              ))}
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
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    backgroundColor: '#E0E0E0',
    color: '#666',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 13,
    marginRight: 6,
    marginBottom: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});