import { ReviewDTO } from '@/src/@types/DTO';
import Colors from '@/src/constants/Colors';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
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
    router.push({
        pathname: '/screens/restaurantProfile',
        params: {
            restaurantId: review.restaurantId,
        },
    });
};

return (
    <TouchableOpacity     
        onPress={handlePress}
        style={styles.card}
        >
        <View style={styles.header}>
            <View style={{backgroundColor: Colors.background, borderRadius: 50}}>
                {review.restaurantProfilePhoto ? (
                    <Image
                    source={{ uri: review.restaurantProfilePhoto }}
                    style={styles.logo}
                    />
                        ) : (
                    <MaterialIcons name="store" size={40} color="#fcd5b5" style={{padding: '2%'}} />
                )}
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.restaurantName}>
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
        <Text style={styles.reviewText}>
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
    },
    titleContainer: {
        marginLeft: 12,
        justifyContent: 'center',
        gap: '5%'
    },
    restaurantName: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: Colors.text.standard,
        marginBottom: '2%',
    },
    stars: {
        gap: '3%',
        flexDirection: 'row',
    },
    reviewText: {
        color: Colors.text.black,
        fontSize: 12,
        marginTop: 8,
        fontFamily: 'Poppins-Medium',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 16,
    },
});