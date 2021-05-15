<template>
  <div class="newposte">
    <a><router-link class="text-center" to="/"><img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png"></router-link></a>
    <newpost msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import newpost from '@/components/Newpost.vue'

export default {
  name: 'newposte',
  components: {
    newpost
  }
}
</script>
