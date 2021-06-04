
<template>
  <span v-if="this.profil_user_or_admin === 1">   <!-- Partie Administrateur -->
    <ul class="nav justify-content-center">
        <li class="nav-item">
            <p><router-link class="text-center button mx-1 btn btn-primary" to="/validpost">Posts </router-link></p>
        </li>
        <li class="nav-item">
            <p><router-link class="text-center button mx-1 btn btn-warning" to="/validcomments">Commentaires </router-link></p>
        </li>
        <li class="nav-item">
            <p><router-link class="text-center button mx-1 btn btn-info" to="/listusers">Liste d'utilisateurs</router-link></p>
        </li>
        <li class="nav-item">
            <input class="text-center button btn mx-1 btn-secondary" value="Deconnection" @click="onDisconnect()"/>
        </li>
    </ul>
  </span>
  <span v-else-if="this.profil_user_or_admin === 0">   <!-- Partie Utilisateur -->
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
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-4 colonne-centree">
            <li v-for="item in httpgetResponse" :key="item.id">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                                  <div v-for="user in postListUsername" :key="user.id">
                <span v-if="user.id == item.profil_id">
                  {{ user.firstname }} {{ user.lastname }}
                  <span v-if="item.profil_id == profil_utilisateur">
                      <b-icon-pencil-square class="pencil" scale="2" @click="editpost = item.id;"></b-icon-pencil-square>
                      <b-icon-trash-fill class="trash" scale="2" @click="onDeletedPost(item.id)"></b-icon-trash-fill>
                  </span>
                </span>
              </div>
                  </h5>
                    <div class="card-text">
                      <span v-if="item.media != null">
                        <img alt="image" :src="item.media" />
                      </span>
                    </div>
                    <div class="card-text">
                      <span v-if="editpost == item.id"><textarea v-model="postedit" :placeholder="[[item.description]]"></textarea><br><input type="submit" name="enregister" class=" col-6 form-control button btn btn-success btn-md" value="Envoyer" @click="editPost(item.id)"/></span><span v-else>
                      {{ item.description }}
                      </span>
                    </div>
                  <input type="submit" class="form-control button btn btn-dark" value="Commentaires" @click="onComments(item.id)"/>
                  <span v-if="Commentaire == item.id">
                    <div id="posts">
                      <div v-for="value in commentairesList" :key="value.id">
                        <span v-if="value.post_id == item.id">
                          <div class="card">
                          <div v-for="usert in postListUsername" :key="usert.id">
                            <span v-if="usert.id == value.profil_id">
                              <div class="card-title">{{ usert.firstname }} {{ usert.lastname }} <span v-if="value.profil_id == profil_utilisateur"><b-icon-pencil-square class="pencil" scale="1.3" @click="editcommentaire = value.id;"></b-icon-pencil-square><b-icon-trash-fill class="trash" scale="1.3" @click="onDeletedCommentaires(value.id)"></b-icon-trash-fill></span></div>
                            </span>
                          </div>
                          <div class="card-text">
                            <span v-if="editcommentaire == value.id"><textarea v-model="commentairedit" :placeholder="[[value.comment_text]]"></textarea><br><input type="submit" name="enregister" class=" col-6 form-control button btn btn-success btn-md" value="Envoyer" @click="editCommentaireFonction(value.id)"/></span><span v-else>

                            {{ value.comment_text }}
                            </span>
                          </div>
                          <span class="text-right">{{ value.comment_date }}</span>
                          </div>
                        </span>
                      </div>
                    <textarea v-model="commentaire" placeholder="Laisser un commentaire"></textarea>   
                    <input type="submit" name="enregister" class="form-control button btn btn-success btn-lg" value="Envoyer" @click="sendCommentaire(item.id)"/>              
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
                    <input type="submit" class="form-control button btn btn-dark btn-lg" value="Connexion" @click="checkForm()"/>
                    <p class="inscription text-center"><router-link class="inscription text-center" to="/signup">Inscription</router-link></p>
                    {{error}}
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
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
      httpgetResponsePost: '',
      httpgetResponseComments: '',
      profil_utilisateur: '',
      profil_user_or_admin: '',
      editpost: 0,
      editcommentaire: 0,
      responseCommentaire: '',
    }
  },
  created(){
    this.onTestGet(),
    this.onTestGetComments(),
    this.onTestGetPost()
  }, 

  methods: {
    // Function for check validate form
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
    // Function for search commentaire in bdd
    searchCommentaire() {
      for (let d = 0; d < this.httpgetResponse.length; d++) {
        this.getCommentaire(this.httpgetResponse[d].id);
      }
    },
    functionSearchNamePost() {
        this.searchNamePost();
      
    },
    // For admin, check post not validate
    onTestGetPost() {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/forum/postnotvalid', requestOptions ).then(function(response) {
        return response.json();
      }).then(function(json) {
        this.httpgetResponsePost = json;
        this.functionSearchNamePost();
        this.qqt = json.length;
        let user = JSON.parse(localStorage.getItem('user'));
          if (user && user.token) {
              this.profil_utilisateur = user.userId;
              this.profil_user_or_admin = user.profile;
          }
      });
    },
    // For admin, check comments not validate
    onTestGetComments() {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/forum/post/commentsnotvalid', requestOptions ).then(function(response) {
        return response.json();
      }).then(function(json) {
        this.httpgetResponseComments = json;
        this.functionSearchNamePost();
        this.qqt = json.length;
        let user = JSON.parse(localStorage.getItem('user'));
          if (user && user.token) {
              this.profil_utilisateur = user.userId;
              this.profil_user_or_admin = user.profile;
          }
      });
    },
    // Function for menu comments
    onComments(key) {
      if (this.Commentaire != 0 && key == this.Commentaire) {
        this.Commentaire = 0;
      } else {
        this.getCommentaire(key);
        this.Commentaire = key;
      }
    },
    // Function for deleted post on bdd
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
    // Function for deleted comments in bdd
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
    // Function for download post to bdd
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
            this.profil_utilisateur = user.userId;
            this.profil_user_or_admin = user.profile;
          }
      });
    },
    // Function for search name to bdd
    searchNamePost() {
      let list;
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/auth/user/', requestOptions ).then(function(response) {
        return response.json();
      }).then(function(json) {
        for (let d = 0; d < json.length; d++) {
          list = {
            id: json[d].id,
            firstname: json[d].firstname,
            lastname: json[d].lastname,
            avatar: json[d].avatar,
            email: json[d].email,
            admin: json[d].admin
          };
          this.postListUsername.push(list);  
        }   
      });
    },
    // Search informations to comments
    getCommentaire(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/forum/post/' + key + '', requestOptions ).then(function(response) {
        return response.json();
      }).then(function(json) {
        this.commentairesList = json;  
      });
    },
    // Function for create new comments
    sendCommentaire(key) {
      let datecommentaire = new Date();
      const requestOptions = {
        headers: authHeader()
      };
      var connect = { comment_text:this.commentaire, post_id:key, date: datecommentaire  };
      this.$http.post('http://localhost:3000/api/forum/post', connect, requestOptions ).then(function(response) {
        this.httpPostStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Commentaire envoyé !');
        window.location="/";
      });
    },
    // Function for edit post 
    editPost(key) {
        const requestOptions = {
          headers: authHeader()
        };
      var connect = { description:this.postedit  };
      this.$http.put('http://localhost:3000/api/forum/' + key + '', connect, requestOptions ).then(function(response) {
        this.httpPostStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Post édité !');
        window.location="/";
      });
    },
    // Function for edit comments
    editCommentaireFonction(key) {
        const requestOptions = {
          headers: authHeader()
        };
      var connect = { comment_text:this.commentairedit  };
      this.$http.put('http://localhost:3000/api/forum/post/' + key + '', connect, requestOptions ).then(function(response) {
        this.httpPostStatus = response.status;
        return response.json();
      }).then(function() {
        alert('Commentaire édité !');
        window.location="/";
      });
    },
    // Function for login user or admin
    loginPost() {
      var connect = { email:this.email, password:this.password };
      this.$http.post('http://localhost:3000/api/auth/login', connect ).then(function(response) {
        this.httpPostStatus = response.status;
        return response.json();
      }).then(function(json) {
        this.httpResponse = json;
        this.httpToken = json.token;
        localStorage.setItem('user', JSON.stringify(json));
        this.profil_id = json.userId;
        this.profil_user_or_admin = json.profile;
        window.location="/";
      })
      .catch(function(error) {
        this.errors.push(error.body.error);
      });
    },
    // Function for disconnect
    onDisconnect() {
      this.profil_user_or_admin = '';
      localStorage.removeItem('user');
      location.reload();
    }
  }
}


</script>
<style>
.nav {
  margin-top: -50px;
  margin-bottom: 40px;
}
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
.card-text img {
  max-width: 100%;
}
.card-text {
  margin: 15px;
}
.card {
  margin: 15px;
}
.container {
  position: alternative;
  margin-top: 0px; 
  margin-right: auto;
  margin-left: auto;
}
.email {
  margin-top: 20px;
}
.pencil {
  margin-left: 40%;
}
.trash {
  color: red;
  margin-left: 10%;
}
.password {
  margin: 25px 0 25px 0;
}
.inscription {
  margin-top: 15px;
  margin-bottom: 0px;
  color: black!important;
}
@media(max-width: 600px) {
  .pencil {
    margin-left: 20%;
  }
}
</style>
