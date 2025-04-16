import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert, // Import Alert for placeholder action
} from "react-native";
// Import Feather icons
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Button from "@/src/components/Button";
import Tag from "@/src/components/Tag"; // Assuming Tag component can handle an 'icon' prop
import ToggleSwitch from "@/src/components/ToggleSwitch";
import React from "react";

interface FilterOptions {
  price: string;
  distance: string[]; // Keep distance for 'Localização' filter
  location: string[];
  category: string[];
  openNow: boolean;
}

const FilterScreen = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    price: "Valor Médio",
    distance: [], // 'Localização' will be added here if selected
    location: [],
    category: [],
    openNow: false,
  });

  const handleTagPress = (section: keyof FilterOptions, tag: string) => {
    if (section === "price") {
      setFilters((prev) => ({ ...prev, price: tag }));
    } else {
      setFilters((prev) => {
        const currentTags = prev[section] as string[];
        const tagsArray = Array.isArray(currentTags) ? currentTags : [];
        if (tagsArray.includes(tag)) {
          return {
            ...prev,
            [section]: tagsArray.filter((t) => t !== tag),
          };
        } else {
          return {
            ...prev,
            [section]: [...tagsArray, tag],
          };
        }
      });
    }
  };

  const handleToggleOpenNow = (value: boolean) => {
    setFilters((prev) => ({ ...prev, openNow: value }));
  };

  const handleClear = () => {
    setFilters({
      price: "Valor Médio",
      distance: [],
      location: [],
      category: [],
      openNow: false,
    });
  };

  const handleApply = () => {
    console.log("Applied filters:", filters);
    router.back();
  };

  // Placeholder function for the "Escolha" tag action
  const handleChooseLocation = () => {
    // Replace with actual navigation or modal logic to choose location
    console.log("Choose location action triggered");
    Alert.alert(
      "Escolher Localização",
      "Implementar lógica para escolher localização (ex: abrir mapa).",
    );
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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Price Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preço</Text>
          <View style={styles.tagsContainer}>
            <Tag
              title="Valor Médio"
              isSelected={filters.price === "Valor Médio"}
              style={styles.tag}
              icon={
                <Feather
                  name="chevron-down"
                  size={iconSize}
                  color={dropdownIconColor}
                />
              }
              iconPosition="right"
              onPress={() => handleTagPress("price", "Valor Médio")}
            />
          </View>
        </View>

        {/* Distance Section - Modified */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distância</Text>
          <View style={styles.tagsContainer}>
            {/* Keep map-pin icon for Localização */}
            <Tag
              title="Localização"
              isSelected={filters.distance.includes("Localização")}
              style={styles.tag}
              icon={
                <Feather name="map-pin" size={iconSize} color={iconColor} />
              }
              onPress={() => handleTagPress("distance", "Localização")}
            />
            {/* Replace ... button with Escolha Tag */}
            <Tag
              title="Escolha"
              isSelected={false} // This tag likely triggers an action, not a filter state
              style={styles.tag}
              onPress={handleChooseLocation} // Add onPress handler for the action
              // No icon needed unless specified
            />
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local</Text>
          <View style={styles.tagsContainer}>
            <Tag
              title="Restaurante"
              isSelected={filters.location.includes("Restaurante")}
              style={styles.tag}
              onPress={() => handleTagPress("location", "Restaurante")}
            />
            <Tag
              title="Sorveteria"
              isSelected={filters.location.includes("Sorveteria")}
              style={styles.tag}
              onPress={() => handleTagPress("location", "Sorveteria")}
            />
            <Tag
              title="Bar"
              isSelected={filters.location.includes("Bar")}
              style={styles.tag}
              onPress={() => handleTagPress("location", "Bar")}
            />
            <Tag
              title="Cafeteria"
              isSelected={filters.location.includes("Cafeteria")}
              style={styles.tag}
              onPress={() => handleTagPress("location", "Cafeteria")}
            />
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoria</Text>
          <View style={styles.tagsContainer}>
            <Tag
              title="Churrasco"
              isSelected={filters.category.includes("Churrasco")}
              style={styles.tag}
              onPress={() => handleTagPress("category", "Churrasco")}
            />
            <Tag
              title="Mexicana"
              isSelected={filters.category.includes("Mexicana")}
              style={styles.tag}
              onPress={() => handleTagPress("category", "Mexicana")}
            />
            <Tag
              title="Pastéis"
              isSelected={filters.category.includes("Pastéis")}
              style={styles.tag}
              onPress={() => handleTagPress("category", "Pastéis")}
            />
            <Tag
              title="Hambúrguer"
              isSelected={filters.category.includes("Hambúrguer")}
              style={styles.tag}
              onPress={() => handleTagPress("category", "Hambúrguer")}
            />
            <Tag
              title="Saudável"
              isSelected={filters.category.includes("Saudável")}
              style={styles.tag}
              onPress={() => handleTagPress("category", "Saudável")}
            />
            <Tag
              title="Japonesa"
              isSelected={filters.category.includes("Japonesa")}
              style={styles.tag}
              onPress={() => handleTagPress("category", "Japonesa")}
            />
            <Tag
              title="Vegana"
              isSelected={filters.category.includes("Vegana")}
              style={styles.tag}
              onPress={() => handleTagPress("category", "Vegana")}
            />
          </View>
        </View>

        {/* Open Now Toggle */}
        <View style={styles.toggleSection}>
          <Text style={styles.sectionTitle}>Aberto agora</Text>
          <ToggleSwitch
            isEnabled={filters.openNow}
            onToggle={handleToggleOpenNow}
          />
        </View>

        {/* Action Buttons */}
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: "600",
    color: "#FF914B",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    // Styles for individual tags, applied via the Tag component itself
    // or overridden here if needed.
  },
  // Removed moreButton style as it's no longer used
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
  button: {
    flex: 1,
  },
});

export default FilterScreen;
