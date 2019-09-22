<template>
  <div>
    <h1>People {{ people.length }}</h1>

    <button @click="goToForm({ person: null, event: 'add' })">Add user</button>

    <p v-if="people.length === 0">No information about people yet</p>
    <table v-else>
      <thead>
        <th>Name</th>
        <th>Surname</th>
        <th>Phone</th>
        <th>Email</th>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.id">
          <td>{{ person.name }}</td>
          <td>{{ person.surname }}</td>
          <td>{{ person.phone }}</td>
          <td>{{ person.email }}</td>

          <button @click="deleteP(person)">Delete</button>
          <button @click="goToForm({ person, event: 'edit' })">Edit</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PeopleTable",
  computed: {
    people() {
      return this.$store.state.people;
    }
  },
  methods: {
    ...mapActions({
      deleteP: "deletePerson",
      goToForm: "activeForm"
    })
  }
};
</script>

<style scoped>
table {
  padding: 5px;
}

td {
  padding: 5px 10px;
}
</style>
