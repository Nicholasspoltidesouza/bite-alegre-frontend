import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <View style={styles.container}>
      {/* Header do Accordion */}
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        {/* Ícone que muda dinamicamente */}
        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={34}
          color={Colors.orange.tint}
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontFamily: "",
    color: "#333",
  },
  content: {
    backgroundColor: "#fff",
    fontFamily: "",
  },
  contentText: {
    fontSize: 14,
    color: "#555",
  },
});

export default Accordion;