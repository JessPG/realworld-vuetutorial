<template>
  <!-- vue always needs a root element -->
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard
      v-for="event in event.events"
      :key="event.id"
      :event="event"
    ></EventCard>
    <!-- or like this <event-card></event-card> -->
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
    </template>
    <template v-if="showNextPage">
      <router-link
        style="float: right"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
// BaseIcon is imported globally in main.js, so no needed to import here
import EventCard from "../components/EventCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventCard,
  },
  // Lyfecircle hook
  created() {
    this.$store.dispatch("fetchEvents", {
      perPage: 3,
      page: this.page,
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    showNextPage() {
      return this.event.eventsTotal > this.page * 3;
    },
    // mapState references to the store variable or to the module
    ...mapState(["event", "user"]),
    // Or we can specify like this, and we can reference it directly in the template
    // ...mapState({
    //   event: (state) => state.event.event,
    // }),
  },
};
</script>

<style></style>
