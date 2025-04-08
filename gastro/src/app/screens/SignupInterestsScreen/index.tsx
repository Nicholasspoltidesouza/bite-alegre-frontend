import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';
import { API_URL_BACKEND } from '../../../constants/apiUrl';
import useFetchTags from '../../../hooks/useFetchTags';

interface SignupInterestsProps {
  backButtonRouter: () => void;
}

const SignupInterests: React.FC = () => {
  const router = useRouter();
  const { screenTitle } = router.query;

  const { tags, loading, error }: { tags: { id: string; name: string; type: string }[]; loading: boolean; error: string | null } = useFetchTags(`${API_URL_BACKEND}/tags`);

  const filterAndChunk = (type: string) => {
    const filtered = tags.filter(tag => tag.type === type);
    const result: { id: string; name: string; type: string }[][] = [];
    for (let i = 0; i < filtered.length; i += 3) {
      result.push(filtered.slice(i, i + 3));
    }
    return result;
  };

  const chunkedLocals = filterAndChunk('LOCAL');
  const chunkedCategories = filterAndChunk('CATEGORIA');
  const chunkedOcasion = filterAndChunk('OCASIAO');

  if (loading) {
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
          <TouchableOpacity style={styles.backButton} onPress={backButtonRouter}>
            <MaterialIcons name="keyboard-arrow-left" size={35} color="#FF914B" />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            {screenTitle || 'Conte-nos seus interesses'}
          </Text>
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Local</Text>
          {chunkedLocals.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <Tag key={tag.id} title={tag.name} />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Categoria</Text>
          {chunkedCategories.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <Tag key={tag.id} title={tag.name} />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Ocasião</Text>
          {chunkedOcasion.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <Tag key={tag.id} title={tag.name} />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button title='Concluir' onPress={() => console.log('Botão pressionado')} type={'orange'} />
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
    padding: 15,
  },
  containerTitle: {
    alignItems: 'center',
    padding: 30,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF914B',
    textAlign: 'center',
    marginTop: 44,
  },
  interestsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  interestsTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    fontWeight: '500',
    color: '#FF914B',
    marginBottom: 20,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 150,
    marginBottom: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    position: 'absolute',
    alignItems: 'flex-start',
    top: 53,
    left: 28,
  },
});

export default SignupInterests;
