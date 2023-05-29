// const NProgress = require("nprogress");
// require("src/css/nprogress.css");
import { api } from "./axios";
import { isArray } from "lodash";
import { LocalStorage } from "quasar";
import notification from "src/common/notification";

api.interceptors.request.use(
  async function (config) {
    const baseUrl = config.baseURL;

    const loginData: any | null = LocalStorage.getItem("loginData");
    const urlCurrent = url(baseUrl!, config.url!);

    // NProgress.start();

    if (urlCurrent !== "/accounts/login") {
      if (loginData && loginData.token) {
        config.headers.Authorization = `${loginData.typeToken} ${loginData.token}`;
      }
    }

    return config;
  },
  function (error) {
    //NProgress.done();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // NProgress.done();
    return response;
  },
  function (error) {
    //NProgress.done();

    if (!error.response) {
      throw {
        status: 503,
        error: new Error(),
      };
    }

    const status = error.response.status;
    const urlRequest = error.response.config.url;
    const responseData = error.response.data;
    const message = responseData?.message ?? null;

    if (status === 401 && urlRequest !== "auth/login") {
      LocalStorage.remove("loginData");
      window.location.href = "/";
    }

    if (status === 400) {
      if (isArray(message)) {
        message.forEach((msn) => {
          notification.error(msn);
        });
      } else {
        notification.error(message.message);
      }
    }

    /*
    if (status === 500) {
      window.Notification.error('Erro ao processar sua solicitação.');
    }

    if (status === 409) {
      window.Notification.error(message);
    }



    if (status !== 401 && status !== 500 && status !== 409 && status !== 400) {
      window.Notification.error();
    }
    */
    return Promise.reject(error.response);

    // return error.response;
  }
);

const url = (appUrl: string, urlCurrent: string) => urlCurrent.split(appUrl)[1];
