import { View, Text } from "react-native";
import React from "react";

const RestaurantDetail = ({ route }) => {
    
    const { restaurant } = route.params;
    console.log(restaurant);

  return (
    <View>
      <Text>RestaurantDetail</Text>
    </View>
  );
};

export default RestaurantDetail;
