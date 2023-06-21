<template>
  <default-layout pageTitle="Crea Piatto" pageDefaultBackLink="/home">
    <ion-content class="ion-padding">
      <h3>Seleziona una voce per nutriente</h3>
      <ion-list>
        <ion-item>
          <ion-select class="" placeholder="Seleziona proteina">
            <div slot="label">
              Proteina <ion-text color="danger">(Richiesto)</ion-text>
            </div>
            <ion-select-option value="maiale" class="selected-ingredient"
              >Maiale</ion-select-option
            >
            <ion-select-option value="pollo" class="selected-ingredient"
              >Pollo</ion-select-option
            >
            <ion-select-option value="manzo" class="selected-ingredient"
              >Manzo</ion-select-option
            >
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-select placeholder="Seleziona cereale">
            <div slot="label">
              Cereale <ion-text color="danger">(Richiesto)</ion-text>
            </div>
            <ion-select-option value="riso" class="selected-ingredient"
              >Riso</ion-select-option
            >
            <ion-select-option value="farro" class="selected-ingredient"
              >Farro</ion-select-option
            >
            <ion-select-option value="orzo" class="selected-ingredient"
              >Orzo</ion-select-option
            >
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-select placeholder="Seleziona fibre/vitamine">
            <div slot="label">
              Fibra/vitamina <ion-text color="danger">(Richiesto)</ion-text>
            </div>
            <ion-select-option value="fagiolini" class="selected-ingredient"
              >Fagiolini</ion-select-option
            >
            <ion-select-option value="carote" class="selected-ingredient"
              >Carote</ion-select-option
            >
            <ion-select-option value="zucca" class="selected-ingredient"
              >Zucca</ion-select-option
            >
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>
  </default-layout>
</template>

<script>
import {
  IonContent,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/vue";
export default {
  components: {
    IonContent,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
  },
  data() {
    return {};
  },
};
</script>

<style>
.selected-ingredient {
  color: black;
  --background-color: red;
}
</style>
