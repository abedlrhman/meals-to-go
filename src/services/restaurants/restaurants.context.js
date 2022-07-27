import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import { LocationContext } from "../location/location.context";
import { RestaurantRequest, RestaurantTransform } from "./restaurants.service";
export const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { location } = useContext(LocationContext);

  const getData = (location) => {
    setIsLoading(true);
    setRestaurantsData([]);

    setTimeout(() => {
      RestaurantRequest(location)
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
    if (location) {
      const stringLocation = `${location.lat},${location.lng}`;
      getData(stringLocation);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{ restaurantsData, isLoading, hasError }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
