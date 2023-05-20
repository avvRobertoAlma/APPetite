<template>
  <ion-page>
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu</ion-title>
            </ion-toolbar>
                <ion-list>
                    <ion-item router-link="/nutriscore">Scanner Qualità</ion-item>
                    <ion-item router-link="/crea-piatto">Crea il tuo piatto</ion-item>
                    <ion-item router-link="/forbidden-foods">Alimenti vietati</ion-item>
                    <ion-item router-link="/pets/list">I miei pets</ion-item>
                </ion-list>
        </ion-header>
    </ion-menu>
    <div class="ion-page" id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ pageTitle }}</ion-title>
          <ion-select v-model="petName" aria-label="Pets" interface="popover" :value="$store.getters.getActivePet ? $store.getters.getActivePet.name : undefined" slot="end">
            <ion-select-option  :value="pet.name" v-for="pet in $store.getters.getPets">{{pet.name}}</ion-select-option>
      </ion-select>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <slot />
      </ion-content>
      </div>
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
    IonMenu,
    IonMenuButton,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption
  } from "@ionic/vue";
  
  export default {
    props: ["pageTitle"],
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonBackButton,
      IonButtons,
      IonMenu,
      IonMenuButton,
      IonList,
      IonItem,
      IonSelect,
      IonSelectOption
    },
    data(){
      return {
        petName: this.$store.getters.getActivePet ? this.$store.getters.getActivePet.name : null
      }
    },
    watch:{
      petName(){
        this.$store.dispatch('SET_ACTIVE_PET_BY_NAME', this.petName)
      }
    }
  };
  </script>

