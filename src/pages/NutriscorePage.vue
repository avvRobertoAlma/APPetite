<template>
  <default-layout pageTitle="Nutriscore" pageDefaultBackLink="/home">
    <div v-if="isScannerOpen">
      <ion-content class="ion-padding">
        <h3 style="margin-top: 10% !important; text-align: center">
          Scansiona il codice a barre del prodotto per valutarlo
        </h3>
      </ion-content>
      <ion-img src="scanner.jpeg" @click="loadNutriscoreRanking('sample')" />
    </div>
    <div v-if="isRankingOpen">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-img :src="rankings.img" />
          </ion-col>
          <ion-col>
            <h3 style="text-align: center">{{ rankings.product }}</h3>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col
            size="auto"
            size-lg="auto"
            size-md="auto"
            size-sm="auto"
            size-xl="auto"
            size-xs="auto"
            style="width: 50%"
          >
            <h1 :class="nutriscoreClass">{{ rankings.points }}/100</h1>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-note>Elementi positivi</ion-note>
        <ion-row>
          <ion-col>
            <ion-list>
              <ion-item
                expand="block"
                v-for="positive in rankings.positives"
                @click="setSelectedPositive(positive)"
              >
                <ion-label>{{ positive.name }}</ion-label>
                <ion-icon
                  :icon="informationCircle"
                  style="color: #eb8500"
                  slot="end"
                ></ion-icon>
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
              <ion-item
                expand="block"
                v-for="item in rankings.overall"
                @click="setSelectedOverall(item)"
              >
                <ion-label>{{ item.description }}</ion-label>
                <ion-icon
                  :icon="informationCircle"
                  style="color: #eb8500"
                  slot="end"
                ></ion-icon>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
    <!-- Modal for ingredients -->
    <ion-modal :is-open="isOpenModalIngredients">
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
            <ion-icon
              :icon="alertCircleSharp"
              v-if="element.risk == 'medium'"
              style="color: rgb(235, 235, 0)"
              slot="end"
            ></ion-icon>
            <ion-icon
              :icon="warningSharp"
              v-if="element.risk == 'high'"
              style="color: red"
              slot="end"
            ></ion-icon>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
    <!-- end Modal for ingredients -->
    <!-- Modal for characteristics -->
    <ion-modal
      :isOpen="isOpenModalCharacteristics"
      @ionModalDidDismiss="closeModalCharacteristics"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
    >
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
    <ion-modal
      :isOpen="isOpenModalOverall"
      @ionModalDidDismiss="closeModalOverall"
      :initial-breakpoint="1"
      :breakpoints="[0, 0.5, 1]"
    >
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
                <ion-icon
                  v-if="selectedOverall.risk == 'rischio alto'"
                  :icon="ellipseSharp"
                  style="color: red"
                ></ion-icon>
                <ion-icon
                  v-if="selectedOverall.risk == 'rischio medio'"
                  :icon="ellipseSharp"
                  style="color: orange"
                ></ion-icon>
                <ion-icon
                  v-if="selectedOverall.risk == 'rischio basso'"
                  :icon="ellipseSharp"
                  style="color: yellow"
                ></ion-icon>
                {{ selectedOverall.risk }}
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
              <h5>Rischi per la salute:</h5>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-between">
            <ion-col id="overall" v-for="symptom in selectedOverall.symptoms">
              {{ symptom }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>
    <!-- end Modal for characteristics -->
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
    };
  },
  computed: {
    nutriscoreClass() {
      if (this.rankings.points > 70) {
        return "nutriscore-points-green";
      } else if (this.rankings.points > 51) {
        return "nutriscore-points-white";
      } else {
        return "nutriscore-points-red";
      }
    },
  },
  methods: {
    async loadNutriscoreRanking(barcode) {
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
    setSelectedPositive(positive) {
      console.log(positive);
      try {
        this.selectedPositive = positive;
        this.viewCharacteristics();
      } catch (err) {
        console.log(err);
      }
    },
    viewOverall() {
      this.isOpenModalOverall = true;
    },
    closeModalOverall() {
      this.isOpenModalOverall = false;
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

.nutriscore-points-white {
  border: 1px solid black;
  background-color: lightgrey;
  padding: 10%;
  text-align: center;
}

.block {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-modal {
  --height: auto;
}
</style>
