"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import Button from "@/src/components/Button"
import Tag from "@/src/components/Tag"
import ToggleSwitch from "@/src/components/ToggleSwitch"
import React from "react"

interface FilterOptions {
  price: string
  distance: string[]
  location: string[]
  category: string[]
  openNow: boolean
}

const FilterScreen = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    price: "Valor Médio",
    distance: [],
    location: [],
    category: [],
    openNow: false,
  })

  const handleTagPress = (section: keyof FilterOptions, tag: string) => {
    if (section === "price") {
      setFilters((prev) => ({ ...prev, price: tag }))
    } else {
      setFilters((prev) => {
        const currentTags = prev[section] as string[]
        if (currentTags.includes(tag)) {
          return {
            ...prev,
            [section]: currentTags.filter((t) => t !== tag),
          }
        } else {
          return {
            ...prev,
            [section]: [...currentTags, tag],
          }
        }
      })
    }
  }

  const handleToggleOpenNow = (value: boolean) => {
    setFilters((prev) => ({ ...prev, openNow: value }))
  }

  const handleClear = () => {
    setFilters({
      price: "Valor Médio",
      distance: [],
      location: [],
      category: [],
      openNow: false,
    })
  }

  const handleApply = () => {
    console.log("Applied filters:", filters)
    // Here you would typically navigate to results with the filters
    router.back() // Go back to previous screen after applying
  }

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
        {/* Price Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preço</Text>
          <View style={styles.tagsContainer}>
            <Tag title="Valor Médio" isSelected={filters.price === "Valor Médio"} style={styles.tag} />
          </View>
        </View>

        {/* Distance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distância</Text>
          <View style={styles.tagsContainer}>
            <Tag title="Casa" isSelected={filters.distance.includes("Casa")} style={styles.tag} />
            <Tag title="Localização" isSelected={filters.distance.includes("Localização")} style={styles.tag} />
            <TouchableOpacity style={styles.moreButton}>
              <MaterialIcons name="more-horiz" size={24} color="#8F8F8F" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local</Text>
          <View style={styles.tagsContainer}>
            <Tag title="Restaurante" isSelected={filters.location.includes("Restaurante")} style={styles.tag} />
            <Tag title="Sorveteria" isSelected={filters.location.includes("Sorveteria")} style={styles.tag} />
            <Tag title="Bar" isSelected={filters.location.includes("Bar")} style={styles.tag} />
            <Tag title="Cafeteria" isSelected={filters.location.includes("Cafeteria")} style={styles.tag} />
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoria</Text>
          <View style={styles.tagsContainer}>
            <Tag title="Churrasco" isSelected={filters.category.includes("Churrasco")} style={styles.tag} />
            <Tag title="Mexicana" isSelected={filters.category.includes("Mexicana")} style={styles.tag} />
            <Tag title="Pastéis" isSelected={filters.category.includes("Pastéis")} style={styles.tag} />
            <Tag title="Hambúrguer" isSelected={filters.category.includes("Hambúrguer")} style={styles.tag} />
            <Tag title="Saudável" isSelected={filters.category.includes("Saudável")} style={styles.tag} />
            <Tag title="Japonesa" isSelected={filters.category.includes("Japonesa")} style={styles.tag} />
            <Tag title="Vegana" isSelected={filters.category.includes("Vegana")} style={styles.tag} />
          </View>
        </View>

        {/* Open Now Toggle */}
        <View style={styles.toggleSection}>
          <Text style={styles.sectionTitle}>Aberto agora</Text>
          <ToggleSwitch isEnabled={filters.openNow} onToggle={handleToggleOpenNow} />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Limpar" type="white" onPress={handleClear} style={styles.button} />
          <Button title="Aplicar" type="orange" onPress={handleApply} style={styles.button} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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
    marginBottom: 10,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(227, 225, 225, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
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
  },
  button: {
    width: "45%",
  },
})

export default FilterScreen
