import { useFetchTags } from '@/src/hooks/useFetchTags';
import React, { useEffect, useState } from 'react';
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

const RouletteVibeModal = ({ visible, onClose, onSelect }: RouletteVibeModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { getTags, tags, loading: tagsLoading, error } = useFetchTags();

  useEffect(() => {
    if (visible) {
      getTags();
      setSelected(null);
    }
  }, [visible]);

  const vibeOptions = tags.filter((tag) => tag.type === 'OCASIAO');

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Qual a vibe de hoje?</Text>
          <ScrollView contentContainerStyle={styles.tagsContainer}>
            {tagsLoading && <Text style={{ color: '#FF914B', marginBottom: 10 }}>Carregando...</Text>}
            {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
            {vibeOptions.map((tag) => (
              <Tag
                key={tag.id}
                title={tag.name}
                isSelected={selected === tag.id}
                onPress={() => {
                  setSelected(tag.id);
                  onSelect(tag.id);
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
    marginBottom: 20,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
  },
});

export default RouletteVibeModal;
