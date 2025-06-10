import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Keyboard } from 'react-native';
import { MenuItemsDTO, RestaurantDTO } from '@/src/@types/DTO';  // :contentReference[oaicite:0]{index=0}
import Button from '@/src/components/Button';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import { MaterialIcons } from '@expo/vector-icons';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Colors from '@/src/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AddMenu = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { restaurantData: restaurantParam } = useLocalSearchParams();
  const parsedRestaurant: RestaurantDTO = restaurantParam
    ? JSON.parse(restaurantParam as string)
    : ({} as RestaurantDTO);

  const [menuItems, setMenuItems] = useState<MenuItemsDTO[]>([]);

  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const validateDescription = (text: string): string | null => {
    if (text.length > 200)
      return 'Descrição não pode ter mais de 200 caracteres';
    return null;
  };

  const validatePrice = (text: string): string | null => {
    if (!text) return 'Preço é obrigatório';

    const number = parseFloat(text.replace(',', '.'));
    if (isNaN(number)) return 'Preço deve ser um número válido';
    if (number <= 0) return 'Preço deve ser maior que zero';

    return null;
  };

  const isAddFormValid =
    !validateDescription(description) &&
    !validatePrice(price) &&
    mediaUri != null;

  const handleAddMedia = () => {
    Alert.alert(
      'Selecionar Imagem',
      'Deseja tirar uma foto ou escolher da galeria?',
      [
        { text: 'Câmera', onPress: openCameraPhoto },
        { text: 'Galeria', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' },
      ],
    );
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Você precisa permitir o acesso à galeria!');
      return;
    }

    console.log('Abrindo galeria');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      setMediaUri(asset.uri);
    }
  };

  const openCameraPhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permissão para usar a câmera negada.');
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
    }
  };

  const handleAddItem = async () => {
    const errDesc = validateDescription(description);
    const errPrice = validatePrice(price);
    if (errDesc || errPrice) {
      Alert.alert('Erro de Validação', `${errDesc ?? ''}\n${errPrice ?? ''}`.trim());
      return;
    }
    if (!mediaUri) {
      Alert.alert('Erro', 'Adicione uma foto do prato.');
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(mediaUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const newItem: MenuItemsDTO = {
      dish_photo: base64,
      description,
      price: parseFloat(price.replace(',', '.')),
    };

    setMenuItems((old) => [...old, newItem]);

    setMediaUri(null);
    setDescription('');
    setPrice('');
  };

  const handleSubmit = () => {
    if (menuItems.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um item ao cardápio antes de avançar.');
      return;
    }
    const restaurantWithMenu: RestaurantDTO = {
      ...parsedRestaurant,
      menuItems,
    };

    router.push({
      pathname: '/SignupInterestsScreen',
      params: {
        screenTitle: 'Selecione as categorias do seu restaurante',
        restaurantData: JSON.stringify(restaurantWithMenu),
      },
    });
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
            <Text style={styles.textCreatePublication}>Monte seu cardápio com seus melhores pratos</Text>

            {mediaUri ? (
              <View style={styles.previewContainer}>
                  <Image
                      source={{ uri: mediaUri }}
                      style={styles.previewMedia}
                      resizeMode="cover"
                  />
                <TouchableOpacity
                  style={styles.removeMediaButton}
                  onPress={() => {
                    setMediaUri(null);
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
              />
            )}

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
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Preço Médio"
                  style={styles.input}
                  validation={validatePrice}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.buttonAddWrapper}>
              <Button
                  title="Adicionar"
                  type="white"
                  onPress={handleAddItem}
                  disabled={!isAddFormValid}
              />
              </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.carouselContainer}>
                <UserCarouselRestaurant
                variant="menuAdd"
                items={[]}
                />
            </View>

            <View style={styles.buttonCreate}>
              <Button
                title="Avançar"
                type="orange"
                onPress={handleSubmit}
                disabled={false}
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
    marginBottom: '1%',
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
    backgroundColor: Colors.white,
    paddingLeft: 24,
    paddingRight: 16,
    color: Colors.orange.orangeStandard,
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
    color: Colors.orange.orangeStandard,
    backgroundColor: Colors.white,
  },
  orangeHeader: {
    width: '100%',
    height: 560,
    backgroundColor: '#FF914B',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 30,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 100,
    padding: 10,
    marginTop: 0,
    marginLeft: 10,
  },
  textCreatePublication: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    position: 'relative',
  },
  orangeButton: {
    width: 230,
    height: 205,
    backgroundColor: '#d9d9d9',
    marginBottom: 20
  },
  orangeButtonText: {
    fontSize: 45,
    fontFamily: 'Poppins-Bold',
  },
  previewMedia: {
    width: 230,
    height: 205,
    borderRadius: 20,
    backgroundColor: '#000',
    marginBottom: 20
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
  buttonAddWrapper: {
    marginTop: '2%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 26,
    paddingRight: 27,
    paddingLeft: 272,
  },
  carouselContainer: {
    marginLeft: '3%',
    marginBottom: -10,
  },
});

export default AddMenu;
