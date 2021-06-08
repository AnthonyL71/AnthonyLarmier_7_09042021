
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
                <input type="file" ref="image" class="file-input" @change="upload">
                <input type="submit" name="enregister" class="form-control button btn btn-success btn-lg" value="Enregister" @click="registerPost()"/>
                <p class="text-center"><router-link class="form-control text-center button btn btn-secondary btn-lg" to="/">Retour</router-link></p>
                    <p v-if="errors.length">
                      <ul id="ulerror">
                        <li id="lierror" v-for="error in errors" :key="error">{{ error }}</li>
                      </ul>
                    </p>
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
      httpgetResponse: '',
      image: null
    }
  },
  computed: {
    computedWidth: function () {
      return this.backgroundcolor;
    }
  },
  methods: {
    upload() {
      this.image = this.$refs.image.files[0];
      console.log(this.image);
    },
    // Function for send form to api
    registerPost() {
      this.errors = [];
      let datePost = new Date();
      const requestOptions = {
        headers: authHeader()
      };

      const formData = new FormData();
      if (this.text == undefined) {
        this.errors.push('Aucun texte !');
      }
      if (this.image == null) {
        this.errors.push('Aucune image !');
      }
        formData.append("image", this.image, this.image.filename);
        formData.append("description", this.text);
        formData.append("posted_date", datePost);
        this.$http.post('http://localhost:3000/api/forum', formData, requestOptions ).then(function(response) {
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
textarea {
  min-width: 200px;
}
</style>
