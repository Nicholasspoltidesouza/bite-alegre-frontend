import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OperatingHoursDto } from '../../@types/OperatingHoursDto';

interface Props {
  hours: OperatingHoursDto[];
  onAdd: () => void;
  onPressItem?: (item: OperatingHoursDto, index: number) => void;
}

const HoursSection: React.FC<Props> = ({ hours, onAdd, onPressItem }) => {
  const [operatingHours, setOperatingHours] = useState<OperatingHoursDto[]>(hours);

  const handleAddOperatingHour = () => {
    const mockHour = {
      day: 'Feriados',
      time: '12:00 – 15:00',
    };
    setOperatingHours((prev) => [...prev, mockHour]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Funcionamento</Text>
        <TouchableOpacity onPress={handleAddOperatingHour} style={styles.addButton}>
          <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Dia</Text>
        <Text style={styles.listTitle}>Horário</Text>
      </View>

      <FlatList
        data={operatingHours}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.row} onPress={() => onPressItem?.(item, index)}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFB37025',
    borderRadius: 20,
    paddingRight: 32,
    marginTop: 1,
    marginBottom: 13,
    width: 327,
    height: 'auto',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF914B',
    padding: 10,
    borderRadius: 20,
    width: 327,
    height: 50,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    left: 16,
  },
  addButton: {
    backgroundColor: '#FFA552',
    borderRadius: 999,
    padding: 4,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  listTitle: {
    color: '#FF9500',
    fontWeight: 'bold',
    fontSize: 14,
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  day: {
    color: '#5B5B5B',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  time: {
    color: '#5B5B5B',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  flatListContainer: {
    paddingBottom: 10,
    paddingHorizontal: 4,
  },
});

export default HoursSection;
