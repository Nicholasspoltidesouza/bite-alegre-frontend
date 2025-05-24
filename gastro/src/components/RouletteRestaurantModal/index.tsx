import { useRouter } from 'expo-router';
import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import Button from '../Button';

type BaseModalProps = {
    visible: boolean;
    onClose: () => void;
    onVibeRequest: () => void;
    imageUrl: string;
    nomeDoRestaurante: string;
};

const RouletteRestaurantModal = ({ visible, onClose, onVibeRequest, imageUrl, nomeDoRestaurante }: BaseModalProps) => {
    const router = useRouter();

    const handleSurprise = () => {
        onClose();
        router.push('/screens/Roulette');
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.modalContainer} onPress={onClose}>
                <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                    <Text style={styles.textModal}>
                        O restaurante sorteado é
                    </Text>
                    <Text style={styles.textModal}>
                        {nomeDoRestaurante}
                    </Text>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <View style={styles.buttonsContainer}>
                        <Button
                            title="Ir para o restaurante"
                            onPress={onVibeRequest}
                            type="orange"
                            style={styles.button}
                        />
                        <Button
                            title="Retornar para o sorteio"
                            onPress={handleSurprise}
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        width: 260,
        padding: 20,
        alignItems: 'center',
    },
    textModal: {
        fontSize: 17,
        color: '#FF914B',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
