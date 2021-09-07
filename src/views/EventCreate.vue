<template>
  <div>
    <h1>Create Event</h1>

    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker,
  },
  data() {
    const times = [];
    for (let i = 0; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times: times,
      categories: this.$store.state.categories,
      event: this.createNewEventObject(),
    };
  },
  methods: {
    // Returns new event object
    createNewEventObject() {
      const user = this.$store.state.user;
      const id = Math.floor(Math.random() * 1000000);

      return {
        id: id,
        user: user,
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        organizer: user,
        category: "",
        attendees: [],
      };
    },
    createEvent() {
      this.$store
        .dispatch("createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-show",
            params: {
              id: this.event.id,
            },
          });
          this.event = this.createNewEventObject();
        })
        .catch(() => {
          console.log("Error creating the event");
        });
    },
  },

  // computed: {
  //   userName() {
  //     return this.$store.state.user.name;
  //   },
  //   userID() {
  //     return this.$store.state.user.id;
  //   },
  // },

  // Equals to

  // computed: mapState({
  //   userName: (state) => state.user.name,
  //   userID: (state) => state.user.id,
  //   categories: (state) => state.categories,
  // }),

  // Another way to do it

  // computed: mapState({
  //   user: "user",
  //   categories: "categories",
  // }),

  // And same but simpler

  // computed: mapState(["user", "categories"]),

  // And finally

  // computed: {
  //   catLength() {
  //     return this.$store.getters.catLength;
  //   },
  //   ...mapState(["user", "categories"]), // ... because sharing computed with other computed functions
  // },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
