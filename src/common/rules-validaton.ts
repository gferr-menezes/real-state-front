import { cpf, cnpj } from "cpf-cnpj-validator";

const required = (val: any): any => {
  return !val || val.length === 0 ? "obrigatório" : null;
};

const isEmail = (val: string): any => {
  if (val) {
    const emailPattern =
      /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "e-mail inválido";
  }
};

const validateValue = (value: string) => {
  if (value == "R$ 0,00") return "required";
};

const passwordConfirmation = (
  password: string,
  passwordConfirmation: string
) => {
  return password !== passwordConfirmation ? "senhas não combinam" : null;
};

const isValidCPFCNPJ = (value: string): any => {
  if (value && value.length && value.length <= 14) {
    return !cpf.isValid(value) ? "inválido" : null;
  }

  if (value && value.length && value.length > 14) {
    return !cnpj.isValid(value) ? "inválido" : null;
  }
};

const validate_cep = (cep: string) => {
  cep = cep.replace(/[^0-9]/gi, "");
  if (cep.length == 8) {
    return cep;
  }
  throw `CEP inválido`;
};

export {
  required,
  isEmail,
  validateValue,
  passwordConfirmation,
  isValidCPFCNPJ,
  validate_cep,
};
