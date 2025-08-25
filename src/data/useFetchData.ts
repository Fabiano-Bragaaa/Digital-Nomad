
import { useEffect, useState } from "react";


type UseFetchDataReturn<DataT> = {
  data?: DataT
  isLoading: boolean
  error?:  unknown
}

export function useFetchData<DataT>(fetchData: () => Promise<DataT>, dependencies: React.DependencyList = []): UseFetchDataReturn<DataT>  {
  const [data, setData] = useState<DataT>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  async function _fetchData() {
    try{
      const _data = await fetchData()
      setData(_data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    _fetchData()
  }, dependencies)

  return {
    isLoading,
    data,
    error
  }

}

