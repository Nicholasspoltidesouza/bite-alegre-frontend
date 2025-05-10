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
  const [tags, setTags] = useState<string[]>([]);

  const validateDescription = (text: string): string | null => {
    if (text.length > 200)
      return "Descrição não pode ter mais de 200 caracteres";
    return null;
  };

  const validateRestaurant = (text: string): string | null => {
    if (text.length > 50)
      return "Nome do restaurante não possuí mais de 50 caracteres";
    return null
  }
  // validar essa lógica
  const validateTags = (text: string): string | null => {
  const tagsArray = text.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

  if (tagsArray.length < 3) {
    return 'Você precisa adicionar no mínimo 3 tags';
  }

  return null;
};

  const isFormValid = true; // se a foto ainda não foi adicionada vai ser false



  const handleAddMedia = () => {
    Alert.alert(
      "Selecionar Imagem",
      "Deseja tirar uma foto ou escolher da galeria?",
      [
        { text: "Câmera", onPress: openCamera },
        { text: "Galeria", onPress: pickImage },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert('Você precisa permitir o acesso à galeria!');
      return;
    }

    console.log("Abrindo galeria");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled) {
      console.log("Imagem selecionada:", result.assets[0].uri);
      setImageUri(result.assets[0].uri);
    } else {
      console.log("Seleção cancelada");
    }
  };

  const openCamera = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (!permissionResult.granted) {
    alert("Permissão para usar a câmera negada.");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    console.log("Imagem selecionada:", result.assets[0].uri);
    setImageUri(result.assets[0].uri);
  } else {
    console.log("Seleção cancelada");
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
    <View style={styles.containerPrincipal}>
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
        <View style={styles.orangeHeader}>
          <Text style={styles.textCreatePublication}>Criar Publicação</Text>
          <Button
            title="+"
            type="orange"
            onPress={handleAddMedia}
            style={styles.orangeButton}
            textStyle={styles.orangeButtonText}
          />
        </View>
        
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
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
              value={restaurantSearch}
              onChangeText={setRestaurantSearch}
              placeholder="Resataurante"
              style={[styles.input]}
              validation={validateRestaurant}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          

          <View style={styles.inputWrapper}>
            <CustomTextInput
              value={tags.join(', ')}
              onChangeText={(text) => setTags(text.split(',').map(tag => tag.trim()))}
              placeholder="Tags"
              style={[styles.input]}
              validation={validateTags}
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
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  safeArea: {
    backgroundColor: "#FFFFFF",
    flex: 1,
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
    padding: 6,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  orangeHeader: {
    width: "100%",
    height: 400,
    backgroundColor: "#FF914B",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textCreatePublication: {
    padding: 30,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    textAlign: 'center',
    position: 'relative'
    
    },
  orangeButton: {
    width: 265,
    height: 206,
    backgroundColor: "#d9d9d9",
    padding: 70,
  },
  orangeButtonText: {
    fontSize: 45,
    fontFamily: "Poppins-Bold",
  },
});

export default AddMedia;
