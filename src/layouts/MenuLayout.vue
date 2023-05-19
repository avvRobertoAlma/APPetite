<template>
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
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ pageTitle }}</ion-title>
          <ion-buttons slot="end">
            <slot name="actions-end"></slot>
          </ion-buttons>
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
    IonMenu,
    IonMenuButton,
    IonList,
    IonItem,
  } from "@ionic/vue";
  
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
      IonMenu,
      IonMenuButton,
      IonList,
      IonItem,
    },
  };
  </script>

