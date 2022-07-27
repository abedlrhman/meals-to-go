import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import MapView from "react-native-maps";
import Search from "../components/search.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { restaurantsData = [] } = useContext(RestaurantsContext);
  const { lat, lng, viewPort } = location;

  const [latDelta, setLatDelta] = useState(0);

  useEffect(() => {
    const northeastLat = viewPort.northeast.lat;
    const southwestLat = viewPort.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewPort]);


  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {restaurantsData.map((restaurant) => {
          console.log(restaurant);
          return (
            <MapView.Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            />
          );
        })}
      </Map>
    </>
  );
};

export default MapScreen;
