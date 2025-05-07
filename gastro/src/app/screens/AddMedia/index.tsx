import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Button from "@/src/components/Button";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomTextInput from "@/src/components/TextFieldCadastroUsuario";

const AddMedia = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [restaurantSearch, setRestaurantSearch] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const validateDescription = (text: string): string | null => {
    if (text.length > 200)
      return "Descrição não pode ter mais de 200 caracteres";
    return null;
  };

  const isFormValid = true; // se a foto ainda não foi adicionada vai ser false



  const handleAddMedia = () => {
    // lógica para escolher se vai abrir a camera ou a galeria
    pickImage
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert('Você precisa permitir o acesso à galeria!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCreate = () => {
    const errors = [
        validateDescription(description),
    ].filter((error) => error != null);
    if (!description || !restaurantSearch) {
      Alert.alert("Erro", "Descrição e restaurante são obrigatórios.");
      return;
    }

    // ajustar lógica de criação
    Alert.alert("Sucesso", "sucesso!");
    router.back();

    
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <SafeAreaView
        style={[
          styles.safeArea,
          Platform.OS === "ios" && { marginTop: -insets.top },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.buttonContainer}>
            <Button
              title="Adicionar Mídia"
              type="orange"
              onPress={handleAddMedia}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Descrição"
              style={[styles.input]}
              validation={validateDescription}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={description}
              onChangeText={setRestaurantSearch}
              placeholder="Resataurante"
              style={[styles.input]}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={description}
              onChangeText={setTags}
              placeholder="Tags"
              style={[styles.input]}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Criar"
              type="orange"
              onPress={handleCreate}
              disabled={!isFormValid}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    alignItems: "center",
    padding: "4%",
    paddingBottom: "8%",
    width: "100%",
  },
  inputWrapper: {
    width: "90%",
    marginBottom: "5%",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "rgba(255, 179, 112, 0.25)",
    paddingLeft: 24,
    paddingRight: 16,
    color: "#000000",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: "5%",
  },
  halfInputWrapper: {
    width: "48%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 24,
    fontFamily: "Poppins-Regular",
  },
  buttonContainer: {
    marginTop: "2%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default AddMedia;
