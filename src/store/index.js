import Vue from "vue";
import Vuex from "vuex";
import EventService from '../services/EventService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "1",
      name: "Jessica",
    },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    events: [],
    eventsTotal: 0,
    event: {},
  },
  // Synchronous
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  // Asynchronous
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    // in actions and mutations the payload can be a single variable or an object
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit("SET_EVENTS", response.data);
          commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
  },
  modules: {},
  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },
});
