<template>
  <menu-layout pageTitle="Home" v-if="!loading">
    <IonImg src="logo1_transparency.png" @click="openMenu()" />
    <ion-grid>
      <ion-row class="ion-justify-content-between ion-margin-top">
        <ion-col></ion-col>
        <ion-col class="ion-align-self-center" size="auto">
          Benvenuto <span style="font-weight: bold; font-style: italic;">{{ this.$store.getters.getActivePet.name
          }}</span>!
        </ion-col>
        <ion-col></ion-col>
      </ion-row>
      <ion-row class="ion-text-center" style="text-align: center">
        <ion-col></ion-col>
        <ion-col class="ion-justify-content-between ion-align-self-center" size="auto">
          Seleziona una delle opzioni dal menù
        </ion-col>
        <ion-col></ion-col>
      </ion-row>
    </ion-grid>
  </menu-layout>
</template>

<script>
import { IonImg, IonItem, menuController } from "@ionic/vue";
export default {
  components: {
    IonImg,
    IonItem,
    menuController,
  },
  async ionViewWillEnter() {
    this.loading = true;
    await menuController.close("main-menu");
    this.loading = false;
  },
  methods: {
    openMenu() {
      menuController.toggle("main-menu");
    },
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style>
ion-img {
  width: 75%;
  margin: auto;
  cursor: pointer;
}
</style>
