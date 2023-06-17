<template>
  <menu-layout pageTitle="Home" v-if="!loading">
    <IonImg src="logo1_transparency.png" @click="openMenu()" />
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
