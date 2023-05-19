import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      pets: [],
      activePet: null
    }
  },
  mutations: {
    ADD_PET(state, pet) {
      state.pets.push(pet)
    },
    SELECT_ACTIVE_PET(state, petId){
        const pet = state.pets.find(function(el){
            return el.id == petId
        })
        state.activePet = pet
    },
    SET_ACTIVE_PET(state, petIndex){
        state.activePet = state.pets[petIndex]
    }
  },
  actions: {
    
  },
  getters: {
    getPets(state) {
      return state.pets
    },
    getActivePet(state) {
      return state.activePet
    }
  }
})