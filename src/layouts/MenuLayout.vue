<template>
  <ion-page>
    <ion-menu menu-id="main-menu" content-id="main-content" ref="menu">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
        <ion-list>
          <ion-item router-link="/nutriscore" style="cursor: pointer">Scanner qualità</ion-item>
          <ion-item router-link="/create-dish" style="cursor: pointer">Dosa il cibo</ion-item>
          <ion-item router-link="/forbidden-foods" style="cursor: pointer">Cibi vietati</ion-item>
          <ion-item router-link="/pets/list" style="cursor: pointer">I miei pets</ion-item>
        </ion-list>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
          <ion-fab-button size="small" color="success" expand="block" @click="setOpen(true)">
            <!-- <ion-icon :icon="helpCircle"></ion-icon> -->
            <span style="font-size: 20px;">?</span>
          </ion-fab-button>
        </ion-fab>
        <ion-modal style="--height:100%;" :isOpen="isOpen">
          <ion-header>
            <ion-toolbar>
              <ion-title>Informazioni sull'app</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="setOpen(false)">CHIUDI</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <p>
              L'app rappresenta un prototipo che non esaurisce le funzionalità pensate per lo sviluppo finale. Maggiori
              informazioni sono contenute nello studio di fattibilità.
            </p>
          </ion-content>
        </ion-modal>

      </ion-content>
    </ion-menu>
    <div class="ion-page" id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ pageTitle }}</ion-title>
          <ion-select v-if="$store.getters.getPets.length" v-model="petName" aria-label="Pets" interface="popover" :value="$store.getters.getActivePet ? $store.getters.getActivePet.name : undefined
            " slot="end">
            <ion-select-option :value="pet.name" v-for="pet in $store.getters.getPets">{{
              pet.name
            }}</ion-select-option>
          </ion-select>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <slot />
      </ion-content>
    </div>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
  IonMenu,
  IonMenuButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonLabel,
  IonInput,
} from "@ionic/vue";

export default {
  props: ["pageTitle"],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
    IonMenu,
    IonMenuButton,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonLabel,
    IonInput,
  },
  data() {
    return {
      petName: this.$store.getters.getActivePet
        ? this.$store.getters.getActivePet.name
        : null,
      isOpen: false,
    };
  },
  watch: {
    petName() {
      this.$store.dispatch("SET_ACTIVE_PET_BY_NAME", this.petName);
    },
  },
  ionViewWillEnter() {
    console.log(this.$refs.menu.isOpen());
  },
  methods: {
    setOpen(isOpen) {
      this.isOpen = isOpen;
    },
  }
};
</script>

<style>
ion-toolbar {
  color: #fff;
}

ion-list {
  background-color: white !important;
}

ion-item,
ion-select-popover {
  color: #fff;
  --ion-background-color: white;
  --highlight-color-focused: #a00007;
  --background-focused: var(--highlight-color-focused);
}

ion-radio-popover {
  color: #a00007;
  --ion-background-color: #f6a300;
}

ion-focused {
  color: #a00007;
  /* --ion-background-color: #F68300; */
}

ion-header {
  --ion-background-color: #f6a300;
}

ion-select {
  color: #fff;
  --placeholder-color: #a00007;
  --highlight-color-focused: #a00007;
  margin-right: 5px;
}

ion-select::part(icon) {
  color: #a00007;
  opacity: 1;
}

ion-select::part(text) {
  flex: 0 0 auto;
}
</style>
