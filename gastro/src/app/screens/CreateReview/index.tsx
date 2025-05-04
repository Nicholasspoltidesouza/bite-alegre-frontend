import { ReviewDTO } from '@/src/@types/DTO';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import Colors from '@/src/constants/Colors';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import { useCreateUser } from '@/src/hooks/useUserApi';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CreateReview: React.FC = () => {
  const { createReview } = useRestaurantApi();
  const { getUserById, loading, error, data: userData } = useCreateUser();

  const [description, setDescription] = useState<string>('');
  const [nota, setNota] = useState(0);
  const [imputHeight, setImputHeight] = useState(0);

  useEffect(() => {
    getUserById("user-1");
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FF914B" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>{error}</Text>
      </SafeAreaView>
    );
  }

  const handleEstrelaPress = (estrelaSelecionada: number) => {
    setNota(estrelaSelecionada);
    console.log(`Nota selecionada: ${estrelaSelecionada}`);
  };

  const renderEstrelas = () => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      estrelas.push(
        <TouchableOpacity key={i} onPress={() => handleEstrelaPress(i)}>
          <FontAwesome
            name={'star'}
            size={24}
            color={i <= nota ? Colors.orange.orangeStandard : 'rgba(255, 179, 112, 0.25)'}
            style={styles.starIcon}
          />
        </TouchableOpacity>
      );
    }
    return estrelas;
  };

  const handleSubmit = async () => {
    try {
      const data: ReviewDTO = {
        stars: nota,
        feedback: description,
        user_id: userData!.id!,
        restaurant_id: '1'
      };

      await createReview(data, '1');
      Alert.alert('Sucesso', 'Avaliação feita com sucesso!');
      router.push({ pathname: "/screens/restaurantProfile" });
    } catch (err) {
      console.error('Submit Error:', err);
      Alert.alert('Erro', err instanceof Error ? err.message : 'Ocorreu um erro inesperado');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.containerTitle}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push({ pathname: "/screens/restaurantProfile" })}>
            <MaterialIcons name="keyboard-arrow-left" size={35} color="#FF914B" />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            Esta foi sua primeira visita ao restaurante, deixe uma avaliação!
          </Text>
        </View>
        <View style={styles.textUser}>
          <View style={styles.photo}>
            {userData?.profilePhoto ? (
              <Image source={{ uri: userData.profilePhoto }} />
            ) : (
              <MaterialIcons name="person" size={60} color="#fcd5b5" />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textUserName}>{userData?.name}</Text>
            <Text>As avaliações são públicas e podem ser vistas tanto pelo restaurante, quanto por outros usuários.</Text>
          </View>
        </View>
        <View style={styles.starsContainer}>
          {renderEstrelas()}
        </View>
        <CustomTextInput
          value={description}
          onChangeText={setDescription}
          placeholder={'Descreva sua experiência (opcional)'}
          multiline={true}
          style={{ marginHorizontal: '5%', height: imputHeight > 50 ? imputHeight : 50 }}
          onContentSizeChange={(e) => setImputHeight(e.nativeEvent.contentSize.height)}
        >
        </CustomTextInput>
        <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => handleSubmit()}>
          <MaterialIcons name="navigation" size={40} color="#FFB370" style={{ margin: '5%', transform: [{ rotate: '90deg' }] }} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.black,
    textAlign: 'center',
    marginTop: '10%',
  },
  textUserName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.black,
    marginBottom: 5
  },
  textUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    backgroundColor: '#FFB370',
    borderRadius: 50,
    height: 65,
    width: 65,
    alignItems: 'center',
    marginRight: '5%'
  },
  textContainer: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  starsContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '5%'
  },
  starIcon: {
    marginHorizontal: 5,
  },
  notaText: {
    marginTop: '10%',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: '50%',
    left: '2%',
    zIndex: 10,
  }
});

export default CreateReview;
