<template>
  <div class="profile">
    <a><router-link class="text-center" to="/"><img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png"></router-link></a>
    <Profil msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Profil from '@/components/Profil.vue'

export default {
  name: 'profile',
  components: {
    Profil
  }
}
</script>
