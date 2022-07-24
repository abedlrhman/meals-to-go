import { createContext, useEffect, useState } from "react";
import { LocationRequest, TransformedLocation } from "./location.service";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("San Francisco");
  const [location, setLocation] = useState(null);

  const onSearch = (searchKeyword) => {
    if (!searchKeyword.length) return;
    setIsLoading(true);
    setKeyword(searchKeyword);
    LocationRequest(searchKeyword.toLowerCase())
      .then(TransformedLocation)
      .then((res) => {
        setLocation(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setHasError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onSearch(keyword);
  }, []);

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
