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
        <ion-item>
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
            petName: null,
            petType: null,
            petRace: null,
            weight: null,
            years: null,
            // months: null,
            sex: null,
            sterilized: null,
            physicalForm: null,
            physicalActivity: null
        }
    },
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
                physicalForm: this.physicalForm,
                physicalActivity: this.physicalActivity
            }
            this.$emit('save-pet', pet)
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