<template>
  <default-layout pageTitle="Dosa il cibo" pageDefaultBackLink="/home">

    <ion-content class="ion-padding">
      <form @submit.prevent="submitForm">
        <ion-list>
          <ion-item-group>
            <ion-item-divider>
              <ion-label style="text-align:center">Seleziona una voce per nutriente</ion-label>
            </ion-item-divider>
            <ion-item>
              <ion-select v-model="proteina" interface="popover" placeholder="Seleziona proteina" label="proteine"
                v-if="proteine.length" :value="proteina" required>
                <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in proteine">{{
                  choice.nome
                }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item v-if="activePet.type != 'tartaruga'">
              <ion-select v-model="cereale" interface="popover" placeholder="Seleziona cereale" label="cereali"
                v-if="cereali.length" :value="cereale" required>
                <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in cereali">{{
                  choice.nome
                }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item v-else>
              <ion-select v-model="cereale" interface="popover" placeholder="Seleziona fibra" label="fibre"
                v-if="cereali.length" :value="cereale" required>
                <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in cereali">{{
                  choice.nome
                }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item v-if="activePet.type != 'tartaruga'">
              <ion-select v-model="vitamina" interface="popover" placeholder="Seleziona vitamina/fibra"
                label="vitamine/fibre" v-if="vitamine.length" :value="vitamina" required>
                <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in vitamine">{{
                  choice.nome
                }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item v-else>
              <ion-select v-model="vitamina" interface="popover" placeholder="Seleziona vitamina" label="vitamine"
                v-if="vitamine.length" :value="vitamina" required>
                <ion-select-option :value="choice.nome" class="selected-ingredient" v-for="choice in vitamine">{{
                  choice.nome
                }}</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-item-group>
        </ion-list>
        <ion-button type="submit" color="success" expand="block">Calcola Dosi Giornaliere Consigliate</ion-button>
      </form>
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
  IonItemDivider,
  IonItemGroup
} from "@ionic/vue";

import { Api } from "../helpers/api";
// import { Services } from "../helpers/services"
export default {
  components: {
    IonContent,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
    IonItemDivider,
    IonItemGroup
  },
  data() {
    return {
      proteina: null,
      cereale: null,
      vitamina: null,
      alimentiConsigliati: null,
      showResult: false
    };
  },
  computed: {
    activePet() {
      return this.$store.getters.getActivePet
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
    submitForm() {
      if (!this.proteina) {
        alert("Per favore inserire una proteina")
        return
      }
      if (!this.cereale) {
        alert("Per favore inserire un cereale")
        return
      }
      if (!this.vitamina) {
        alert("Per favore inserire una vitamina/fibra")
        return
      }
      this.alimentiConsigliati = Api.getRecommendedDoses(
        this.$store.getters.getActivePet.type,
        Number(this.$store.getters.getActivePet.weight),
        this.proteina, this.cereale, this.vitamina)

      this.$store.commit('SET_FOODS', this.alimentiConsigliati)
      this.$store.commit('SET_PROTEIN', this.proteina)
      this.$store.commit('SET_CEREAL', this.cereale)
      this.$store.commit('SET_VITAMIN', this.vitamina)
      this.$router.push('/read-dish')
    }
  },
  watch: {
    // activePet() {
    //   if (this.showResult) {
    //     console.log("cambiato pet")
    //     this.alimentiConsigliati = Api.getRecommendedDoses(
    //       this.$store.getters.getActivePet.type,
    //       Number(this.$store.getters.getActivePet.weight),
    //       this.proteina, this.cereale, this.vitamina)
    //   }
    //   this.$forceUpdate()
    // }
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
