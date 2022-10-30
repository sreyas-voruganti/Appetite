import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/find_register",
    name: "find_register",
    component: () => import("../views/FindRegisterView.vue"),
  },
  {
    path: "/give_register",
    name: "give_register",
    component: () => import("../views/GiveRegisterView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/profile_user",
    name: "profile_user",
    component: () => import("../views/ProfileUserView.vue"),
  },
  {
    path: "/give",
    name: "give",
    component: () => import("../views/GiveView.vue"),
  },
  {
    path: "/find",
    name: "find",
    component: () => import("../views/FindView.vue"),
  },
  {
    path: "*",
    component: Vue.component("page-not-found", {
      template: "",
      created: () => {
        window.location.href = "/home";
      },
    }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
