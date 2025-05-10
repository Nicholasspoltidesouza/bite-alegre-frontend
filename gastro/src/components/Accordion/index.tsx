import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

interface AccordionProps {
  title: string;
  description: string;
  content: string;
  staticArrow: boolean;
  children: React.ReactNode;
  onPressAction?: () => void; 
}

const Accordion: React.FC<AccordionProps> = ({ title, description, content, staticArrow, children, onPressAction}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  const handleHeaderPress = () => {
    if (onPressAction) {
      return onPressAction();
    } 
    toggleAccordion();
  };

  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={handleHeaderPress}>
        <View style={styles.leftItens}>
          <View style={styles.icon} >{children}</View>                  
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <MaterialIcons
          name={staticArrow ? "keyboard-arrow-right" : isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={34}
          color={Colors.orange.orangeStandard}
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
    fontFamily: "Poppins-Medium",
    fontWeight: 'bold',
    color: Colors.gray.grayDark,
    marginLeft: 8,
    marginRight: 8
  },
  contentText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: Colors.gray.grayMedium,  
    paddingLeft: 27,
  },
  description: {
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    color: 'gray',
  }
});

export default Accordion;