import { Category, CategoryCode } from "@/src/domain/category/Category";
import { ICategoryRepo } from "@/src/domain/category/ICategoryRepo";
import { supabase } from "./supabase";

async function findAll(): Promise<Category[]> {
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

export const supabaseCategoryRepo:ICategoryRepo =  {
  findAll
}