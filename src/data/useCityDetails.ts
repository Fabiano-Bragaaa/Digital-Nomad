
import { useEffect, useState } from "react";
import { supabaseService } from "../supabase/supabaseService";
import { City } from "../types";


type UseCityDetailsReturn = {
  city?: City
  isLoading: boolean
  error?:  unknown
}

export function useCityDetails(id: string): UseCityDetailsReturn  {
  const [city, setCity] = useState<City>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  async function fetchData() {
    try{
      const data = await supabaseService.findById(id)
      setCity(data)
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
    city,
    error
  }

}

