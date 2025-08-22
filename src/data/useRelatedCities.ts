import { City } from "../types";
import { cities } from "./cities";

export function useRelatedCities(relatedCitiesIds: City["relatedCitiesIds"]) {
  return  cities.filter((city) => relatedCitiesIds.includes(city.id))

   
}