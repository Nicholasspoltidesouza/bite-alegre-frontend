import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
} from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import Button from "@/src/components/Button";
import Tag from "@/src/components/Tag";
import ToggleSwitch from "@/src/components/ToggleSwitch";

interface FilterOptions {
  price: string;
  distance: string[];
  location: string[];
  category: string[];
  openNow: boolean;
}

const FilterScreen = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    price: "Preço Médio",
    distance: [],
    location: [],
    category: [],
    openNow: false,
  });

  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [priceInput, setPriceInput] = useState("");
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [addressInput, setAddressInput] = useState("");

  const priceNumber = parseFloat(filters.price.replace(/[^\d]/g, "")) || 0;
  const priceIsSet = priceNumber > 0;

  const locationSelected = filters.distance[0] === "Localização";
  const addressSet =
    filters.distance.length > 0 &&
    !locationSelected &&
    filters.distance[0].trim().length > 0;

  const addressTitle =
    addressSet && filters.distance[0].length > 18
      ? filters.distance[0].slice(0, 18) + "…"
      : addressSet
      ? filters.distance[0]
      : "Escolha";

  const handleTagPress = (section: keyof FilterOptions, tag: string) => {
    setFilters((prev) => {
      if (section === "price") return { ...prev, price: tag };
      const list = prev[section] as string[];
      return list.includes(tag)
        ? { ...prev, [section]: list.filter((t) => t !== tag) }
        : { ...prev, [section]: [...list, tag] };
    });
  };

  const handleToggleOpenNow = (v: boolean) =>
    setFilters((prev) => ({ ...prev, openNow: v }));

  const handleClear = () =>
    setFilters({
      price: "Preço Médio",
      distance: [],
      location: [],
      category: [],
      openNow: false,
    });

  const handleApply = () => {
    console.log("Applied filters:", filters);
    router.back();
  };

  const iconColor = "#04565A";
  const dropdownIconColor = "#8F8F8F";
  const iconSize = 16;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />

      <View style={styles.header}>
        <Text style={styles.title}>Filtros</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="x" size={24} color="#FF914B" />
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
              icon={
                <Feather
                  name="chevron-down"
                  size={iconSize}
                  color={dropdownIconColor}
                />
              }
              iconPosition="right"
              onPress={() => {
                setPriceInput(priceIsSet ? String(priceNumber) : "");
                setPriceModalVisible(true);
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distância</Text>
          <View style={styles.tagsContainer}>
            <Tag
              title="Localização"
              isSelected={locationSelected}
              controlled
              style={styles.tag}
              icon={
                <FontAwesome6
                  name="location-dot"
                  size={iconSize}
                  color={iconColor}
                />
              }
              onPress={() => {
                setFilters((prev) => ({
                  ...prev,
                  distance: locationSelected ? [] : ["Localização"],
                }));
              }}
            />
            <Tag
              title={addressTitle}
              isSelected={addressSet}
              controlled
              style={styles.tag}
              icon={
                <FontAwesome6
                  name="location-crosshairs"
                  size={iconSize}
                  color={iconColor}
                />
              }
              onPress={() => {
                setAddressInput(addressSet ? filters.distance[0] : "");
                setAddressModalVisible(true);
              }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local</Text>
          <View style={styles.tagsContainer}>
            {["Restaurante", "Sorveteria", "Bar", "Cafeteria"].map((loc) => (
              <Tag
                key={loc}
                title={loc}
                isSelected={filters.location.includes(loc)}
                style={styles.tag}
                onPress={() => handleTagPress("location", loc)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoria</Text>
          <View style={styles.tagsContainer}>
            {[
              "Churrasco",
              "Mexicana",
              "Pastéis",
              "Hambúrguer",
              "Saudável",
              "Japonesa",
              "Vegana",
            ].map((cat) => (
              <Tag
                key={cat}
                title={cat}
                isSelected={filters.category.includes(cat)}
                style={styles.tag}
                onPress={() => handleTagPress("category", cat)}
              />
            ))}
          </View>
        </View>

        <View style={styles.toggleSection}>
          <Text style={styles.sectionTitle}>Aberto agora</Text>
          <ToggleSwitch
            isEnabled={filters.openNow}
            onToggle={handleToggleOpenNow}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Limpar"
            type="white"
            onPress={handleClear}
            style={styles.button}
          />
          <Button
            title="Aplicar"
            type="orange"
            onPress={handleApply}
            style={styles.button}
          />
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
                  if (isNaN(num) || num <= 0) {
                    setFilters((prev) => ({ ...prev, price: "Preço Médio" }));
                  } else {
                    setFilters((prev) => ({
                      ...prev,
                      price: `R$ ${num}`,
                    }));
                  }
                  setPriceModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={addressModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.wrapper}>
            <Text style={modalStyles.modalTitle}>Digite um endereço</Text>

            <TextInput
              value={addressInput}
              onChangeText={setAddressInput}
              placeholder="Rua, número, cidade"
              style={modalStyles.input}
            />

            <View style={modalStyles.modalButtons}>
              <Button
                title="Cancelar"
                type="white"
                style={{ flex: 1, marginRight: 10 }}
                onPress={() => setAddressModalVisible(false)}
              />
              <Button
                title="Salvar"
                type="orange"
                style={{ flex: 1 }}
                onPress={() => {
                  const addr = addressInput.trim();
                  setFilters((prev) => ({
                    ...prev,
                    distance: addr ? [addr] : [],
                  }));
                  setAddressModalVisible(false);
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
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF914B",
  },
  scrollView: { flex: 1 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#FF914B",
    marginBottom: 10,
  },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tag: {},
  toggleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 15,
  },
  button: { flex: 1 },
});

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  wrapper: {
    backgroundColor: "#F8F8F8",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    fontWeight: "600",
    color: "#FF914B",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E1E1",
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 24,
  },
  modalButtons: { flexDirection: "row" },
});

export default FilterScreen;
