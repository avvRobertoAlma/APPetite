import { createStore } from "vuex";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      pets: [],
      activePet: null,
      suggestedFoods: null,
      protein: null,
      cereal: null,
      vitamin: null,
    };
  },
  mutations: {
    ADD_PET(state, pet) {
      state.pets.push(pet);
      localStorage.setItem("appetite_pets", JSON.stringify(state.pets));
    },
    EDIT_PET(state, form) {
      const idx = store.state.pets.findIndex(function (el) {
        return el.name == form.oldPetName;
      });
      console.log(idx);
      store.state.pets[idx] = form.pet;
      localStorage.setItem("appetite_pets", JSON.stringify(state.pets));
      if (form.oldPetName == state.activePet.name) {
        console.log("reset active pet");
        store.commit("SET_ACTIVE_PET", idx);
      }
    },
    REMOVE_PET(state, pet) {
      const active = state.pets.indexOf(pet);
      state.pets.splice(active, 1);
      localStorage.setItem("appetite_pets", JSON.stringify(state.pets));
      if (state.pets.length == 0) {
        console.log("No pets");
        store.commit("SET_ACTIVE_PET", -1);
      } else if (pet.name == state.activePet.name) {
        console.log("reset active pet");
        store.commit("SET_ACTIVE_PET", 0);
      }
    },
    SELECT_ACTIVE_PET(state, petName) {
      const idx = state.pets.findIndex(function (el) {
        return el.name == petName;
      });
      state.activePet = pet[idx];
    },
    SET_ACTIVE_PET(state, petIndex) {
      if (petIndex == -1) {
        state.activePet = null;
      } else {
        state.activePet = state.pets[petIndex];
      }
    },
    SET_PETS(state, pets) {
      state.pets = pets;
    },
    SET_FOODS(state, foods) {
      state.suggestedFoods = foods;
    },
    SET_PROTEIN(state, protein) {
      state.protein = protein;
    },
    SET_CEREAL(state, cereal) {
      state.cereal = cereal;
    },
    SET_VITAMIN(state, vitamin) {
      state.vitamin = vitamin;
    },
  },
  actions: {
    INIT_STORE(store) {
      const pets = localStorage.getItem("appetite_pets");
      if (pets) {
        store.commit("SET_PETS", JSON.parse(pets));
      }
      const idx = localStorage.getItem("appetite_active_pet");
      if (idx) {
        store.commit("SET_ACTIVE_PET", idx);
      }
      console.log(pets, idx);
      console.log("Store initialized");
    },
    SET_ACTIVE_PET(store, idx) {
      localStorage.setItem("appetite_active_pet", idx);
      store.commit("SET_ACTIVE_PET", idx);
    },
    SET_ACTIVE_PET_BY_NAME(store, name) {
      const idx = store.state.pets.findIndex(function (el) {
        return el.name == name;
      });
      console.log(idx);
      localStorage.setItem("appetite_active_pet", idx);
      store.commit("SET_ACTIVE_PET", idx);
    },
  },
  getters: {
    getPets(state) {
      return state.pets;
    },
    getActivePet(state) {
      return state.activePet;
    },
    getFoods(state) {
      return state.suggestedFoods;
    },
    getVitamin(state) {
      return state.vitamin;
    },
    getCereal(state) {
      return state.cereal;
    },
    getProtein(state) {
      return state.protein;
    },
  },
});
