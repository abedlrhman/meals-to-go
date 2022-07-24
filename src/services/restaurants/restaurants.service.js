import camelize from "camelize";
import { mocks, mockImages } from "./mock";

export const RestaurantRequest = (location = "37.7749295,-122.4194155") => {
  const mock = mocks[location];
  return new Promise((resolve, reject) => {
    if (!mock) return reject(new Error("No mock data for this location"));

    resolve(mock);
  });
};

export const RestaurantTransform = ({ results }) => {
  const restaurants = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.floor(Math.random() * mockImages.length)];
    });

    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(restaurants);
};
