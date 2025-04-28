import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native';
import CustomTextInput from '@/src/components/TextFieldCadastroUsuario';
import { ReviewDTO } from '@/src/@types/DTO';
import { useRestaurantApi } from '@/src/hooks/useRestaurantApi';
import { useCreateUser } from '@/src/hooks/useUserApi';

const screenWidth = Dimensions.get('window').width;

const CreateReview: React.FC = () => {
  const { screenTitle, backRoute } = useLocalSearchParams();    
  const { createReview } = useRestaurantApi();
  const { getUserById, data: user, loading, error } = useCreateUser();

  const [description, setDescription] = useState<string>('');
  const [nota, setNota] = useState(0);
  const [userId, setUserId] = useState('');
  const [imputHeight, setImputHeight] = useState(0);

  const corEstrelaSelecionada = "#FF914B";
  const corEstrelaNaoSelecionada = "rgba(255, 179, 112, 0.25)";

  useEffect(() => {
    getUserById("1");
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
            color={i <= nota ? corEstrelaSelecionada : corEstrelaNaoSelecionada}
            style={styles.starIcon}
          />
        </TouchableOpacity>
      );
    }
    return estrelas;
  };

  const handleSubmit = async () =>  {
    const data: ReviewDTO = {
      stars: nota,
      feedback: description,
      user_id: '1',
      restaurant_id: '1'
    };

    createReview(data, '1');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.containerTitle}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push({ pathname: backRoute as any })}>
            <MaterialIcons name="keyboard-arrow-left" size={35} color="#FF914B" />
          </TouchableOpacity>
          <Text style={styles.titleText}>
            Esta foi sua primeira visita ao restaurante, deixe uma avaliação!
          </Text>
        </View>
        <View style={styles.textUser}>
            <View style={styles.photo}>
                <MaterialIcons name="person" size={60} color="#fcd5b5" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textUserName}>Nome Usuário </Text>
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
            style={{marginHorizontal: '5%', height: imputHeight > 50 ? imputHeight : 50}}
            onContentSizeChange={(e) => setImputHeight(e.nativeEvent.contentSize.height)}
            >
        </CustomTextInput>
        <TouchableOpacity style={{ alignItems: 'flex-end'}} onPress={() => handleSubmit()}>
          <MaterialIcons name="navigation" size={30} color="#FFB370" style={{ width: 0,transform: [{ rotate: '90deg' }]}}/>
        </TouchableOpacity>
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
    color: '#000000',
    textAlign: 'center',
    marginTop: '10%',
  },
  textUserName:{
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5
  },
  textUser:{
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
function useUserApi(): { getUserById: any; data: any; loading: any; error: any; } {
  throw new Error('Function not implemented.');
}

