import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeArea } from "../../components/utility/safe-area.component";
import RestaurantNavigator from "./restaurant.navigator";
import MapScreen from "../../features/map/screens/map.screens";
import { AuthContext } from "../../services/Auth/authantication.context";
import { RestaurantsProvider } from "../../services/restaurants/restaurants.context";
import { LocationProvider } from "../../services/location/location.context";
import { FaforiteContextProvider } from "../../services/favorites/favorites.context";
const Tab = createBottomTabNavigator();

const Setting = ({ navigation }) => {
  const { onLogout } = useContext(AuthContext);

  return (
    <SafeArea>
      <Text>setting</Text>
      <Button
        title="Logout"
        onPress={() => {
          onLogout();
        }}
      />
    </SafeArea>
  );
};

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
            <Tab.Screen name="Settings" component={Setting} />
          </Tab.Navigator>
        </RestaurantsProvider>
      </LocationProvider>
    </FaforiteContextProvider>
  );
};

export default AppNavigator;
