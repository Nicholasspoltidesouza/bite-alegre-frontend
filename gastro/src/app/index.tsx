import React from "react"
import { StyleSheet, View } from "react-native"
import FilterScreen from "./screens/FilterScreen"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <FilterScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
})

export default App
