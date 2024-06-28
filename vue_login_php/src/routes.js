import MainLayout from "./layouts/MainLayout.vue";

// page
import HomePage from "./pages/home.vue";
import LoginPage from "./pages/login.vue";
import RegisterPage from "./pages/register.vue";

import { createWebHistory, createRouter } from "vue-router";
import NotFoundPageVue from "./pages/notFoundPage.vue";

const isAuthenticated = Boolean(localStorage.getItem("isLogin"));

const routes = [
  {
    name: "login-page",
    path: "/login",
    component: LoginPage,
  },
  {
    name: "register-page",
    path: "/register",
    component: RegisterPage,
  },
  {
    name: "main-layout",
    path: "/",
    beforeEnter: (to, from) => {
      if (!isAuthenticated) {
        return {
          path: "/login",
          // query: { redirect: to.fullPath },
        };
      }
      return true;
    },
    component: MainLayout,
    children: [
      {
        name: "home-page",
        path: "",
        component: HomePage,
      },
    ],
  },
  {
    name: "notFoundPage",
    path: "/:pathMatch(.*)*",
    component: NotFoundPageVue,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
