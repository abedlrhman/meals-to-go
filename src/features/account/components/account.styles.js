import { Button, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { theme } from "../../../infrastructure/theme/";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpeg"),
})`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(256, 256, 256, 0.3);
`;

export const AccountConteiner = styled.View`
  background-color: rgba(256, 256, 256, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: theme.colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const LoginContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
