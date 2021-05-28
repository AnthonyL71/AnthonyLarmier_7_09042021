
<template>
  <div class="signup">
    <div id="app">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-8 col-lg-6 col-xl-4 colonne-centree">
          <fieldset>
            <div class="text-center">
              <div class="form-group font-weight-bold card-header">
                <h1 class="text-center">Crée un nouveau poste</h1>
                <textarea class="form-control" rows="7" cols="50" v-model="text" placeholder="Votre texte pour le poste"></textarea>   
                <input class="form-control email" type="text" placeholder="lien" v-model="lien"/>
                <input type="submit" name="enregister" class="form-control button btn btn-success btn-lg" value="Enregister" @click="registerPost()"/>
                <p class="text-center"><router-link class="form-control text-center button btn btn-secondary btn-lg" to="/">Retour</router-link></p>
                {{ error }}
              </div>
            </div>
          </fieldset>
        </div>
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
