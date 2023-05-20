<template>
    <menu-layout pageTitle="Home" v-if="!loading">
        <IonImg src="logo.png" />
    </menu-layout>
</template>

<script>
import { IonImg, menuController } from '@ionic/vue'
export default {
    components: {
        IonImg, menuController
    },
    async ionViewWillEnter() {
        this.loading=true
        await menuController.close('main-menu')
        this.loading=false
    },
    data(){
        return {
            loading: false
        }
    }
}
</script>

<style>
ion-img {
    width: 75%;
    margin: auto;
}
</style>