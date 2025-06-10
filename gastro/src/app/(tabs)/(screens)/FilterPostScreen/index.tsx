import { RestaurantFilterDTO } from '@/src/@types/DTO';
import Button from '@/src/components/Button';
import Tag from '@/src/components/Tag';
import Colors from '@/src/constants/Colors';
import { useFetchTags } from '@/src/hooks/useFetchTags';
import { usePublicationApi } from '@/src/hooks/usePublicationApi';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface FilterOptions {
  price: string;
  location: string[];
  category: string[];
}

const FilterPostScreen: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    price: 'Preço Médio',
    location: [],
    category: [],
  });

  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [priceInput, setPriceInput] = useState('');

  const { userId } = useLocalSearchParams();
  const { getPublicationByUserId, loading } = usePublicationApi();
  const { getTags, tags, loading: tagsLoading, error: tagsError } = useFetchTags();

  const priceNumber = parseFloat(filters.price.replace(/[^\d]/g, '')) || 0;
  const priceIsSet = priceNumber > 0;

  useEffect(() => {
    getTags();
  }, []);

  const handleTagPress = (section: keyof FilterOptions, tagId: string) => {
    setFilters((prev) => {
      const list = prev[section] as string[];
      return list.includes(tagId)
        ? { ...prev, [section]: list.filter((t) => t !== tagId) }
        : { ...prev, [section]: [...list, tagId] };
    });
  };

  const handleClear = () =>
    setFilters({
      price: 'Preço Médio',
      location: [],
      category: [],
    });

  const handleApply = async () => {
    const apiFilters: RestaurantFilterDTO = {};

    if (priceIsSet) {
      apiFilters.price_range = priceNumber;
    }

    const allSelectedTags = [...filters.location, ...filters.category];
    if (allSelectedTags.length > 0) {
      apiFilters.tags = allSelectedTags;
    }

    if (!userId || typeof userId !== 'string') {
      return;
    }

    try {
      const result = await getPublicationByUserId(userId, apiFilters);
      router.push({
        pathname: '/InfluencerProfile',
        params: {
          userId: userId,
          filteredUserData: JSON.stringify(result),
        },
      });
    } catch (error) {
      console.error('❌ Erro ao filtrar publicações:', error);
    }
  };

  if (tagsLoading || loading) {
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

  const dropdownIconColor = '#8F8F8F';
  const iconSize = 16;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filtros</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="sliders" size={24} color="#FF914B" style={{ transform: [{ rotate: '90deg' }] }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preço</Text>
          <View style={styles.tagsContainer}>
            <Tag
              title={filters.price}
              isSelected={priceIsSet}
              controlled
              icon={<Feather name="chevron-down" size={iconSize} color={dropdownIconColor} />}
              iconPosition="right"
              onPress={() => {
                setPriceInput(priceIsSet ? String(priceNumber) : '');
                setPriceModalVisible(true);
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

        <View style={styles.buttonContainer}>
          <Button title="Limpar" type="white" onPress={handleClear} style={styles.button} />
          <Button title="Aplicar" type="orange" onPress={handleApply} style={styles.button} />
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

export default FilterPostScreen;
