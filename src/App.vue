<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  mounted() {
    console.log('mounted')
    this.$store.dispatch('INIT_STORE')
    this.$router.replace('/home')
  },
  components: { IonApp, IonRouterOutlet }
})
</script>
