<template>
  <!-- vue always needs a root element -->
  <div>
    <h1>Events Listing</h1>
    <EventCard></EventCard>
    <!-- or like this <event-card></event-card> -->
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
export default {
  components: {
    EventCard,
  },
};
</script>

<style>
</style>
