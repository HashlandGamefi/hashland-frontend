import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from '@/store'
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
    path: "/market/:id",
    name: "Market",
    component: () => import("../views/Market/index.vue"),
  },
  {
    path: "/market",
    redirect: "/market/0",
  },
  {
    path: "/invite",
    name: "Invite",
    component: () => import("../views/Invite/index.vue"),
  },
  {
    path: "/hangingorder",
    name: "HangingOrder",
    component: () => import("../views/Market/hangingorder.vue"),
  },
  {
    path: "/hangingorderV2",
    name: "HangingOrderV2",
    component: () => import("../views/Market/hangingorderV2.vue"),
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
    name: "gameFiPersonalCenter",
    component: () => import("../views/GameFi/personalCenter.vue"),
  },
  {
    path: "/gameFi-download",
    name: "gameFiDownload",
    component: () => import("../views/GameFi/download.vue"),
  },
  {
    path: "/dao",
    redirect: "/dao/0",
  },
  {
    path: "/dao/:id",
    name: "Dao",
    component: () => import("../views/Dao/index.vue"),
  }
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to: any, from: any, next: any) => {
  switch(to.name){
    case 'Buy':
      store.commit("menuBG", "yes");
      sessionStorage.setItem("menuBG", "yes");
      store.commit("HashMenu", '0');
      sessionStorage.setItem("HashMenu", '0');
      break;
    case 'NFTmining':
      store.commit("menuBG", "yes");
      sessionStorage.setItem("menuBG", "yes");
      store.commit("HashMenu", '0');
      sessionStorage.setItem("HashMenu", '0');
      break;
    case 'Invite':
      store.commit("menuBG", "yes");
      sessionStorage.setItem("menuBG", "yes");
      store.commit("HashMenu", '-1');
      sessionStorage.setItem("HashMenu", '-1');
      break;
  }
  next();
})
export default router;
