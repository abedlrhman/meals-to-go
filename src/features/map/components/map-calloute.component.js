import { View, Text, Image } from "react-native";
import React from "react";
import styled from "styled-components/native";
import CompactRestaurant from "../../../components/restaurant/compact-restaurant-info.component";

const MyText = styled.Text``;

const MapCalloute = ({ restaurant }) => {
  console.log(restaurant);
  return (
   <CompactRestaurant restaurant={restaurant} />
  );
};

export default MapCalloute;
