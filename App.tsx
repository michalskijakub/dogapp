import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DogListScreen from "./screens/DogListScreen";
import SearchScreen from "./screens/SearchScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { textAlign: "center" },
          headerTitleAlign: "center",
        }}
      >
        <Tab.Screen
          name="Rasy psów"
          component={DogListScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "ios-paw" : "ios-paw-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Szukaj rasy"
          component={SearchScreen}
          options={{
            tabBarLabel: "Szukaj",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "ios-search" : "ios-search-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
