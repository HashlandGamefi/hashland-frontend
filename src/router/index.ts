import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};
let routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home/index.vue"),
  },
  {
    path: "/buy/:id/:type",
    name: "Buy",
    component: () => import("../views/Buy/index.vue"),
  },
  {
    path: "/nftmining",
    name: "NFTmining",
    component: () => import("../views/NFTmining/index.vue"),
  },
  {
    path: "/carddetails",
    name: "CardDetails",
    component: () => import("../views/NFTmining/carddetails.vue"),
  },
  {
    path: "/insertcard",
    name: "InsertCard",
    component: () => import("../views/NFTmining/insertcard.vue"),
  },
  {
    path: "/synthesis",
    name: "Synthesis",
    component: () => import("../views/NFTmining/synthesis.vue"),
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: () => import("../views/NFTmining/transfer.vue"),
  },
  {
    path: "/hclp",
    name: "Hclp",
    component: () => import("../views/HClp/index.vue"),
  },
  {
    path: "/market",
    name: "Market",
    component: () => import("../views/Market/index.vue"),
  },
  {
    path: "/hangingorder",
    name: "HangingOrder",
    component: () => import("../views/Market/hangingorder.vue"),
  },
  {
    path: "/pendingrecord",
    name: "Pendingrecord",
    component: () => import("../views/Market/pendingrecord.vue"),
  },
  {
    path: "/gameFi",
    name: "GameFi",
    component: () => import("../views/GameFi/index.vue"),
  },
  {
    path: "/gameFi-personalCenter",
    name: "PersonalCenter",
    component: () => import("../views/GameFi/personalCenter.vue"),
  },
  {
    path: "/gameFi-download",
    name: "Download",
    component: () => import("../views/GameFi/download.vue"),
  },
  {
    path: "/dao",
    name: "Dao",
    component: () => import("../views/Dao/index.vue"),
  }
];

const router = new VueRouter({
  routes,
});

export default router;
