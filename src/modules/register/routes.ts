export default [
  {
    path: "register",
    component: () => import("./Main.vue"),
    children: [
      {
        path: "",
        name: "register",
        component: () => import("./pages/Index.vue"),
        meta: {
          isPublic: false,
        },
      },
      {
        path: "create",
        name: "registerCreate",
        component: () => import("./pages/CreateOrEdit.vue"),
        meta: {
          isPublic: false,
        },
      },
      {
        path: ":id/edit",
        name: "registerEdit",
        component: () => import("./pages/CreateOrEdit.vue"),
        meta: {
          isPublic: false,
        },
      },
    ],
  },
];
