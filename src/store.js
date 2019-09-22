import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    people: [],
    currentPage: "PeopleTable",
    currentPerson: null,
    currentEvent: null
  },
  mutations: {
    loadPeople(state, { loadData }) {
      state.people = loadData;
    },
    addPerson(state, newPerson) {
      state.people.push({
        id: Date.parse(new Date()),
        ...newPerson
      });
    },
    addPeople(state, { newPeople }) {
      state.people = [...state.people, ...newPeople];
    },
    deletePerson(state, { id }) {
      state.people = state.people.filter(curPerson => curPerson.id !== id);
    },
    editPerson(state, editPerson) {
      state.people = state.people.map(person => {
        if (person.id === editPerson.id) {
          return editPerson;
        } else {
          return person;
        }
      });
    },
    chagePage(state, { newPage }) {
      state.currentPage = newPage;
    },
    chageCurrent(state, { person }) {
      state.currentPerson = person;
    },
    changeEvent(state, { newEvent }) {
      state.currentEvent = newEvent;
    }
  },
  actions: {
    loadPeople({ commit }, { loadData }) {
      commit("loadPeople", { loadData });
    },
    saveData({ state }) {
      const parsed = JSON.stringify(state.people);
      localStorage.setItem("people", parsed);
    },
    addPerson({ commit, dispatch }, newPerson) {
      commit("addPerson", newPerson);
      dispatch("saveData");
    },
    addPeople({ commit, dispatch }, { newPeople }) {
      commit("addPeople", { newPeople });
      dispatch("saveData");
    },
    deletePerson({ commit, dispatch }, person) {
      commit("deletePerson", person);
      dispatch("saveData");
    },
    editPerson({ commit, dispatch }, editPerson) {
      commit("editPerson", editPerson);
      dispatch("saveData");
    },
    activeForm({ commit }, { person, event }) {
      commit("chagePage", { newPage: "PeopleForm" });
      commit("changeEvent", { newEvent: event });
      commit("chageCurrent", { person });
    },
    closeForm({ commit }) {
      commit("chagePage", { newPage: "PeopleTable" });
      commit("changeEvent", { newEvent: null });
      commit("chageCurrent", { person: null });
    }
  }
});
