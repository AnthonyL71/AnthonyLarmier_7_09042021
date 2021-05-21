
<template>
      <span v-if="httpGetStatus == 200">
        <div style="width: 250px;" class="p-4">
          <input type="submit" name="enregister" class="form-control button btn btn-dark" value="Deconnection" @click="onDisconnect()"/> 
        </div>
        <p><router-link class="text-center" to="/newpost">Nouveau poste</router-link></p>
        <p><router-link class="text-center" to="/profil">Edit profil</router-link></p>
        <div class="row">
          <div class="col-sm-4"></div>
            <div class="col-sm-4">
            <li v-for="item in httpgetResponse" :key="item.id">
              <div v-for="user in postListUsername" :key="user.id">
                <span v-if="user.id == item.profil_id">
                  {{ user.firstname }} {{ user.lastname }}
                  <span v-if="item.profil_id == profil_utilisateur"><b-icon-pencil-square class="pencil" scale="2" @click="editpost = item.id;"></b-icon-pencil-square><b-icon-trash-fill class="trash" scale="2" @click="onDeletedPost(item.id)"></b-icon-trash-fill></span>
                </span>
              </div>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"></h5>
                    <div class="card-text">
                      <img :src="item.media" />
                    </div>
                    <div class="card-text">
                      <span v-if="editpost == item.id"><textarea v-model="postedit" :placeholder="[[item.description]]"></textarea><br><input type="submit" name="enregister" class=" col-6 form-control button btn btn-dark btn-md" value="Envoyer" @click="editPost(item.id)"/></span><span v-else>
                      {{ item.description }}
                      </span>
                    </div>
                  <input type="submit" class="form-control button btn btn-dark" value="Commentaires" @click="onComments(item.id)"/>
                  <span v-if="Commentaire == item.id">
                    <div id="posts">
                      <div v-for="value in commentairesList" :key="value.id">
                        <span v-if="value.post_id == item.id">
                          <div class="card">
                          <div v-for="usert in commentairesListUsername" :key="usert.id">
                            <span v-if="usert.id == value.profil_id">
                              <div class="card-title">{{ usert.firstname }} {{ usert.lastname }} <span v-if="value.profil_id == profil_utilisateur"><b-icon-pencil-square class="pencil" scale="1.3" @click="editcommentaire = value.id;"></b-icon-pencil-square><b-icon-trash-fill class="trash" scale="1.3" @click="onDeletedCommentaires(value.id)"></b-icon-trash-fill></span></div>
                            </span>
                          </div>
                          <div class="card-text">
                            <span v-if="editcommentaire == value.id"><textarea v-model="commentairedit" :placeholder="[[value.comment_text]]"></textarea><br><input type="submit" name="enregister" class=" col-6 form-control button btn btn-dark btn-md" value="Envoyer" @click="editCommentaireFonction(value.id)"/></span><span v-else>

                            {{ value.comment_text }}
                            </span>
                          </div>
                          <span class="text-right">{{ value.comment_date }}</span>
                          </div>
                        </span>
                      </div>
                    <textarea v-model="commentaire" placeholder="Laisser un commentaire"></textarea>   
                    <input type="submit" name="enregister" class="form-control button btn btn-dark btn-lg" value="Envoyer" @click="sendCommentaire(item.id)"/>              
                    {{responseCommentaire}}
                    </div>
                  </span>
                </div>    
              </div>
            </li>
          </div>
        </div>
      </span>
      <span v-else>
      <div class="row">
          <div class="col-xs-12 col-sm-8 col-md-5 col-lg-4 col-xl-3 colonne-centree">
            <div class="container">
              <fieldset>
                <div class="text-center">
                  <div class="form-group font-weight-bold card-header">
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
          </div>
        </div>
  {{ httpResponse }}
  {{ httpStatus }}
  
  </span>
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
      postedit: '',
      commentairedit: '',
      commentairesList: '',
      commentairesListUsername: [],
      postListUsername: [],
      httpgetuserResponsed: '',
      httpgetResponse: '',
      profil_utilisateur: '',
      editpost: 0,
      editcommentaire: 0,
      responseCommentaire: '',
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
      if (this.Commentaire != 0 && key == this.Commentaire) {
        this.Commentaire = 0;
      } else {
        this.getCommentaire(key);
        this.functionSearchNamePost();
        this.Commentaire = key;
      }
    },
    onDeletedPost(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.delete('http://localhost:3000/api/forum/' + key + '', requestOptions ).then(function(response) {
        this.httpGetStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Post supprimé avec succès !');
        window.location="/";      
      });
    },
    onDeletedCommentaires(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.delete('http://localhost:3000/api/forum/post/' + key + '', requestOptions ).then(function(response) {
        this.httpGetStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Commentaire supprimé avec succès !');
        window.location="/"; 
      });
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
        let user = JSON.parse(localStorage.getItem('user'));
          if (user && user.token) {
              this.profil_utilisateur = user.profil_id;
          }
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
    sendCommentaire(key) {
      let datecommentaire = new Date();
            const requestOptions = {
        headers: authHeader()
      };
      var connect = { comment_text:this.commentaire, post_id:key, date: datecommentaire, profil_id: this.profil_id  };
      this.$http.post('http://localhost:3000/api/forum/post', connect, requestOptions ).then(function(response) {
        this.httpPostStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Commentaire envoyé, en attente de validation par un administrateur');
        window.location="/";
      });
    },
      editPost(key) {
        const requestOptions = {
          headers: authHeader()
        };
      var connect = { description:this.postedit, profil_id: this.profil_id  };
      this.$http.put('http://localhost:3000/api/forum/' + key + '', connect, requestOptions ).then(function(response) {
        this.httpPostStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Post édité, en attente de validation par un administrateur');
        window.location="/";
      });
    },
      editCommentaireFonction(key) {
        const requestOptions = {
          headers: authHeader()
        };
      var connect = { comment_text:this.commentairedit, profil_id: this.profil_id  };
      this.$http.put('http://localhost:3000/api/forum/post/' + key + '', connect, requestOptions ).then(function(response) {
        this.httpPostStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Commentaire édité, en attente de validation par un administrateur');
        window.location="/";
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
        this.profil_id = json.profil_id;
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
<style>
.colonne-centree
{
float: none;
margin: 0 auto;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#lierror {
  margin:5px;
  color:red;
}
li {
list-style-type: none!important;
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
margin-right: auto;
margin-left: auto;
}
.email {
margin-top: 20px;
}
.trash {
  color: red;
  position: absolute;
  right: 8%;
}
.pencil {
  position:absolute;
  right: 15%;
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
