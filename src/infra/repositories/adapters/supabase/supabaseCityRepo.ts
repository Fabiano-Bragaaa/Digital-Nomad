import { Category, CategoryCode } from "../../../../domain/category/Category";
import { City, CityPreview } from "../../../../domain/city/City";
import { ICityRepo } from "../../../../domain/city/ICityRepo";
import { supabase } from "./supabase";
import { supabaseAdapter } from "./supabaseAdapter";

export type CityFilters = {
  name?: string;
  categoryId?: string | null;
};

async function findAll(filters: CityFilters): Promise<CityPreview[]> {
  try {
    const fields = "id, name, country, cover_image";
    let cities;
    if (filters.categoryId) {
      const { data } = await supabase
        .from("cities_with_categories")
        .select(fields)
        .eq("category_id", filters.categoryId)
        .ilike("name", `%${filters.name}%`);

      cities = data;
    } else {
      const { data } = await supabase
        .from("cities")
        .select(fields)
        .ilike("name", `%${filters.name}%`);

      cities = data;
    }

    if (!cities) {
      throw new Error("No data found");
    }

    return cities.map(supabaseAdapter.toCityPreview);
  } catch (error) {
    throw error;
  }
}


async function findById(id: string): Promise<City> {
  const { data, error } = await supabase
    .from("cities_with_full_info")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Error getting city by id");
  }

  return supabaseAdapter.toCity(data);
}

async function getRelatedCities(id: string): Promise<CityPreview[]> {
  const { data } = await supabase
    .from("related_cities")
    .select("*")
    .eq("source_city_id", id)
    .throwOnError();
  return data.map(supabaseAdapter.toCityPreview);
}

export const supabaseCityRepo:ICityRepo = {
  findAll,
  findById,
  getRelatedCities,
};
