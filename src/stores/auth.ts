import { LocalStorage } from "quasar";
import { defineStore } from "pinia";
import { LEVEL_ACCESS } from "src/modules/register/contracts";
import { AuthService } from "src/modules/auth/services/auth.service";

export const useAuthStore = defineStore("authStore", {
  state: (): {
    isAdmin: boolean;
    userLogged: {
      userId: number;
      levelAccess: string;
      email: string;
    } | null;
  } => ({
    isAdmin: false,
    userLogged: null,
  }),
  actions: {
    checkLevelAccess(levelAccess: LEVEL_ACCESS): boolean {
      const loginData: any = LocalStorage.getItem("loginData");

      if (!loginData) {
        return false;
      }

      const loginLevelAccess = loginData.levelAccess;

      if (loginLevelAccess === levelAccess) {
        return true;
      }

      return false;
    },
    async getUserDataLogged() {
      const authService = new AuthService();

      const userData = await authService.getDataUserLogged();
      if (!userData) {
        return;
      }

      this.userLogged = userData;

      if (userData.levelAccess === LEVEL_ACCESS.ADMIN) {
        this.isAdmin = true;
      }
    },
  },
});
