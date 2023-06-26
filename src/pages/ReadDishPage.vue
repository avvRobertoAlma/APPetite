<template>
  <default-layout pageTitle="Dosa il cibo" pageDefaultBackLink="/create-dish">
    <ion-content class="ion-padding">
      <h3>Dosi consigliate per {{ activePet.name }}</h3>

      <div style="margin-top: 20px; text-align:center" v-if="alimentiConsigliati.alert">
        <p id="wrong-dish">Attenzione questo cibo non è adeguato</p>
        <p>{{ activePet.name }} non può mangiare:
        <ul>
          <li v-for="el in alimentiConsigliati.errors">{{ el.nome }}</li>
        </ul>
        </p>

      </div>
      <div v-else>
        <ion-list>
          <ion-item>
            {{ alimentiConsigliati.proteine.nome }} : <strong>{{ alimentiConsigliati.proteine.valore }} g
            </strong>
          </ion-item>
          <ion-item>
            {{ alimentiConsigliati.cereali.nome }} : <strong>{{ alimentiConsigliati.cereali.valore }} g
            </strong>
          </ion-item>
          <ion-item>
            {{ alimentiConsigliati.vitamine.nome }} : <strong>{{ alimentiConsigliati.vitamine.valore }} g
            </strong>
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
} from "@ionic/vue";
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';

import { Api } from "../helpers/api";
import { Services } from "../helpers/services"
export default {
  components: {
    IonContent,
    IonList,
    IonItem,
  },
  data() {
    return {
      proteina: this.$store.getters.getProtein,
      cereale: this.$store.getters.getCereal,
      vitamina: this.$store.getters.getVitamin,
      alimentiConsigliati: this.$store.getters.getFoods,
    };
  },
  computed: {
    activePet() {
      return this.$store.getters.getActivePet
    },
    activeFoods() {
      console.log("store")
      console.log(this.$store.getters.getFoods)
      this.alimentiConsigliati = this.$store.getters.getFoods
      this.proteina = this.$store.getters.getProtein
      this.cereale = this.$store.getters.getCereal
      this.vitamina = this.$store.getters.getVitamin
      console.log("alimenti")
      console.log(this.proteina + " " + this.cereale + " " + this.vitamina)
      return this.alimentiConsigliati // this.$store.getters.getFoods
    },
    proteine() {
      return Api.getFoodChoicesPerRace(this.$store.getters.getActivePet.type).proteine
    },
    cereali() {
      return Api.getFoodChoicesPerRace(this.$store.getters.getActivePet.type).cereali
    },
    vitamine() {
      return Api.getFoodChoicesPerRace(this.$store.getters.getActivePet.type).vitamine
    }
  },
  methods: {
    async esportaConsigli() {
      const html = Services.generateHTMLrecommendations(Api.generateFullRecommendations(
        this.$store.getters.getActivePet.name,
        this.$store.getters.getActivePet.type,
        Number(this.$store.getters.getActivePet.weight),
        this.alimentiConsigliati
      ))
      try {
        const fname = this.activePet.name + '_dish.pdf'
        let options = {
          documentSize: 'A4',
          type: 'share',
          fileName: fname
        }
        const base64 = await PDFGenerator.fromData(html, options)
        // var fileName = this.activePet.name + '_dish.pdf';
        // var fname = '/storage/emulated/0/Download/' + fileName;
        // //var folderpath = cordova.file.dataDirectory + "/Download/";
        // //var contentType = "application/pdf";
        // Services.savebase64AsPDF(fname, base64);
      } catch (err) {
        alert(err)
      }


    }
  },
  watch: {
    activePet() {
      console.log("cambiato pet")
      // this.alimentiConsigliati.alert = true
      this.alimentiConsigliati = Api.getRecommendedDoses(
        this.$store.getters.getActivePet.type,
        Number(this.$store.getters.getActivePet.weight),
        this.proteina, this.cereale, this.vitamina)
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
  color: black !important;
}

#wrong-dish {
  font-weight: bold;
  text-decoration: underline;
  color: red;
}
</style>
