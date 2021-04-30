<template>
  <div class="signup">
    <a><router-link class="inscription text-center" to="/"><img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png"></router-link></a>
    <registerSignup msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import registerSignup from '@/components/Signup.vue'

export default {
  name: 'signup',
  components: {
    registerSignup
  }
}
</script>
