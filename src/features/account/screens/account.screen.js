import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountConteiner,
  AccountCover,
  AuthButton,
  AnimationWrapper,
} from "../components/account.styles";
import LottieView from "lottie-react-native";

const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
      <LottieView
        key="animation"
        autoPlay={true}
        loop={true}
        resizeMode="cover"
        source={require("../../../../assets/watermelon.json")}
      />

      </AnimationWrapper>
      <AccountConteiner>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="account-check-outline"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountConteiner>
    </AccountBackground>
  );
};

export default AccountScreen;
