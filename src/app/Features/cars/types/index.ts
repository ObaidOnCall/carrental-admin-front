import { Brand } from 'app/Features/brands/types/type';

interface CarType {
  id: number;
  matricule: string;
  brand: {
    tenantId: string;
    maxLength: number;
    minLength: number;
    id: number;
    name: string;
    countryOfOrigin: string;
    parentCompany: string;
    website: string;
  };
  color: string;
  mileage: number;
  price: number;
}

interface FiltersType {
  rows: number;
  curentPage: number;
}

interface CarModel {
  name: string;
  year: number | null;
  engineType: string | null;
  transmission: string | null;
  fuelType: string | null;
  length: number;
  width: number;
  height: number;
  weight: number;
  fuelEfficiency: number;
  satingCapacity: number;
  topSpeed: number;
  numberOfDoors: number;
  brand: Brand;
}
export type { CarType, FiltersType, CarModel };
