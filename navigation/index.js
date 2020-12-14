import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../screens/Login";
import Messages from "../screens/Messages";
import RoomSelector from "../screens/RoomSelector";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();

export function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function RoomStack() {
  return (
    <Stack.Navigator initialRouteName="RoomList">
      <Stack.Screen name="RoomList" component={RoomSelector} />
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function AppTabs() {
  return (
    <Tab.Navigator initialRouteName="Rooms">
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Rooms" component={RoomStack} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
