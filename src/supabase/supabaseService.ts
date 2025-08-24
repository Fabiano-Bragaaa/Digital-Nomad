import { CityPreview } from "../types"
import { supabase } from "./supabase"

const storageURL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL

async function findAll(): Promise<CityPreview[]> {
  try{
    const {data} = await supabase.from('cities').select('*')

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