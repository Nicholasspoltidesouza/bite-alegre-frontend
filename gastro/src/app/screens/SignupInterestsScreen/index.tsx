import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';
import { API_URL_BACKEND } from '../../../constants/apiUrl';
import useFetchTags from '../../../hooks/useFetchTags';
import { useCreateUser } from '../../../hooks/useUserApi';

interface SignupInterestsProps {
  backButtonRouter: () => void;
}

const screenWidth = Dimensions.get('window').width;

const SignupInterests: React.FC = () => {
  const { screenTitle, backRoute } = useLocalSearchParams();
  const { userData } = useLocalSearchParams();
  const router = useRouter();
  const { createUser, loading } = useCreateUser();

  const parsedUserData = userData ? JSON.parse(userData as string) : null;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { tags, loading: tagsLoading, error } = useFetchTags(`${API_URL_BACKEND}/tags`);

  const toggleTagSelection = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleConclude = async () => {
    if (selectedTags.length === 0) {
      Alert.alert("Erro", "Por favor, selecione pelo menos uma tag.");
      return;
    }

    try {
      const payload = {
        ...parsedUserData,
        tagIds: selectedTags,
      };

      await createUser(payload);

      console.log("Usuário criado:", payload);

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      router.push("/screens/Profile");
    } catch (err) {
      Alert.alert("Erro", "Falha ao cadastrar usuário.");
    }
  };

  const filterAndChunk = (type: string) => {
    const filtered = tags.filter(tag => tag.type === type);
    const itemsPerRow = screenWidth >= 768 ? 4 : 3;

    const result: { id: string; name: string; type: string }[][] = [];
    for (let i = 0; i < filtered.length; i += itemsPerRow) {
      result.push(filtered.slice(i, i + itemsPerRow));
    }
    return result;
  };

  const chunkedLocals = filterAndChunk('LOCAL');
  const chunkedCategories = filterAndChunk('CATEGORIA');
  const chunkedOcasion = filterAndChunk('OCASIAO');

  if (tagsLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#FF914B" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.containerTitle}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push({ pathname: backRoute as any })}>
            <MaterialIcons name="keyboard-arrow-left" size={35} color="#FF914B" />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            {screenTitle || 'Conte-nos seus interesses'}
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              router.push({
                pathname: "/screens/SignupUser",
                params: { userData: JSON.stringify(parsedUserData) },
              });
            }}
          >
            <MaterialIcons name="keyboard-arrow-left" size={35} color="#FF914B" />
          </TouchableOpacity>
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Local</Text>
          {chunkedLocals.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <Tag
                  key={tag.id}
                  title={tag.name}
                  isSelected={selectedTags.includes(tag.id)}
                  onPress={() => toggleTagSelection(tag.id)}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Categoria</Text>
          {chunkedCategories.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <Tag
                  key={tag.id}
                  title={tag.name}
                  isSelected={selectedTags.includes(tag.id)}
                  onPress={() => toggleTagSelection(tag.id)}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Ocasião</Text>
          {chunkedOcasion.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <Tag
                  key={tag.id}
                  title={tag.name}
                  isSelected={selectedTags.includes(tag.id)}
                  onPress={() => toggleTagSelection(tag.id)}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={loading ? "Cadastrando..." : "Concluir"}
            onPress={handleConclude}
            type="orange"
            disabled={loading || selectedTags.length === 0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: '4%',
  },
  containerTitle: {
    alignItems: 'center',
    paddingVertical: '8%',
    paddingHorizontal: '4%',
    marginBottom: '2%',
    position: 'relative',
  },
  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: screenWidth < 360 ? 18 : 20,
    fontWeight: 'bold',
    color: '#FF914B',
    textAlign: 'center',
    marginTop: '10%',
  },
  interestsContainer: {
    marginTop: '5%',
    paddingHorizontal: '2%',
  },
  interestsTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: screenWidth < 360 ? 18 : 20,
    fontWeight: '500',
    color: '#FF914B',
    marginBottom: '5%',
    marginLeft: '1%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '3%',
    flexWrap: 'wrap',
  },
  tagWrapper: {
    width: `${100 / (screenWidth >= 768 ? 4 : 3) - 2}%`,
    marginBottom: 8,
  },
  emptyTag: {
    width: `${100 / (screenWidth >= 768 ? 4 : 3) - 2}%`,
  },
  buttonContainer: {
    marginTop: '30%',
    marginBottom: '10%',
    alignItems: 'flex-end',
    paddingHorizontal: '2%',
  },
  backButton: {
    position: 'absolute',
    top: '50%',
    left: '2%',
    zIndex: 10,
  },
});

export default SignupInterests;
