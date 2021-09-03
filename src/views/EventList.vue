<template>
  <!-- vue always needs a root element -->
  <div>
    <h1>Events Listing</h1>
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></EventCard>
    <!-- or like this <event-card></event-card> -->
  </div>
</template>

<script>
// BaseIcon is imported globally in main.js, so no needed to import here
import EventCard from "../components/EventCard.vue";
import EventService from "../services/EventService.js";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  // Lyfecircle hook
  created() {
    EventService.getEvents()
      .then((response) => {
        this.events = response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
};
</script>

<style></style>
