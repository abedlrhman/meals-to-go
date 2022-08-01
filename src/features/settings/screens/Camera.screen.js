import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Camera, CameraType } from "expo-camera";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../services/Auth/authantication.context";

const ProfileCamera = styled(Camera)`
  height: 100%;
  width: 100%;
`;

const CameraScreen = ({ navigation }) => {
  const CameraRef = useRef();
  const { user } = useContext(AuthContext);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const tackaShot = async () => {
    const data = await CameraRef.current.takePictureAsync();
    AsyncStorage.setItem(`profile-photo-${user.uid}`, JSON.stringify(data.uri));
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableOpacity onPress={tackaShot}>
      <ProfileCamera ref={CameraRef} type={CameraType.front} />
    </TouchableOpacity>
  );
};

export default CameraScreen;
