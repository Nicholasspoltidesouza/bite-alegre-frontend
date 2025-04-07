import React, { useRef } from "react";
import { View, StyleSheet, Text, Image, Animated, TouchableOpacity } from "react-native";
import { Foundation } from '@expo/vector-icons';

interface PhotoDishProps {
    urlFotoPrato: string;
    descricao: string;
    size?: number;
    showStar?: boolean;
}

const PhotoDish: React.FC<PhotoDishProps> = ({ urlFotoPrato, descricao, size = 200, showStar = false }) => {
    const flipAnim = useRef(new Animated.Value(0)).current;
    let isFlipped = false;

    const styles = StyleSheet.create({
        container: {
            borderRadius: 20,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            position: 'relative',
        },
        card: {
            width: size,
            height: size,
            backfaceVisibility: 'hidden',
        },
        image: {
            borderRadius: 20,
            resizeMode: 'cover',
        },
        backCard: {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8f8f8',
            borderRadius: 20,
            padding: 15,
        },
        descriptionText: {
            fontSize: 16,
            textAlign: 'center',
            color: '#333',
        },
        starIcon: {
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1,
        },
    });

    const flipCard = () => {
        Animated.spring(flipAnim, {
            toValue: isFlipped ? 0 : 180,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start(() => {
            isFlipped = !isFlipped;
        });
    };

    const frontInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }],
    };

    const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }],
    };

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={flipCard}>
            <View style={[styles.container, { width: size, height: size }]}>
                {showStar && (
                    <View style={styles.starIcon}>
                        <Foundation name="star" size={24} color="#FF914B" />
                    </View>
                )}
                <Animated.View style={[styles.card, frontAnimatedStyle]}>
                    <Image 
                        source={{ uri: urlFotoPrato }} 
                        style={[styles.image, { width: size, height: size }]} 
                    />
                </Animated.View>
                
                <Animated.View style={[styles.card, styles.backCard, backAnimatedStyle]}>
                    <Text style={styles.descriptionText}>{descricao}</Text>
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};

export default PhotoDish;