import { City, CityPreview } from "@/src/domain/city/City";
import { cities } from "@/src/infra/repositories/adapters/inMemory/data/images/cities";
import {
    CityFindAllFilters,
    ICityRepo,
} from "../../../../domain/city/ICityRepo";

export class inMemoryCityRepo implements ICityRepo {
  async findAll({
    name,
    categoryId,
  }: CityFindAllFilters): Promise<CityPreview[]> {
    let cityPreviewList = [...cities];

    if (name) {
      cityPreviewList = cityPreviewList.filter(city => {
        return city.name.toLowerCase().includes(name.toLowerCase());
      });
    }

    if (categoryId) {
      cityPreviewList = cityPreviewList.filter(city => {
        return city.categories.some(category => category.id === categoryId);
      });
    }
    return cityPreviewList;
  }
  async findById(id: string): Promise<City> {
  const city = cities.find(city =>city.id === id)
  if(city){
    return city
  }
  throw new Error("City not found")
  }
  async getRelatedCities(id: string): Promise<CityPreview[]> {
    const city = cities.find(city =>city.id === id)
    if(!city){
      throw new Error("City not found")
    }
    return cities.filter((c) => city.relatedCitiesIds.includes(c.id))
  }
}
