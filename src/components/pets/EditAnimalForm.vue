<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-input type="text" label="Nome" label-placement="floating" v-model="petName" required />
      </ion-item>
      <ion-item>
        <ion-select style="color: #000 !important" v-model="petType" interface="popover" label="Specie" required>
          <ion-select-option v-for="type in petTypes" :value="type">
            {{ type }}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item v-if="petRaces">
        <ion-select interface="popover" label="Razza" required v-model="petRace" id="select">
          <ion-select-option v-for="race in petRaces">{{ race
          }}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-input type="number" required label="Peso (kg)" label-placement="floating" v-model="weight" />
      </ion-item>
      <ion-item>
        <ion-input type="number" required label="Anni" label-placement="floating" v-model="years" />
      </ion-item>
      <!-- <ion-item>
                <ion-input type="number" required label="Mesi" label-placement="floating" v-model="months" />
            </ion-item> -->
    </ion-list>
    <ion-item>
      <ion-select v-model="sex" interface="popover" label="Sesso" required id="select">
        <ion-select-option value="Maschio">Maschio</ion-select-option>
        <ion-select-option value="Femmina">Femmina</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-select v-model="sterilized" interface="popover" label="Sterilizzato?" required id="select">
        <ion-select-option value="Sì">Sì</ion-select-option>
        <ion-select-option value="No">No</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item v-if="petType != 'tartaruga'">
      <ion-select v-model="physicalForm" interface="popover" label="Forma fisica" required id="select">
        <ion-select-option value="Sovrappeso">Sovrappeso</ion-select-option>
        <ion-select-option value="Normale">Normale</ion-select-option>
        <ion-select-option value="Sottopeso">Sottopeso</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-select v-model="physicalActivity" interface="popover" label="Attività fisica" required id="select">
        <ion-select-option value="Nessuna">Nessuna</ion-select-option>
        <ion-select-option value="Saltuaria">Saltuaria</ion-select-option>
        <ion-select-option value="Frequente">Frequente</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-button type="submit" color="success" expand="block">Salva</ion-button>
  </form>
</template>

<script>
import { IonItem, IonList, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Api } from '../../helpers/api.js'
export default defineComponent({
  emits: ["save-pet"],
  data() {
    return {
      oldPetName: this.editablePet.name,
      petName: this.editablePet.name,
      petType: this.editablePet.type,
      petRace: this.editablePet.race,
      weight: this.editablePet.weight,
      years: this.editablePet.years,
      sex: this.editablePet.sex,
      sterilized: this.editablePet.sterilized,
      physicalForm: this.editablePet.physicalForm,
      physicalActivity: this.editablePet.physicalActivity,
    }
  },
  props: ['editablePet'],
  methods: {
    submitForm() {
      const pet = {
        name: this.petName,
        type: this.petType,
        race: this.petRace,
        weight: this.weight,
        years: this.years,
        // months: this.months,
        sex: this.sex,
        sterilized: this.sterilized,
        physicalForm: (this.physicalForm) ? this.physicalForm : undefined,
        physicalActivity: this.physicalActivity
      }
      const form = {
        pet: pet,
        oldPetName: this.oldPetName
      }
      this.$emit('edit-pet', form)
      this.$emit("updateToolbar")
    }
  },
  computed: {
    petTypes() {
      return Api.getPetTypes()
    },
    petRaces() {
      if (this.petType) {
        return Api.getPetRaces(this.petType)
      } else {
        return null
      }
    }
  },
  components: {
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption
  }
})

</script>

<style>
#select {
  color: #000 !important;
}
</style>