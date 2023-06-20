<template>
    <ion-list>
        <ion-item v-for="pet in pets" :key="pet.name">
            {{ pet.name }}
            <ion-button fill="outline" style="--border-width: 0px;" @click="removePet(pet)" slot="end">
                <ion-icon size="small" slot="icon-only" :icon="trashOutline" id="remove"></ion-icon>
            </ion-button>
        </ion-item>
    </ion-list>
</template>

<script>
import {
    IonList,
    IonItem,
    IonIcon,
    IonButton,
} from "@ionic/vue";
import {
    trashOutline
} from "ionicons/icons";
export default {
    props: ['pets'],
    components: {
        IonItem,
        IonList,
        IonButton,
    },
    data() {
        return {
            trashOutline: trashOutline,
        };
    },
    methods: {
        removePet(pet) {
            console.log("remove " + pet.name)
            this.$store.commit('REMOVE_PET', pet)
            if (this.$store.getters.getPets.length == 1) {
                console.log("setting active pet")
                this.$store.dispatch('SET_ACTIVE_PET', 0)
                this.$emit("updateToolbar")
            }
            if (this.$store.getters.getPets.length == 0) {
                console.log("no animals")
                this.$router.replace('/add-pet')
            }
            else { this.$router.replace('/pets/list') }
        }
    }
}
</script>

<style>
#remove {
    color: red;
}
</style>