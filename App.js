import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
import { auth } from "./src/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

/*
 */ /* import { auth } from "./src/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"; */

export default function App() {
  const [isAuthanticated, setIsAuthanticated] = useState(false);

  useEffect(() => {
    console.log("hello");
    signInWithEmailAndPassword(auth, "test@gmail.com", "20022002")
      .then((user) => {
        console.log(user);
        setIsAuthanticated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        <FaforiteContextProvider>
          <LocationProvider>
            <RestaurantsProvider>
              <Navigation />
            </RestaurantsProvider>
          </LocationProvider>
        </FaforiteContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
