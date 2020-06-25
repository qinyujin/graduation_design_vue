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
    path: "/teacher",
    name: "teacherHome",
    component: () => import("@/views/teacherHomePage.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
