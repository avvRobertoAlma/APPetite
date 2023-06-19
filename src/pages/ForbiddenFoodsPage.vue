<template>
  <default-layout pageTitle="Cibi vietati" pageDefaultBackLink="/home">
    <!-- Display a search bar -->
    <ion-searchbar placeholder="Filtra..." v-model="inputChars"></ion-searchbar>

    <!-- Display all forbidden foods with filtering -->
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item
          expand="block"
          style="text-transform: capitalize"
          v-for="food in forbiddenFilteredFoodList"
          @click="setSelectedForbiddenFood(food)"
          >{{ food.denominazione }}</ion-item
        >
      </ion-list>
      <!-- Display the modal with more information -->
      <ion-modal
        :isOpen="isOpenModal"
        @ionModalDidDismiss="closeModal"
        :initial-breakpoint="1"
        :breakpoints="[0, 1]"
      >
        <div class="block">
          <ion-grid>
            <ion-row>
              <ion-col>
                <h3 style="text-transform: capitalize">
                  {{ selectedForbiddenFood.denominazione }}
                </h3>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col
                ><p>{{ selectedForbiddenFood.motivazione }}</p></ion-col
              >
            </ion-row>
          </ion-grid>
        </div>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { Api } from "../helpers/api";
export default defineComponent({
  data() {
    return {
      inputChars: "",
      selectedForbiddenFood: null,
      isOpenModal: false,
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
        const chars = this.inputChars;
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
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

ion-modal {
  --height: auto;
}
</style>
