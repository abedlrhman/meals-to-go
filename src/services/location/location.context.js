import { createContext, useEffect, useState } from "react";
import { LocationRequest, TransformedLocation } from "./location.service";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("San Francisco");
  const [location, setLocation] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (keyword.length) {
      LocationRequest(keyword.toLowerCase())
        .then(TransformedLocation)
        .then((res) => {
          setLocation(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setHasError(err);
          setIsLoading(false);
        });
    }
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        hasError,
        isLoading,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
