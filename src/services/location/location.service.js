import camelize from "camelize";
import { locations } from "./location.mock";

export const LocationRequest = (location) => {
  return new Promise((resolve, reject) => {
    if (!locations[location]) {
      return reject(new Error(`Location ${location} not found`));
    }

    return resolve(locations[location]);
  });
};

export const TransformedLocation = (locationData) => {
  const formattedData = camelize(locationData);

  const { geometry = {} } = formattedData.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng };
};
