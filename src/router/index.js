import Vue from "vue";
import VueRouter from "vue-router";
import index from "@/views/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("@/views/resetPassword")
  }
];

const router = new VueRouter({
  routes
});

export default router;
