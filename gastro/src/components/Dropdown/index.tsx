import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
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
} from "react-native";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  placeholder?: string;
  onSelect: (option: string) => void;
  iconSize?: number;
  iconColor?: string;
  width?: DimensionValue;
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  textColor?: string;
  backgroundColor?: string;
}

const Dropdown = ({ options, selected, placeholder, onSelect, iconSize = 20, iconColor = "#FF914B", width = 327, textColor = "#FF914B", backgroundColor = 'rgba(255, 179, 112, 0.25)', justifyContent = "space-between" }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={toggleDropdown}
        activeOpacity={0.7}
        style={[styles.dropdownButton, { width, backgroundColor, justifyContent }]}
      >
        <Text style={[styles.text, { color: textColor }]}>
          {selected || placeholder}
        </Text>
        <MaterialIcons
          name={isOpen ? "arrow-drop-up" : "arrow-drop-down"}
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
    width: 327,
    marginBottom: 16,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 20,
    paddingLeft: 24,
    paddingRight: 16,
  },
  text: {
    color: "#FF914B",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 16,
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    width: 327,
    maxHeight: Dimensions.get("window").height * 0.4,
    overflow: "hidden",
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  optionBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#rgba(0, 0, 0, 0.4)",
  },
  optionText: {
    color: "#rgba(0, 0, 0, 0.4)",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});

export default Dropdown;
