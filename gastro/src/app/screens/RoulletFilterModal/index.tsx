import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';
import { useRouter } from 'expo-router';
import { useCreateUser } from '@/src/hooks/useUserApi';

type BaseModalProps = {
    visible: boolean;
    onClose: () => void;
}

const RoulletFilter: React.FC<BaseModalProps> = ({ visible, onClose}) => {
      const { logout } = useCreateUser();
      const router = useRouter();
      const handleLogout = async () => {
        try {
          onClose();
          await logout();
          router.replace('/');
        } catch (error) {
          console.error('Erro ao fazer logout:', error);
        }
      };

      return (
        <Modal 
            transparent={true}
            visible={visible}
            animationType='fade'
      //      onRequestClose={onclose}
        >
            <View >
                <Text>Mais ou menos</Text>
                <Text>Me surpreenda!</Text>
            </View>
        </Modal>
            
      );
};

export default RoulletFilter;