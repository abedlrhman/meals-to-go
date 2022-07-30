import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeArea } from "../../components/utility/safe-area.component";
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
  );
};

export default AppNavigator;
