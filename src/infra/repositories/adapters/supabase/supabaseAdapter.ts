import { AuthUser } from "@/src/domain/auth/AuthUser";
import { AuthUser as SupabaseAuthUser } from "@supabase/supabase-js";
import { Category, CategoryCode } from "../../../../domain/category/Category";
import { City, CityPreview, TouristAttraction } from "../../../../domain/city/City";
import { Database } from "./types";

export const storageURL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL;

type CityWithFullInfo = Database['public']['Views']['cities_with_full_info']['Row']

function toCity(data: CityWithFullInfo ):City {
  const categories = data.categories as CategoryRow[]
  const touristAttractions = data.tourist_attractions as TouristAttractionRow[]
  return {
    id:data.id as string,
    country:data.country as string,
    name:data.name as string,
    description:data.description as string,
    coverImage: `${storageURL}/${data.cover_image}`,
    location:{
      latitude:data.latitude as number,
      longitude:data.longitude as number
    },
    categories:categories.map(toCategory),
    touristAttractions:touristAttractions.map(toTouristAttraction),
  }
}

type CityPreviewRow = {
  country: string | null;
  cover_image: string | null;
  id: string | null;
  name: string | null;
}

function toCityPreview(data: CityPreviewRow): CityPreview {
  return {
    id: data.id,
    country: data.country,
    name: data.name,
    coverImage: `${storageURL}/${data.cover_image}`,
  } as CityPreview
}

type CategoryRow = Database['public']['Tables']['categories']['Row']
type TouristAttractionRow = Database['public']['Tables']['tourist_attractions']['Row']

function toCategory(data:CategoryRow):Category {
  return {
    id:data.id as string,
    name:data.name as string,
    description:data.description as string,
    code:data.code as CategoryCode
  }
}

function toTouristAttraction(data:TouristAttractionRow):TouristAttraction {
  return {
    id:data.id as string,
    name:data.name as string,
    description:data.description as string,
    cityId:data.city_id as string
  }
}

function toAuthUser(supabaseUser:SupabaseAuthUser):AuthUser {
  if(!supabaseUser.email) {
    throw new Error('email not found')
  }
  return {
    id:supabaseUser.id,
    email:supabaseUser.email,
    fullname:supabaseUser.user_metadata.full_name
  }
}

export const supabaseAdapter = {
  toCity,
  toCityPreview,
  toAuthUser
}