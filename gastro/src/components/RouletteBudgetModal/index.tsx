import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import Tag from '../Tag';


type RouletteBudgetModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
};

const budgetOptions = [
  'Até R$ 50', 'Até R$ 100', 'Acima de R$ 100',
];

const RouletteBudgetModal = ({ visible, onClose, onSelect }: RouletteBudgetModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Qual o orçamento?</Text>
          <ScrollView contentContainerStyle={styles.tagsContainer}>
            {budgetOptions.map((budget) => (
              <Tag
                key={budget}
                title={budget}
                isSelected={selected === budget}
                onPress={() => {
                  setSelected(budget);
                  onSelect(budget);
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
    padding: 20,
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
    gap: 5,
    justifyContent: 'center',
  },
});

export default RouletteBudgetModal;
