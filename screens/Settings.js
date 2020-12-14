import React from "react";
import { StyleSheet, TextInput, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function Settings({ navigation }) {
  async function handlePress() {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Button onPress={handlePress} title="Log out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
