import { useEffect, useState } from "react";
import { supabaseService } from "../supabase/supabaseService";
import { Category } from "../types";


type UseCategoriesReturn = {
  categories: Category[]
  isLoading: boolean
  error?:  unknown
}

export function useCategories(): UseCategoriesReturn  {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  async function fetchData() {
    try{
      const data = await supabaseService.listCategories()
      setCategories(data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    fetchData()
  }, [])

  return {
    isLoading,
    categories: categories || [],
    error
  }

}

