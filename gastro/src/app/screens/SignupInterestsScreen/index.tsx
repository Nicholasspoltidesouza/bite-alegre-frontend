import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';
import { API_URL_ANDROID, API_URL_BACKEND } from '../../../constants/apiUrl';
import useFetchTags from '../../../hooks/useFetchTags';

interface SignupInterestsProps {
  backButtonRouter: () => void;
}

const screenWidth = Dimensions.get('window').width;

const SignupInterests: React.FC = () => {
  const { screenTitle, backRoute } = useLocalSearchParams();

  const { tags, loading, error }: { tags: { id: string; name: string; type: string }[]; loading: boolean; error: string | null } = useFetchTags(`${API_URL_ANDROID}/tags`);

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
          <TouchableOpacity style={styles.backButton} onPress={() => router.push({ pathname: backRoute as any })}>
            <MaterialIcons name="keyboard-arrow-left" size={35} color="#FF914B" />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            { screenTitle || 'Conte-nos seus interesses' }
          </Text>
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Local</Text>
          {chunkedLocals.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <View key={tag.id} style={styles.tagWrapper}>
                  <Tag title={tag.name} />
                </View>
              ))}
              {row.length < (screenWidth >= 768 ? 4 : 3) && 
                Array(screenWidth >= 768 ? 4 - row.length : 3 - row.length)
                  .fill(null)
                  .map((_, i) => <View key={`empty-${i}`} style={styles.emptyTag} />)
              }
            </View>
          ))}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Categoria</Text>
          {chunkedCategories.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <View key={tag.id} style={styles.tagWrapper}>
                  <Tag title={tag.name} />
                </View>
              ))}
              {/* Preencher espaços vazios para manter o layout */}
              {row.length < (screenWidth >= 768 ? 4 : 3) && 
                Array(screenWidth >= 768 ? 4 - row.length : 3 - row.length)
                  .fill(null)
                  .map((_, i) => <View key={`empty-${i}`} style={styles.emptyTag} />)
              }
            </View>
          ))}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Ocasião</Text>
          {chunkedOcasion.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map(tag => (
                <View key={tag.id} style={styles.tagWrapper}>
                  <Tag title={tag.name} />
                </View>
              ))}
              {/* Preencher espaços vazios para manter o layout */}
              {row.length < (screenWidth >= 768 ? 4 : 3) && 
                Array(screenWidth >= 768 ? 4 - row.length : 3 - row.length)
                  .fill(null)
                  .map((_, i) => <View key={`empty-${i}`} style={styles.emptyTag} />)
              }
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
