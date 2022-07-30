import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { RestaurantsProvider } from "./src/services/restaurants/restaurants.context";
import { LocationProvider } from "./src/services/location/location.context";
import { FaforiteContextProvider } from "./src/services/favorites/favorites.context";
import Navigation from "./src/infrastructure/navigation";
import {AuthanticationContext} from "./src/services/Auth/authantication.context";

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
        <AuthanticationContext>
          <FaforiteContextProvider>
            <LocationProvider>
              <RestaurantsProvider>
                <Navigation />
              </RestaurantsProvider>
            </LocationProvider>
          </FaforiteContextProvider>
        </AuthanticationContext>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
