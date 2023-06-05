import { api } from "src/boot/axios";
import { LocalStorage } from "quasar";
import { LEVEL_ACCESS } from "src/modules/register/contracts";

export type AuthResponse = {
  token: string;
  typeToken: "Bearer";
  levelAccess: string;
  userId: number;
};

export class AuthService {
  protected readonly endpoint = "auth";

  /**
   * @param email
   * @param password
   */
  async doLogin(email: string, password: string): Promise<void> {
    try {
      const response = await api.post<AuthResponse>(`${this.endpoint}/login`, {
        email,
        password,
      });

      const { token, typeToken, levelAccess, userId } = response.data;

      const loginData = {
        token,
        typeToken,
        levelAccess,
        userId,
      };

      LocalStorage.set("loginData", loginData);

      setTimeout(() => {
        //window.location.href = "/adm";
        if (levelAccess === LEVEL_ACCESS.ADMIN) {
          window.location.href = "/adm";
        } else {
          window.location.href = `register/${userId}/edit`;
        }
      }, 800);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @returns
   */
  async getDataUserLogged(): Promise<{
    userId: number;
    levelAccess: string;
    email: string;
  } | null> {
    const response = await api.get(`${this.endpoint}/me`);
    if (response.data) {
      return response.data;
    }
    return null;
  }

  async logout(): Promise<void> {
    LocalStorage.remove("loginData");
    window.location.href = "/";
  }
}
