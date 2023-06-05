export interface InputProject {
  type_register: string;
  product_name: string;
  land_area?: string;
  value_area?: number;
  localization?: string;
  exists_project?: boolean;
  value_project?: number;
  situation_project?: string;
  houses?: boolean;
  apartments?: boolean;
  mixed?: boolean;
  commercial?: boolean;
  type_project?: string;
  exist_incorporation_registry?: boolean;
  register_situations?: string;
  value_register?: number;
  value_work_executed?: number;
  what_was_done: string;
  value_work_to_be_done?: number;
  trading_conditions: string;
  exists_debit?: boolean;
  observations_debit: string;
  observations: string;
  is_active?: boolean;
  user_id?: number;
}

export interface OutputProject {
  id: number;
  type_register: string;
  product_name: string;
  land_area?: string;
  value_area?: number;
  localization?: string;
  exists_project?: boolean;
  value_project?: number;
  situation_project?: string;
  houses?: boolean;
  apartments?: boolean;
  mixed?: boolean;
  commercial?: boolean;
  type_project?: string;
  exist_incorporation_registry?: boolean;
  register_situations?: string;
  value_register?: number;
  value_work_executed?: number;
  what_was_done?: string;
  value_work_to_be_done?: number;
  trading_conditions?: string;
  exists_debit?: boolean;
  observations_debit?: string;
  observations?: string;
  is_active?: boolean;
  user_id?: number;
  created_at: Date;
  updated_at: Date;
}

export enum TYPE_REGISTER {
  IMOVEL = "imovel",
  PROJETO = "projeto",
}

export enum SITUATION_PROJECT {
  APROVADO = "aprovado",
  EM_APROVACAO = "em_aprovacao",
  SEM_APROVACAO = "sem_aprovacao",
}

export enum SITUATION_REGISTER {
  APROVADO = "aprovado",
  EM_APROVACAO = "em_aprovacao",
  SEM_APROVACAO = "sem_aprovacao",
}

export interface Filter {
  input: string;
}
