<template>
    <menu-layout pageTitle="Home">
        <IonImg src="logo.png" />
    </menu-layout>
</template>

<script>
import { IonImg } from '@ionic/vue'
export default {
    components: {
        IonImg
    },
    ionViewWillEnter() {
        console.log('Home page will enter');
    }
}
</script>

<style>
ion-img {
    width: 75%;
    margin: auto;
}
</style>