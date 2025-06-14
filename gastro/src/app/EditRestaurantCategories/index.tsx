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
import Colors from '@/src/constants/Colors';

interface Category {
  id: string;
  name: string;
  type?: string;
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

const EditRestaurantCategories: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuthContext();
  const { getTags, tags, loading: tagsLoading, error } = useFetchTags();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  
  const restaurantData: RestaurantData | null = params.restaurantData 
    ? JSON.parse(params.restaurantData as string) 
    : null;
    
  const categoryTags = tags.filter(tag => tag.type === 'CATEGORIA');

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (restaurantData?.categories) {
      setSelectedCategories(restaurantData.categories);
    }
  }, [restaurantData]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
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
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar categorias');
      }
      
      Alert.alert('Sucesso', 'Categorias salvas com sucesso!');
      
      router.push({
        pathname: '/restaurantProfile',
        params: {
          restaurantId: user!.id,
        },
      });

    } catch (err) {
      console.error('Erro ao salvar categorias:', err);
      Alert.alert('Erro', 'Erro ao salvar categorias. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (tagsLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.orange.orangeStandard} />
          <Text style={styles.loadingText}>Carregando categorias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erro ao carregar categorias: {error}</Text>
          <Button title="Tentar novamente" onPress={() => getTags()} type="orange" />
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
            <MaterialIcons name="arrow-back-ios" size={24} color={Colors.orange.orangeStandard} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Edite as categorias do seu restaurante
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* Grid de categorias */}
          <View style={styles.categoryGrid}>
            {categoryTags.length > 0 ? (
              categoryTags.map((category) => (
                <CategoryButton
                  key={category.id}
                  category={category}
                  isSelected={selectedCategories.includes(category.id)}
                  onPress={() => toggleCategory(category.id)}
                />
              ))
            ) : (
              <Text style={styles.noCategoriesText}>
                Nenhuma categoria disponível
              </Text>
            )}
          </View>

          <View style={styles.actionButtons}>
            <Button 
              title={saving ? "Salvando..." : "Salvar"} 
              onPress={handleSave} 
              type="orange"
              disabled={saving || selectedCategories.length === 0}
            />
            <TouchableOpacity onPress={handleBack} style={styles.dataButton}>
              <View style={styles.dataButtonContent}>
                <Text style={styles.dataButtonText}>Dados</Text>
                <MaterialIcons name="arrow-back-ios" size={16} color={Colors.orange.orangeStandard} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'column', 
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    alignSelf: 'flex-start', 
    padding: 8,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.orange.orangeStandard,
    textAlign: 'left', // Mudança: alinhamento à esquerda
    paddingLeft: 8, // Mudança: pequeno padding para alinhar com a seta
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100, // Mudança: espaço para os botões fixos na parte inferior
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
    backgroundColor: Colors.orange.orangeStandard,
    borderColor: Colors.orange.orangeStandard,
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
    color: Colors.white,
  },
  categoryButtonTextUnselected: {
    color: '#666',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButtonContainer: {
    flex: 1,
    marginRight: 16,
  },
  dataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  dataButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dataButtonText: {
    color: Colors.orange.orangeStandard,
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
  noCategoriesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default EditRestaurantCategories;

