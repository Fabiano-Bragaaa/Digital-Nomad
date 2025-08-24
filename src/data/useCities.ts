import { useEffect, useState } from "react";
import { supabaseService } from "../supabase/supabaseService";
import { CityPreview } from "../types";

type CityFilterProps = {
  name?: string;
  categoryId?: string | null;
};

type UseCitiesReturn = {
  cities?: CityPreview[]
  isLoading: boolean
  error?:  unknown
}

export function useCities({ categoryId, name }: CityFilterProps): UseCitiesReturn  {
  const [cities, setCities] = useState<CityPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  async function fetchData() {
    try{
      const data = await supabaseService.findAll()
      setCities(data)
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
    cities,
    error
  }

}

