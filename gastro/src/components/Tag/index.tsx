import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface TagProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isSelected?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onPress?: () => void;
  controlled?: boolean;
}

const Tag: React.FC<TagProps> = ({
  title,
  style,
  textStyle,
  isSelected = false,
  icon,
  iconPosition = "left",
  onPress,
  controlled = false,
}) => {
  const [selected, setSelected] = useState(isSelected);
  useEffect(() => setSelected(isSelected), [isSelected]);

  const handlePress = () => {
    if (!controlled) setSelected((s) => !s);
    onPress?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          paddingHorizontal: 20,
          height: 40,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selected
            ? "rgba(255,179,112,0.25)"
            : "rgba(227,225,225,0.8)",
          minWidth: 100,
        },
        style,
      ]}
      onPress={handlePress}
    >
      {icon && iconPosition === "left" && (
        <View style={{ marginRight: 6 }}>{icon}</View>
      )}

      <Text
        style={[
          {
            fontFamily: "Poppins-Regular",
            fontSize: 16,
            fontWeight: "400",
            color: selected
              ? "rgba(255,145,75,0.8)"
              : "rgba(143,143,143,0.8)",
          },
          textStyle,
        ]}
      >
        {title}
      </Text>

      {icon && iconPosition === "right" && (
        <View style={{ marginLeft: 6 }}>{icon}</View>
      )}
    </TouchableOpacity>
  );
};

export default Tag;
