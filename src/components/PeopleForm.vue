<template>
  <form @submit="onSubmit">
    <input type="text" name="name" v-model="name" placeholder="First name" />
    <input
      type="text"
      name="surname"
      v-model="surname"
      placeholder="Last name"
    />
    <input
      type="text"
      name="phone"
      v-model="phone"
      placeholder="(000) 000-00-00"
    />
    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email@email.com"
    />

    <div v-if="currentEvent === 'add'">
      <label for="jsonImport">Import JSON</label>
      <textarea
        name="import-json"
        id="jsonImport"
        cols="40"
        rows="10"
        v-model="importJson"
        placeholder="[
        {
          'id': 'someId',
          'name': 'personName',
          'surname': 'personSurname',
          'phone': '(000) 000-00-00',
          'email': 'email@email.com'
        }]"
      >
      </textarea>
    </div>

    <button type="button" @click="closeForm">Cansel</button>
    <button type="submit">
      {{ currentEvent === "add" ? "Save" : "Edit" }}
    </button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PeopleForm",
  props: ["person"],
  data() {
    if (this.person) {
      return {
        name: this.person.name,
        surname: this.person.surname,
        phone: this.person.phone,
        email: this.person.email
      };
    } else {
      return {
        name: "",
        surname: "",
        phone: "",
        email: "",
        importJson: ""
      };
    }
  },
  computed: {
    currentEvent() {
      return this.$store.state.currentEvent;
    }
  },
  methods: {
    ...mapActions({
      closeForm: "closeForm",
      add: "addPerson",
      edit: "editPerson",
      addJson: "addPeople"
    }),
    onSubmit(event) {
      event.preventDefault();
      const {
        add,
        edit,
        addJson,
        name,
        surname,
        phone,
        email,
        importJson,
        currentEvent,
        person
      } = this;

      if (currentEvent === "add") {
        if (importJson !== "") {
          let parseJson = [];
          try {
            parseJson = JSON.parse(importJson);
            if (Array.isArray(parseJson)) {
              addJson({ newPeople: parseJson });
              this.importJson = "";
            }
          } catch (e) {
            alert("Invalid data. " + e);
          }
        }

        if (name !== "" && surname !== "" && phone !== "" && email !== "") {
          add({ name, surname, phone, email });
          this.name = this.surname = this.phone = this.email = "";
        }
      } else {
        edit({ name, surname, phone, email, id: person.id });
        this.closeForm();
      }
    }
  }
};
</script>

<style scoped>
input,
textarea {
  display: block;
  margin: 10px 0;
}
</style>
