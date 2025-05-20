import { ReviewDTO } from '@/src/@types/DTO';
import Colors from '@/src/constants/Colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
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
        style={styles.card}
        >
        <View style={styles.header}>
            <View style={{backgroundColor: Colors.background, borderRadius: 50, padding: '2%'}}>
                {review.restaurantProfilePhoto ? (
                    <Image source={{ uri: review.restaurantProfilePhoto }} />
                        ) : (
                    <MaterialIcons name="store" size={40} color="#fcd5b5" />
                )}
            </View>
            <View style={styles.titleContainer}>
                <Text>
                    {review.restaurantName}
                </Text>
                <View style={styles.stars}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <FontAwesome
                            key={i}
                            name="star"
                            size={15}
                            color={
                            i < review.stars! ? Colors.orange.orangeStandard : '#FF914B40'
                            }
                        />
                    ))}
                </View>
            </View>
        </View>
        <Text>
            {review.feedback}
        </Text>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff3ec',
        borderRadius: 12,
        padding: '5%',
        margin: '5%',
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        marginBottom: '2%',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
    },
    titleContainer: {
        marginLeft: 12,
        justifyContent: 'center',
        gap: '5%'
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f7943e',
        marginBottom: '2%',
    },
    stars: {
        gap: '3%',
        flexDirection: 'row',
    },
    reviewText: {
        color: '#333',
        fontSize: 14,
        marginTop: 8,
    },
});