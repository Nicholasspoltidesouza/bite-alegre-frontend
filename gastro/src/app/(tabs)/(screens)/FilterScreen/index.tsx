import Button from '@/src/components/Button';
import Tag from '@/src/components/Tag';
import ToggleSwitch from '@/src/components/ToggleSwitch';
import { RestaurantFilterDTO } from '@/src/@types/DTO';
import { useSearchFilter } from '@/src/hooks/useSearchFilter';
import useLocation from '@/src/hooks/useLocation';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Colors from '@/src/constants/Colors';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFetchTags } from '@/src/hooks/useFetchTags';

interface FilterOptions {
  price: string;
  distance: string[];
  location: string[];
  category: string[];
  occasion: string[];
  openNow: boolean;
}

const FilterScreen: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    price: 'Preço Médio',
    distance: [],
    location: [],
    category: [],
    occasion: [],
    openNow: false,
  });

  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [priceInput, setPriceInput] = useState('');
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [addressInput, setAddressInput] = useState('');

  const { filterRestaurants, loading: filterLoading } = useSearchFilter();
  const { latitude, longitude } = useLocation();

  const {
    getTags,
    tags,
    loading: tagsLoading,
    error: tagsError,
  } = useFetchTags();

  const priceNumber = parseFloat(filters.price.replace(/[^\d]/g, '')) || 0;
  const priceIsSet = priceNumber > 0;

  useEffect(() => {
    getTags();
  }, []);

  const locationSelected = filters.distance[0] === 'Localização';
  const addressSet =
    filters.distance.length > 0 &&
    !locationSelected &&
    filters.distance[0].trim().length > 0;
  const addressTitle = addressSet
    ? filters.distance[0].length > 18
      ? filters.distance[0].slice(0, 18) + '…'
      : filters.distance[0]
    : 'Escolha';

  const handleTagPress = (section: keyof FilterOptions, tagId: string) => {
    setFilters((prev) => {
      const list = prev[section] as string[];
      return list.includes(tagId)
        ? { ...prev, [section]: list.filter((t) => t !== tagId) }
        : { ...prev, [section]: [...list, tagId] };
    });
  };

  const handleToggleOpenNow = (v: boolean) =>
    setFilters((prev) => ({ ...prev, openNow: v }));

  const handleClear = () =>
    setFilters({
      price: 'Preço Médio',
      distance: [],
      location: [],
      category: [],
      occasion: [],
      openNow: false,
    });

  const handleApply = async () => {
    const apiFilters: RestaurantFilterDTO = {};

    if (priceIsSet) {
      apiFilters.price_range = priceNumber;
    }

    const allSelectedTags = [
      ...filters.location,
      ...filters.category,
      ...filters.occasion,
    ];

    if (allSelectedTags.length > 0) {
      apiFilters.tags = allSelectedTags;
    }

    if (filters.openNow) {
      apiFilters.open_now = true;
    }

    if (locationSelected && latitude && longitude) {
      apiFilters.geolocation = [parseFloat(latitude), parseFloat(longitude)];
      apiFilters.proximity = 10;
    } else if (addressSet) {
      apiFilters.address = filters.distance[0];
    }

    try {
      await filterRestaurants(apiFilters);
      router.push({ pathname: '/FilterResultScreen' });
    } catch (error) {
      console.error('Erro ao filtrar restaurantes:', error);
    }
  };

  if (tagsLoading || filterLoading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.orange.orangeStandard} />
      </SafeAreaView>
    );
  }

  if (tagsError) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <Text style={styles.errorText}>{tagsError}</Text>
      </SafeAreaView>
    );
  }

  const localTags = tags.filter((t) => t.type === 'LOCAL');
  const categoryTags = tags.filter((t) => t.type === 'CATEGORIA');
  const occasionTags = tags.filter((t) => t.type === 'OCASIAO');

  const iconColor = Colors.icon;
  const dropdownIconColor = '#8F8F8F';
  const iconSize = 16;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <View style={styles.header}>
        <Text style={styles.title}>Filtros</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="x" size={24} color="#FF914B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preço</Text>
          <View style={styles.tagsContainer}>
            <Tag
              title={filters.price}
              isSelected={priceIsSet}
              controlled
              icon={
                <Feather
                  name="chevron-down"
                  size={iconSize}
                  color={dropdownIconColor}
                />
              }
              iconPosition="right"
              onPress={() => {
                setPriceInput(priceIsSet ? String(priceNumber) : '');
                setPriceModalVisible(true);
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distância</Text>
          <View style={styles.tagsContainer}>
            <Tag
              title="Localização"
              isSelected={locationSelected}
              controlled
              style={styles.tag}
              icon={
                <FontAwesome6
                  name="location-dot"
                  size={iconSize}
                  color={iconColor}
                />
              }
              onPress={() => {
                setFilters((prev) => ({
                  ...prev,
                  distance: locationSelected ? [] : ['Localização'],
                }));
              }}
            />
            <Tag
              title={addressTitle}
              isSelected={addressSet}
              controlled
              style={styles.tag}
              icon={
                <FontAwesome6
                  name="location-crosshairs"
                  size={iconSize}
                  color={iconColor}
                />
              }
              onPress={() => {
                setAddressInput(addressSet ? filters.distance[0] : '');
                setAddressModalVisible(true);
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local</Text>
          <View style={styles.tagsContainer}>
            {localTags.map((tag) => (
              <Tag
                key={tag.id}
                title={tag.name}
                isSelected={filters.location.includes(tag.id)}
                style={styles.tag}
                onPress={() => handleTagPress('location', tag.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoria</Text>
          <View style={styles.tagsContainer}>
            {categoryTags.map((tag) => (
              <Tag
                key={tag.id}
                title={tag.name}
                isSelected={filters.category.includes(tag.id)}
                style={styles.tag}
                onPress={() => handleTagPress('category', tag.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ocasião</Text>
          <View style={styles.tagsContainer}>
            {occasionTags.map((tag) => (
              <Tag
                key={tag.id}
                title={tag.name}
                isSelected={filters.occasion.includes(tag.id)}
                style={styles.tag}
                onPress={() => handleTagPress('occasion', tag.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.toggleSection}>
          <Text style={styles.sectionTitle}>Aberto agora</Text>
          <ToggleSwitch
            isEnabled={filters.openNow}
            onToggle={handleToggleOpenNow}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Limpar"
            type="white"
            onPress={handleClear}
            style={styles.button}
          />
          <Button
            title="Aplicar"
            type="orange"
            onPress={handleApply}
            style={styles.button}
          />
        </View>
      </ScrollView>

      <Modal
        visible={priceModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPriceModalVisible(false)}
      >
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.wrapper}>
            <Text style={modalStyles.modalTitle}>Definir Preço Médio</Text>

            <TextInput
              value={priceInput}
              onChangeText={setPriceInput}
              keyboardType="numeric"
              placeholder="Ex.: 50"
              style={modalStyles.input}
            />

            <View style={modalStyles.modalButtons}>
              <Button
                title="Cancelar"
                type="white"
                style={{ flex: 1, marginRight: 10 }}
                onPress={() => setPriceModalVisible(false)}
              />
              <Button
                title="Salvar"
                type="orange"
                style={{ flex: 1 }}
                onPress={() => {
                  const num = parseFloat(priceInput);
                  setFilters((prev) => ({
                    ...prev,
                    price: isNaN(num) || num <= 0 ? 'Preço Médio' : `R$ ${num}`,
                  }));
                  setPriceModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={addressModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.wrapper}>
            <Text style={modalStyles.modalTitle}>Digite um endereço</Text>

            <TextInput
              value={addressInput}
              onChangeText={setAddressInput}
              placeholder="Rua, número, cidade"
              style={modalStyles.input}
            />

            <View style={modalStyles.modalButtons}>
              <Button
                title="Cancelar"
                type="white"
                style={{ flex: 1, marginRight: 10 }}
                onPress={() => setAddressModalVisible(false)}
              />
              <Button
                title="Salvar"
                type="orange"
                style={{ flex: 1 }}
                onPress={() => {
                  const addr = addressInput.trim();
                  setFilters((prev) => ({
                    ...prev,
                    distance: addr ? [addr] : [],
                  }));
                  setAddressModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.orange.orangeStandard,
  },
  scrollView: { flex: 1 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.orange.orangeStandard,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {},
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  button: { flex: 1 },
});

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.orange.orangeStandard,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 24,
  },
  modalButtons: { flexDirection: 'row' },
});

export default FilterScreen;
