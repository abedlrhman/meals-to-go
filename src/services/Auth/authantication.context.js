import React, { createContext, useState } from "react";
import { loginRequest, RegisterRequest } from "./authantication.service";

export const AuthContext = createContext();

const AuthanticationContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [user, setUser] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((res) => {
        setIsLoading(false);
        setUser(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(err);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (repeatedPassword !== password)
      return setHasError({ message :"Error: Passwords do not match"});

    setIsLoading(true);
    RegisterRequest(email, password)
      .then((res) => {
        setIsLoading(false);
        setUser(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        hasError,
        user,
        isAuthanticated: !!user,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthanticationContext };
