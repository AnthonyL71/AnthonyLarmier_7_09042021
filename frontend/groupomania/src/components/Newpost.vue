
<template>
    <div class="signup">
        <div id="app">
            <div class="container">
                <fieldset>
                    <div class="text-center">
                        <div class="form-group font-weight-bold card-header padding text-left">
                            <h1 class="text-center">Crée un nouveau poste</h1>
                    <textarea class="form-control" rows="7" cols="50" v-model="text" placeholder="Votre texte pour le poste"></textarea>   
                            <input class="form-control email" type="text" placeholder="lien" v-model="lien"/>
                            <input type="submit" name="enregister" class="form-control button btn btn-dark btn-lg" value="Enregister" @click="registerPost()"/>
                            <p class="retour text-center"><router-link class="retour text-center" to="/">Retour</router-link></p>
                            {{ error }}
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>
</template>




<script>
import { authHeader } from './authHeaders.js';


export default {
    name: 'signu',
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
    if (!this.password == !this.password2) {
        this.errors.push('Mot de passe non identique');
    }

      e.preventDefault();
    },
    registerPost() {
        let datePost = new Date();
              const requestOptions = {
        headers: authHeader()
      };
        var register = { description:this.text, media:this.lien, posted_date:datePost };
        this.$http.post('http://localhost:3000/api/forum', register, requestOptions ).then(function(response) {
            this.httpPostStatus = response.status;
            return response.json();
        }).then(function(json) {
        this.httpResponse = json;
        this.$router.push('/') 
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
width: 900px;
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
textarea {
    min-width: 200px;
}
</style>
