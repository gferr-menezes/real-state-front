export enum TYPE_REGISTER {
  IMOBILIARIA = "imobiliaria",
  INCORPORADORA = "incorporadora",
  PROPRIETARIO = "proprietario",
}

export enum OCCUPATION_AREA {
  RESIDENTIAL = "residential",
  INDUSTRIAL = "industrial",
}

export enum LEVEL_ACCESS {
  ADMIN = "admin",
  DEFAULT = "default",
}

export interface InputUser {
  type_register?: TYPE_REGISTER;
  corporate_name?: string;
  fantasy_name?: string;
  zip_code?: string;
  address?: string;
  city?: string;
  state?: string;
  corporate_document?: string;
  occupation_area?: OCCUPATION_AREA;
  gericada?: boolean;
  email: string;
  name: string;
  document?: string;
  occupation?: string;
  phone?: string;
  cell_phone?: string;
  level_access: LEVEL_ACCESS;
  password: string;
  password_confirmation: string;
}

export interface OutputUser {
  id: number;
  type_register?: TYPE_REGISTER;
  corporate_name?: string;
  fantasy_name?: string;
  zip_code?: string;
  address?: string;
  city?: string;
  state?: string;
  corporate_document?: string;
  occupation_area?: OCCUPATION_AREA;
  gericada?: number;
  email: string;
  name: string;
  document?: string;
  occupation?: string;
  phone?: string;
  cell_phone?: string;
  level_access: LEVEL_ACCESS;
  created_at: Date;
  updated_at: Date;
}
