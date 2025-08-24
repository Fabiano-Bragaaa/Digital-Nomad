import { useEffect, useState } from "react";
import { CityFilters, supabaseService } from "../supabase/supabaseService";
import { CityPreview } from "../types";


type UseCitiesReturn = {
  cities?: CityPreview[]
  isLoading: boolean
  error?:  unknown
}

export function useCities(filters : CityFilters): UseCitiesReturn  {
  const [cities, setCities] = useState<CityPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  async function fetchData() {
    try{
      const data = await supabaseService.findAll(filters)
      setCities(data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    fetchData()
  }, [filters.name, filters.categoryId])

  return {
    isLoading,
    cities,
    error
  }

}

