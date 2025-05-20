import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  DimensionValue,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';

interface DropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  placeholder?: string;
  onSelect: (option: string) => void;
  iconSize?: number;
  iconColor?: string;
  width?: DimensionValue;
  paddingLeft?: DimensionValue;
  paddingRight?: DimensionValue;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  textColor?: string;
  backgroundColor?: string;
}

const Dropdown = ({
  options,
  selected,
  placeholder,
  onSelect,
  iconSize = 20,
  iconColor = Colors.orange.orangeStandard,
  width = '100%',
  textColor = Colors.orange.orangeStandard,
  backgroundColor = 'rgba(255, 179, 112, 0.25)',
  justifyContent = 'space-between',
  paddingLeft = 16,
  paddingRight = 16,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={toggleDropdown}
        activeOpacity={0.7}
        style={[
          styles.dropdownButton,
          { width, backgroundColor, justifyContent, paddingLeft, paddingRight },
        ]}
      >
        <Text style={[styles.text, { color: textColor }]}>
          {selected || placeholder}
        </Text>
        <MaterialIcons
          name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={iconSize}
          color={iconColor}
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <ScrollView>
                {options.map((option, idx) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      onSelect(option);
                      closeDropdown();
                    }}
                    style={[
                      styles.optionItem,
                      idx !== options.length - 1 && styles.optionBorder,
                    ]}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
    paddingLeft: 24,
    paddingRight: 16,
  },
  text: {
    color: Colors.orange.orangeStandard,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 16,
  },
  dropdownContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 179, 112, 0.75)',
    width: 327,
    maxHeight: Dimensions.get('window').height * 0.4,
    overflow: 'hidden',
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 179, 112, 0.75)',
  },
  optionText: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default Dropdown;
