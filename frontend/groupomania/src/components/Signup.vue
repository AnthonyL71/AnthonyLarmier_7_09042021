
<template>
  <div class="signup">
    <div id="app">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-5 col-lg-4 col-xl-3 colonne-centree">
          <div class="container">
            <fieldset>
              <div class="text-center">
                <div class="form-group font-weight-bold card-header">
                  <h1 class="text-center">Inscription</h1>
                  <input class="form-control email" type="text" placeholder="Adresse mail" v-model="email"/>
                  <input class="form-control email" type="text" placeholder="Nom" v-model="firstname"/>
                  <input class="form-control email" type="text" placeholder="Prénom" v-model="lastname"/>
                  <input class="form-control password" type="password" placeholder="Mot de passe" v-model="password"/>
                  <input class="form-control password" type="password" placeholder="Vérification Mot de passe" v-model="password2"/>
                  <p v-if="errors.length">
                    <ul id="ulerror">
                      <li id="lierror" v-for="error in errors" :key="error">{{ error }}</li>
                  </ul>
                  </p>
                  <input type="submit" name="enregister" class="form-control button btn btn-dark btn-lg" value="Inscription" @click="checkForm()"/>
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


export default {
  name: 'signup',
  props: {
      msg: String
  },
  data() {
      return {
      httpPostStatus: '',
      error: '',
      httpGetStatus: '',
      errors: [],
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
  methods: {
    checkForm: function (e) {
      if (this.email && this.firstname && this.lastname && this.password && this.password2 && this.password == this.password2) {
        this.Signupnewuser();
      }
      this.errors = [];
      if (!this.email) {
          this.errors.push('Adresse mail manquante');
      }
      if (!this.firstname) {
          this.errors.push('Nom manquant');
      }
      if (!this.lastname) {
          this.errors.push('Prénom manquant');
      }
      if (!this.password) {
          this.errors.push('Mot de passe manquant');
      }
      if (!this.password2) {
          this.errors.push('Vérification mot de passe manquant');
      }
      if (this.password != this.password2) {
          this.errors.push('Mot de passe non identique');
      }
      e.preventDefault();
    },
    Signupnewuser() {
      var register = { email:this.email, firstname:this.firstname, lastname:this.lastname, password:this.password };
      this.$http.post('http://localhost:3000/api/auth/signup', register ).then(function(response) {
          this.httpPostStatus = response.status;
          return response.json();
      })
      .then(function(json) {
          this.httpResponse = json;
          this.$router.push('/') 
      })
      .catch(function(error) {
        this.errors.push(error.body.error);
      });
    }
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
.retour {
  margin-top: 15px;
  margin-bottom: 0px;
  color: black!important;
}
</style>
