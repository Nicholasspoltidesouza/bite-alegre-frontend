import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import Tag from '../../components/Tag';
import Button from '../../components/Button';

const SignupInterests: React.FC = () => {
  const interests = ['Ao ar livre', 'Bistrô', 'Luz de velas', 'Casual', 'Reservado', 'Roof top', 'Música ao vivo', 'Pub', 'Familiar'];
  const category = ['Churrasco', 'Bar', 'Hambúrguer', 'Mexicana', 'Japonese', 'Árabe', 'Sorveteria', 'Cafeteria', 'Padaria'];
  const ocasion = ['Almoço', 'Jantar', 'Festa', 'Date', 'Happy hour', 'Lanche'];

  const chunkArray = (array: string[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunkedInterests = chunkArray(interests, 3);
  const chunkedCategory = chunkArray(category, 3);
  const chunkedOcasion = chunkArray(ocasion, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.titleText}>
            {'Conte-nos seus interesses'}
          </Text>
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Local</Text>
          {chunkedInterests.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((interest, index) => (
                <Tag key={index} title={interest} />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Categoria</Text>
          {chunkedCategory.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((interest, index) => (
                <Tag key={index} title={interest} />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Ocasião</Text>
          {chunkedOcasion.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((interest, index) => (
                <Tag key={index} title={interest} />
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
    padding: 20,
  },
  containerTitle: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF914B',
    textAlign: 'center',
  },
  interestsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  interestsTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    fontWeight: '500',
    color: '#FF914B',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'flex-end',
  },
});

export default SignupInterests;