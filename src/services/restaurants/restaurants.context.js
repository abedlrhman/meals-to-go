import React, { useState, useEffect, useMemo, createContext } from "react";
import { RestaurantRequest, RestaurantTransform } from "./restaurants.service";
export const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    setIsLoading(true);
    setTimeout(() => {
      RestaurantRequest()
        .then(RestaurantTransform)
        .then((res) => {
          setRestaurantsData(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setHasError(err);
          setIsLoading(false);
        });
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <RestaurantsContext.Provider
      value={{ restaurantsData, isLoading, hasError }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
