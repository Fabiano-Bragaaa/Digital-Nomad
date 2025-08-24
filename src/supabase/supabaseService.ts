import { Category, CategoryCode, CityPreview } from "../types";
import { supabase } from "./supabase";

const storageURL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL;

export type CityFilters = {
  name?: string;
  categoryId?: string | null;
};

async function findAll(filters: CityFilters): Promise<CityPreview[]> {
  try {
    const fields = "id, name, country, cover_image"
    let cities
    if (filters.categoryId) {
      const { data } = await supabase
      .from("cities_with_categories")
      .select(fields)
      .eq("category_id", filters.categoryId)
      .ilike("name", `%${filters.name}%`);

      cities = data

    }else{
      const { data } = await supabase
      .from("cities")
      .select(fields)
      .ilike("name", `%${filters.name}%`);

      cities = data
    }

    if (!cities) {
      throw new Error("No data found");
    }

    return cities.map(city => ({
      id: city.id,
      country: city.country,
      name: city.name,
      coverImage: `${storageURL}/${city.cover_image}`,
    } as CityPreview))
  } catch (error) {
    throw error;
  }
}

async function listCategories():Promise<Category[]> {
  const {data, error} = await supabase.from('categories').select('*')
  if(error) {
    throw new Error('Error listing categories')
  }
  return data.map(category => ({
    code:category.code as CategoryCode,
    description:category.description,
    id:category.id,
    name:category.name,
  }))
}

export const supabaseService = {
  findAll,
  listCategories,
};
