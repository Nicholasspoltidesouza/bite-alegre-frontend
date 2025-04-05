import React from "react";
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Text } from 'react-native';

interface RestaurantInformationProps {
  name: String;
  starCont: String;
  contReview: String;
}

const RestaurantInformation: React.FC<RestaurantInformationProps> = ({ name, starCont, contReview }) => {

  const styles = StyleSheet.create({
      screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      contentContainer: {
        width: '90%',
        padding: 16,
        alignItems: 'center',
      },
      title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
      },
      infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
      },
      text: {
        marginLeft: 8,
        textAlign: 'center',
      },
      descriptionText: {
        marginLeft: 8,
        textAlign: 'center',
      },
      openText: {
        marginLeft: 8,
        textAlign: 'center',
      },
      visitedText: {
        marginLeft: 8,
        textAlign: 'center',
      },
      reviewText: {
        fontSize: 12,
        color: '#808080',
        marginLeft: 10,
      },
    });
    

  return (
    <View style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{name}</Text>

        <View style={styles.infoRow}>
          <Foundation name="star" size={24} color="#FF914B" />
          <Text style={styles.text}>{starCont}</Text>
          <Text style={styles.reviewText}>({contReview} avaliações)</Text>
        </View>

        <View style={{ marginTop: 8 }}>
          <View style={styles.infoRow}>
            <Ionicons name="document-text-outline" size={24} color="#FF914B" />
            <Text style={styles.descriptionText}>Descrição</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome6 name="location-dot" size={24} color="#FF914B" />
            <Text style={styles.text}>Endereço do Restaurante</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="cutlery" size={24} color="#FF914B" />
            <Text style={styles.openText}>Aberto agora</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar-start" size={24} color="#FF914B" />
            <Text style={styles.visitedText}>Estive Aqui</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default RestaurantInformation;