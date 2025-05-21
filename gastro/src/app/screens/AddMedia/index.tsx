import React, { useEffect, useState, useContext } from 'react';
import { Keyboard } from 'react-native';
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
  ActivityIndicator,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Button from '@/src/components/Button';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import { MaterialIcons } from '@expo/vector-icons';
import { useSearch } from '@/src/hooks/useSearch';
import { useMediaApi } from '@/src/hooks/useMediaApi';
import { useAuthContext } from '@/src/contexts/authContext';
import * as FileSystem from 'expo-file-system';

const AddMedia = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const auth = useAuthContext();

  const [mediaAsset, setMediaAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [description, setDescription] = useState<string>('');
  const [restaurantSearch, setRestaurantSearch] = useState<string>('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  
  const { restaurants, search: runSearch, loading } = useSearch();
  const { 
    isLoading, 
    error, 
    selectImageFromGallery, 
    captureImageWithCamera, 
    uploadPostMedia 
  } = useMediaApi();

  useEffect(() => {
    if (restaurantSearch.length > 1) {
      runSearch(restaurantSearch);
    }
  }, [restaurantSearch]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    // Exibir alerta de erro se ocorrer algum erro durante o upload de mídia
    if (error) {
      Alert.alert('Erro', error);
    }
  }, [error]);

  const validateDescription = (text: string): string | null => {
    if (text.length > 200)
      return 'Descrição não pode ter mais de 200 caracteres';
    return null;
  };

  const isFormValid = description.trim().length > 0 && mediaAsset !== null;

  const handleAddMedia = () => {
    Alert.alert(
      'Selecionar Imagem',
      'Deseja tirar uma foto ou escolher da galeria?',
      [
        { text: 'Câmera', onPress: handleCameraOption },
        { text: 'Galeria', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' },
      ],
    );
  };

  const handleCameraOption = () => {
    Alert.alert('Usar Câmera', 'Deseja tirar uma foto ou gravar um vídeo?', [
      { text: 'Foto', onPress: openCameraPhoto },
      { text: 'Vídeo', onPress: openCameraVideo },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const pickImage = async () => {
    const asset = await selectImageFromGallery();
    if (asset) {
      setMediaAsset(asset);
      setMediaUri(asset.uri);
      setMediaType('image');
    }
  };

  const openCameraPhoto = async () => {
    const asset = await captureImageWithCamera();
    if (asset) {
      setMediaAsset(asset);
      setMediaUri(asset.uri);
      setMediaType('image');
    }
  };

  const openCameraVideo = async () => {
    // Para vídeos, usamos ImagePicker com suporte a base64
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permissão para usar a câmera negada.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoMaxDuration: 120,
      quality: 1,
      base64: true, // Solicitar o base64 do vídeo
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      // Se o base64 não estiver disponível, precisaremos obtê-lo manualmente
      if (!asset.base64) {
        try {
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          asset.base64 = base64;
        } catch (error) {
          console.error('Erro ao converter vídeo para base64:', error);
        }
      }
      setMediaAsset(asset);
      setMediaUri(asset.uri);
      setMediaType('video');
    }
  };

  const handleCreate = async () => {
    const errors = [validateDescription(description)].filter(
      (error) => error != null,
    );

    if (!description.trim()) {
      Alert.alert('Erro', 'Descrição é obrigatória.');
      return;
    }

    if (!mediaAsset) {
      Alert.alert('Erro', 'Adicione uma foto ou vídeo.');
      return;
    }

    if (errors.length > 0) {
      Alert.alert('Erro de Validação', errors.join('\n'));
      return;
    }

    setIsCreatingPost(true);

    try {
      // Garantir que temos o base64 da mídia
      let mediaBase64 = mediaAsset.base64;
      
      // Se o base64 não estiver disponível, buscamos ele
      if (!mediaBase64) {
        try {
          mediaBase64 = await FileSystem.readAsStringAsync(mediaAsset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        } catch (error) {
          console.error('Erro ao converter mídia para base64:', error);
          Alert.alert('Erro', 'Não foi possível processar a mídia. Tente novamente.');
          setIsCreatingPost(false);
          return;
        }
      }

      // Dados do post para o backend incluindo o base64 da mídia
      const postData = {
        description,
        restaurantId: selectedRestaurantId,
        userId: auth?.user?.id,
        mediaBase64: mediaBase64,
        mediaType: mediaType,
        fileName: `${Date.now()}.${mediaAsset.uri.split('.').pop()}`,
        mimeType: mediaType === 'video' 
          ? `video/${mediaAsset.uri.split('.').pop()}` 
          : `image/${mediaAsset.uri.split('.').pop() === 'jpg' ? 'jpeg' : mediaAsset.uri.split('.').pop()}`,
        width: mediaAsset.width,
        height: mediaAsset.height,
        createdAt: new Date().toISOString(),
      };

      // Aqui você implementaria a chamada API para criar o post no backend
      // O backend será responsável por fazer o upload para o S3
      // Exemplo:
      // const response = await fetch(`${API_URL_ANDROID}/posts`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(postData)
      // });
      
      console.log('Post data ready to send to backend (includes base64)');

      Alert.alert('Sucesso', 'Publicação criada com sucesso!');
      
      // Limpar estados
      setDescription('');
      setMediaUri(null);
      setMediaAsset(null);
      setRestaurantSearch('');
      setSelectedRestaurantId(null);
      
      // Voltar para a tela anterior
      router.back();
    } catch (err) {
      console.error('Erro ao criar publicação:', err);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a publicação. Tente novamente mais tarde.');
    } finally {
      setIsCreatingPost(false);
    }
  };

  return (
    <View style={styles.containerPrincipal}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <SafeAreaView
          style={[
            styles.safeArea,
            Platform.OS === 'ios' && { marginTop: -insets.top },
          ]}
        >
          {!isKeyboardVisible && (
            <View style={styles.orangeHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <Text style={styles.textCreatePublication}>Criar Publicação</Text>

              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
              )}

              {mediaUri ? (
                <View style={styles.previewContainer}>
                  {mediaType === 'image' ? (
                    <Image
                      source={{ uri: mediaUri }}
                      style={styles.previewMedia}
                      resizeMode="cover"
                    />
                  ) : (
                    <Video
                      source={{ uri: mediaUri }}
                      style={styles.previewMedia}
                      useNativeControls
                      resizeMode={ResizeMode.COVER}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.removeMediaButton}
                    onPress={() => {
                      setMediaUri(null);
                      setMediaAsset(null);
                      setMediaType(null);
                    }}
                  >
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
                  disabled={isLoading}
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
                editable={!isLoading && !isCreatingPost}
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
                editable={!isLoading && !isCreatingPost}
              />
              <MaterialIcons
                name="search"
                size={20}
                color="#FF914B"
                style={styles.searchIcon}
              />

              {restaurantSearch.length > 1 &&
                !selectedRestaurantId &&
                restaurants.length > 0 && (
                  <View style={styles.searchResultsContainer}>
                    {restaurants.map((restaurant) => (
                      <TouchableOpacity
                        key={restaurant.id}
                        style={styles.resultItem}
                        onPress={() => {
                          setRestaurantSearch(restaurant.name);
                          setSelectedRestaurantId(restaurant.id ?? null);
                        }}
                        disabled={isLoading || isCreatingPost}
                      >
                        <Text style={styles.resultText}>{restaurant.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
            </View>

            <View style={styles.buttonCreate}>
              <Button
                title={isCreatingPost ? "Criando..." : "Criar"}
                type="orange"
                onPress={handleCreate}
                disabled={!isFormValid || isLoading || isCreatingPost}
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
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: '4%',
    paddingTop: 20,
    paddingBottom: '8%',
    width: '100%',
  },
  inputWrapper: {
    width: '90%',
    marginBottom: '5%',
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
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 179, 112, 0.25)',
    paddingLeft: 24,
    paddingRight: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: '5%',
  },
  halfInputWrapper: {
    width: '48%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 24,
    fontFamily: 'Poppins-Regular',
  },
  buttonCreate: {
    marginTop: '2%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 30,
    paddingBottom: 26,
    paddingRight: 27,
    paddingLeft: 272,
  },
  orangeHeader: {
    width: '100%',
    height: 430,
    backgroundColor: '#FF914B',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 33,
    left: 30,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 100,
    padding: 10,
    marginTop: 0,
    marginLeft: 10,
  },
  textCreatePublication: {
    padding: 50,
    marginTop: -60,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    position: 'relative',
  },
  orangeButton: {
    width: 310,
    height: 265,
    backgroundColor: '#d9d9d9',
  },
  orangeButtonText: {
    fontSize: 45,
    fontFamily: 'Poppins-Bold',
  },
  previewMedia: {
    width: 310,
    height: 245,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  previewContainer: {
    alignItems: 'center',
  },
  removeMediaButton: {
    marginTop: 10,
    marginBottom: -45,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  removeMediaText: {
    color: '#FF914B',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  searchResultsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
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
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default AddMedia;
