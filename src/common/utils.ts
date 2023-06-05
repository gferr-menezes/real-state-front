import { LocalStorage } from "quasar";

const firstCapitalize = (value: string) => {
  if (!value) return;
  value = value.toLowerCase();
  let text: string[] = value.split(" ");

  let name: string = "";

  text.forEach((element) => {
    const dont_change = [
      "da",
      "de",
      "do",
      "das",
      "dos",
      "e",
      "a",
      "o",
      "as",
      "os",
      "no",
      "na",
      "nos",
      "nas",
    ];

    if (!dont_change.includes(element)) {
      element = element?.toLowerCase() ?? "";
      name = name + " " + element.charAt(0).toUpperCase() + element.slice(1);
    } else {
      name = name + " " + element;
    }
  });
  return name.trim();
};

const validateEmail = (email: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(email) || false;
};

const getUserLogged = (): any => {
  const loginData = LocalStorage.getItem("loginData");
  if (loginData) {
    return loginData;
  }
  return null;
};

const timeAgo = (args: {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
}): {
  message: string | null;
  args: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
  };
} => {
  let message: string | null = null;

  if (args.hours < 1 && args.minutes === 1) {
    message = `${args.minutes} minuto atrás`;
  }

  if (args.hours < 1) {
    message = `${args.minutes} minutos atrás`;
  }

  if (args.hours === 1 && args.months < 1) {
    message = `${args.hours} hora e ${args.minutes} minutos atrás`;
  }

  if (args.hours > 1 && args.months < 1) {
    message = `${args.hours} horas e ${args.minutes} minutos atrás`;
  }

  if (args.hours > 0 && args.months === 1) {
    message = `${args.months} ${args.hours} horas e ${args.minutes} minutos atrás`;
  }

  if (args.months > 1) {
    message = `${args.months} meses e ${args.days} dias atrás`;
  }

  return {
    args,
    message,
  };
};

const formatMoneyBr = (value: number) => {
  value = !value ? 0 : value;
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export {
  firstCapitalize,
  validateEmail,
  getUserLogged,
  timeAgo,
  formatMoneyBr,
};
