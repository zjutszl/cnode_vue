<template>

<div v-cloak>
  <nav-top></nav-top>
  <router-view></router-view>
  <nav-bottom></nav-bottom>
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

<style scoped>
[v-cloak] {
  display: none;
}
</style>


