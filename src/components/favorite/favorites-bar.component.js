import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Spacer } from "../spacer/spacer.component";
import CompactRestaurant from "../restaurant/compact-restaurant-info.component";

const FavoritesWrapper = styled.View`
  padding: 10px;
`;

const FavoritesBar = ( { restaurant, onNavigate } ) =>
{
  
  if(!restaurant.length) return null;

  return (
    <FavoritesWrapper>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurant.map((item) => (
          <TouchableOpacity
            key={item.placeId}
            onPress={() => onNavigate("RestaurantDetail", { restaurant: item })}
          >
            <Spacer position="left" size="medium" key={item.name}>
              <CompactRestaurant restaurant={item} />
            </Spacer>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </FavoritesWrapper>
  );
};

export default FavoritesBar;
