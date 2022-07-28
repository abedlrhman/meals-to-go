import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoriteContext = createContext();

export const FaforiteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const add = (favoriteItem) => {
    setFavorites([...favorites, favoriteItem]);
  };

  const remove = (favoriteItem) => {
    const filteredData = favorites.filter(
      (x) => x.placeId !== favoriteItem.placeId
    );

    setFavorites(filteredData);
  };

  const saveFavorites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (e) {
      console.log("store data", e);
      // saving error
    }
  };
  const loadFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favorites");
      if (value !== null) {
        setFavorites(JSON.parse(value));
        // value previously stored
      }
    } catch (e) {
      // error reading value
      console.log("error loading", e);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorites: add,
        removeFromFavorites: remove,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
