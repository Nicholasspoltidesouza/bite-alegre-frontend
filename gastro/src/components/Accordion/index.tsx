import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface AccordionProps {
  title: string;
  description: string;
  content: string;
  staticArrow: boolean;
  children: React.ReactNode; 
}

const Accordion: React.FC<AccordionProps> = ({ title, description, content, staticArrow, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <View style={styles.leftItens}>
          <View style={styles.icon} >{children}</View>                  
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <MaterialIcons
          name={staticArrow ? "keyboard-arrow-right" : isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={34}
          color={'#FF914B'}
        />
      </TouchableOpacity>
      {isOpen && (
        <Text style={styles.contentText}>{content}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftItens: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
    marginLeft: 8,
    marginRight: 8
  },
  contentText: {
    fontSize: 14,
    color: "#555",
    paddingLeft: 27,
  },
  description: {
    fontSize: 11,
    color: 'gray',
  }
});

export default Accordion;