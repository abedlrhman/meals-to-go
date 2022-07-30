import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../../services/Auth/authantication.context";
import AuthNavigator from "./auth.navigator";
import AppNavigator from "./app.navigator";

const Navigation = () => {
  const { isAuthanticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isAuthanticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
