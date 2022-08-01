import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { FavoriteContext } from "../../../services/favorites/favorites.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native-paper";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { Text } from "../../../components/typography/text.component";

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

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoriteContext);
  const { restaurantsData, isLoading, hasError } =
    useContext(RestaurantsContext);

  return (
    <RestaurantListContainer>
      {favorites.length ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", { restaurant: item })
                }
              >
                <RestaurantInfoCard restaurant={item} />
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text variant="label">No Favorites Yet</Text>
        </View>
      )}
    </RestaurantListContainer>
  );
};

export default FavoritesScreen;
