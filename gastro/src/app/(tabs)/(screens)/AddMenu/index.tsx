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
import * as ImagePicker from 'expo-image-picker';
import { Keyboard } from 'react-native';
import {
  MenuItemsDTO,
  RestaurantDTO,
  RestaurantPatchDTO,
} from '@/src/@types/DTO';
import Button from '@/src/components/Button';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import { MaterialIcons } from '@expo/vector-icons';
import UserCarouselRestaurant from '@/src/components/UserCarouselRestaurant';
import Colors from '@/src/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import {
  CarouselItem,
  mapMenuItemToCarouselItem,
} from '@/src/utils/carouselMappers';

const AddMenu = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { restaurantId } = useLocalSearchParams();
  const { getRestaurantById, deleteDish, patchRestaurant } = useRestaurantApi();

  const [menuItems, setMenuItems] = useState<MenuItemsDTO[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const validateDescription = (text: string): string | null => {
    if (text.length > 200)
      return 'Descrição não pode ter mais de 200 caracteres';
    return null;
  };

  const validateName = (text: string): string | null => {
    if (text.length > 80) return 'Nome não pode ter mais de 80 caracteres';
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

  const handleDeleteCarouselItem = async (id: string) => {
    try {
      await deleteDish(id);
      setMenuItems((old) => old.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o item.');
    }
  };

  const handleAddItem = async () => {
    const errDesc = validateDescription(description);
    const errPrice = validatePrice(price);
    if (errDesc || errPrice) {
      Alert.alert(
        'Erro de Validação',
        `${errDesc ?? ''}\n${errPrice ?? ''}`.trim(),
      );
      return;
    }
    if (!mediaUri) {
      Alert.alert('Erro', 'Adicione uma foto do prato.');
      return;
    }

    const newItem: MenuItemsDTO = {
      name: name,
      media: mediaUri,
      description,
      dish_price: parseFloat(price.replace(',', '.')),
    };

    setMenuItems((old) => [...old, newItem]);

    setMediaUri(null);
    setDescription('');
    setPrice('');
  };

  const handleSubmit = async () => {
    if (menuItems.length === 0) {
      Alert.alert(
        'Erro',
        'Adicione pelo menos um item ao cardápio antes de avançar.',
      );
      return;
    }

    const restaurantWithMenu: RestaurantPatchDTO = {
      id: restaurantId as string,
      menuItems: menuItems.map((item) => ({
        name: item.name,
        description: item.description,
        dish_price: item.dish_price,
        media: item.media,
      })),
    };

    const res = await patchRestaurant(restaurantWithMenu);

    if (restaurantId) {
      router.push({
        pathname: '/RestaurantProfilePatch',
        params: {
          restaurantId: restaurantId,
        },
      });
    } else {
      router.push({
        pathname: '/SignupInterestsScreen',
        params: {
          screenTitle: 'Selecione as categorias do seu restaurante',
          restaurantData: JSON.stringify(restaurantWithMenu),
        },
      });
    }
  };

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      try {
        if (!restaurantId) return;

        const res = await getRestaurantById(restaurantId as string);
        if (res && Array.isArray(res.menuItems)) {
          setMenuItems(res.menuItems);
        }
      } catch (error) {
        console.error('Erro ao buscar cardápio:', error);
        Alert.alert(
          'Erro',
          'Não foi possível carregar o cardápio do restaurante.',
        );
      }
    };

    fetchRestaurantMenu();
  }, [restaurantId]);

  useEffect(() => {
    setCarouselItems(menuItems.map(mapMenuItemToCarouselItem));
  }, [menuItems]);

  return (
    <SafeAreaView style={styles.safeArea}>
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
                onPress={() =>
                  router.push({
                    pathname: '/RestaurantProfilePatch',
                    params: {
                      restaurantId: restaurantId,
                    },
                  })
                }
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <Text style={styles.textCreatePublication}>
                Monte seu cardápio com seus melhores pratos
              </Text>

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
                  value={name}
                  onChangeText={setName}
                  placeholder="Nome"
                  style={styles.input}
                  validation={validateName}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

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
                <Text style={styles.title}>Itens do seu cardápio</Text>
                <UserCarouselRestaurant
                  variant="menuAdd"
                  items={carouselItems}
                  onDeleteItem={handleDeleteCarouselItem}
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
    </SafeAreaView>
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
  title: {
    fontFamily: 'Poppins-regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange.orangeBold,
  },
  container: {
    padding: '4%',
  },
  inputWrapper: {
    width: '90%',
    padding: 6,
  },
  input: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: Colors.white,
    color: Colors.orange.orangeStandard,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonCreate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    color: Colors.orange.orangeStandard,
    backgroundColor: Colors.white,
  },
  orangeHeader: {
    height: 550,
    backgroundColor: '#FF914B',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 100,
    padding: 8,
  },
  textCreatePublication: {
    paddingHorizontal: 45,
    paddingBottom: 15,
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
    marginBottom: 20,
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
    marginBottom: 20,
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
  buttonAddWrapper: {
    marginTop: '1%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 26,
  },
  carouselContainer: {
    marginLeft: '3%',
  },
});

export default AddMenu;
