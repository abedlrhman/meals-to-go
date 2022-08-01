import React, { useCallback, useContext, useState } from "react";
import { List, Avatar } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthContext } from "../../../services/Auth/authantication.context";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthContext);
  const [avatarPhoto, setAvatarPhoto] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const profilePhoto = AsyncStorage.getItem(
        `profile-photo-${user.uid}`
      ).then((value) => {
        setAvatarPhoto(JSON.parse(value));
      });
    }, [user])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {!avatarPhoto && (
            <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
          )}
          {avatarPhoto && (
            <Avatar.Image
              size={180}
              source={{ uri: avatarPhoto }}
              backgroundColor="#2182BD"
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>

      <List.Section>
        <SettingsItem
          style={{ padding: 16 }}
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          style={{ padding: 16 }}
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};

export default SettingsScreen;
