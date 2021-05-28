<template>
  <div class="row">
    <div class="col-sm-12">
      <ul class="nav justify-content-center">
          <li class="nav-item">
              <p><router-link class="text-center button mx-1 btn btn-primary" to="/validpost">Post à valider</router-link></p>
          </li>
          <li class="nav-item">
              <p><router-link class="text-center button mx-1 btn btn-warning" to="/validcomments">Commentaires à valider</router-link></p>
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
      httpgetResponse: '',
      profil_utilisateur: '',
      profil_user_or_admin: '',
    }
  },
  created(){
    this.searchNamePost()
  }, 

  methods: {
    deletedUser(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.delete('http://localhost:3000/api/auth/delete/' + key + '', requestOptions ).then(function(response) {
        return response.json();
      }).then(function() {
        alert('Utilisateur supprimé avec succès !');
        window.location="/listusers";      
      });
    },
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
    onDisconnect() {
        this.profil_user_or_admin = '';
        localStorage.removeItem('user');
        window.location="/";      
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
.check {
    color: green;
  margin-left: 20%;
}
.trash {
  color: red;
  margin-left: 0%;
}
.password {
  margin: 25px 0 25px 0;
}
.inscription {
  margin-top: 15px;
  margin-bottom: 0px;
  color: black!important;
}
</style>
