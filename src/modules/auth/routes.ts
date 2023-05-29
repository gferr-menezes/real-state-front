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
        component: () => import("./pages/Index.vue"),
      },
    ],
  },
];
