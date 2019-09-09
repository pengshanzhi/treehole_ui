<template>
  <div id="app" :style="night">
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
        night:{
          backgroundImage: "url(" + require("../src/assets/night.png") + ")"
      }
    }
    }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin-top: 0px;
  min-height: 660px;
 
}
</style>
