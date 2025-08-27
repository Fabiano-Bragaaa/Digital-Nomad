import { cities } from "@/src/data/cities";
import { City, CityPreview } from "@/src/domain/city/City";
import { CityFindAllFilters, ICityRepo } from "../../../../domain/city/ICityRepo";

export class inMemoryCityRepo implements ICityRepo {
  async findAll(filters: CityFindAllFilters): Promise<CityPreview[]> {
    return cities
  }
  findById(id: string): Promise<City> {
    throw new Error("Method not implemented.");
  }
  getRelatedCities(id: string): Promise<CityPreview[]> {
    throw new Error("Method not implemented.");
  }
}