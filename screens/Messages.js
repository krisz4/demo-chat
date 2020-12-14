import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from "firebase";
import "firebase/firestore";

export default function Messages(props) {
  const [user, setUser] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const db = firebase.firestore();
  let chatsRef;
  if (props.route?.params?.room) {
    chatsRef = db.collection(props.route.params.room);
  } else {
    alert("Nincs szoba kiválasztva");
    props.navigation.navigate("Rooms");
  }

  React.useEffect(() => {
    readUser();
    const unsub = chatsRef.onSnapshot((querySnapShot) => {
      const _messages = querySnapShot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(_messages);
    });
    return unsub;
  }, []);

  const appendMessages = React.useCallback(
    (msgs) => {
      setMessages((prevState) => GiftedChat.append(prevState, msgs));
    },
    [messages]
  );

  async function handleSend(msgs) {
    const writes = msgs.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  async function readUser() {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      alert("No user");
      props.navigation.navigate("Login");
    }
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading User</Text>
      </View>
    );
  }

  return <GiftedChat messages={messages} user={user} onSend={handleSend} />;
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
