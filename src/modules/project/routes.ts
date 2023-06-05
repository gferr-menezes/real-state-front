export default [
  {
    path: "project",
    component: () => import("./Main.vue"),
    children: [
      {
        path: "",
        name: "project",
        component: () => import("./pages/Index.vue"),
        meta: {
          isPublic: false,
        },
      },
      {
        path: "create",
        name: "projectCreate",
        component: () => import("./pages/CreateOrEdit.vue"),
        meta: {
          isPublic: false,
        },
      },
      {
        path: ":id/edit",
        name: "projectEdit",
        component: () => import("./pages/CreateOrEdit.vue"),
        meta: {
          isPublic: false,
        },
      },
    ],
  },
];
