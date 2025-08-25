import { Category, CategoryCode, City, CityPreview } from "../types";
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

async function listCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) {
    throw new Error("Error listing categories");
  }
  return data.map(category => ({
    code: category.code as CategoryCode,
    description: category.description,
    id: category.id,
    name: category.name,
  }));
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

export const supabaseService = {
  findAll,
  listCategories,
  findById,
  getRelatedCities
};
