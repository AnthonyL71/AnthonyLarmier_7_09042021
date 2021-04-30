
<template>
  <div class="hello">
    <div id="app">
      <span v-if="httpGetStatus == 200">
        <div style="width: 250px;" class="p-4">
        <input type="submit" name="enregister" class="form-control quattrocento button btn btn-dark" value="Deconnection" @click="onDisconnect()"/> 
        </div>
        <div class="row">
          <div class="col-sm-4"></div>
            <div class="col-sm-4">
              
            <li v-for="item in httpgetResponse" :key="item.description">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ item.profil_id.firstname}}</h5>
                  <div class="card-text">
                    <img :src="item.media" />
                  </div>
                  <div class="card-text">
                    {{ item.description }}
                  </div>
                  <div class="card-text">
                    {{httpgetcommentaireResponse}}
                                <li v-for="itempost in httpgetcommentaireResponse" :key="itempost.id">
                                  <span v-if="itempost.post_id == item.id">
                    {{ httpgetcommentaireResponse }}
                                  </span>
                                  <span v-else>

                                  </span>
                                  </li>
                  </div>
                </div>    
              </div>
            </li>
            <div class="col-sm-4"></div>
          </div>
        </div>
      </span>
    <span v-else>
      <div class="container">
        <fieldset>
          <div class="text-center">
            <div class="form-group font-weight-bold card-header padding text-left">
              <input class="form-control email" type="text" placeholder="Adresse mail" v-model="email"/>
              <input class="form-control password" type="password" placeholder="Mot de passe" v-model="password"/>
                <p v-if="errors.length">
    <ul id="ulerror">
      <li id="lierror" v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
              <input type="submit" name="enregister" class="form-control button btn btn-dark btn-lg" value="Connexion" @click="checkForm()"/>
              <p class="inscription text-center"><router-link class="inscription text-center" to="/signup">Inscription</router-link></p>
            </div>
        </div>
      </fieldset>
    </div>
  {{ httpResponse }}
  {{ httpStatus }}
  
  </span>
</div>

  </div>
</template>




<script>

import { authHeader } from './authHeaders.js';


export default {
    name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      httpPostStatus: '',
      httpGetStatus: '',
      httpResponse: '',
      errors: [],
      httpToken: '',
      httpgetcommentaireResponse: '',
      httpgetResponse: ''
    }
  },
     created(){
    this.onTestGet()
    this.searchCommentaire()
 },
methods: {
  checkForm: function (e) {
      if (this.email && this.password) {
        this.onTestPost();
      }

      this.errors = [];

      if (!this.email) {
        this.errors.push('Adresse mail manquante');
      }
      if (!this.password) {
        this.errors.push('Mot de passe manquant');
      }

      e.preventDefault();
    },
    searchCommentaire() {
                for (let d = 0; d < this.httpgetResponse.length; d++) {
      this.onCommentairesGet(this.httpgetResponse[d].id);
      console.log(this.httpgetResponse[d].id);
                }
    },
      onTestGet() {
      // Données à poster
            const requestOptions = {
        headers: authHeader()
    };

      // Appel POST
      this.$http.get('http://localhost:3000/api/forum', requestOptions ).then(function(response) {
        // Comme c'est du Json: on le traduit
        this.httpGetStatus = response.status;
        return response.json();
      }).then(function(json) {
        // On lit le contenu du Json
        this.httpgetResponse = json;
      });
    },
          onCommentairesGet() {
      // Données à poster
            const requestOptions = {
        headers: authHeader()
    };

      // Appel POST
      this.$http.get('http://localhost:3000/api/forum/post/10', requestOptions ).then(function(response) {
        // Comme c'est du Json: on le traduit
        this.httpGetStatus = response.status;
        return response.json();
      }).then(function(json) {
        // On lit le contenu du Json
        this.httpgetcommentaireResponse = json;
        console.log('ahah');
        console.log(json);
      });
    },
    onTestPost() {
      var connect = { email:this.email, password:this.password };
      // Données à poster

      // Appel POST
      this.$http.post('http://localhost:3000/api/auth/login', connect ).then(function(response) {
        this.httpPostStatus = response.status;
        // Comme c'est du Json: on le traduit
        return response.json();
      }).then(function(json) {
        // On lit le contenu du Json
        this.httpResponse = json;
        this.httpToken = json.token;
                localStorage.setItem('user', JSON.stringify(json));
    this.onTestGet()
      });
    },
        onDisconnect() {
    localStorage.removeItem('user');
location.reload();
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#lierror {
  margin:5px;
  color:red;
}
li {
list-style-type: none!important;
}
.card-text img {
    max-width: 100%;
}
.card-text {
  margin: 15px;
}
.card {
  margin: 15px;
}
.container
{
position: alternative;
margin-top: 0px; 
width: 430px;
margin-right: auto;
margin-left: auto;
}
.email {
margin-top: 20px;
}
.password {
  margin: 25px 0 25px 0;
}
.button {
  margin-top: 20px;
  margin-bottom: 10px;
}
.inscription {
  margin-top: 15px;
  margin-bottom: 0px;
  color: black!important;
}
</style>
