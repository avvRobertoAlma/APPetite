<template>
    <ion-list>
        <ion-item v-for="pet in pets" :key="pet.name">
            {{ pet.name }}
            <ion-button fill="outline" style="--border-width: 0px;" @click="edit(pet)">
                <ion-icon size="small" slot="icon-only" :icon="pencil"></ion-icon>
            </ion-button>
            <ion-button fill="outline" style="--border-width: 0px;" @click="presentAlertConfirm(pet)" slot="end">
                <ion-icon size="small" slot="icon-only" :icon="trashOutline" id="remove"></ion-icon>
            </ion-button>
            <!-- <ion-alert
                trigger="present-alert"
                header="Attenzione!"
                message="Vuoi cancellare l'animale?"
                :buttons="alertButtons"
                @didDismiss="setResult(roleMessage, pet)"
            ></ion-alert> -->
        </ion-item>
    </ion-list>
</template>

<script>
import {
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    IonAlert,
    alertController,
} from "@ionic/vue";
import {
    trashOutline, pencil
} from "ionicons/icons";
export default {
    props: ['pets'],
    components: {
        IonItem,
        IonList,
        IonButton,
        IonAlert,
    },
    data() {
        return {
            trashOutline: trashOutline,
            pencil:pencil

        };
    },
    methods: {
      presentAlertConfirm(pet) {
      return alertController
        .create({
          header: 'Attenzione!',
          message: "Vuoi cancellare l'animale?",
          buttons: [
            {
              text: 'Indietro',
              role: 'cancel',
            },
            {
              text: 'OK',
              handler: () => {
                this.removePet(pet)
              },
            },
          ],
        })
        .then(alert => alert.present())
    },

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
        },
        edit(pet){
        this.$router.replace(`/edit-pet/${pet.name}`)
    }
    },
    

}
</script>

<style>
#remove {
    color: red;
}
</style>