<template>
  <default-layout pageTitle="Cibi vietati" pageDefaultBackLink="/home">
    <!-- Display a search bar -->
    <ion-searchbar placeholder="Filtra..." v-model="inputChars"></ion-searchbar>

    <!-- Display all forbidden foods with filtering -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item-group>
          <ion-item-divider>
            <ion-label style="text-align:center"> Alimenti vietati per {{ this.$store.getters.getActivePet.name }}
            </ion-label>
          </ion-item-divider>
          <ion-item button detail="true" expand="block" style="text-transform: capitalize"
            v-for="food in forbiddenFilteredFoodList" @click="setSelectedForbiddenFood(food)">
            <ion-thumbnail slot="start">
              <ion-img :src="food.img" />
            </ion-thumbnail>
            <ion-label>{{ food.denominazione }}</ion-label></ion-item>
        </ion-item-group>
      </ion-list>
      <!-- Display the modal with more information -->
      <ion-modal :isOpen="isOpenModal" style="--height: 100%;">
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <div class="ion-text-capitalize">{{ selectedForbiddenFood.denominazione }}</div>
            </ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeModal()">Chiudi</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-img style="margin-bottom:10px; border: 1px solid; border-color: #f6a300;"
            :src="selectedForbiddenFood.img"></ion-img>
          <ion-list>
            <ion-item-group>
              <ion-item-divider>
                <ion-label>Sintomi:</ion-label>
              </ion-item-divider>
              <ion-item v-for="element in selectedForbiddenFood.sintomi" id="general">
                <ion-label>
                  <ion-icon :icon="arrow" size="small"></ion-icon> {{ element }}
                </ion-label>
              </ion-item>
            </ion-item-group>
          </ion-list>
          <ion-list>
            <ion-row>
              <h3>Descrizione:</h3>
            </ion-row>
            <p>{{ selectedForbiddenFood.motivazione }}</p>
          </ion-list>
        </ion-content>
        <!-- <div class="block">
          <ion-grid>
            <ion-row>
              <ion-col>
                <h3 style="text-transform: capitalize">
                  {{ selectedForbiddenFood.denominazione }}
                </h3>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <p>{{ selectedForbiddenFood.motivazione }}</p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div> -->
      </ion-modal>
    </ion-content>
  </default-layout>
</template>

<script>
import {
  IonItem,
  IonList,
  IonSearchbar,
  IonModal,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonImg,
  IonRow,
  IonIcon,
  IonThumbnail,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { Api } from "../helpers/api";
import { returnDownForwardOutline } from "ionicons/icons"
export default defineComponent({
  data() {
    return {
      inputChars: "",
      selectedForbiddenFood: null,
      isOpenModal: false,
      arrow: returnDownForwardOutline,
    };
  },
  computed: {
    forbiddenFoodList() {
      return Api.getForbiddenFoods(this.$store.getters.getActivePet.type);
    },
    forbiddenFilteredFoodList() {
      if (!this.inputChars) {
        return this.forbiddenFoodList;
      } else {
        const chars = this.inputChars.toLowerCase();
        console.log(chars);
        return this.forbiddenFoodList.filter(function (el) {
          return el.denominazione.includes(chars);
        });
      }
    },
  },
  methods: {
    setSelectedForbiddenFood(food) {
      console.log(food);
      try {
        this.selectedForbiddenFood = food;
        this.openModal();
      } catch (err) {
        console.log(err);
      }
    },
    openModal() {
      this.isOpenModal = true;
    },
    closeModal() {
      console.log("close modal");
      this.isOpenModal = false;
    },
  },
  components: {
    IonSearchbar,
    IonList,
    IonItem,
    IonModal,
    IonButtons,
    IonButton,
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonImg,
    IonRow,
    IonThumbnail,
  },
});
</script>

<style>
p {
  text-align: justify;
  border-radius: 5px;
  border: 1px solid;
  padding: 10px;
  border-color: #f6a300;
}

h3 {
  text-decoration: underline;
  text-align: center;
}

.block {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-modal {
  --height: auto;
}

ion-item-divider {
  border: 1px solid;
  border-color: #f6a300;
  color: black;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}

ion-thumbnail {
  --size: 40px;
  --border-radius: 5px;
}
</style>

<style scoped>
ion-item {
  --padding-start: 0px;
}
</style>
