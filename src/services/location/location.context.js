import { createContext, useEffect, useState } from "react";
import { LocationRequest, TransformedLocation } from "./location.service";

const LocationProviderContext = createContext();

export const LocationProvider = ({ children }) => {
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState(null);

  const onSearch = (searchKeyword) => {
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
    <LocationProviderContext.Provider
      value={{
        hasError,
        isLoading,
        location,
        search: onSearch,
      }}
    >
      {children}
    </LocationProviderContext.Provider>
  );
};
