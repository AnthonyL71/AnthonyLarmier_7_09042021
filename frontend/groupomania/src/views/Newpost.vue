<template>
  <div class="newposte">
    <a><router-link class="text-center" to="/"><img id="logo" alt="Vue logo" src="../assets/icon-left-font-monochrome-black.png"></router-link></a>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <p><router-link class="text-center button mx-1 btn btn-success" to="/newpost">Nouveau poste</router-link></p>
      </li>
      <li class="nav-item">
        <p><router-link class="text-center button mx-1 btn btn-info" to="/profil">Edit profil</router-link></p>
      </li>
      <li class="nav-item">
        <input class="text-center button btn mx-1 btn-secondary" value="Deconnection" @click="onDisconnect()"/>
      </li>
    </ul>
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
  },
  methods: {
    // Function for disconnect
    onDisconnect() {
      this.profil_user_or_admin = '';
      localStorage.removeItem('user');
      window.location="/";      
    }
  }
}
</script>
<style>
#logo {
    max-width: 250px;
    max-height: 100%;
}
</style>