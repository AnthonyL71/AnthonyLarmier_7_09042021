
<template>
  <div class="index">
    <div id="app">
      <span v-if="httpGetStatus == 200">
        <div style="width: 250px;" class="p-4">
          <input type="submit" name="enregister" class="form-control button btn btn-dark" value="Deconnection" @click="onDisconnect()"/> 
        </div>
        <div class="row">
          <div class="col-sm-4"></div>
            <div class="col-sm-4">
            <li v-for="item in httpgetResponse" :key="item.id">
              <div v-for="user in postListUsername" :key="user.id">
                <span v-if="user.id == item.profil_id">
                  {{ user.firstname }} {{ user.lastname }}
                </span>
              </div>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"></h5>
                    <div class="card-text">
                      <img :src="item.media" />
                    </div>
                    <div class="card-text">
                      {{ item.description }}
                    </div>
                  <input type="submit" class="form-control button btn btn-dark" value="Commentaires" @click="onComments(item.id)"/>
                  <div v-for="value in commentairesList" :key="value.id">
                    <span v-if="value.post_id == item.id">
                      <div class="card">
                      <div v-for="usert in commentairesListUsername" :key="usert.id">
                        <span v-if="usert.id == value.profil_id">
                          <div class="card-title">{{ usert.firstname }} {{ usert.lastname }}</div>
                        </span>
                      </div>
                      <div class="card-text">
                        {{ value.comment_text }}
                      </div>
                      </div>
                    </span>
                  </div>
                </div>    
              </div>
            </li>
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
  name: 'Index',
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
      qqt: '',
      Commentaire: 0,
      commentairesList: '',
      commentairesListUsername: [],
      postListUsername: [],
      httpgetuserResponsed: '',
      httpgetResponse: ''
    }
  },
  created(){
    this.onTestGet()
  }, 

  methods: {
    checkForm: function (e) {
      if (this.email && this.password) {
        this.loginPost();
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
        this.getCommentaire(this.httpgetResponse[d].id);
      }
    },
    functionSearchName() {
      this.commentairesListUsername = [];
      for (let d = 0; d < this.commentairesList.length; d++) {
        this.searchNameId(this.commentairesList[d].profil_id);
      }
    },
    functionSearchNamePost() {
      for (let d = 0; d < this.httpgetResponse.length; d++) {
        if (this.postListUsername.length == 0) {
          this.searchNamePost(this.httpgetResponse[d].profil_id);
        }
      }
    },
    onComments(key) {
      this.getCommentaire(key);
      this.functionSearchName();
      this.functionSearchNamePost();
      this.Commentaire = 1;
    },

    onTestGet() {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/forum', requestOptions ).then(function(response) {
        this.httpGetStatus = response.status;
        return response.json();
      }).then(function(json) {
        this.httpgetResponse = json;
        this.functionSearchNamePost();
        this.qqt = json.length;
      });
    },

    searchNameId(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/auth/user/' + key + '', requestOptions ).then(function(response) {
          return response.json();
      }).then(function(json) {
        this.commentairesListUsername.push(json);  

      });
    },

    searchNamePost(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/auth/user/' + key + '', requestOptions ).then(function(response) {
        return response.json();
      }).then(function(json) {
        this.postListUsername.push(json);  
      });
    },

    getCommentaire(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/forum/post/' + key + '', requestOptions ).then(function(response) {
        return response.json();
      }).then(function(json) {
        this.commentairesList = json;  
        this.functionSearchName();
      });
    },

    loginPost() {
      var connect = { email:this.email, password:this.password };
      this.$http.post('http://localhost:3000/api/auth/login', connect ).then(function(response) {
        this.httpPostStatus = response.status;
        return response.json();
      }).then(function(json) {
        this.httpResponse = json;
        this.httpToken = json.token;
        localStorage.setItem('user', JSON.stringify(json));
        window.location="/";
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
