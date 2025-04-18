import useLocation from "@/src/hooks/useLocation";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const UserProfileHeader: React.FC = () => {
  const { subregion, refreshLocation } = useLocation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF914B" translucent={false} />
      <LinearGradient
        colors={["#FF914B", "#FFFDFC"]}
        locations={[0.45, 0.95]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.photo}>
            <MaterialIcons name="person" size={40} color="#fcd5b5" />
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={refreshLocation}>
              <View style={styles.row}>
                <MaterialIcons
                  name="location-on" size={16} color="#fff" style={styles.icon} 
                  />
                <Text style={styles.infoText}>
                  {subregion?.trim()?.length ? subregion : "Localização"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <MaterialIcons
                  name="edit"size={16} color="#fff" style={styles.icon}
                />
                <Text style={styles.infoText}>Editar perfil</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    borderBottomEndRadius: 20,
  },
  gradient: {
    flex: 1,
    borderBottomEndRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    backgroundColor: "#ffffff40",
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});

export default UserProfileHeader;