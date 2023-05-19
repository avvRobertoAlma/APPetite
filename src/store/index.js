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
      localStorage.setItem('appetite_pets', JSON.stringify(state.pets))
    },
    SELECT_ACTIVE_PET(state, petId){
        const idx = state.pets.findIndex(function(el){
            return el.id == petId
        })
        state.activePet = pet[idx]
    },
    SET_ACTIVE_PET(state, petIndex){
        state.activePet = state.pets[petIndex]

    },
    SET_PETS(state, pets){
      state.pets = pets
    }
  },
  actions: {
    INIT_STORE(store){
      const pets = localStorage.getItem('appetite_pets')
      if (pets) {
        store.commit('SET_PETS', JSON.parse(pets))
      }
      const idx = localStorage.getItem('appetite_active_pet')
      if (idx){
        store.commit('SET_ACTIVE_PET', idx)
      }
      console.log(pets, idx)
      console.log('Store initialized')
    },
    SET_ACTIVE_PET(store, idx){
      localStorage.setItem('appetite_active_pet', idx)
      store.commit('SET_ACTIVE_PET', idx)
    },
    
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