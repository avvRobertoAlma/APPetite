<template>
    <default-layout pageTitle="Nutriscore" pageDefaultBackLink="/home">
        <div v-if="isScannerOpen">
            <IonContent class="ion-padding">
                <h3 style="margin-top:10%!important; text-align:center;">Scansiona il codice a barre del prodotto per
                    valutarlo</h3>
            </IonContent>
            <IonImg src="scanner.jpeg" @click="loadNutriscoreRanking('sample')" />
        </div>
        <div v-if="isRankingOpen">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <IonImg :src="rankings.img" />
                    </ion-col>
                    <ion-col>
                        <ion-content class="ion-padding">
                            <h3 style="text-align:center;">{{ rankings.product }}</h3>
                        </ion-content>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col>
                        <h1 :class="nutriscoreClass">{{ rankings.points }}/100</h1>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-note>Elementi positivi</ion-note>
                <ion-row>
                    <ion-col>
                        <ion-list>
                            <ion-item v-for="positive in rankings.positives">
                                <ion-label>{{ positive.description }}</ion-label>
                                <ion-icon :icon="informationCircle" slot="end"></ion-icon>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-note>Ingredienti</ion-note>
                    </ion-col>
                    <ion-col push="3">
                        <a @click="viewIngredients" style="text-align:right!important;">Vedi tutto</a>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-list>
                            <ion-item v-for="item in rankings.overall">
                                <ion-label>{{ item.description }}</ion-label>
                                <ion-icon :icon="informationCircle" slot="end"></ion-icon>
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
            <ion-item v-for="element in rankings.ingredients">
                <ion-label>
                    {{  element.description }}
                </ion-label>
                <ion-icon :icon="warningSharp" v-if="element.risk == 'medium'" style="color:orange" slot="end"></ion-icon>
                <ion-icon :icon="warningSharp" v-if="element.risk == 'high'" style="color:red" slot="end"></ion-icon>
            </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
        <!-- end Modal for ingredients -->
    </default-layout>
</template>

<script>
import { IonImg, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, IonIcon, IonModal, IonNote } from '@ionic/vue'
import { informationCircle, warningSharp } from 'ionicons/icons';
import { Api } from '../helpers/api'
export default {
    components: {
        IonImg, IonGrid, IonRow, IonCol, IonItem, IonList, IonLabel, IonIcon, IonNote, IonModal
    },
    data() {
        return {
            isScannerOpen: true,
            isRankingOpen: false,
            rankings: null,
            informationCircle: informationCircle,
            warningSharp:warningSharp,
            isOpenModalIngredients: false,
        }
    },
    computed: {
        nutriscoreClass() {
            if (this.rankings.points > 70) {
                return 'nutriscore-points-green'
            } else if (this.rankings.points > 51) {
                return 'nutriscore-points-white'
            } else {
                return 'nutriscore-points-red'
            }
        }
    },
    methods: {
        loadNutriscoreRanking(barcode) {
            this.rankings = Api.getNutriscoreRanking(barcode)
            this.isScannerOpen = false
            this.isRankingOpen = true
        },
        viewIngredients(){
            this.isOpenModalIngredients = true
        },
        closeModalIngredients(){
            this.isOpenModalIngredients = false
        }
    }
}


</script>

<style>
ion-img {
    width: 75%;
    margin: auto;
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
</style>