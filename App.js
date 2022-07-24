import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { Text } from "react-native";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantsProvider } from "./src/services/restaurants/restaurants.context";
import { LocationProvider } from "./src/services/location/location.context";

const Tab = createBottomTabNavigator();

const Map = () => (
  <SafeArea>
    <Text>map</Text>
  </SafeArea>
);
const Setting = () => (
  <SafeArea>
    <Text>setting</Text>
  </SafeArea>
);

const TAB_ICONS = {
  Map: "map-outline",
  Restaurants: "md-restaurant-outline",
  Settings: "settings-outline",
};

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocationProvider>
          <RestaurantsProvider>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    const iconName = TAB_ICONS[route.name];
                    return (
                      <Ionicons name={iconName} size={size} color={color} />
                    );
                  },
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                  headerShown: false,
                })}
              >
                <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="Settings" component={Setting} />
              </Tab.Navigator>
            </NavigationContainer>
          </RestaurantsProvider>
        </LocationProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
