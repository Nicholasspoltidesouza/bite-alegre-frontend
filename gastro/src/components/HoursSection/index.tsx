import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../Button';

interface OperatingHour {
  day: string;
  time: string;
}

interface Props {
  hours: OperatingHour[];
  onAdd: () => void;
}

const HoursSection: React.FC<Props> = ({ hours, onAdd }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Funcionamento</Text>
        <TouchableOpacity onPress={onAdd} style={styles.addButton}>
        <MaterialCommunityIcons
        name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Dia</Text>
        <Text style={styles.listTitle}>Horário</Text>
      </View>

      <FlatList
        data={hours}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFEBDD',
        borderRadius: 20,
        paddingTop: 10,
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 1,
        marginBottom: 13,
        width: 326,
        height: 180 ,
        overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF914B',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  addButton: {
    backgroundColor: '#FFA552',
    borderRadius: 999,
    padding: 4,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  listTitle: {
    color: '#FF914B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  day: {
    color: '#444',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  time: {
    color: '#444',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default HoursSection;