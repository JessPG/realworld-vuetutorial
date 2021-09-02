import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/:id", // Dynamic parameter
    name: "event-show",
    component: EventShow,
    props: true, // Enable de parameter as a component prop
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  // If path not registered above, show not found page
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history", // Removes # from the url
  routes,
});

export default router;
