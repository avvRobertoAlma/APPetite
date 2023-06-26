<template>
  <default-layout pageTitle="I miei pets" pageDefaultBackLink="/home">
    <template v-slot:actions-end>
      <ion-button router-link="/add-pet">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <pets-list :pets="pets"></pets-list>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button color="success" @click="addPet()">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </default-layout>
</template>

<script>
import {
  IonIcon,
  IonInput,
  IonButton,
  IonFab,
  IonFabButton
} from "@ionic/vue"
import PetsList from '../components/pets/PetsList.vue'
import { add } from 'ionicons/icons'
export default {
  components: {
    IonIcon,
    IonInput,
    IonButton,
    PetsList,
    IonFab,
    IonFabButton
  },
  computed: {
    pets() {
      return this.$store.getters.getPets
    },

  },
  data() {
    return {
      add: add
    }
  },
  methods: {
    addPet() {
      this.$router.push('/add-pet')
    }
  }
}

</script>