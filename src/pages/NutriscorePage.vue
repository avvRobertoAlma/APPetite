<template>
  <default-layout pageTitle="Scanner qualità" pageDefaultBackLink="/home" :callbackFunction="newSearch" :showAlternativeButton="isRankingOpen">
    <div v-if="isScannerOpen">
      <ion-content class="ion-padding" style="position: absolute" v-if="developerMode">
        <h3 style="margin-top: 10% !important; text-align: center !important">
          Scansiona il codice a barre del prodotto per valutarlo
        </h3>
        <ion-img src="scanner.jpeg" @click="loadNutriscoreRanking()" />
      </ion-content>
      <ion-content class="ion-padding" style="position: absolute" v-else>
        <h3 style="margin-top: 10% !important; text-align: center !important">
          Scansiona il codice a barre del prodotto per valutarlo
        </h3>
        <ion-button style="margin-top: 80px !important" color="success" expand="full" @click="startScan"
          v-if="!scanActive">
          SCAN
        </ion-button>
      </ion-content>
    </div>
    <div v-if="isRankingOpen && !loading">
      <ion-grid>
        <ion-row class="ion-align-items-center">
          <ion-col>
            <ion-img :src="rankings.img" />
          </ion-col>
          <ion-col>
            <h3 style="text-align: center !important">{{ rankings.product }}</h3>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <div style="text-align: center;">
              <h1
                style="font-size: 1.4rem !important; margin-bottom: 1px;" :class="nutriscoreClass">{{ rankings.points
                }}/100
              </h1>
              <h5 style="margin-top: 2px;">{{ quality }} qualità</h5>
            </div>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <!-- Product matches with animal -->
        <div v-if="this.$store.getters.getActivePet.type == rankings.pet">
          <ion-note>Elementi positivi</ion-note>
          <ion-row>
            <ion-col>
              <ion-list>
                <ion-item expand="block" v-for="positive in rankings.positives">
                  <ion-label>{{ positive.name }}</ion-label>
                  <ion-icon :icon="informationCircle" style="color: #eb8500" @click="setSelectedPositive(positive)"
                    slot="end"></ion-icon>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-note>Ingredienti</ion-note>
            </ion-col>
            <ion-col size="auto">
              <a @click="viewIngredients">Dettaglio</a>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-list>
                <ion-item expand="block" v-for="item in rankings.overall">
                  <ion-label>{{ item.description }}</ion-label>
                  <ion-icon v-if="item.risk == 'alto'" :icon="ellipseSharp" style="color: red;" size="small"
                    slot="end"></ion-icon>
                  <ion-icon v-if="item.risk == 'medio'" :icon="ellipseSharp" style="color: orange" size="small"
                    slot="end"></ion-icon>
                  <ion-icon v-if="item.risk == 'basso'" :icon="ellipseSharp" style="color: yellow" size="small"
                    slot="end"></ion-icon>
                  <ion-icon :icon="informationCircle" style="color: #eb8500" @click="setSelectedOverall(item)"
                    slot="end"></ion-icon>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
        </div>
        <!-- Product doesn't match with animal -->
        <div v-else>
          <ion-row class="ion-justify-content-center">
            <span id="wrong-product">Il prodotto non è indicato per {{ this.$store.getters.getActivePet.name }}</span>
          </ion-row>
        </div>
      </ion-grid>
    </div>
    <!-- Modal for ingredients -->
    <ion-modal :is-open="isOpenModalIngredients" style="--height: 100%;" key="ingredients">
      <ion-header>
        <ion-toolbar>
          <ion-title>Dettaglio Ingredienti</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModalIngredients()">Chiudi</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item v-for="element in rankings.ingredients" id="general">
            <ion-label>
              {{ element.description }}
            </ion-label>
            <ion-icon :icon="alertCircleSharp" v-if="element.risk == 'medium'" style="color: rgb(200, 200, 0)"
              slot="end"></ion-icon>
            <ion-icon :icon="warningSharp" v-if="element.risk == 'high'" style="color: red" slot="end"></ion-icon>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
    <!-- end Modal for ingredients -->
    <!-- Modal for characteristics -->
    <ion-modal :isOpen="isOpenModalCharacteristics" @ionModalDidDismiss="closeModalCharacteristics" key="characteristics"
      :initial-breakpoint="1" :breakpoints="[0, 1]" id="top-down">
      <div class="block">
        <ion-grid>
          <ion-row>
            <ion-col>
              <h3 style="text-transform: capitalize">
                {{ selectedPositive.name }}
              </h3>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col></ion-col>
            <ion-col size="auto">
              <span style="text-align: center; vertical-align: middle">
                <ion-icon :icon="ellipseSharp" style="color: rgb(22, 197, 69)"></ion-icon>
                nessun rischio
              </span>
            </ion-col>
            <ion-col></ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <p>{{ selectedPositive.description }}</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>
    <!-- end Modal for characteristics -->
    <!-- Modal for overall -->
    <ion-modal :isOpen="isOpenModalOverall" @ionModalDidDismiss="closeModalOverall" :initial-breakpoint="1" key="overall"
      :breakpoints="[0, 1]" id="top-down">
      <div class="block">
        <ion-grid>
          <ion-row>
            <ion-col>
              <h3 style="text-transform: capitalize">
                {{ selectedOverall.name }}
              </h3>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col></ion-col>
            <ion-col size="auto">
              <span style="text-align: center; vertical-align: middle">
                <ion-icon v-if="selectedOverall.risk == 'alto'" :icon="ellipseSharp" style="color: red"></ion-icon>
                <ion-icon v-if="selectedOverall.risk == 'medio'" :icon="ellipseSharp" style="color: orange"></ion-icon>
                <ion-icon v-if="selectedOverall.risk == 'basso'" :icon="ellipseSharp" style="color: yellow"></ion-icon>
                rischio {{ selectedOverall.risk }}
              </span>
            </ion-col>
            <ion-col></ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <p>{{ selectedOverall.details }}</p>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <h5 style="font-weight: bold">Ingredienti riscontrati:</h5>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <span>{{ selectedOverall.ingredients }}</span>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <h5 style="font-weight: bold;">Rischi per la salute:</h5>
            </ion-col>
          </ion-row>
          <ion-row v-if="selectedOverall.symptoms.length == 0" class="ion-justify-content-between">
            <span style="padding:5px;">Nessun rischio</span>
          </ion-row>
          <ion-row v-else class="ion-justify-content-between">
            <ion-col id="overall" v-for="symptom in selectedOverall.symptoms">
              {{ symptom }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>
    <!-- end Modal for characteristics -->
    <!-- Modal for Barcode Scanner -->
    <ion-modal :isOpen="scanActive" style="--height:100%!important;" class="barcode-scanning-modal" key="barcode-modal">
      <ion-header>
        <ion-toolbar>
          <ion-title>Scanning</ion-title>
          <ion-buttons slot="end">
            <ion-button style="color:white !important" @click="closeBarcodeModal">
              <ion-icon :icon="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content id="modal-barcode-content">
        <div id="square" class="square"></div>
      </ion-content>
    </ion-modal>
    <!-- end Modal for Barcode Scanner -->
  </default-layout>
</template>

<script>
import {
  IonImg,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonModal,
  IonNote,
  isPlatform
} from "@ionic/vue";

import {
  BarcodeScanner
} from '@capacitor-community/barcode-scanner';

import {
  informationCircle,
  warningSharp,
  alertCircleSharp,
  ellipseSharp,
  close
} from "ionicons/icons";
import { Api } from "../helpers/api";
export default {
  components: {
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonNote,
    IonModal,
  },
  data() {
    return {
      isScannerOpen: true,
      isRankingOpen: false,
      rankings: null,
      selectedPositive: null,
      selectedOverall: null,
      informationCircle: informationCircle,
      warningSharp: warningSharp,
      alertCircleSharp: alertCircleSharp,
      close: close,
      ellipseSharp: ellipseSharp,
      isOpenModalIngredients: false,
      isOpenModalCharacteristics: false,
      isOpenModalOverall: false,
      scanActive: false,
      barcode: null,
      loading: false,
      points: 0
    };
  },
  computed: {
    nutriscoreClass() {
      if (this.points > 70) {
        return "nutriscore-points-green";
      } else if (this.points > 51) {
        return "nutriscore-points-yellow";
      } else {
        return "nutriscore-points-red";
      }
    },
    quality(){
      console.log('cambiato pet')
      if (this.points > 70) {
        return "Alta"
      } else if (this.points > 51){
        return "Media"
      } else {
        return "Bassa"
      }
    },
    /*
      trasformato developerMode in una computed
      isPlatform è un metodo di ionic che restituisce true/false a seconda del tipo di device che
      sta eseguendo l'applicazione
      nel caso nostro se siamo su android o ios restituisce true e quindi developerMode deve essere false
      altrimenti developerMode deve essere true' 
    */
    developerMode(){
      if (isPlatform('android')| isPlatform('ios')){
        return false
      } else {
        return true
      }
    },
    activePet(){
      return this.$store.getters.getActivePet
    },
    
  },
  watch:{
    async activePet(){
      /* solo se i risultati sono visualizzati */
      if (this.isRankingOpen)
      this.loading = true
      this.rankings = await Api.getNutriscoreRanking(this.barcode, this.activePet.type);
      console.log(this.rankings)
      this.points = this.rankings.points
      console.log(this.points, this.rankings.points)
      this.$forceUpdate()
      this.loading = false
    }
  },
  methods: {
    async loadNutriscoreRanking() {
      this.loading = true
      if (this.$store.getters.getActivePet.type == "cane") { this.barcode = 'sample-dog' }
      else if (this.$store.getters.getActivePet.type == "gatto") { this.barcode = 'sample-cat' }
      else if (this.$store.getters.getActivePet.type == "tartaruga") { this.barcode = 'sample-turtle' } 
    
      this.rankings = await Api.getNutriscoreRanking(this.barcode, this.activePet.type);
      console.log(this.rankings)
      this.points = this.rankings.points
      this.isScannerOpen = false;
      this.isRankingOpen = true;
      this.loading = false
    },
    viewIngredients() {
      this.isOpenModalIngredients = true;
    },
    closeModalIngredients() {
      this.isOpenModalIngredients = false;
    },
    viewCharacteristics() {
      this.isOpenModalCharacteristics = true;
    },
    closeModalCharacteristics() {
      this.isOpenModalCharacteristics = false;
    },
    viewOverall() {
      this.isOpenModalOverall = true;
    },
    closeModalOverall() {
      this.isOpenModalOverall = false;
    },
    setSelectedPositive(positive) {
      console.log(positive);
      try {
        this.selectedPositive = positive;
        this.viewCharacteristics();
      } catch (err) {
        console.log(err);
      }
    },
    setSelectedOverall(item) {
      console.log(item);
      try {
        this.selectedOverall = item;
        this.viewOverall();
      } catch (err) {
        console.log(err);
      }
    },
    newSearch(){
      this.isRankingOpen = false
      this.isScannerOpen = true
    },
    async startScan() {
      // alert("start scan")
      const allowed = await this.checkPermission();
      if (allowed) {
        // alert("allowed");
        this.scanActive = true
        BarcodeScanner.hideBackground();
        document.querySelector('body').classList.add('barcode-scanning-active');
        const result = await BarcodeScanner.startScan();
        if (result.hasContent) {
          this.scanActive = false
          // alert(result.content);
          await this.stopScan();
          this.loadNutriscoreRanking()

        } else {
          await this.stopScan();
        }

      } else {
        alert("not allowed")
      }


    },
    async stopScan() {
      document.querySelector('body').classList.remove('barcode-scanning-active');
      BarcodeScanner.showBackground();
      await BarcodeScanner.stopScan();
      this.scanActive = false;
    },
    async closeBarcodeModal() {
      await this.stopScan();
    },
    async checkPermission() {
      return new Promise(async (resolve, reject) => {
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
          resolve(true);
        } else if (status.denied) {
          BarcodeScanner.openAppSettings();
          resolve(false);
        }
      });
    }
  },
  deactivated() {
    this.stopScan();
    this.scanActive = false
  },
  beforeDestroy() {
    this.stopScan();
    this.scanActive = false
  },
};
</script>

