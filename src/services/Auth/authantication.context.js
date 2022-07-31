import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState } from "react";
import { auth } from "../../firebase";
import { loginRequest, RegisterRequest } from "./authantication.service";

export const AuthContext = createContext();

const AuthanticationContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

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
    setIsLoading(true);
    if (repeatedPassword !== password)
      return setHasError({ message: "Error: Passwords do not match" });

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

  const onLogout = () => {
    setUser(null);
    auth.signOut();
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
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthanticationContext };
