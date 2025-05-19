import { ReviewDTO } from '@/src/@types/DTO';
import Colors from '@/src/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

interface CardReviewProps {
    review: ReviewDTO;
}

export const CardReview: React.FC<CardReviewProps> = ({
    review
}) => {

const handlePress = () => {
};

return (
    <TouchableOpacity     
        onPress={handlePress}
        style={styles.container}
        >
        <View style={styles.photo}>
            {review.restaurantProfilePhoto ? (
            <Image source={{ uri: review.restaurantProfilePhoto }} />
                ) : (
            <MaterialIcons name="person" size={60} color="#fcd5b5" />
        )}
        </View>

        <Text>
            {review.restaurantName}
        </Text>
        <Text>
            {review.stars}
        </Text>
        <Text>
            {review.feedback}
        </Text>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{

    },
    title: {
        
    },
    text: {

    },
    photo: {
        flex: 1,
        backgroundColor: Colors.background,
    }, 
});