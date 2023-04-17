import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfilView from "../views/ProfileView.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.isAuthenticated) {
        next({ name: "profile" });
      } else {
        next(); 
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.isAuthenticated) {
        next({ name: "profile" });
      } else {
        next();
      }
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilView,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.isAuthenticated) {
        next();
      } else {
        next({ name: "login" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
