import React from "react";
import { StyleSheet, TextInput, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function Login({ navigation }) {
  const [name, setUserName] = React.useState("");

  async function handlePress() {
    const id = Math.round(Math.random() * 1000);
    const user = { id, name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    navigation.navigate("RoomList");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={name}
        placeholder="Enter your Name"
        onChangeText={setUserName}
      />
      <Button onPress={handlePress} title="Login" />
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
    padding: 30,
  },
  textInput: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: "gray",
  },
});
