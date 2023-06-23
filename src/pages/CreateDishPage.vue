<template>
  <default-layout pageTitle="Crea Piatto" pageDefaultBackLink="/home">
    
    <ion-content class="ion-padding" v-if="showForm">
      <h3>Seleziona una voce per nutriente</h3>
    
    <form @submit.prevent="submitForm">
      <ion-list>
        <ion-item>
          <ion-select v-model="proteina" interface="popover" placeholder="Seleziona proteina" label="proteine" v-if="proteine.length"
            :value="proteina" required>
            <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in proteine">{{ choice.nome
            }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item v-if="activePet.type != 'tartaruga'">
          <ion-select v-model="cereale" interface="popover" placeholder="Seleziona cereale" label="cereali" v-if="cereali.length"
            :value="cereale" required>
            <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in cereali">{{ choice.nome
            }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item v-else>
          <ion-select v-model="cereale" interface="popover" placeholder="Seleziona fibra" label="fibre" v-if="cereali.length"
            :value="cereale" required>
            <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in cereali">{{ choice.nome
            }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item v-if="activePet.type != 'tartaruga'">
          <ion-select v-model="vitamina" interface="popover" placeholder="Seleziona vitamina/fibra" label="vitamine/fibre" v-if="vitamine.length"
            :value="vitamina" required>
            <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in vitamine">{{ choice.nome
            }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item v-else>
          <ion-select v-model="vitamina" interface="popover" placeholder="Seleziona vitamina" label="vitamine" v-if="vitamine.length"
            :value="vitamina" required>
            <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in vitamine">{{ choice.nome
            }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-button type="submit" color="success" expand="block">Calcola Dosi Consigliate</ion-button>
    </form>
  </ion-content>
  
    <ion-content class="ion-padding" v-else>
      <h3>Dosi consigliate per {{ activePet.name }}</h3>
      
      <div v-if="alimentiConsigliati.alert">
        <h3>Attenzione questa ricetta non è adeguata al tuo animale</h3>
      </div>
      <div v-else>
        <ion-list>
          <ion-item>
            {{ alimentiConsigliati.proteine.nome }} : <strong>{{ alimentiConsigliati.proteine.valore }} g </strong>
          </ion-item>
          <ion-item>
            {{ alimentiConsigliati.cereali.nome }} : <strong>{{ alimentiConsigliati.cereali.valore }} g </strong>
          </ion-item>
          <ion-item>
            {{ alimentiConsigliati.vitamine.nome }} : <strong>{{ alimentiConsigliati.vitamine.valore }} g </strong>
          </ion-item>
        </ion-list>
        <ion-button color="success" expand="block" @click="esportaConsigli">Esporta in PDF</ion-button>
      </div>

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
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';

import { Api } from "../helpers/api";
import { Services } from "../helpers/services"
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
    return {
      proteina: null,
      cereale: null,
      vitamina: null,
      alimentiConsigliati:null,
      showForm:true,
      showResult:false
    };
  },
  computed: {
    activePet() {
      return this.$store.getters.getActivePet
    },
    proteine() {
      return Api.getFoodChoicesPerRace(this.$store.getters.getActivePet.type).proteine
    },
    cereali(){
      return Api.getFoodChoicesPerRace(this.$store.getters.getActivePet.type).cereali
    },
    vitamine(){
      return Api.getFoodChoicesPerRace(this.$store.getters.getActivePet.type).vitamine
    }
  },
  methods:{
    submitForm(){
      if (!this.proteina){
        alert("Per favore inserire una proteina")
        return
      }
      if (!this.cereale){
        alert("Per favore inserire un cereale")
        return
      }
      if (!this.vitamina){
        alert("Per favore inserire una vitamina/fibra")
        return
      }
      this.alimentiConsigliati = Api.getRecommendedDoses(
        this.$store.getters.getActivePet.type, 
        Number(this.$store.getters.getActivePet.weight), 
        this.proteina, this.cereale, this.vitamina)

      this.showForm = false
      this.showResult = true
    },
    async esportaConsigli(){
      const html = Services.generateHTMLrecommendations(Api.generateFullRecommendations(
        this.$store.getters.getActivePet.name,  
        this.$store.getters.getActivePet.type, 
        Number(this.$store.getters.getActivePet.weight),
        this.alimentiConsigliati
      ))
      try {
        let options = {
                documentSize: 'A4',
                type: 'base64'
              }
        const base64 = await PDFGenerator.fromData(html, options)
        var fileName = this.activePet.name + '_dish.pdf';
        // var folderpath = "file:///storage/emulated/0/Download/";
        var folderpath = cordova.file.externalRootDirectory + "Download/";
        var contentType = "application/pdf";
        Services.savebase64AsPDF(folderpath, fileName, base64, contentType);
      } catch (err){
        alert(err)
      }

      
    }
  },
  watch: {
    activePet(){
      if (this.showResult){
        console.log("cambiato pet")
        this.alimentiConsigliati = Api.getRecommendedDoses(
        this.$store.getters.getActivePet.type, 
        Number(this.$store.getters.getActivePet.weight), 
        this.proteina, this.cereale, this.vitamina)
      }
      this.$forceUpdate()
    }
  }

};
</script>

<style scoped>
.selected-ingredient {
  color: black;
  --background-color: red;
}

ion-select {
  color:black!important;
}
</style>
