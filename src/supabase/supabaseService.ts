import { CityPreview } from "../types";
import { supabase } from "./supabase";

const storageURL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL

export type CityFilters = {
  name?: string;
  categoryId?: string | null;
};


async function findAll(filters: CityFilters): Promise<CityPreview[]> {
  try{
    const {data} = await supabase.from('cities').select('*').ilike('name',`%${filters.name}%`)

    if(!data) {
      throw new Error('No data found')
    }

    return data?.map(item => ({
      id: item.id,
      country: item.country,
      name: item.name,
      coverImage: `${storageURL}/${item.cover_image}`,

    }))
  } catch (error) {
    throw error
}
}

export const supabaseService = {
  findAll
}