import { RouteRecordRaw } from "vue-router";

import web from "src/modules/web/routes";

import auth from "src/modules/auth/routes";
import register from "src/modules/register/routes";

const baseRoutes: RouteRecordRaw[] = [];
const systemRoutes = baseRoutes.concat(auth, register);

const routesWeb: RouteRecordRaw[] = [];
const routesWebFinal = routesWeb.concat(web);

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayoutWeb.vue"),
    children: routesWebFinal,
  },
  {
    path: "/adm",
    component: () => import("layouts/MainLayout.vue"),
    children: systemRoutes,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
