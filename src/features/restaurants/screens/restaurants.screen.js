import React, { useContext, useState } from "react";
import { FlatList, Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavoriteContext } from "../../../services/favorites/favorites.context";
import Search from "../components/search.component";
import FavoritesBar from "../../../components/favorite/favorites-bar.component";

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

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurantsData, isLoading, hasError } =
    useContext(RestaurantsContext);
  const { favorites } = useContext(FavoriteContext);
  const [isToggeled, setIsToggeled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.red300} />
        </LoadingContainer>
      )}
      <Search
        isFavoritesToggled={isToggeled}
        onFavoritesToggle={() => setIsToggeled(!isToggeled)}
      />
      {isToggeled && (
        <FavoritesBar onNavigate={navigation.navigate} restaurant={favorites} />
      )}
      <RestaurantListContainer>
        <FlatList
          data={restaurantsData}
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
      </RestaurantListContainer>
    </SafeArea>
  );
};
