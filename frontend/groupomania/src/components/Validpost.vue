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
        <li v-for="item in httpgetResponse" :key="item.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
              <div v-for="user in postListUsername" :key="user.id">
                <span v-if="user.id == item.profil_id">
                  {{ user.firstname }} {{ user.lastname }}
                </span>
              </div>
              </h5>
              <div class="card-text">
                <img :src="item.media" />
              </div>
              <div class="card-text">
                <span>
                  {{ item.description }}
                </span>
              </div>   
              <b-icon-trash-fill class="trash" scale="2" @click="onDeletedPost(item.id)"></b-icon-trash-fill>
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
      postListUsername: [],
      httpgetResponse: '',
      httpgetResponseComments: '',
      profil_utilisateur: '',
      profil_user_or_admin: '',
    }
  },
  created(){
    this.onTestGet(),
    this.onTestGetComments()
  }, 
  methods: {

    functionSearchNamePost() {
      this.searchNamePost();
    },
    // Function for deleted post to bdd
    onDeletedPost(key) {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.delete('http://localhost:3000/api/forum/' + key + '', requestOptions ).then(function(response) {
        return response.json();
      }).then(function() {
        alert('Post supprimé avec succès !');
        location.reload();
      });
    },
    // Function for validate post to bdd
    onValidatePost(key) {
      const requestOptions = {
        headers: authHeader()
      };
      var connect = { id:key };
      this.$http.post('http://localhost:3000/api/forum/validate/' + key + '', connect, requestOptions ).then(function(response) {
        return response.json();
      }).then(function() {
        alert('Post validé avec succès !');
        location.reload();
      });
    },
    // Function for list post not validate
    onTestGet() {
      const requestOptions = {
        headers: authHeader()
      };
      this.$http.get('http://localhost:3000/api/forum/postnotvalid', requestOptions ).then(function(response) {
        return response.json();
      }).then(function(json) {
        this.httpgetResponse = json;
        this.qqt = json.length;
        let user = JSON.parse(localStorage.getItem('user'));
          if (user && user.token) {
            this.profil_utilisateur = user.userId;
            this.profil_user_or_admin = user.profile;
          }
      });
    },
    // Function for list comments not validate
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
    // Function for search name post to bdd
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
  margin-top: 7px;
}
.password {
  margin: 25px 0 25px 0;
}
</style>
