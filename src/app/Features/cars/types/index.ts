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
  desicription:string,
}

interface FiltersType {
  rows: number;
  curentPage: number;
}

interface CarModel {
  id: number ;
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

interface Assurance {
  type: string;
  date: Date;
  expireDate: Date;
  price?: number;
  assuranceContact?: string;
  observation?: string;
  vehicle: string;
}


export interface CarResponse {
  id:number ,
  year:Date
  model : ModelResponse ,
  modelName : string ,
  brandName:string,
  fuelType:string ,
  color : string ,
  mileage : number ,
  price : number ,
  matricule : string ,
  numberOfDoors:number ,
  topSpeed:number ,
  fuelEfficiency:number ,
  desicription:string ,
  engine_type:string ,
  fuel_efficiency:string ,
  fuel_type:string,
  number_of_doors:number ,
  sating_capacity : number ,
  transmission : string ,
  height: number ,
  length: number ,
  weight: number ,
  width : number ,
  description:string
  
}

export interface CarRequest {
  matricule : string ,
  year: number ,
  model : number ,
  color : string ,
  mileage : number ,
  price : number ,
}


export interface PaginatedCarResponse {
  content: CarResponse[]; // This is where the actual cars are
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // Current page number
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface BrandResponse {

  id :number ,

  name :string ,

  countryOfOrigin :string ,

  parentCompany :string ,

  website :string ,

}

export interface BrandRequest {

  id :number ,

  name :string ,

  countryOfOrigin :string ,

  parentCompany :string ,

  website :string ,

  models : number[] ;
}

export interface ModelRequest {
  id : number ,
  
  name : string ,
  
  year : Date,
  
  engineType : string ,
  
  transmission : string ,
  
  fuelType : string ,
  
  length: number ,
  
  width : number,
  
  height: number ,
  
  weight : number,
  
  fuelEfficiency : number,
  
  satingCapacity : number ,
  
  topSpeed  : number,
  
  numberOfDoors  : number,
  
  brand : number,

}

export interface ModelResponse {
  id : number ,
  
  name : string ,
  
  year : Date,
  
  engineType : string ,
  
  transmission : string ,
  
  fuelType : string ,
  
  length: number ,
  
  width : number,
  
  height: number ,
  
  weight : number,
  
  fuelEfficiency : number,
  
  satingCapacity : number ,
  
  topSpeed  : number,
  
  numberOfDoors  : number,
  
  brand : BrandResponse,

}

export type MappedCar <L extends {} , T> = {
  [Property in keyof L]:T[] ;
}


export type { CarType, FiltersType, CarModel, Assurance };
