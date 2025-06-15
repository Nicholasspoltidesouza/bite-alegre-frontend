import Colors from '@/src/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RatingSummaryCard = ({ score = 4.7, reviewCount = 57, distribution = [75, 18, 4, 2, 1] }) => {

  const formattedScore = score.toFixed(1).replace('.', ',');

  return (
    <View style={styles.cardContainer}>
      <View style={styles.scoreSection}>
        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreText}>{formattedScore}</Text>
          <FontAwesome
            name="star"
            size={22}
            color={Colors.orange.orangeStandard}
            style={styles.starIcon}
          />
        </View>
        <Text style={styles.reviewCountText}>{reviewCount} avaliações</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.distributionSection}>
        {distribution.map((percentage, index) => (
          <View key={index} style={styles.barRow}>
            <Text style={styles.barLabel}>{5 - index}</Text>
            <View style={styles.barBackground}>
              <View style={[styles.barFill, { width: `${percentage}%` }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFEDDC',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  scoreSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: Colors.text.black,
  },
  starIcon: {
    marginLeft: 4,
    marginTop: 12,
  },
  reviewCountText: {
    fontSize: 13,
    color: Colors.gray.grayMedium,
    marginTop: -4,
  },
  divider: {
    width: 2,
    height: '90%',
    backgroundColor: Colors.orange.orangeStandard,
    marginHorizontal: 16,
  },
  distributionSection: {
    flex: 2,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  barLabel: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    width: 15,
    fontSize: 13,
    color: Colors.text.black,
  },
  barBackground: {
    flex: 1,
    height: 7,
    backgroundColor: Colors.gray.grayLight,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: Colors.orange.orangeStandard,
    borderRadius: 5,
  },
});

export default RatingSummaryCard;