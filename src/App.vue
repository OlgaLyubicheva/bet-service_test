<template>
  <div id="app">
    <component :is="currentPage" :person="currentPerson" />
  </div>
</template>

<script>
import PeopleTable from "./components/PeopleTable.vue";
import PeopleForm from "./components/PeopleForm.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState(["currentPage", "currentPerson"])
  },
  methods: {
    loadPeople(loadData) {
      this.$store.dispatch("loadPeople", { loadData });
    }
  },
  mounted() {
    const people = localStorage.getItem("people");
    if (people) {
      this.loadPeople(JSON.parse(people));
    }
  },
  components: {
    PeopleTable,
    PeopleForm
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
