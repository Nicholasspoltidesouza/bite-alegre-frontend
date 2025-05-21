import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import Tag from '../Tag';


type RouletteVibeModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
};

const vibeOptions = [
  'Date', 'Amigos', 'Trabalho',
  'Happy Hour', 'Família', 'Festa',
  'Comemoração', 'Tranquilo',
];

const RouletteVibeModal = ({ visible, onClose, onSelect }: RouletteVibeModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Qual a vibe de hoje?</Text>
          <ScrollView contentContainerStyle={styles.tagsContainer}>
            {vibeOptions.map((vibe) => (
              <Tag
                key={vibe}
                title={vibe}
                isSelected={selected === vibe}
                onPress={() => {
                  setSelected(vibe);
                  onSelect(vibe);
                }}
                controlled
              />
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '85%',
    maxHeight: '75%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: '#FF914B',
    marginBottom: 24,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
});

export default RouletteVibeModal;
