<template>
  <menu-layout pageTitle="Pets">
    <template v-slot:actions-end>
      <ion-button router-link="/add-pet">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <pets-list :pets="pets"></pets-list>
  </menu-layout>
</template>

<script>
import {
    IonIcon,
    IonInput,
    IonButton
} from "@ionic/vue"
import PetsList from '../components/pets/PetsList.vue'
export default {
    components: {
        IonIcon,
        IonInput,
        IonButton,
        PetsList
    },
    computed:{
        pets(){
            return this.$store.getters.getPets
        } 
    }
}

</script>