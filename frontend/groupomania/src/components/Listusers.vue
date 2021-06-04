<template>
  <div class="row">
    <div class="col-sm-12">
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
    </div>
    <div class="col-sm-4"></div>
        <div class="col-sm-4">
            <li v-for="item in postListUsername" :key="item.id">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ item.firstname }} {{ item.lastname }}
                        </h5>
                        <div class="card-text">
                        <span>
                          {{ item.email }}
                        </span>
                        <br>
                        <span>
                          <img :src="item.avatar" />
                        </span>
                    </div>   
                    <b-icon-trash-fill class="trash" scale="2" @click="deletedUser(item.id)"></b-icon-trash-fill>
                </div>
            </div>
        </li>
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
      httpToken: '',
      commentairesListUsername: [],
      postListUsername: [],
      httpgetResponseComments: '',
      httpgetResponsePost: '',
      httpgetResponse: '',
      profil_utilisateur: '',
      profil_user_or_admin: '',
    }
  },
  created(){
    this.searchNamePost(),
    this.onTestGetPost(),
    this.onTestGetComments()
  }, 

  methods: {
    // Function for list post to bdd
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
    // Function for list comments to bdd
    onTestGetComments() {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/forum/post/commentsnotvalid', requestOptions ).then(function(response) {
        return response.json();
      }).then(function(json) {
          console.log(json);
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
    // Function for deleted user to bdd
    deletedUser(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.delete('http://localhost:3000/api/auth/delete/' + key + '', requestOptions ).then(function(response) {
        return response.json();
      }).then(function() {
        alert('Utilisateur supprimé avec succès !');
        location.reload();
      });
    },
    // Function for list user to bdd
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
    // Function for disconnect
    onDisconnect() {
        this.profil_user_or_admin = '';
        localStorage.removeItem('user');
        window.location="/";      
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
.check {
    color: green;
  margin-left: 20%;
}
.trash {
  color: red;
  margin-left: 0%;
}
</style>
