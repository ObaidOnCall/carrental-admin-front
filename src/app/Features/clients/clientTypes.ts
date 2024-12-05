export interface ClientResponse {
  id: number;
  firstname: string;
  lastname: string;
  cinOrPassport: string;
  licence: string | null;
  nationality: string | null;
  address: string;
  ville: string;
  codePostal: number;
  phone1: string;
  phone2: string;
  email: string;
  cinIsValideUntil: number;
  licenceIsValideUntil: number | null;
  clientType: string;
}



export interface PaginatedClientResponse {
  content: ClientResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}