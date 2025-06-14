import React from 'react';
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../Button';
import Colors from '@/src/constants/Colors';

type RouletteRestaurantModalProps = {
    visible: boolean;
    onClose: () => void;
    onGoToRestaurant: () => void;
    onSortAgain: () => void;
    imageUrl: string;
    restaurantName: string;
    currentVibe: string;
    currentBudget: string;
};

const RouletteRestaurantModal = ({
    visible,
    onClose,
    onGoToRestaurant,
    imageUrl,
    restaurantName,
    onSortAgain
}: RouletteRestaurantModalProps) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalContainer} onPress={onClose}>
                <Pressable
                    style={styles.modalContent}
                    onPress={(e) => e.stopPropagation()}
                >
                    <Text style={styles.textModal}>O restaurante sorteado é</Text>
                    <Text style={styles.textModal}>{restaurantName}</Text>
                    <Image
                        source={
                            imageUrl
                                ? { uri: imageUrl }
                                : require('../../../assets/images/restaurant.png')
                        }
                        style={styles.image}
                    />
                    <View style={styles.buttonsContainer}>
                        <Button
                            title="Ir para o restaurante"
                            onPress={onGoToRestaurant}
                            type="orange"
                            style={styles.button}
                        />
                        <Button
                            title="Sortear novamente"
                            onPress={onSortAgain}
                            type="white"
                            style={styles.button}
                        />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparent.blackOverlayDark,
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        width: 260,
        padding: 20,
        alignItems: 'center',
    },
    textModal: {
        fontSize: 20,
        color: Colors.orange.orangeStandard,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 90,
        marginBottom: 20,
    },
    buttonsContainer: {
        width: '100%',
    },
    button: {
        width: '100%',
        marginBottom: 10,
    },
});

export default RouletteRestaurantModal;
