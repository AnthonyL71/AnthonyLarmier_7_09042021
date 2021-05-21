
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
                  <h3 class="pt-4">Prénom: {{userList.firstname}}</h3>
                  <h3>Nom: {{userList.lastname}}</h3>
                  <img :src="userList.avatar" />
                  <p v-if="errors.length">
                    <ul id="ulerror">
                      <li id="lierror" v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                  </p>
                  <input type="submit" name="enregister" class="form-control button btn btn-danger btn-lg" value="Supprimer mon compte" @click="deletedUser(userList.id)"/>
                  <p class="retour text-center"><router-link class="retour text-center" to="/">Retour</router-link></p>
                  {{ error }}
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
    searchName() {
        let user = JSON.parse(localStorage.getItem('user'));
          if (user && user.token) {
            this.profil_utilisateur = user.profil_id;
          }
        const requestOptions = {
            headers: authHeader()
        };
        this.$http.get('http://localhost:3000/api/auth/user/' + this.profil_utilisateur + '', requestOptions ).then(function(response) {
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

li {
list-style-type: none!important;
}
.container
{
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
