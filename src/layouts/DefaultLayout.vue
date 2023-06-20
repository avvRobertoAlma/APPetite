<template>
  <ion-page>
    <ion-header>
      <ion-toolbar :key="componentKey">
        <ion-buttons slot="start">
          <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        
        <ion-select v-model="petName" aria-label="Pets" interface="popover"
          :value="petName" slot="end">
          <ion-select-option :value="pet.name" v-for="pet in $store.getters.getPets">{{ pet.name }}</ion-select-option>
        </ion-select>
        
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>
  
<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";
import { ref } from "vue";

const componentKey = ref(0);

export default {
  props: ["pageTitle", "pageDefaultBackLink"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonSelect,
    IonSelectOption
  },
  data() {
    return {
      petName: this.$store.getters.getActivePet ? this.$store.getters.getActivePet.name : null,
    }
  },
  computed: {
    storedPet(){
      return this.$store.getters.getActivePet
    }
  },
  watch: {
    petName() {
      this.$store.dispatch('SET_ACTIVE_PET_BY_NAME', this.petName)
    },
    storedPet(){
      console.log("Changed, new value is: ")
      if (this.$store.getters.getActivePet){
        this.petName = this.$store.getters.getActivePet.name
      }
      this.$forceUpdate();
    }
  }
};
</script>