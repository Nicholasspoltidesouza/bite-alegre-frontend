import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Button from "../../../components/Button";
import Tag from "../../../components/Tag";
import { API_URL_ANDROID, API_URL_BACKEND } from "../../../constants/apiUrl";
import useFetchTags from "../../../hooks/useFetchTags";
import { useCreateUser } from "../../../hooks/useUserApi";
import { useRestaurantApi } from "@/src/hooks/useRestaurantApi";

const screenWidth = Dimensions.get("window").width;

const SignupInterests: React.FC = () => {
  const { userData, restaurantData, screenTitle } = useLocalSearchParams();
  const router = useRouter();
  const { createUser, loading } = useCreateUser();
  const { createRestaurant } = useRestaurantApi();

  const parsedUserData = userData ? JSON.parse(userData as string) : null;
  const parsedRestaurantData = restaurantData
    ? JSON.parse(restaurantData as string)
    : null;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    tags,
    loading: tagsLoading,
    error,
  } = useFetchTags(`${API_URL_ANDROID}/tags`);

  const toggleTagSelection = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleConclude = async () => {
    if (selectedTags.length === 0) {
      Alert.alert("Erro", "Por favor, selecione pelo menos uma tag.");
      return;
    }

    try {
      const payload = {
        ...(parsedUserData || {
          ...parsedRestaurantData,
          cnpj: parsedRestaurantData?.cnpj?.replace(/[^\d]/g, ""),
        }),
        tagIds: selectedTags,
      };

      if (parsedUserData) {
        const userCreated = await createUser(payload);
        if (userCreated) {
          Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
          router.push("/screens/Profile");
        } else {
          Alert.alert("Dados inválidos para o cadastro do seu usuário.");
        }
      } else if (parsedRestaurantData) {
        const restaurantCreated = await createRestaurant(payload);
        if (restaurantCreated) {
          Alert.alert("Sucesso", "Restaurante cadastrado com sucesso!");
          router.push({
            pathname: "/screens/restaurantProfile",
            params: {
              restaurantId: restaurantCreated.id,
            },
          });
        } else {
          Alert.alert("Dados inválidos para o cadastro do seu restaurante.");
        }
      } else {
        Alert.alert("Erro", "Dados inválidos para cadastro.");
      }
    } catch {
      Alert.alert("Erro", "Falha ao cadastrar.");
    }
  };

  const renderTagSection = (title: string, type: string) => {
    const filteredTags = tags.filter((tag) => tag.type === type);
    const itemsPerRow = screenWidth >= 768 ? 4 : 3;

    const rows = [];
    for (let i = 0; i < filteredTags.length; i += itemsPerRow) {
      rows.push(filteredTags.slice(i, i + itemsPerRow));
    }

    return (
      <View style={styles.interestsContainer}>
        <Text style={styles.interestsTitle}>{title}</Text>
        {rows.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map((tag) => (
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
    );
  };

  if (tagsLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color="#FF914B"
          style={{ marginTop: 50 }}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ color: "red", textAlign: "center", marginTop: 50 }}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.containerTitle}>          
          <Text style={styles.titleText}>
            {screenTitle || 'Conte-nos seus interesses'}
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (parsedUserData) {
                router.push({
                  pathname: "/screens/SignupUser",
                  params: { userData: JSON.stringify(parsedUserData) },
                });
              } else if (parsedRestaurantData) {
                router.push({
                  pathname: "/screens/SignupRestaurant",
                  params: {
                    restaurantData: JSON.stringify(parsedRestaurantData),
                  },
                });
              } else {
                Alert.alert("Erro", "Dados de cadastro não encontrados.");
              }
            }}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={35}
              color="#FF914B"
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>{screenTitle}</Text>
        </View>

        {renderTagSection("Local", "LOCAL")}
        {renderTagSection("Categoria", "CATEGORIA")}
        {renderTagSection("Ocasião", "OCASIAO")}

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
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: "4%",
  },
  containerTitle: {
    alignItems: "center",
    paddingVertical: "8%",
    marginBottom: "2%",
    position: "relative",
  },
  titleText: {
    fontFamily: "Poppins-Regular",
    fontSize: screenWidth < 360 ? 18 : 20,
    fontWeight: "bold",
    color: "#FF914B",
    textAlign: "center",
    marginTop: "10%",
  },
  interestsContainer: {
    marginTop: "5%",
    paddingHorizontal: "2%",
  },
  interestsTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: screenWidth < 360 ? 18 : 20,
    fontWeight: "500",
    color: "#FF914B",
    marginBottom: "5%",
    marginLeft: "1%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "3%",
    flexWrap: "wrap",
  },
  buttonContainer: {
    marginTop: "30%",
    marginBottom: "10%",
    alignItems: "flex-end",
    paddingHorizontal: "2%",
  },
  backButton: {
    position: "absolute",
    top: "50%",
    left: "2%",
    zIndex: 10,
  },
});

export default SignupInterests;
