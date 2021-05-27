<template>
  <div class="profile">
    <a><router-link class="text-center" to="/"><img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png"></router-link></a>
    <Listusers msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Listusers from '@/components/Listusers.vue'

export default {
  name: 'Listuser',
  components: {
    Listusers
  }
}
</script>
<style>
#logo {
    max-width: 250px;
    max-height: 100%;
}
</style>