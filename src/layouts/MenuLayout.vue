<template>
  <ion-page>
    <ion-menu menu-id="main-menu" content-id="main-content" ref="menu">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
        <ion-list>
          <ion-item lines="full" router-link="/nutriscore" style="cursor: pointer">
            <ion-icon src="../../scan-barcode.svg" slot="start"></ion-icon><ion-label>Scanner
              qualità</ion-label></ion-item>
          <ion-item lines="full" router-link="/create-dish" style="cursor: pointer"><ion-icon src="../../dose-dish.svg"
              slot="start"></ion-icon><ion-label>Dosa il cibo</ion-label></ion-item>
          <ion-item lines="full" router-link="/forbidden-foods" style="cursor: pointer">
            <ion-icon src="../../pizza-not-outline.svg" slot="start"></ion-icon><ion-label>Cibi
              vietati</ion-label></ion-item>
          <ion-item lines="full" router-link="/pets/list" style="cursor: pointer"><ion-icon src="../../cil-dog.svg"
              slot="start"></ion-icon><ion-label>I miei
              pets</ion-label></ion-item>
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
            <ion-list lines="full">
              <ion-list-header>
                L'app rappresenta un prototipo che non esaurisce le funzionalità pensate per lo sviluppo finale. Maggiori
                informazioni sono contenute nello studio di fattibilità.
              </ion-list-header>
              <ion-item>
                <ion-label class="ion-text-wrap">
                  <h3 style="font-weight: bold;">Scanner qualità</h3>
                  <p>Scansiona il barcode ed ottieni un indice di qualità del prodotto, con ingredienti e
                    valori nutrizionali.</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label class="ion-text-wrap">
                  <h3 style="font-weight: bold;">Dosa il cibo</h3>
                  <p>Scegli gli ingredienti per il tuo pet e combinali nelle dosi indicate per un piatto
                    equilibrato.</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label class="ion-text-wrap">
                  <h3 style="font-weight: bold;">Cibi vietati</h3>
                  <p>Sonsulta l'elenco dei cibi che possono danneggiare il tuo pet.</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label class="ion-text-wrap">
                  <h3 style="font-weight: bold;">I tuoi pets</h3>
                  <p>Aggiungi, modifica e rimuovi i tuoi pet per l'uso nell'app.</p>
                </ion-label>
              </ion-item>
            </ion-list>
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
  IonListHeader,
} from "@ionic/vue";
import { scanCircleOutline } from "ionicons/icons"

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
    IonListHeader,
  },
  data() {
    return {
      petName: this.$store.getters.getActivePet
        ? this.$store.getters.getActivePet.name
        : null,
      isOpen: false,
      scanCircleOutline: scanCircleOutline,
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

<style scoped>
ion-label::h2 {
  font-weight: bold;
}
</style>