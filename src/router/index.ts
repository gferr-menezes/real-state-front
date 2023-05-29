import { route } from "quasar/wrappers";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import routes from "./routes";
import { useAuthStore } from "src/stores/auth";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const authStore = useAuthStore();

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  /**
   * Router protected
   */
  Router.beforeEach(async (to, from, next) => {
    const visibilityPublic = <boolean>to.meta.isPublic;

    if (visibilityPublic) {
      next(true);
      return;
    } else {
      const routeName = to.name;

      if (routeName === "registerEdit") {
        const id = to.params.id as unknown as number;
        let userLogged = authStore.userLogged;
        if (!userLogged) {
          await authStore.getUserDataLogged();
        }
        userLogged = authStore.userLogged;
        if (authStore.isAdmin) {
          next(true);
          return;
        } else {
          if (userLogged?.userId === parseInt(id.toString())) {
            next(true);
          } else {
            next(false);
          }
        }
      }
    }
  });

  return Router;
});
