import useLocation from "@/src/hooks/useLocation";
import React from "react";
import {View, StyleSheet,Text,StatusBar,TouchableOpacity,Image,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

interface HeaderProps {
  isProfile?: boolean;
  userName?: string;
  showGreeting?: boolean;
  profileImageUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  isProfile = false,
  userName = "Manu",
  showGreeting = true,
  profileImageUrl,
}) => {

    
  const { subregion, refreshLocation } = useLocation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF914B" translucent={false} />
      <LinearGradient
        colors={["#FF914B", "#FFFDFC"]} locations={[0.45, 0.95]} style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.photo}>
            {profileImageUrl ? (
              <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
            ) : (
              <MaterialIcons name="person" size={40} color="#fcd5b5" />
            )}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.name}>{userName}</Text>
            {isProfile && (
              <Text style={styles.username}>@{userName.toLowerCase()}</Text>
            )}
            {!isProfile && showGreeting && (
              <Text style={styles.greeting}>
                Olá, <Text style={styles.bold}>{userName}!</Text> Bora jantar?
              </Text>
            )}

            <TouchableOpacity onPress={refreshLocation}>
              <View style={styles.row}>
                <MaterialIcons name="location-on" size={16} color="#fff" style={styles.icon}
                />
                <Text style={styles.infoText}>
                  {subregion?.trim()?.length ? subregion : "Localização"}
                </Text>
              </View>
            </TouchableOpacity>

            {isProfile && (
              <TouchableOpacity>
                <View style={styles.row}>
                  <MaterialIcons name="edit" size={16} color="#fff" style={styles.icon}
                  />
                  <Text style={styles.infoText}>Editar perfil</Text>
                </View>
              </TouchableOpacity>
            )}
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
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  username: {
    fontSize: 14,
    color: "#ffffffcc",
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
  },
  greeting: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Regular",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
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

export default Header;