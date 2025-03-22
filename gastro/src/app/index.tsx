import React from "react";
import { View } from "react-native";
import TextInputExample from "../components/TextFieldCadastroUsuario";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <TextInputExample />
    </View>
  );
}