<template>


  <div id="body">
  <div id="content">
    <nav-top></nav-top>
    <router-view></router-view>
  </div>
  <nav-bottom id="footer"></nav-bottom>
   <BackTop></BackTop>
  </div>

</template>

<script>
import navBottom from "./components/navBottom";
import navTop from "./components/navTop";

export default {
  name: "App",
  components: { navBottom, navTop }
};
</script>

<style>
[v-cloak] {
  display: none;
}



#body {
  display: flex; 
  flex-flow: column; 
  min-height: 100vh;
}

#content {
  flex:1;
  background-color: #e1e1e1;
}

#footer {
  flex: 0;  
}

</style>


