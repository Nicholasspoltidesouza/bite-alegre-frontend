import useLocation from "@/src/hooks/useLocation";
import React from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface HeaderProps {
  isProfile?: boolean;
  name: string;
  nickName: string;
  showGreeting?: boolean;
  profileImageUrl?: string;
}

const Header: React.FC<HeaderProps> = ({
  isProfile = false,
  name = "Manu",
  nickName = "manu",
  showGreeting = true,
  profileImageUrl,
}) => {
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
            {profileImageUrl ? (
              <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
            ) : (
              <MaterialIcons name="person" size={40} color="#fcd5b5" />
            )}
          </View>

          <View style={styles.textContainer}>
            {!isProfile && showGreeting && (
          <Text style={styles.greeting}>
              Olá, <Text style={styles.bold}>{name}!</Text> Bora jantar?
            </Text>
      )}

        {isProfile && (
            <>
    <Text style={styles.name}>{name}</Text> 
    <Text style={styles.username}>@{nickName}</Text> 
  </>
      )}
            <TouchableOpacity onPress={refreshLocation}>
              <View style={styles.row}>
                <MaterialIcons
                  name="location-on"
                  size={16}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.infoText}>
                  {subregion?.trim()?.length ? subregion : "Location"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {isProfile && (
          <TouchableOpacity
            style={styles.editIconButton}
            onPress={() => console.log("Edit Profile")}
          >
            <MaterialCommunityIcons name="lead-pencil" size={22} color="#fff" />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    position: "relative",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
  },
  editIconButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#FF914B",
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
    elevation: 5,
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
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
  username: {
    fontSize: 14,
    color: "#ffffffcc",
    fontFamily: "Poppins-Medium",
    marginBottom: 5,
  },
  greeting: {
    fontSize: 22, 
    fontFamily: "Poppins-Medium", 
    color: "#fff",
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