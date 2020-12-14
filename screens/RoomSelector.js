import React from "react";
import { StyleSheet, TextInput, Button, Text, View } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";

export default function RoomList({ navigation }) {
  const ROOMS = ["chatRoom1", "chatRoom2"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {ROOMS.map((room) => (
        <TouchableHighlight
          onPress={() => navigation.navigate("Messages", { room: room })}
          key={room}
          style={{ width: "100%", padding: 10 }}
        >
          <View>
            <Text>{room}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
