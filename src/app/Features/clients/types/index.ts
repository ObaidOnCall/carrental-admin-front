interface Client {
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

export type { Client };
