<template>
  <div class="home">
    <a><router-link class="text-center" to="/"><img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png"></router-link></a>
    <Index msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Index from '@/components/Index.vue'

export default {
  name: 'Home',
  components: {
    Index
  }
}
</script>

<style>
#logo {
    max-width: 250px;
    max-height: 100%;
}
</style>