<template>
  <div class="index">
    <h1>{{ msg }}</h1>
  <div id="app">
    {{ httpResponse }}
    {{ httpStatus }}
  </div>

  </div>
</template>


<script>


export default {
    name: 'Index',
  props: {
    msg: String
  },
  data() {
    return {
      httpStatus: '',
      httpResponse: ''
    }
  },
methods: {
    onTestGet() {
      // Données à poster

      // Appel POST
      this.$http.get('http://localhost:3000/api/forum' ).then(function(response) {
        this.httpStatus = response.status;
        // Comme c'est du Json: on le traduit
        return response.json();
      }).then(function(json) {
        // On lit le contenu du Json
        this.httpResponse = json;
        localStorage.setItem('user', JSON.stringify(json));
      });
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container
{
position: alternative;
margin-top: 50px; 
width: 430px;
margin-right: auto;
margin-left: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
