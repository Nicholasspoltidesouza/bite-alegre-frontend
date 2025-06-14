import { ReviewDTO } from '@/src/@types/DTO';
import Colors from '@/src/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

interface CardReviewProps {
  review: ReviewDTO;
}

export const ReviewItem: React.FC<CardReviewProps> = ({ review }) => {

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.headerContainer}>
          <View style={styles.photo}>
            {review!.restaurantProfilePhoto ? (
              <Image
                source={{ uri: review.restaurantProfilePhoto }}
                style={{ width: 40, height: 40, borderRadius: 50 }} 
                onError={(error) => console.error('Erro ao carregar imagem:', error)}
              />
            ) : (
              <MaterialIcons name="person" size={35} color="#fcd5b5" />
            )}
          </View>
        <Text style={styles.userNameText}>{review.userName}</Text>
      </View>

      <View style={styles.ratingDateContainer}>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={16}
              color={index < review.stars ? Colors.orange.orangeStandard : Colors.orange.orangeLight}
            />
          ))}
        </View>
        {review!.createdAt ? (
          <Text style={styles.dateText}>{formatDate(review.createdAt!)}</Text>
          ) : (
            <Text style={styles.dateText}>Data não disponível</Text>
          )}
      </View>

      <Text style={styles.feedbackText}>{review.feedback}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  photo: {
    backgroundColor: Colors.orange.orangeMedium,
    borderRadius: 50,
    height: 40,
    width: 40,
    alignItems: 'center',
    marginRight: 10,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.black,
  },
  ratingDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  dateText: {
    fontSize: 12,
    color: Colors.text.black,
  },
  feedbackText: {
    fontFamily: 'Popping-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text.black,
  },
});

export default ReviewItem;
