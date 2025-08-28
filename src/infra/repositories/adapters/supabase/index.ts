import { InMemoryAuthRepo } from "../inMemory/inMemoryAuthRepo";
import { supabaseCategoryRepo } from "./supabaseCategoryRepo";
import { supabaseCityRepo } from "./supabaseCityRepo";

export const supabaseRepositories = {
  city: supabaseCityRepo,
  category: supabaseCategoryRepo,
  auth: new InMemoryAuthRepo()
}