export default [
  {
    path: "",
    component: () => import("./pages/Index.vue"),
    meta: {
      isPublic: true,
    },
  },
  {
    path: "register",
    name: "webRegister",
    component: () => import("./pages/Register.vue"),
    meta: {
      isPublic: true,
    },
  },
];
