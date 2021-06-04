
<template>
  <div class="profile">
    <div id="app">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-5 col-lg-4 col-xl-3 colonne-centree">
          <div class="container">
            <fieldset>
              <div class="text-center">
                <div class="form-group font-weight-bold card-header padding text-left">
                  <h1 class="text-center">Profil</h1>
                  <div v-for="user in userList" :key="user.id">
                    <span v-if="user.id == profil_utilisateur">
                      <h3 class="pt-4">Prénom: {{user.firstname}}</h3>
                      <h3>Nom: {{user.lastname}}</h3>
                      <span v-if="user.media != null">
                        <img alt="image" :src="user.avatar" />
                      </span>
                      <p v-if="errors.length">
                        <ul id="ulerror">
                          <li id="lierror" v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                      </p>
                      <input type="submit" name="enregister" class="form-control button btn btn-danger btn-lg" value="Supprimer mon compte" @click="deletedUser(user.id)"/>
                      <p class="text-center"><router-link class="form-control text-center button btn btn-secondary btn-lg" to="/">Retour</router-link></p>
                        {{ error }}
                    </span>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { authHeader } from './authHeaders.js';


export default {
    name: 'profile',
    props: {
        msg: String
    },
    data() {
        return {
        httpPostStatus: '',
        error: '',
        httpGetStatus: '',
        userList: [],
        errors: [],
        profil_utilisateur: '',
        httpResponse: '',
        httpToken: '',
        httpgetResponse: ''
        }
    },
      computed: {
        computedWidth: function () {
        return this.backgroundcolor;
        }
  },
    created(){
    this.searchName()
  }, 
    methods: {
    // Function for delete user to bdd
    deletedUser(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.delete('http://localhost:3000/api/auth/delete/' + key + '', requestOptions ).then(function(response) {
        this.httpGetStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Compte supprimé !');
        localStorage.removeItem('user');
        window.location="/";
      });
    },
    // Function for search name to bdd
    searchName() {
        let user = JSON.parse(localStorage.getItem('user'));
          if (user && user.token) {
            this.profil_utilisateur = user.userId;
          }
        const requestOptions = {
            headers: authHeader()
        };
      this.$http.get('http://localhost:3000/api/auth/user/', requestOptions ).then(function(response) {
          return response.json();
        }).then(function(json) {
            this.userList = json;  
        });
    },
}
}

</script>
<style scoped>
#lierror {
  margin:5px;
  color:red;
}
.form-group img {
  margin-top: 20px;
  max-width: 100%;
}
li {
  list-style-type: none!important;
}
.container {
  position: alternative;
  margin-top: 0px; 
  margin-right: auto;
  margin-left: auto;
}
.espace {
  margin-top: 20px;
}
.password {
  margin: 25px 0 25px 0;
}
.button {
  margin-top: 20px;
  margin-bottom: 10px;
}
.retour {
  margin-top: 15px;
  margin-bottom: 0px;
  color: black!important;
}
</style>
