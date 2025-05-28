import {PublicationDTO } from '@/src/@types/DTO';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const columnWidth = screenWidth / 2 - 8;

interface Props {
  images: PublicationDTO[];
}

const handlePress = (postId: string) => {
    router.push({
        pathname: '/PublicationInfluencer',
        params: {
            postId: postId,
        },
    });
};

export const Publications: React.FC<Props> = ({ images }) => {
  const [leftColumn, setLeftColumn] = useState<any[]>([]);
  const [rightColumn, setRightColumn] = useState<any[]>([]);

  useEffect(() => {
    let leftHeight = 0;
    let rightHeight = 0;

    const left: any[] = [];
    const right: any[] = [];

    let processed = 0;

    images.forEach(image => {
      Image.getSize(
        image.url!,
        (width, height) => {
          const scaledHeight = (columnWidth * height) / width;
          const imageWithHeight = { ...image, height: scaledHeight };

          if (leftHeight <= rightHeight) {
            left.push(imageWithHeight);
            leftHeight += scaledHeight;
          } else {
            right.push(imageWithHeight);
            rightHeight += scaledHeight;
          }

          processed++;
          if (processed === images.length) {
            setLeftColumn(left);
            setRightColumn(right);
          }
        },
        (error) => {
          console.warn(`Erro ao carregar imagem ${image.url}`, error);
          processed++;
          if (processed === images.length) {
            setLeftColumn(left);
            setRightColumn(right);
          }
        }
      );
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {leftColumn.map((image, index) => (
          <TouchableOpacity key={`left-${image.id ?? index}`} 
            style={styles.imageContainer} 
            onPress={() => handlePress(image.restaurant_id)}>
            <Image
              source={{ uri: image.url }}
              style={{
                width: columnWidth,
                height: image.height,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.column}>
        {rightColumn.map((image, index) => (
          <TouchableOpacity 
            key={`right-${image.id ?? index}`} 
            style={styles.imageContainer} 
            onPress={() => handlePress(image.restaurant_id)}>
          <Image
            source={{ uri: image.url }}
            style={{
              width: columnWidth,
              height: image.height,
            }}
          />
        </TouchableOpacity>
      ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  column: {
    flexDirection: 'column',
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
});
