import React, { useEffect, useState } from 'react';
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
  onSelect: (value: number) => void;
};

const budgetOptions = [
  { label: 'Até R$ 50', value: 50 },
  { label: 'Até R$ 100', value: 100 },
  { label: 'Tanto faz', value: 999999 },
];

const RouletteBudgetModal = ({ visible, onClose, onSelect }: RouletteBudgetModalProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (!visible) {
      setSelected(null);
    }
  })

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Qual o orçamento?</Text>
          <ScrollView contentContainerStyle={styles.tagsContainer}>
            {budgetOptions.map((budget) => (
              <Tag
                key={budget.value}
                title={budget.label}
                isSelected={selected === budget.value}
                onPress={() => {
                  setSelected(budget.value);
                  onSelect(budget.value);
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
