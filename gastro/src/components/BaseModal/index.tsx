import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthApi } from '@/src/hooks/useAuthApi';
import { useAuthContext } from '@/src/contexts/authContext'; 

type BaseModalProps = {
  visible: boolean;
  onClose: () => void;
};

const BaseModal: React.FC<BaseModalProps> = ({ visible, onClose }) => {
  const { logout } = useAuthApi();
  const { role } = useAuthContext(); 

  const handleLogout = async () => {
    try {
      await logout(); 
      onClose();
      router.replace('/Home');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleProfileEdit = () => {
    onClose();
    switch (role) {
      case 'RESTAURANT':
        router.push('/RestaurantProfilePatch');
        break;
      case 'USER':
        router.push('/UserProfilePatch');
        break;
      case 'INFLUENCER':
        router.push('/UserProfilePatch');
        break;
      default:
        console.warn(`Unexpected role: ${role}`);
        router.push('/Home'); 
        break;
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.degrade}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign
              name="close"
              size={18}
              color={Colors.orange.orangeStandard}
            />
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.outlinedButton}
              onPress={handleLogout}
            >
              <Text style={styles.outlinedText}>Sair do perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filledButton}
              onPress={handleProfileEdit}
            >
               <Text style={styles.filledText}>
               Editar perfil 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  degrade: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 26,
    width: '80%',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 1,
    right: 10,
    padding: 4,
    zIndex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  outlinedButton: {
    borderColor: Colors.orange.orangeStandard,
    borderWidth: 2,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  outlinedText: {
    color: Colors.orange.orangeStandard,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filledButton: {
    backgroundColor: Colors.orange.orangeStandard,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  filledText: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BaseModal;