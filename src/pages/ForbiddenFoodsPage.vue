<template>
  <menu-layout pageTitle="Cibi vietati">
    <!-- Display a search bar -->
    <ion-searchbar placeholder="Filtra..." v-model="inputChars"></ion-searchbar>

    <!-- Display all forbidden foods with filtering -->
    <ion-list>
      <ion-item v-for="food in forbiddenFilteredFoodList" @click="setSelectedForbiddenFood(food)">{{ food.denominazione
      }}</ion-item>
    </ion-list>
    <!-- Display the modal with more information -->
    <ion-modal :is-open="isOpenModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>Informazioni</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal()">Chiudi</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h3>{{ selectedForbiddenFood.denominazione }}</h3>
        <p>
          {{ selectedForbiddenFood.motivazione }}
        </p>
      </ion-content>
    </ion-modal>

  </menu-layout>
</template>
  
<script>
import { IonItem, IonList, IonSearchbar, IonModal, IonButtons, IonButton, IonHeader, IonToolbar, IonContent, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Api } from '../helpers/api'
export default defineComponent({
  data() {
    return {
      inputChars: "",
      selectedForbiddenFood: null,
      isOpenModal: false
    }
  },
  computed: {
    forbiddenFoodList() {
      return Api.getForbiddenFoods(this.$store.getters.getActivePet.type)
    },
    forbiddenFilteredFoodList() {
      if (!this.inputChars) {
        return this.forbiddenFoodList
      } else {
        const chars = this.inputChars
        return this.forbiddenFoodList.filter(function (el) {
          return el.denominazione.includes(chars)
        })
      }
    },
  },
  methods: {
    setSelectedForbiddenFood(food){
      console.log(food)
      try {
        this.selectedForbiddenFood = food
      this.openModal();
      } catch(err){
        console.log(err)
      }
      
    },
    openModal(){
      this.isOpenModal = true
    },
    closeModal() {
      this.isOpenModal = false
    }
  },
  components: { IonSearchbar, IonList, IonItem, IonModal, IonButtons, IonButton, IonHeader, IonToolbar, IonContent, IonTitle },

});
</script>