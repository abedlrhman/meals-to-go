import React, { useContext } from "react";
import { Searchbar } from "react-native-paper";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { colors } from "../../../infrastructure/theme/colors";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantListContainer = styled.View`
  flex: 1;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = () => {
  const { restaurantsData, isLoading, hasError } =
    useContext(RestaurantsContext);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.red300} />
        </LoadingContainer>
      )}

      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      <RestaurantListContainer>
        <FlatList
          data={restaurantsData}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <RestaurantInfoCard restaurant={item} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </RestaurantListContainer>
    </SafeArea>
  );
};
