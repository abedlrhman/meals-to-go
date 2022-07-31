import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Auth/authantication.context";

export const FavoriteContext = createContext();

export const FaforiteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  const add = (favoriteItem) => {
    setFavorites([...favorites, favoriteItem]);
  };

  const remove = (favoriteItem) => {
    const filteredData = favorites.filter(
      (x) => x.placeId !== favoriteItem.placeId
    );

    setFavorites(filteredData);
  };

  const saveFavorites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);
    } catch (e) {
      console.log("store data", e);
      // saving error
    }
  };
  const loadFavorites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`);
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
    if (user) {
      loadFavorites(user.uid);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      saveFavorites(favorites, user.uid);
    }
  }, [favorites, user]);

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
