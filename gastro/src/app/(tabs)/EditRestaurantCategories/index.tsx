import React, { useState, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Button from '@/src/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthContext } from '@/src/contexts/authContext';
import { useFetchTags } from '@/src/hooks/useFetchTags';

interface Category {
  id: string;
  name: string;
  color?: string;
}

interface RestaurantData {
  id: string;
  name: string;
  categories: string[];
}

const CategoryButton: React.FC<{
  category: Category;
  isSelected: boolean;
  onPress: () => void;
}> = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        isSelected ? styles.categoryButtonSelected : styles.categoryButtonUnselected,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.categoryButtonText,
          isSelected ? styles.categoryButtonTextSelected : styles.categoryButtonTextUnselected,
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

// Hook personalizado para buscar categorias
const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('localhost:3000/api/tags');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar categorias');
      }
      
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setCategories([
        // { id: '1', name: 'Churrasco' },
        // { id: '2', name: 'Bar' },
        // { id: '3', name: 'Hambúrguer' },
        // { id: '4', name: 'Mexicana' },
        // { id: '5', name: 'Japonesa' },
        // { id: '6', name: 'Árabe' },
        // { id: '7', name: 'Sorveteria' },
        // { id: '8', name: 'Cafeteria' },
        // { id: '9', name: 'Padaria' },
        // { id: '10', name: 'Poke' },
        // { id: '11', name: 'Pizza' },
        // { id: '12', name: 'Italiana' },
        // { id: '13', name: 'Vegana' },
        // { id: '14', name: 'Saudável' },
        // { id: '15', name: 'Chinesa' },
        // { id: '16', name: 'Indiana' },
        // { id: '17', name: 'Brasileira' },
        // { id: '18', name: 'Nordestina' },
        // { id: '19', name: 'Frutos do Mar' },
        // { id: '20', name: 'Comfort Food' },
        // { id: '21', name: 'Bistrô' },
        // { id: '22', name: 'Lanchonete' },
        // { id: '23', name: 'Creperia' },
        // { id: '24', name: 'Açaí' },
        // { id: '25', name: 'Marmitaria' },
        // { id: '26', name: 'Comida de Boteco' },
        // { id: '27', name: 'Panquecaria' },
        // { id: '28', name: 'Fast Food' },
        // { id: '29', name: 'Coreana' },
        // { id: '30', name: 'Tailandesa' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
};

const EditRestaurantCategories: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuthContext();
  const { getTags, tags, loading: tagsLoading, error } = useFetchTags();
  
  useEffect(() => {
    getTags();
  }, []);
  
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  
  const { categories, loading, error, refetch } = useCategories();
  
  const restaurantData: RestaurantData | null = params.restaurantData 
    ? JSON.parse(params.restaurantData as string) 
    : null;

  useEffect(() => {
    if (restaurantData?.categories) {
      setSelectedCategories(restaurantData.categories);
    }
  }, [restaurantData]);

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const response = await fetch(`/api/restaurants/restaurants-tags`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: selectedCategories }),
      });
      
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Sucesso', 'Categorias salvas com sucesso!');
      router.push({
            pathname: '/restaurantProfile',
            params: {
              restaurantId: user!.id,
            },
          });

    } catch (err) {
      Alert.alert('Erro', 'Erro ao salvar categorias. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/RestaurantProfilePatch')
  };
  // Renderizar loading
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF8C42" />
          <Text style={styles.loadingText}>Carregando categorias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#FF8C42" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {'Edite as categorias do seu restaurante'}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Grid de categorias */}
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isSelected={selectedCategories.includes(category.name)}
                onPress={() => toggleCategory(category.name)}
              />
            ))}
          </View>

          <View style={styles.actionButtons}>
            <Button 
              title={saving ? "Salvando..." : "Salvar"} 
              onPress={handleSave} 
              type="orange"
              disabled={saving}
            />
            <TouchableOpacity onPress={handleBack} style={styles.dataButton}>
              <View style={styles.dataButtonContent}>
                <Text style={styles.dataButtonText}>Dados</Text>
                <MaterialIcons name="arrow-back-ios" size={16} color="#FF8C42" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF8C42',
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 12,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 1,
  },
  categoryButtonSelected: {
    backgroundColor: '#FF8C42',
    borderColor: '#FF8C42',
  },
  categoryButtonUnselected: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  categoryButtonTextUnselected: {
    color: '#666',
  },
  actionButtons: {
    gap: 16,
  },
  dataButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  dataButtonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},
  dataButtonText: {
    color: '#FF8C42',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default EditRestaurantCategories;

