<template>

<div id="app">
  <div class="content">
    <nav-top></nav-top>
    <router-view></router-view>
  </div>
  <nav-bottom class="footer"></nav-bottom>
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

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1 0 auto;
  /* padding: 20px; */
}

.footer {
  flex-shrink: 0;
  /* padding: 20px; */
}
</style>


