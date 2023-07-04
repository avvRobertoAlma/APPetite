<template>
  <ion-page :key="$route.fullPath">
    <ion-header>
      <ion-toolbar :key="$route.fullPath">
        <ion-buttons slot="start">
          <ion-back-button :default-href="pageDefaultBackLink" v-if="!showAlternativeButton"></ion-back-button>
          <ion-button v-else @click="callbackFunction">
            <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>

        <ion-select v-model="petName" aria-label="Pets" interface="popover" v-if="$store.getters.getPets.length"
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
  IonSelectOption,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";

import {
  arrowBack,
} from "ionicons/icons";

const componentKey = ref(0);

export default {
  /*
    ho aggiunto due props al DefaultLayout: (i) showAlternativeButton e (ii) callbackFunction
    fondamentalmente se showAlternativeButton è inizializzata a true verrà mostrato un bottone alternativo
    che avrà lo stesso aspetto e look & feel dello IonBackButton ma eseguirà una azione personalizzata
    ossia quella contenuta nella "callbackFunction"
    in NutriscorePage c'è un esempio di invocazione
*/
  props: ["pageTitle", "pageDefaultBackLink", "showAlternativeButton", "callbackFunction"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonButton
  },
  data() {
    return {
      petName: this.$store.getters.getActivePet ? this.$store.getters.getActivePet.name : null,
      arrowBack: arrowBack
    }
  },
  computed: {
    storedPet() {
      console.log("storedPet")
      return this.$store.getters.getActivePet
    }
  },
  watch: {
    petName() {
      console.log("petName")
      this.$store.dispatch('SET_ACTIVE_PET_BY_NAME', this.petName)
    },
    storedPet() {
      console.log("Changed, new value is: ")
      if (this.$store.getters.getActivePet) {
        this.petName = this.$store.getters.getActivePet.name
      }
      this.$forceUpdate();
    }
  }
};
</script>