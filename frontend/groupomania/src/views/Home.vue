<template>
  <div class="home">
    <img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png">
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
