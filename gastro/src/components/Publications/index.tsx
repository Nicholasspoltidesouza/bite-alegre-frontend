import { ImageItem } from '@/src/@types/DTO';
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const columnWidth = screenWidth / 2 - 8;

interface Props {
  images: ImageItem[];
}

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
        image.uri,
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
          console.warn(`Erro ao carregar imagem ${image.uri}`, error);
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
        {leftColumn.map(image => (
          <View key={image.id} style={styles.imageContainer}>
            <Image
              source={{ uri: image.uri }}
              style={{
                width: columnWidth,
                height: image.height,
              }}
            />
          </View>
        ))}
      </View>
      <View style={styles.column}>
        {rightColumn.map(image => (
          <View key={image.id} style={styles.imageContainer}>
            <Image
              source={{ uri: image.uri }}
              style={{
                width: columnWidth,
                height: image.height,
              }}
            />
          </View>
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
