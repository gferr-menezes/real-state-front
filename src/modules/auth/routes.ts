export default [
  {
    path: "auth",
    component: () => import("./Main.vue"),
    meta: {
      isPublic: true,
    },
    children: [
      {
        path: "",
        name: "auth",
        meta: {
          isPublic: true,
        },
        component: () => import("./pages/Index.vue"),
      },
    ],
  },
];
