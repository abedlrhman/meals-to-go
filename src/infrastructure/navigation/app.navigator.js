import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import RestaurantNavigator from "./restaurant.navigator";
import MapScreen from "../../features/map/screens/map.screens";

const Tab = createBottomTabNavigator();

const Setting = () => (
  <SafeArea>
    <Text>setting</Text>
  </SafeArea>
);

const TAB_ICONS = {
  Map: "map-outline",
  RestaurantsStack: "md-restaurant-outline",
  Settings: "settings-outline",
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = TAB_ICONS[route.name];
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="RestaurantsStack" component={RestaurantNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
