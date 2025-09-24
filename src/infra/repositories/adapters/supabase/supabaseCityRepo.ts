import { City, CityPreview } from "../../../../domain/city/City";
import {
  CityGroupByCategory,
  CityToggleFavoriteParams,
  ICityRepo,
} from "../../../../domain/city/ICityRepo";
import { supabase } from "./supabase";
import { supabaseAdapter } from "./supabaseAdapter";
import { supabaseHelpers } from "./supabaseHelpers";

export type CityFilters = {
  name?: string;
  categoryId?: string | null;
};

const CITY_FIELDS =
  "id, name, country, cover_image, favorite_cities!left(user_id)";

async function findAll(filters: CityFilters): Promise<CityPreview[]> {
  try {
    const user = await supabaseHelpers.getUserFromSession();
    let cities;
    if (filters.categoryId) {
      const { data } = await supabase
        .from("cities_with_categories")
        .select(CITY_FIELDS)
        .eq("category_id", filters.categoryId)
        .ilike("name", `%${filters.name}%`)
        .eq("favorite_cities.user_id", user.id);

      cities = data;
    } else {
      const { data } = await supabase
        .from("cities")
        .select(CITY_FIELDS)
        .ilike("name", `%${filters.name}%`)
        .eq("favorite_cities.user_id", user.id);

      cities = data;
    }

    if (!cities) {
      throw new Error("No data found");
    }

    return cities.map(city => supabaseAdapter.toCityPreview(city, true));
  } catch (error) {
    throw error;
  }
}

async function findById(id: string): Promise<City> {
  const user = await supabaseHelpers.getUserFromSession();
  const { data, error } = await supabase
    .from("cities_with_full_info")
    .select("*, favorite_cities(user_id)")
    .eq("id", id)
    .eq("favorite_cities.user_id", user.id)
    .single();

  if (error) {
    throw new Error("Error getting city by id");
  }

  return supabaseAdapter.toCity(data);
}

async function getRelatedCities(id: string): Promise<CityPreview[]> {
  const { data } = await supabase
    .from("related_cities")
    .select(CITY_FIELDS)
    .eq("source_city_id", id)
    .throwOnError();
  return data.map(city => supabaseAdapter.toCityPreview(city));
}

async function toggleFavorite(params: CityToggleFavoriteParams): Promise<void> {
  const user = await supabaseHelpers.getUserFromSession();

  if (params.isFavorite) {
    await supabase
      .from("favorite_cities")
      .delete()
      .eq("user_id", user.id)
      .eq("city_id", params.cityId);
  } else {
    await supabase
      .from("favorite_cities")
      .insert({ user_id: user.id, city_id: params.cityId });
  }
}

async function findAllFavorites(): Promise<CityPreview[]> {
  const user = await supabaseHelpers.getUserFromSession();

  const { data } = await supabase
    .from("favorite_cities")
    .select(
      `city_id, cities(
      id, 
      name,
       country, 
       cover_image)`
    )
    .eq("user_id", user.id);

  if (!data) {
    throw new Error("No data found");
  }

  return data.map(item => supabaseAdapter.toCityPreview(item.cities, true));
}

async function findGroupByCategory(): Promise<CityGroupByCategory[]> {
  const { data } = await supabase
    .from("categories")
    .select(
      `
    id,
    name,
    description,
    code,
    city_categories(
    cities(
    id,
    name,
    country,
    cover_image
    )
    )`
    )
    .throwOnError();

  return data.map(item => ({
    category: supabaseAdapter.toCategory({
      code: item.code,
      description: item.description,
      id: item.id,
      name: item.name,
    }),
    cities: item.city_categories.map(city =>
      supabaseAdapter.toCityPreview(city.cities, true)
    ),
  }));
}

export const supabaseCityRepo: ICityRepo = {
  findAll,
  findById,
  getRelatedCities,
  toggleFavorite,
  findAllFavorites,
  findGroupByCategory,
};
