import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import RestaurantNavigator from "./restaurant.navigator";
import SettingsNavigator from "./settings.navigator";
import MapScreen from "../../features/map/screens/map.screens";
import { RestaurantsProvider } from "../../services/restaurants/restaurants.context";
import { LocationProvider } from "../../services/location/location.context";
import { FaforiteContextProvider } from "../../services/favorites/favorites.context";


const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Map: "map-outline",
  RestaurantsStack: "md-restaurant-outline",
  Settings: "settings-outline",
};

const AppNavigator = () => {
  return (
    <FaforiteContextProvider>
      <LocationProvider>
        <RestaurantsProvider>
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
            <Tab.Screen
              name="RestaurantsStack"
              component={RestaurantNavigator}
            />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </RestaurantsProvider>
      </LocationProvider>
    </FaforiteContextProvider>
  );
};

export default AppNavigator;
