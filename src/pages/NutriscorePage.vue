<template>
  <default-layout pageTitle="Nutriscore" pageDefaultBackLink="/home">
    <div v-if="isScannerOpen">
      <ion-content class="ion-padding" style="position: absolute" v-if="developerMode">
        <h3 style="margin-top: 10% !important; text-align: center !important">
          Scansiona il codice a barre del prodotto per valutarlo
        </h3>
        <ion-img src="scanner.jpeg" @click="loadNutriscoreRanking()" />
      </ion-content>
      <ion-content class="ion-padding" style="position: absolute"
        v-else>
        <h3 style="margin-top: 10% !important; text-align: center !important">
          Scansiona il codice a barre del prodotto per valutarlo
        </h3>
        <ion-button expand="full" @click="startScan" v-if="!scanActive">
          SCAN
        </ion-button>
      </ion-content>
    </div>
    <div v-if="isRankingOpen">
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
          <ion-col style="width: 50%">
            <h1 v-if="this.$store.getters.getActivePet.type == rankings.pet" :class="nutriscoreClass">{{ rankings.points
            }}/100
            </h1>
            <h1 v-else class="nutriscore-points-red">0/100</h1>
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
            <ion-col push="3">
              <a @click="viewIngredients">Vedi tutto</a>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-list>
                <ion-item expand="block" v-for="item in rankings.overall">
                  <ion-label>{{ item.description }}</ion-label>
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
            <span id="wrong-product">Il prodotto non è indicato per questa specie
              animale</span>
          </ion-row>
        </div>
      </ion-grid>
    </div>
    <!-- Modal for ingredients -->
    <ion-modal :is-open="isOpenModalIngredients" style="--height: 100%;">
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
    <ion-modal :isOpen="isOpenModalCharacteristics" @ionModalDidDismiss="closeModalCharacteristics"
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
    <ion-modal :isOpen="isOpenModalOverall" @ionModalDidDismiss="closeModalOverall" :initial-breakpoint="1"
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
    <ion-modal :isOpen="scanActive" style="--heigth:100%;">
      <ion-header>
      <ion-toolbar>
        <ion-title>Scanning</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeBarcodeModal">
            <ion-icon name="close"></ion-icon>
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
} from "@ionic/vue";

import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

import {
  informationCircle,
  warningSharp,
  alertCircleSharp,
  ellipseSharp,
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
      ellipseSharp: ellipseSharp,
      isOpenModalIngredients: false,
      isOpenModalCharacteristics: false,
      isOpenModalOverall: false,
      developerMode: false,
      scanActive: false,
    };
  },
  computed: {
    nutriscoreClass() {
      if (this.rankings.points > 70) {
        return "nutriscore-points-green";
      } else if (this.rankings.points > 51) {
        return "nutriscore-points-yellow";
      } else {
        return "nutriscore-points-red";
      }
    },
  },
  methods: {
    async loadNutriscoreRanking() {
      var barcode;
      if (this.$store.getters.getActivePet.type == "cane") { barcode = 'sample-dog' }
      else if (this.$store.getters.getActivePet.type == "gatto") { barcode = 'sample-cat' }
      else if (this.$store.getters.getActivePet.type == "tartaruga") { barcode = 'sample-turtle' }
      this.rankings = await Api.getNutriscoreRanking(barcode);
      this.isScannerOpen = false;
      this.isRankingOpen = true;
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
    async startScan() {
      alert("start scan")
      const allowed = await this.checkPermission();
      if (allowed) {
        alert("allowed")
        document.querySelector('body').classList.add('barcode-scanning-active');
        this.scanActive = true
        const result = await BarcodeScanner.scan({
          formats: []
        });
        if (result) {
          this.scanActive = false
          alert(result);
        }
        await this.stopScan();
      } else {
        alert("not allowed")
      }


    },
    async stopScan() {
      document.querySelector('body').classList.remove('barcode-scanning-active');
      await BarcodeScanner.stopScan();
      this.scanActive = false;
    },  
    async closeBarcodeModal(){
      await this.stopScan();
    },
    async checkPermission() {
      return new Promise(async (resolve, reject) => {
        const result = await BarcodeScanner.checkPermissions();
        if (result.camera == 'granted') {
          resolve(true);
        } else {
          BarcodeScanner.requestPermissions();
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
}

#modal-barcode-content {
        --background: transparent;
      }

@media (prefers-color-scheme: dark) {
  .barcode-scanning-modal {
    --background: transparent;
    --ion-background-color: transparent;
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
