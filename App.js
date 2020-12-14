import React from "react";
import { StyleSheet, TextInput, Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as firebase from "firebase";

import { AppTabs } from "./navigation/index";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBarHeight } from "./constants/StatusBarHeight";

var firebaseConfig = {
  apiKey: "AIzaSyDEJvrXv1Nx5gVfq4RXWjSqDDYfM012TX4",
  authDomain: "fir-app-ce46f.firebaseapp.com",
  projectId: "fir-app-ce46f",
  storageBucket: "fir-app-ce46f.appspot.com",
  messagingSenderId: "827644207620",
  appId: "1:827644207620:web:3ef620811fb0d695de4b51",
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [user, setUser] = React.useState(null);
  const [name, setUserName] = React.useState("");

  React.useEffect(() => {
    readUser();
  }, []);

  async function handlePress() {
    const id = Math.round(Math.random() * 1000);
    const user = { id, name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }
  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }

  if (!user) {
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
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: StatusBarHeight.height ? StatusBarHeight.height : "100%",
            width: "100%",
          }}
        >
          <NavigationContainer>
            <AppTabs />
          </NavigationContainer>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
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
