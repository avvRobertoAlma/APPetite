<template>
    <ion-list>
        <ion-item v-for="pet in pets" :key="pet.name">{{ pet.name }}</ion-item>
    </ion-list>

</template>

<script>
import {
    IonList,
    IonItem
} from "@ionic/vue"
export default {
    props:['pets'],
    components:{
        IonItem,
        IonList
    }
}
</script>