<style>
a {
  color: #eb8500 !important;
  text-decoration: underline;
  text-align: right !important;
  cursor: pointer !important;
}

a:hover {
  color: #eb8500 !important;
}

ion-img {
  width: 75%;
  margin: auto;
}

ion-item {
  color: rgb(22, 22, 22) !important;
  --ion-background-color: white !important;
  --border-color: #f6a300 !important;
}

#overall {
  color: rgb(22, 22, 22) !important;
  border-radius: 10px !important;
  border: 1px solid !important;
  text-align: center;
  padding: 2px;
  margin: 10px;
}

.nutriscore-points-green {
  border: 1px solid green;
  background-color: lightgreen;
  padding: 10%;
  text-align: center;
}

.nutriscore-points-red {
  border: 1px solid red;
  background-color: lightcoral;
  padding: 10%;
  text-align: center;
}

.nutriscore-points-yellow {
  border: 1px solid orange;
  background-color: lightyellow;
  padding: 10%;
  text-align: center;
}

.block {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

#top-down {
  --height: auto;
}

#wrong-product {
  text-align: center;
  font-weight: bold;
  text-decoration: underline;
  color: red;
  --ion-grid-column-padding: 5px;
  margin-top: 10px;
}


/* BARCODE SCANNER */
.barcode-scanning-modal {
  visibility: visible;
  --height: 100% !important;
  --background: transparent !important;
  --ion-background-color: transparent !important;
}

#modal-barcode-content {
  --background: transparent !important;
}

@media (prefers-color-scheme: dark) {
  .barcode-scanning-modal {
    --background: transparent !important;
    --ion-background-color: transparent !important;
  }
}

.square {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  width: 200px;
  height: 200px;
  border: 6px solid white;
  box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
}


/* END MODAL BARCODE SCANNER */



body.barcode-scanning-active {
  visibility: hidden;
  --background: transparent;
  --ion-background-color: transparent;
}
</style>
