import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { Video } from 'expo-av';
import Button from "@/src/components/Button";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomTextInput from "@/src/components/TextFieldCadastroUsuario";
import { MaterialIcons } from '@expo/vector-icons';
import { useSearch } from "@/src/hooks/useSearch";

const AddMedia = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [description, setDescription] = useState<string>("");
  const [restaurantSearch, setRestaurantSearch] = useState<string>('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const { restaurants, search: runSearch, loading } = useSearch();

  useEffect(() => {
    if (restaurantSearch.length > 1) {
      runSearch(restaurantSearch);
    }
  }, [restaurantSearch]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const validateDescription = (text: string): string | null => {
    if (text.length > 200)
      return "Descrição não pode ter mais de 200 caracteres";
    return null;
  };

  const isFormValid = true;

  const handleAddMedia = () => {
    Alert.alert(
      "Selecionar Imagem",
      "Deseja tirar uma foto ou escolher da galeria?",
      [
        { text: "Câmera", onPress: handleCameraOption },
        { text: "Galeria", onPress: pickImage },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const handleCameraOption = () => {
    Alert.alert(
      "Usar Câmera",
      "Deseja tirar uma foto ou gravar um vídeo?",
      [
        { text: "Foto", onPress: openCameraPhoto },
        { text: "Vídeo", onPress: openCameraVideo },
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      setMediaUri(asset.uri);
      setMediaType(asset.type === "video" ? "video" : "image");
    }
  };

  const openCameraPhoto = async () => {
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
  
    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      setMediaUri(asset.uri);
      setMediaType("image");
    }
  };
  

  const openCameraVideo = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permissão para usar a câmera negada.");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoMaxDuration: 120,
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      setMediaUri(asset.uri);
      setMediaType("video");
    }
  };

  const handleCreate = () => {
    const errors = [
      validateDescription(description),
    ].filter((error) => error != null);

    if (!description) {
      Alert.alert("Erro", "Descrição é obrigatória.");
      return;
    }

    if(mediaUri == null){
      Alert.alert("Erro", "Adicione uma foto ou vídeo.");
      return;
    }

    Alert.alert("Sucesso", "Publicação criada!");
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
          {!isKeyboardVisible && (
            <View style={styles.orangeHeader}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
                <MaterialIcons name="keyboard-arrow-left" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.textCreatePublication}>Criar Publicação</Text>

              {mediaUri ? (
                <View style={styles.previewContainer}>
                  {mediaType === "image" ? (
                    <Image source={{ uri: mediaUri }} style={styles.previewMedia} resizeMode="cover" />
                  ) : (
                    <Video
                      source={{ uri: mediaUri }}
                      style={styles.previewMedia}
                      useNativeControls
                      resizeMode="cover"
                    />
                  )}
                  <TouchableOpacity style={styles.removeMediaButton} onPress={() => {
                    setMediaUri(null);
                    setMediaType(null);
                  }}>
                    <Text style={styles.removeMediaText}>Remover Mídia</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Button
                  title="+"
                  type="orange"
                  onPress={handleAddMedia}
                  style={styles.orangeButton}
                  textStyle={styles.orangeButtonText}
                />
              )}
            </View>
          )}

          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inputWrapper}>
              <CustomTextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição"
                style={styles.input}
                validation={validateDescription}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputWrapper}>
              <CustomTextInput
                value={restaurantSearch}
                onChangeText={(text) => {
                  setRestaurantSearch(text);
                  setSelectedRestaurantId(null); // limpa seleção anterior
                }}
                placeholder="Restaurante"
                style={styles.input}
              />
              <MaterialIcons name="search" size={20} color="#FF914B" style={styles.searchIcon} />

              {restaurantSearch.length > 1 && !selectedRestaurantId && restaurants.length > 0 && (
                <View style={styles.searchResultsContainer}>
                  {restaurants.map((restaurant) => (
                    <TouchableOpacity
                      key={restaurant.id}
                      style={styles.resultItem}
                      onPress={() => {
                        setRestaurantSearch(restaurant.name);
                        setSelectedRestaurantId(restaurant.id);
                      }}
                    >
                      <Text style={styles.resultText}>{restaurant.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.buttonCreate}>
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
    paddingTop: 20,
    paddingBottom: "8%",
    width: "100%",
  },
  inputWrapper: {
    width: "90%",
    marginBottom: "5%",
    padding: 6,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
    paddingTop: 20,
    paddingRight: 16,
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
  buttonCreate: {
    marginTop: "2%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 30,
    paddingBottom: 26,
    paddingRight: 27,
    paddingLeft: 272,
  },
  orangeHeader: {
    width: "100%",
    height: 430,
    backgroundColor: "#FF914B",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: 'absolute',
    top: 33,
    left: 30,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 100,
    padding: 10,
    marginTop: 0,
    marginLeft: 10
  },
  textCreatePublication: {
    padding: 50,
    marginTop: -60,
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    textAlign: 'center',
    position: 'relative'
  },
  orangeButton: {
    width: 310,
    height: 265,
    backgroundColor: "#d9d9d9",
  },
  orangeButtonText: {
    fontSize: 45,
    fontFamily: "Poppins-Bold",
  },
  previewMedia: {
    width: 310,
    height: 245,
    borderRadius: 20,
    backgroundColor: "#000",
  },
  previewContainer: {
    alignItems: "center",
  },
  
  removeMediaButton: {
    marginTop: 10,
    marginBottom: -45,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  
  removeMediaText: {
    color: "#FF914B",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  searchResultsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 8,
    zIndex: 10,
  },
  
  resultItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  
  resultText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  
});

export default AddMedia;
