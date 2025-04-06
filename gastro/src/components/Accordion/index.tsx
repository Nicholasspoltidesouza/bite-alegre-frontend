import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";

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
    <View style={styles.container}>
      {/* Header do Accordion */}
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        {children}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {/* Ícone que muda dinamicamente */}
        <MaterialIcons
          name={staticArrow ? "keyboard-arrow-right" : isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={34}
          color={'#FF914B'}
        />
      </TouchableOpacity>

      {/* Conteúdo do Accordion */}
      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontFamily: "",
    color: "#333",
    marginLeft: 15,
    marginRight: 15
  },
  content: {
    backgroundColor: "#fff",
    fontFamily: "",
  },
  contentText: {
    fontSize: 14,
    color: "#555",
  },
  description: {
    fontSize: 12,
    color: 'gray',
  }
});

export default Accordion;